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
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E78] shadow-md">
          <GameIcon name="trophy" size="xl" className="text-white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-[#173B3A]">
          CASE SOLVED!
        </h2>
        <p className="text-xs font-bold text-[#087E78]">
          CASE #{result.caseNumber} — {caseTitle}
        </p>
        <p className="mt-1 text-xs text-[#455653]">
          Outstanding deduction, Detective {profile.username}!
        </p>
      </div>

      {/* Daily Score & XP Card */}
      <div className="my-4 grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-[#E9B949] bg-white p-4 text-center shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#856404]">
            Daily Score
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#173B3A]">
              {result.score}
            </span>
            <span className="text-xs font-bold text-[#455653]">/ 100</span>
          </div>
          {result.score === 100 && (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#E0F2F1] px-2 py-0.5 text-[10px] font-extrabold text-[#087E78]">
              <GameIcon name="star" size="xs" className="text-[#087E78]" />
              <span>Perfect Deduction</span>
            </span>
          )}
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8DCC8] bg-white p-4 text-center shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#087E78]">
            XP Earned
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#087E78]">
              +{result.xpEarned}
            </span>
            <span className="text-xs font-bold text-[#455653]">XP</span>
          </div>
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#F07868]">
            <GameIcon name="flame" size="xs" className="text-[#F07868]" />
            <span>{profile.currentStreak} Day Streak</span>
          </span>
        </div>
      </div>

      {/* Rank Progress Bar */}
      <div className="mb-4 rounded-2xl border border-[#E8DCC8] bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#173B3A]">Rank: {profile.rank}</span>
          <span className="text-[#455653]">
            {nextRank ? `${xpNeeded} XP to ${nextRank.title}` : 'Max Rank Reached'}
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E8DCC8]">
          <div
            className="h-full rounded-full bg-[#087E78] transition-all duration-500"
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
        <div className="mb-4 flex items-center gap-3 rounded-2xl border-2 border-[#E9B949] bg-[#FFF5E6] p-4 shadow-xs animate-in zoom-in-95 duration-150">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E9B949] shadow-xs">
            <GameIcon name="badge" size="md" className="text-[#856404]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#856404]">
              Achievement Unlocked!
            </span>
            <h4 className="text-sm font-black text-[#173B3A]">
              {newlyUnlockedMeta.title}
            </h4>
            <p className="text-xs text-[#455653]">
              {newlyUnlockedMeta.description}
            </p>
          </div>
        </div>
      )}

      {/* Authoritative Solution Breakdown */}
      <div className="mb-5 rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-center gap-2 border-b border-[#E8DCC8] pb-2">
          <GameIcon name="case-file" size="sm" className="text-[#087E78]" />
          <h3 className="text-sm font-black uppercase tracking-wider text-[#087E78]">
            Official Case Solution
          </h3>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div>
            <span className="font-bold text-[#455653]">Guilty Culprit: </span>
            <span className="font-extrabold text-[#173B3A]">
              {result.culpritName}
            </span>
          </div>

          <div>
            <span className="font-bold text-[#455653]">Decisive Clue: </span>
            <span className="font-extrabold text-[#173B3A]">
              {result.decisiveClueTitle}
            </span>
            {result.isClueCorrect ? (
              <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-[#E0F2F1] px-1.5 py-0.5 text-[10px] font-bold text-[#087E78]">
                <GameIcon name="check" size="xs" className="text-[#087E78]" />
                <span>Identified</span>
              </span>
            ) : (
              <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-[#FCE8E6] px-1.5 py-0.5 text-[10px] font-bold text-[#F07868]">
                <GameIcon name="cross" size="xs" className="text-[#F07868]" />
                <span>Missed</span>
              </span>
            )}
          </div>

          <div className="rounded-xl border border-[#E8DCC8]/60 bg-[#FFFAF2] p-3 text-xs leading-relaxed text-[#173B3A]">
            <p className="font-semibold">{result.solutionExplanation}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onNavigate('leaderboard')}
          className="flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E8DCC8] bg-white text-xs font-bold text-[#173B3A] shadow-xs hover:border-[#087E78] active:scale-98"
        >
          <GameIcon name="chart" size="xs" className="text-[#087E78]" />
          <span>Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('stats')}
          className="flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E8DCC8] bg-white text-xs font-bold text-[#173B3A] shadow-xs hover:border-[#087E78] active:scale-98"
        >
          <GameIcon name="user" size="xs" className="text-[#087E78]" />
          <span>My Stats</span>
        </button>

        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E8DCC8] bg-white text-xs font-bold text-[#087E78] shadow-xs hover:bg-[#E0F2F1] active:scale-98"
        >
          <GameIcon name="share" size="xs" className="text-[#087E78]" />
          <span>Share Result</span>
        </button>

        <button
          type="button"
          onClick={onDiscuss}
          className="flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E8DCC8] bg-white text-xs font-bold text-[#F07868] shadow-xs hover:bg-[#FCE8E6] active:scale-98"
        >
          <GameIcon name="chat" size="xs" className="text-[#F07868]" />
          <span>Discuss Case</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="col-span-2 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087E78] text-sm font-bold text-white shadow-md hover:bg-[#065C58] active:scale-98"
        >
          <GameIcon name="home" size="sm" className="text-white" />
          <span>Return to Home</span>
        </button>
      </div>

      {/* Spoiler-Free Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-[#E8DCC8] bg-[#FFF5E6] p-6 shadow-2xl">
            <h4 className="text-base font-black text-[#173B3A]">
              Spoiler-Free Result
            </h4>
            <p className="mt-1 text-xs text-[#455653]">
              Share your score without spoiling the solution!
            </p>

            <div className="my-4 rounded-xl border border-[#E8DCC8] bg-white p-4 font-mono text-xs text-[#173B3A] shadow-inner">
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
                className="flex-1 cursor-pointer rounded-xl bg-[#087E78] py-2.5 text-center text-xs font-bold text-white shadow-md hover:bg-[#065C58]"
              >
                Copy to Clipboard
              </button>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="cursor-pointer rounded-xl border border-[#E8DCC8] bg-white px-4 py-2.5 text-xs font-bold text-[#455653]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
