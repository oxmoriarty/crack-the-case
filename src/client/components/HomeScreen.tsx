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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-[#E0F2F1] text-[#087E78] border-[#087E78]/30';
      case 'Standard':
        return 'bg-[#FFF3CD] text-[#856404] border-[#E9B949]/50';
      case 'Challenging':
        return 'bg-[#FCE8E6] text-[#D9534F] border-[#F07868]/40';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Header with Brand and Help */}
      <div className="flex items-center justify-between border-b border-[#E8DCC8] pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087E78] shadow-sm">
            <GameIcon name="magnifier" size="md" className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#173B3A]">
              CRACK THE CASE
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#087E78]">
              A New Mystery Every Day
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('help')}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E8DCC8] bg-white text-sm font-bold text-[#455653] shadow-2xs hover:border-[#087E78]"
          title="Help & Rules"
        >
          <GameIcon name="help" size="sm" className="text-[#455653]" />
        </button>
      </div>

      {/* Player Career Card */}
      <div className="my-4 flex items-center justify-between rounded-2xl border border-[#E8DCC8] bg-white p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5E6] border border-[#E8DCC8]">
            <GameIcon name="fedora" size="md" className="text-[#087E78]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#087E78]">
              {profile.rank}
            </span>
            <h3 className="text-sm font-black text-[#173B3A]">
              {profile.username}
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-[#455653]">Current Streak</span>
          <span className="flex items-center gap-1 text-base font-black text-[#F07868]">
            <GameIcon name="flame" size="sm" className="text-[#F07868]" />
            <span>
              {profile.currentStreak} {profile.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </span>
        </div>
      </div>

      {/* Today's Case Card */}
      <div className="mb-5 rounded-2xl border-2 border-[#087E78]/30 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#E0F2F1] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#087E78]">
            TODAY'S CASE
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${getDifficultyColor(
              activeCase.difficulty
            )}`}
          >
            {activeCase.difficulty}
          </span>
        </div>

        <div className="mt-3">
          <span className="text-xs font-bold text-[#455653]">
            CASE #{activeCase.caseNumber}
          </span>
          <h2 className="text-lg font-black text-[#173B3A]">
            {activeCase.title}
          </h2>
          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#455653]">
            {activeCase.incident}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#E8DCC8]/60 pt-3 text-[11px] font-semibold text-[#455653]">
          <span>Reset in: {formatCountdown(timeUntilResetSec)}</span>
          <span>5-10 min session</span>
        </div>

        {/* Primary CTA */}
        <div className="mt-4">
          {caseStatus === 'solved' ? (
            <button
              type="button"
              onClick={onViewResults}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087E78] font-bold text-white shadow-md hover:bg-[#065C58] active:scale-98"
            >
              <GameIcon name="trophy" size="sm" className="text-white" />
              <span>View Results</span>
            </button>
          ) : caseStatus === 'in_progress' ? (
            <button
              type="button"
              onClick={onStartOrResumeCase}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E9B949] font-bold text-[#173B3A] shadow-md hover:bg-[#D4A338] active:scale-98"
            >
              <GameIcon name="magnifier" size="sm" className="text-[#173B3A]" />
              <span>Resume Case</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartOrResumeCase}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087E78] font-bold text-white shadow-md hover:bg-[#065C58] active:scale-98"
            >
              <GameIcon name="magnifier" size="sm" className="text-white" />
              <span>Solve Case</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onNavigate('leaderboard')}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs hover:border-[#087E78] active:scale-95"
        >
          <GameIcon name="trophy" size="md" className="text-[#087E78]" />
          <span className="mt-1 text-xs font-bold text-[#173B3A]">Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('stats')}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs hover:border-[#087E78] active:scale-95"
        >
          <GameIcon name="chart" size="md" className="text-[#087E78]" />
          <span className="mt-1 text-xs font-bold text-[#173B3A]">My Stats</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('help')}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs hover:border-[#087E78] active:scale-95"
        >
          <GameIcon name="help" size="md" className="text-[#087E78]" />
          <span className="mt-1 text-xs font-bold text-[#173B3A]">How to Play</span>
        </button>
      </div>
    </div>
  );
};
