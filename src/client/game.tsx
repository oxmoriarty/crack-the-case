import './index.css';

import { StrictMode, useEffect, useState, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { navigateTo, showToast } from '@devvit/web/client';
import { trpc } from './trpc';
import type { Screen, InitResponse, SolveResult } from '../shared/types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CaseIntroView } from './components/CaseIntroView';
import { SuspectCards } from './components/SuspectCards';
import { DetectiveBoard } from './components/DetectiveBoard';
import { VerdictForm } from './components/VerdictForm';
import { WrongChoiceView } from './components/WrongChoiceView';
import { ResultsView } from './components/ResultsView';
import { StatsView } from './components/StatsView';
import { LeaderboardView } from './components/LeaderboardView';
import { HelpView } from './components/HelpView';
import { HintModal } from './components/HintModal';

export const App = () => {
  const [initData, setInitData] = useState<InitResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Navigation
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [lastInvestigationScreen, setLastInvestigationScreen] = useState<Screen>('case_intro');

  // Investigation state
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  // Verdict state
  const [selectedCulpritId, setSelectedCulpritId] = useState<string | null>(null);
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [solveResult, setSolveResult] = useState<SolveResult | null>(null);

  // Timer reference
  const activeDurationMsRef = useRef<number>(0);
  const lastResumeTimeRef = useRef<number | null>(null);

  // Fetch initial game state
  const fetchInit = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await trpc.init.get.query();
      setInitData(data);
      if (data.cachedSolveResult) {
        setSolveResult(data.cachedSolveResult);
      }
    } catch (err) {
      console.error('Failed to load game initialization:', err);
      setErrorMsg('Failed to connect to the detective bureau. Please reload.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchInit();
  }, [fetchInit]);

  // Active Timer & Visibility State Handler
  useEffect(() => {
    if (!isInvestigating || solveResult !== null) return;

    lastResumeTimeRef.current = performance.now();

    const interval = setInterval(() => {
      if (lastResumeTimeRef.current !== null && document.visibilityState === 'visible') {
        const now = performance.now();
        const delta = now - lastResumeTimeRef.current;
        lastResumeTimeRef.current = now;
        activeDurationMsRef.current += delta;
        setElapsedSeconds(Math.floor(activeDurationMsRef.current / 1000));
      }
    }, 500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (lastResumeTimeRef.current !== null) {
          activeDurationMsRef.current += performance.now() - lastResumeTimeRef.current;
          lastResumeTimeRef.current = null;
        }
      } else if (document.visibilityState === 'visible') {
        lastResumeTimeRef.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (lastResumeTimeRef.current !== null) {
        activeDurationMsRef.current += performance.now() - lastResumeTimeRef.current;
        lastResumeTimeRef.current = null;
      }
    };
  }, [isInvestigating, solveResult]);

  // Navigation handlers
  const navigateToScreen = (screen: Screen) => {
    setPreviousScreen(currentScreen);
    if (['case_intro', 'suspects', 'clues', 'verdict'].includes(screen)) {
      setLastInvestigationScreen(screen);
    }
    setCurrentScreen(screen);
  };

  const handleStartOrResumeCase = async () => {
    if (!initData) return;
    if (initData.caseStatus === 'unstarted') {
      try {
        await trpc.case.startSession.mutate({
          caseNumber: initData.activeCase.caseNumber,
        });
      } catch (err) {
        console.error('Failed to register session start:', err);
      }
      setIsInvestigating(true);
      navigateToScreen('case_intro');
    } else {
      setIsInvestigating(true);
      navigateToScreen(lastInvestigationScreen);
    }
  };

  const handleBeginInvestigation = () => {
    setIsInvestigating(true);
    navigateToScreen('suspects');
  };

  const handleOpenHint = () => {
    setHasUsedHint(true);
    setIsHintModalOpen(true);
  };

  const handleSubmitVerdict = async () => {
    if (!initData || !selectedCulpritId || !selectedClueId || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await trpc.case.submitVerdict.mutate({
        caseNumber: initData.activeCase.caseNumber,
        culpritId: selectedCulpritId,
        decisiveClueId: selectedClueId,
        activeDurationMs: Math.max(1000, Math.round(activeDurationMsRef.current)),
        usedHint: hasUsedHint,
      });

      if (!res.success) {
        // Wrong Culprit!
        navigateToScreen('wrong_choice');
      } else {
        // Correct Culprit! Case solved!
        setIsInvestigating(false);
        setSolveResult(res.result);
        setInitData((prev: InitResponse | null) =>
          prev
            ? {
                ...prev,
                caseStatus: 'solved',
                profile: res.updatedProfile,
                cachedSolveResult: res.result,
              }
            : null
        );
        navigateToScreen('results');
      }
    } catch (err) {
      console.error('Verdict submission error:', err);
      showToast('Could not submit verdict. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryDeduction = () => {
    // Clear selections, preserve timer, hint, and investigation progress
    setSelectedCulpritId(null);
    setSelectedClueId(null);
    navigateToScreen('verdict');
  };

  const handleDiscuss = () => {
    // Open comments on current Reddit post
    void navigateTo('https://www.reddit.com/r/crack_the_case_dev3');
  };

  // Loading View
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FFF5E6] p-6 text-center select-none">
        <div className="relative mb-3 flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-[#087E78] text-3xl shadow-md">
          🔍
        </div>
        <h2 className="text-lg font-black tracking-tight text-[#173B3A]">
          CRACK THE CASE
        </h2>
        <p className="mt-1 text-xs font-bold text-[#087E78]">
          Reviewing evidence dossier...
        </p>
      </div>
    );
  }

  // Error View
  if (errorMsg || !initData) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FFF5E6] p-6 text-center">
        <span className="text-4xl">⚠️</span>
        <h2 className="mt-3 text-lg font-bold text-[#173B3A]">
          Connection Notice
        </h2>
        <p className="mt-1 max-w-xs text-xs text-[#455653]">
          {errorMsg ?? 'Failed to load case data.'}
        </p>
        <button
          type="button"
          onClick={() => void fetchInit()}
          className="mt-4 cursor-pointer rounded-xl bg-[#087E78] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#065C58]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { activeCase, caseStatus, profile, timeUntilResetSec } = initData;

  const isInvestigationActive = [
    'case_intro',
    'suspects',
    'clues',
    'verdict',
  ].includes(currentScreen);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col bg-[#FFF5E6] shadow-xl">
      {/* Persistent Investigation Header (Absent on Home, Results, Stats, Help) */}
      {isInvestigationActive && (
        <Header
          title={activeCase.title}
          difficulty={activeCase.difficulty}
          elapsedSeconds={elapsedSeconds}
          hasUsedHint={hasUsedHint}
          onOpenHint={handleOpenHint}
        />
      )}

      {/* Main Screen Content */}
      <main className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && (
          <HomeScreen
            activeCase={activeCase}
            caseStatus={caseStatus}
            profile={profile}
            timeUntilResetSec={timeUntilResetSec}
            onStartOrResumeCase={handleStartOrResumeCase}
            onViewResults={() => navigateToScreen('results')}
            onNavigate={navigateToScreen}
          />
        )}

        {currentScreen === 'case_intro' && (
          <CaseIntroView
            caseData={activeCase}
            onBeginInvestigation={handleBeginInvestigation}
            isStarting={false}
          />
        )}

        {currentScreen === 'suspects' && (
          <SuspectCards suspects={activeCase.suspects} />
        )}

        {currentScreen === 'clues' && (
          <DetectiveBoard clues={activeCase.clues} />
        )}

        {currentScreen === 'verdict' && (
          <VerdictForm
            suspects={activeCase.suspects}
            clues={activeCase.clues}
            selectedCulpritId={selectedCulpritId}
            selectedClueId={selectedClueId}
            onSelectCulprit={setSelectedCulpritId}
            onSelectClue={setSelectedClueId}
            onSubmit={handleSubmitVerdict}
            isSubmitting={isSubmitting}
          />
        )}

        {currentScreen === 'wrong_choice' && (
          <WrongChoiceView onRetry={handleRetryDeduction} />
        )}

        {currentScreen === 'results' && solveResult && (
          <ResultsView
            caseTitle={activeCase.title}
            result={solveResult}
            profile={profile}
            onNavigate={navigateToScreen}
            onDiscuss={handleDiscuss}
          />
        )}

        {currentScreen === 'stats' && (
          <StatsView
            profile={profile}
            onBack={() => navigateToScreen(previousScreen)}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardView
            profile={profile}
            caseNumber={activeCase.caseNumber}
            onBack={() => navigateToScreen(previousScreen)}
          />
        )}

        {currentScreen === 'help' && (
          <HelpView onBack={() => navigateToScreen(previousScreen)} />
        )}
      </main>

      {/* Persistent Investigation Footer (Absent on Home, Results, Stats, Help) */}
      {isInvestigationActive && (
        <Footer
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
        />
      )}

      {/* Hint Modal Overlay */}
      <HintModal
        hintText={activeCase.hint}
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
      />
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
