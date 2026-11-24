import type { CaseData, CaseSessionStatus, PlayerProfile, Screen } from '../../shared/types';
import { GameIcon } from './ui/GameIcon';

interface HomeScreenProps {
  activeCase: CaseData;
  caseStatus: CaseSessionStatus;
  profile: PlayerProfile;
  timeUntilResetSec: number;
  onStartOrResumeCase: () => void;
  onViewResults: () => void;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen = ({
  activeCase,
  caseStatus,
  profile,
  timeUntilResetSec,
  onStartOrResumeCase,
  onViewResults,
  onNavigate,
}: HomeScreenProps) => {
  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-[#27A468] text-white border-b-[#176B41]';
      case 'Standard':
        return 'bg-[#F5B229] text-[#262320] border-b-[#B0700D]';
      case 'Challenging':
        return 'bg-[#E44949] text-white border-b-[#961D1D]';
      default:
        return 'bg-[#D6C7AE] text-[#262320] border-b-[#A8987E]';
    }
  };

  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl border-[2.5px] border-[#262320] border-b-[4.5px] border-b-[#166A3F] bg-[#27A468] shadow-[0_3px_0_#262320]">
            <GameIcon name="magnifier" size="md" />
          </div>
          <div>
            <h1 className="text-cartoon-shadow text-2xl text-white tracking-wider">
              CRACK THE CASE
            </h1>
            <div className="mt-0.5">
              <span className="ribbon-red-tape text-[10px]">
                A NEW MYSTERY EVERY DAY
              </span>
            </div>
          </div>
        </div>

        {/* How to Play / Help Button */}
        <button
          type="button"
          onClick={() => onNavigate('help')}
          className="btn-cartoon-cream flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-base shadow-[0_3px_0_#262320]"
          title="Help & Rules"
        >
          <GameIcon name="help" size="sm" />
        </button>
      </div>

      {/* Player Career Dossier Card (Notebook style) */}
      <div className="card-notebook my-4 flex items-center justify-between p-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
            <GameIcon name="fedora" size="md" />
          </div>
          <div>
            <span className="font-cartoon text-[11px] uppercase tracking-wider text-[#27A468]">
              {profile.rank}
            </span>
            <h3 className="font-cartoon text-sm text-[#262320] tracking-wide">
              {profile.username}
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-cartoon text-[10px] uppercase text-[#61584F] tracking-wider">
            Streak
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border-[2px] border-[#262320] bg-[#FFF2DE] px-2.5 py-0.5 font-cartoon text-xs text-[#E44949] shadow-[0_1.5px_0_#262320]">
            <GameIcon name="flame" size="xs" />
            <span>
              {profile.currentStreak} {profile.currentStreak === 1 ? 'DAY' : 'DAYS'}
            </span>
          </span>
        </div>
      </div>

      {/* Today's Case Card (Stacked Paper with Tape) */}
      <div className="card-notebook paper-stack mb-5 p-5 pt-6 text-left">
        {/* Top Scotch Tape */}
        <div className="scotch-tape" />

        {/* Case Badges */}
        <div className="flex items-center justify-between">
          <span className="badge-cartoon-yellow text-[11px]">
            TODAY'S CASE
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border-[2px] border-[#262320] border-b-[3.5px] px-2.5 py-0.5 font-cartoon text-xs uppercase shadow-[0_1.5px_0_#262320] ${getDifficultyBadge(
              activeCase.difficulty
            )}`}
          >
            <GameIcon name="star" size="xs" />
            <span>{activeCase.difficulty}</span>
          </span>
        </div>

        {/* Case Info */}
        <div className="mt-3">
          <span className="font-cartoon text-xs text-[#61584F] tracking-wider">
            CASE #{activeCase.caseNumber}
          </span>
          <h2 className="text-cartoon-shadow mt-0.5 text-xl text-white tracking-wide">
            {activeCase.title}
          </h2>
          <div className="mt-2.5 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
            <p className="line-clamp-3 font-body text-xs font-semibold leading-relaxed text-[#262320]">
              {activeCase.incident}
            </p>
          </div>
        </div>

        {/* Reset Countdown Bar */}
        <div className="mt-3.5 flex items-center justify-between border-t-[2px] border-[#262320]/20 pt-2.5 font-cartoon text-[11px] text-[#61584F]">
          <span className="flex items-center gap-1">
            <GameIcon name="clock" size="xs" />
            <span>RESET IN: {formatCountdown(timeUntilResetSec)}</span>
          </span>
          <span>⏱ 5-10 MIN SESSION</span>
        </div>

        {/* Primary CTA (Chunky 3D Cartoon Buttons) */}
        <div className="mt-4">
          {caseStatus === 'solved' ? (
            <button
              type="button"
              onClick={onViewResults}
              className="btn-cartoon-green flex h-13 w-full cursor-pointer items-center justify-center gap-2 text-base shadow-[0_5px_0_#262320]"
            >
              <GameIcon name="trophy" size="sm" />
              <span>VIEW RESULTS</span>
            </button>
          ) : caseStatus === 'in_progress' ? (
            <button
              type="button"
              onClick={onStartOrResumeCase}
              className="btn-cartoon-yellow flex h-13 w-full cursor-pointer items-center justify-center gap-2 text-base shadow-[0_5px_0_#262320]"
            >
              <GameIcon name="magnifier" size="sm" />
              <span>RESUME CASE</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartOrResumeCase}
              className="btn-cartoon-green flex h-13 w-full cursor-pointer items-center justify-center gap-2 text-base shadow-[0_5px_0_#262320]"
            >
              <GameIcon name="magnifier" size="sm" />
              <span>SOLVE CASE</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards (3 Chunky Cartoon Tiles like in the image) */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => onNavigate('leaderboard')}
          className="btn-cartoon-cream flex cursor-pointer flex-col items-center justify-center rounded-xl p-3 text-center shadow-[0_4px_0_#262320] active:translate-y-1 active:shadow-none"
        >
          <GameIcon name="trophy" size="md" />
          <span className="mt-1 font-cartoon text-xs text-[#262320] tracking-wide">
            LEADERBOARD
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('stats')}
          className="btn-cartoon-cream flex cursor-pointer flex-col items-center justify-center rounded-xl p-3 text-center shadow-[0_4px_0_#262320] active:translate-y-1 active:shadow-none"
        >
          <GameIcon name="chart" size="md" />
          <span className="mt-1 font-cartoon text-xs text-[#262320] tracking-wide">
            MY STATS
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('help')}
          className="btn-cartoon-cream flex cursor-pointer flex-col items-center justify-center rounded-xl p-3 text-center shadow-[0_4px_0_#262320] active:translate-y-1 active:shadow-none"
        >
          <GameIcon name="help" size="md" />
          <span className="mt-1 font-cartoon text-xs text-[#262320] tracking-wide">
            HOW TO PLAY
          </span>
        </button>
      </div>
    </div>
  );
};
