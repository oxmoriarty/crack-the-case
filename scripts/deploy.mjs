import { Bundler } from '../node_modules/@devvit/cli/dist/util/Bundler.js';
import { Project } from '../node_modules/@devvit/cli/dist/util/project.js';
import { AssetUploader, queryAssets } from '../node_modules/@devvit/cli/dist/util/AssetUploader.js';
import esbuild from '../node_modules/@devvit/build-pack/node_modules/esbuild/lib/main.js';
import {
  createAppClient,
  createAppVersionClient,
  createInstallationsClient,
} from '../node_modules/@devvit/cli/dist/util/clientGenerators.js';
import { getAccessToken, getOAuthSvc } from '../node_modules/@devvit/cli/dist/util/auth.js';
import { ACTOR_SRC_PRIMARY_NAME } from '@devvit/shared-types/constants.js';

async function main() {
  console.log('--- CRACK THE CASE: DEPLOY SCRIPT ---');

  console.log('0. Checking Reddit Devvit authentication token...');
  const authSvc = getOAuthSvc();
  const tokenInfo = await authSvc.authTokenStore.readFSToken();
  if (!tokenInfo) {
    throw new Error('No saved Devvit token found. Please run npx devvit login.');
  }
  // Proactively refresh token if not fresh or within 12 hours of expiry
  const msRemaining = tokenInfo.token.expiresAt.getTime() - Date.now();
  if (!tokenInfo.token.isFresh() || msRemaining < 12 * 60 * 60 * 1000) {
    console.log('  Proactively refreshing Devvit auth token...');
    await authSvc.refreshStoredToken(tokenInfo.token.refreshToken, Boolean(tokenInfo.copyPaste));
    console.log('  Token refreshed successfully!');
  } else {
    console.log('  Token is fresh and valid!');
  }

  const project = await Project.new('.', 'devvit.json');
  const fakeCmd = {
    project,
    error: (msg) => console.error('CMD ERROR:', msg),
    warn: (msg) => console.warn('CMD WARN:', msg),
  };

  console.log('1. Fetching current app details and version history...');
  const appClient = createAppClient();
  const appInfo = await appClient.GetBySlug({ slug: 'crack-the-case' });
  const appId = appInfo.app.id;
  console.log(`  App ID: ${appId}`);

  let maxPatch = 0;
  for (const v of appInfo.versions) {
    if (v.patchVersion && v.patchVersion > maxPatch) {
      maxPatch = v.patchVersion;
    }
  }
  const nextPatch = maxPatch + 1;
  const versionStr = `0.0.${nextPatch}`;
  console.log(`  Next version to create: ${versionStr}`);

  console.log('2. Syncing assets and webview files...');
  let syncAssetsResult;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const assetUploader = new AssetUploader(fakeCmd, 'crack-the-case', { verbose: true });
      syncAssetsResult = await assetUploader.syncAssets();
      if (syncAssetsResult && syncAssetsResult.webViewAssetMap) {
        const keys = Object.keys(syncAssetsResult.webViewAssetMap);
        if (keys.includes('game.html') && keys.includes('splash.html')) {
          console.log(`  Asset sync attempt ${attempt} succeeded with all assets!`);
          break;
        }
      }
      throw new Error('Incomplete webViewAssetMap returned');
    } catch (syncErr) {
      console.warn(`  Asset sync attempt ${attempt} failed: ${syncErr.message}`);
      if (attempt === 6) throw syncErr;
      console.log('  Retrying asset sync in 3 seconds...');
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  console.log('Assets synced:');
  console.log('  Media Assets:', syncAssetsResult.assetMap || {});
  console.log('  Raw WebView Assets:', syncAssetsResult.webViewAssetMap || {});

  // Devvit CLI has a known bug where existing webview assets get returned as Media Service UUIDs
  // instead of S3 URLs. Normalize any non-URL entries to their exact S3 asset paths:
  const clientAssets = await queryAssets('dist/client', [], 'Client', '0.15.4', false);
  const assetByPath = new Map(clientAssets.map((a) => [a.filePath, a]));
  for (const [filePath, val] of Object.entries(syncAssetsResult.webViewAssetMap || {})) {
    if (!val.startsWith('http')) {
      const a = assetByPath.get(filePath);
      if (a) {
        const s3Url = `https://reddit-service-devvit-webview-assets.s3.us-east-1.amazonaws.com/${appId}/${a.hash}`;
        syncAssetsResult.webViewAssetMap[filePath] = s3Url;
        console.log(`  Normalized ${filePath} from UUID to S3 URL: ${s3Url}`);
      }
    }
  }

  console.log('  Final WebView Assets:', syncAssetsResult.webViewAssetMap || {});

  if (!syncAssetsResult.webViewAssetMap?.['splash.html']) {
    throw new Error('splash.html missing from webviewAssetMap!');
  }
  if (!syncAssetsResult.webViewAssetMap?.['game.html']) {
    throw new Error('game.html missing from webviewAssetMap!');
  }

  console.log('3. Bundling actor...');
  const bundler = new Bundler();
  const actorSpec = {
    name: ACTOR_SRC_PRIMARY_NAME,
    owner: appInfo.app.owner.displayName,
    version: versionStr,
  };
  const bundles = await bundler.bundle(project, actorSpec);
  for (const b of bundles) {
    b.assetIds = syncAssetsResult.assetMap || {};
    b.webviewAssetIds = syncAssetsResult.webViewAssetMap || {};
    // Strip large development source maps to fit within API payload budget
    b.sourceMap = '';
    if (b.server) {
      b.server.sourceMap = '';
    }
    // Minify actor code with esbuild for clean and compact transport
    const minActor = await esbuild.transform(b.code, { minify: true });
    b.code = minActor.code;
    if (b.server && b.server.code) {
      const minServer = await esbuild.transform(b.server.code, { minify: true });
      b.server.code = minServer.code;
    }
  }
  console.log(`  Bundles prepared: ${bundles.length}`);
  console.log(`  Actor code size: ${bundles[0].code.length} bytes`);
  console.log(`  Server code size: ${bundles[0].server?.code?.length || 0} bytes`);
  console.log(`  Actor webviewAssetIds:`, bundles[0].webviewAssetIds);

  console.log('4. Creating App Version on Reddit...');
  const currentToken = await getAccessToken();
  if (!currentToken) {
    throw new Error('Not authenticated! Please ensure devvit token is valid.');
  }
  console.log('  Authentication verified with token.');
  const appVersionClient = createAppVersionClient();
  const createdVersion = await appVersionClient.Create({
    appId,
    visibility: 1,
    majorVersion: 0,
    minorVersion: 0,
    patchVersion: nextPatch,
    prereleaseVersion: 0,
    actorBundles: bundles,
    validInstallTypes: [1],
    devvitJson: JSON.stringify(project.appConfig),
  });
  console.log(`  Version created successfully! ID: ${createdVersion.id}`);

  console.log('5. Waiting for remote build to complete on Reddit...');
  let currentStatus = 0; // 0 = BUILDING, 1 = READY, 2 = FAILED
  for (let i = 0; i < 30; i++) {
    const vCheck = await appVersionClient.Get({ id: createdVersion.id });
    currentStatus = vCheck.appVersion?.buildStatus ?? 0;
    if (currentStatus === 1) {
      console.log('  Remote build status: READY (1)');
      break;
    }
    if (currentStatus === 2) {
      throw new Error('Remote build failed on Reddit Devvit!');
    }
    console.log(`  Waiting for build... attempt ${i + 1} (status: ${currentStatus})`);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log('6. Upgrading installation in subreddit...');
  const installationsClient = createInstallationsClient();
  const instList = await installationsClient.GetAllWithApp({ id: appId });
  if (!instList.installations || instList.installations.length === 0) {
    throw new Error('No installations found for crack-the-case!');
  }
  const targetInstallation = instList.installations[0].installation;
  console.log(`  Found installation in r/${targetInstallation.location.name} (ID: ${targetInstallation.id})`);

  const upgradeRes = await installationsClient.Upgrade({
    id: targetInstallation.id,
    appVersionId: createdVersion.id,
  });
  console.log('  Upgrade complete! Target appInstallState:', upgradeRes.installation?.appInstallState);

  console.log('--------------------------------------------------');
  console.log(`DEPLOYMENT SUCCESSFUL! Version: ${versionStr} (ID: ${createdVersion.id})`);
  console.log(`Target Subreddit: r/${targetInstallation.location.name}`);
  console.log('--------------------------------------------------');
}

main().catch((err) => {
  console.error('FATAL DEPLOYMENT ERROR:', err);
  process.exit(1);
});
