import { useState } from 'react';
import type { SolveResult, PlayerProfile, Screen } from '../../shared/types';
import { ACHIEVEMENTS, getNextRank } from '../../shared/config';
import { GameIcon } from './ui/GameIcon';

interface ResultsViewProps {
  caseTitle: string;
  result: SolveResult;
  profile: PlayerProfile;
  onNavigate: (screen: Screen) => void;
  onDiscuss: () => void;
}

export const ResultsView = ({
  caseTitle,
  result,
  profile,
  onNavigate,
  onDiscuss,
}: ResultsViewProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const { nextRank, xpNeeded } = getNextRank(profile.xp);

  const newlyUnlockedMeta = result.newAchievement
    ? ACHIEVEMENTS.find((a) => a.id === result.newAchievement)
    : null;

  return (
    <div className="flex w-full flex-col p-4 pb-10">
      {/* 3 Golden Stars Header (like the reference image) */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="scale-90 -rotate-12">
            <GameIcon name="star" size="md" />
          </div>
          <div className="scale-125 z-10 -translate-y-1">
            <GameIcon name="star" size="lg" />
          </div>
          <div className="scale-90 rotate-12">
            <GameIcon name="star" size="md" />
          </div>
        </div>

        {/* Big Cartoon 3D Heading */}
        <h2 className="text-cartoon-gold text-4xl tracking-wider">
          CORRECT!
        </h2>
        <div className="mt-1">
          <span className="ribbon-red-tape text-xs">
            CASE #{result.caseNumber} SOLVED! — {caseTitle}
          </span>
        </div>
        <p className="mt-2 font-cartoon text-xs text-[#262320] tracking-wide">
          OUTSTANDING DEDUCTION, DETECTIVE {profile.username}!
        </p>
      </div>

      {/* Daily Score & XP Card (Chunky Beveled Boxes) */}
      <div className="my-4 grid grid-cols-2 gap-3">
        <div className="card-notebook flex flex-col items-center justify-center p-4 text-center shadow-[0_5px_0_#262320]">
          <span className="badge-cartoon-yellow text-[10px]">
            DAILY SCORE
          </span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="font-cartoon text-4xl text-[#262320]">
              {result.score}
            </span>
            <span className="font-cartoon text-xs text-[#61584F]">/ 100</span>
          </div>
          {result.score === 100 && (
            <span className="badge-cartoon-green mt-1 text-[10px]">
              ★ PERFECT DEDUCTION
            </span>
          )}
        </div>

        <div className="card-notebook flex flex-col items-center justify-center p-4 text-center shadow-[0_5px_0_#262320]">
          <span className="badge-cartoon-green text-[10px]">
            XP EARNED
          </span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="font-cartoon text-4xl text-[#27A468]">
              +{result.xpEarned}
            </span>
            <span className="font-cartoon text-xs text-[#61584F]">XP</span>
          </div>
          <span className="inline-flex items-center gap-1 font-cartoon text-xs text-[#E44949]">
            <GameIcon name="flame" size="xs" />
            <span>{profile.currentStreak} DAY STREAK</span>
          </span>
        </div>
      </div>

      {/* Rank Progress Bar (Chunky Cartoon Progress Bar) */}
      <div className="card-notebook mb-4 p-4 shadow-[0_4px_0_#262320]">
        <div className="flex items-center justify-between font-cartoon text-xs text-[#262320]">
          <span>RANK: {profile.rank}</span>
          <span className="text-[#61584F]">
            {nextRank ? `${xpNeeded} XP TO ${nextRank.title}` : 'MAX RANK REACHED'}
          </span>
        </div>
        <div className="mt-2 h-4 w-full overflow-hidden rounded-full border-[2px] border-[#262320] bg-[#F6EFE0] p-0.5 shadow-[inset_0_2px_4px_rgba(38,35,32,0.15)]">
          <div
            className="h-full rounded-full border-[1.5px] border-[#262320] bg-[#27A468] transition-all duration-500 shadow-[0_1px_0_#166A3F]"
            style={{
              width: nextRank
                ? `${Math.min(100, Math.round((profile.xp / nextRank.minXp) * 100))}%`
                : '100%',
            }}
          />
        </div>
      </div>

      {/* Newly Unlocked Achievement (if any) */}
      {newlyUnlockedMeta && (
        <div className="card-notebook mb-4 flex items-center gap-3 p-4 shadow-[0_5px_0_#262320] animate-in zoom-in-95 duration-150">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#F5B229] shadow-[0_2px_0_#262320]">
            <GameIcon name="badge" size="md" />
          </div>
          <div>
            <span className="badge-cartoon-yellow text-[10px]">
              ACHIEVEMENT UNLOCKED!
            </span>
            <h4 className="font-cartoon mt-0.5 text-sm text-[#262320] tracking-wide">
              {newlyUnlockedMeta.title}
            </h4>
            <p className="font-body text-xs text-[#61584F]">
              {newlyUnlockedMeta.description}
            </p>
          </div>
        </div>
      )}

      {/* Authoritative Solution Breakdown (Paper Notebook Card with Scotch Tape) */}
      <div className="card-notebook relative mb-5 p-5 pt-6 shadow-[0_5px_0_#262320]">
        <div className="scotch-tape" />

        <div className="mb-3 flex items-center gap-2 border-b-[2px] border-[#262320]/20 pb-2">
          <span className="ribbon-red-tape text-xs">
            OFFICIAL CASE SOLUTION
          </span>
        </div>

        <div className="flex flex-col gap-3 font-cartoon text-xs">
          <div>
            <span className="text-[#61584F]">GUILTY CULPRIT: </span>
            <span className="text-sm text-[#262320]">
              {result.culpritName}
            </span>
          </div>

          <div>
            <span className="text-[#61584F]">DECISIVE CLUE: </span>
            <span className="text-sm text-[#262320]">
              {result.decisiveClueTitle}
            </span>
            {result.isClueCorrect ? (
              <span className="badge-cartoon-green ml-2 text-[10px]">
                ✓ IDENTIFIED
              </span>
            ) : (
              <span className="badge-cartoon-yellow ml-2 text-[10px] text-[#E44949]">
                ✕ MISSED
              </span>
            )}
          </div>

          <div className="rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 font-body text-xs font-semibold leading-relaxed text-[#262320] shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
            <p>{result.solutionExplanation}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons (Chunky 3D Cartoon Buttons) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => onNavigate('leaderboard')}
          className="btn-cartoon-cream flex h-12 cursor-pointer items-center justify-center gap-1.5 text-xs shadow-[0_4px_0_#262320]"
        >
          <GameIcon name="chart" size="xs" />
          <span>LEADERBOARD</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('stats')}
          className="btn-cartoon-cream flex h-12 cursor-pointer items-center justify-center gap-1.5 text-xs shadow-[0_4px_0_#262320]"
        >
          <GameIcon name="user" size="xs" />
          <span>MY STATS</span>
        </button>

        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="btn-cartoon-yellow flex h-12 cursor-pointer items-center justify-center gap-1.5 text-xs shadow-[0_4px_0_#262320]"
        >
          <GameIcon name="share" size="xs" />
          <span>SHARE RESULT</span>
        </button>

        <button
          type="button"
          onClick={onDiscuss}
          className="btn-cartoon-red flex h-12 cursor-pointer items-center justify-center gap-1.5 text-xs shadow-[0_4px_0_#262320]"
        >
          <GameIcon name="chat" size="xs" />
          <span>DISCUSS CASE</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="btn-cartoon-green col-span-2 flex h-13 cursor-pointer items-center justify-center gap-2 text-base shadow-[0_5px_0_#262320]"
        >
          <GameIcon name="home" size="sm" />
          <span>RETURN TO HOME</span>
        </button>
      </div>

      {/* Spoiler-Free Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="card-notebook relative w-full max-w-sm p-6 pt-7 shadow-[0_8px_0_#262320]">
            <div className="scotch-tape" />

            <h4 className="text-cartoon-shadow text-xl text-white tracking-wide">
              SPOILER-FREE RESULT
            </h4>
            <p className="font-cartoon mt-1 text-xs text-[#61584F] tracking-wide">
              SHARE YOUR SCORE WITHOUT SPOILING THE SOLUTION!
            </p>

            <div className="my-4 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-4 font-mono text-xs text-[#262320] shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)] leading-relaxed">
              🔍 CRACK THE CASE #{result.caseNumber}
              <br />
              Score: {result.score} / 100 {result.score === 100 ? '★' : ''}
              <br />
              Time: {Math.floor(result.durationSec / 60)}m {result.durationSec % 60}s
              <br />
              Streak: {profile.currentStreak} days 🔥
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const text = `🔍 CRACK THE CASE #${result.caseNumber}\nScore: ${result.score}/100\nStreak: ${profile.currentStreak} 🔥`;
                  void navigator.clipboard?.writeText(text);
                  setShowShareModal(false);
                }}
                className="btn-cartoon-green flex-1 h-11 text-xs shadow-[0_3px_0_#262320]"
              >
                COPY TO CLIPBOARD
              </button>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="btn-cartoon-cream h-11 px-4 text-xs shadow-[0_3px_0_#262320]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
