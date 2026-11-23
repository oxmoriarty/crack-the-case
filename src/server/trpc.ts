import { initTRPC } from '@trpc/server';
import { transformer } from '../shared/transformer';
import { Context } from './context';
import { reddit, redis } from '@devvit/web/server';
import { z } from 'zod';
import { getCaseByNumber } from '../shared/cases/cases';
import {
  getPlayerProfile,
  getCaseSolveResult,
  evaluateVerdict,
} from './core/game';
import type {
  InitResponse,
  CaseSessionStatus,
  SubmitVerdictInput,
} from '../shared/types';

/**
 * Initialization of tRPC backend
 */
const t = initTRPC.context<Context>().create({
  transformer,
});

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Safely retrieve current Reddit username
 */
const getUsername = async (): Promise<string | null> => {
  try {
    return (await reddit.getCurrentUsername()) ?? null;
  } catch {
    return null;
  }
};

/**
 * Compute seconds until next 00:00:00 UTC
 */
const getTimeUntilResetSec = (): number => {
  const now = new Date();
  const nextReset = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)
  );
  return Math.max(0, Math.floor((nextReset.getTime() - now.getTime()) / 1000));
};

export const appRouter = t.router({
  init: t.router({
    get: publicProcedure.query(async (): Promise<InitResponse> => {
      const username = await getUsername();

      // Check current published case from subreddit meta, defaulting to Case #1
      let activeCaseNumber = 1;
      try {
        const metaVal = await redis.get('subreddit:meta:activeCaseNumber');
        if (metaVal) {
          activeCaseNumber = parseInt(metaVal, 10) || 1;
        }
      } catch {
        activeCaseNumber = 1;
      }

      const activeCase = getCaseByNumber(activeCaseNumber) ?? getCaseByNumber(1)!;

      if (!username) {
        return {
          username: null,
          isAuthenticated: false,
          activeCase,
          caseStatus: 'unstarted',
          profile: {
            username: 'Guest Detective',
            rank: 'Rookie Detective',
            xp: 0,
            currentStreak: 0,
            longestStreak: 0,
            casesSolved: 0,
            perfectDeductions: 0,
            noHintSolves: 0,
            averageSolvingTimeMs: 0,
            achievements: [],
            lastActiveAt: Date.now(),
          },
          timeUntilResetSec: getTimeUntilResetSec(),
        };
      }

      // Authenticated player
      const [profile, existingSolve, sessionRaw] = await Promise.all([
        getPlayerProfile(username),
        getCaseSolveResult(username, activeCase.caseNumber),
        redis.get(`player:${username}:session:${activeCase.caseNumber}`),
      ]);

      let caseStatus: CaseSessionStatus = 'unstarted';
      if (existingSolve) {
        caseStatus = 'solved';
      } else if (sessionRaw) {
        caseStatus = 'in_progress';
      }

      return {
        username,
        isAuthenticated: true,
        activeCase,
        caseStatus,
        profile,
        cachedSolveResult: existingSolve ?? undefined,
        timeUntilResetSec: getTimeUntilResetSec(),
      };
    }),
  }),

  case: t.router({
    startSession: publicProcedure
      .input(
        z.object({
          caseNumber: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const username = await getUsername();

        if (!username) {
          return { ok: true, startedAt: Date.now() };
        }

        const now = Date.now();
        await redis.set(`player:${username}:session:${input.caseNumber}`, now.toString());
        return { ok: true, startedAt: now };
      }),

    submitVerdict: publicProcedure
      .input(
        z.object({
          caseNumber: z.number(),
          culpritId: z.string(),
          decisiveClueId: z.string(),
          activeDurationMs: z.number().min(0),
          usedHint: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const username = await getUsername();

        if (!username) {
          throw new Error('You must be signed in to Reddit to submit a verdict.');
        }

        const result = await evaluateVerdict(username, input as SubmitVerdictInput);
        return result;
      }),
  }),

  profile: t.router({
    get: publicProcedure.query(async () => {
      const username = await getUsername();
      if (!username) return null;
      return await getPlayerProfile(username);
    }),
  }),
});

export type AppRouter = typeof appRouter;
