import type { PlayerProfile } from '../../shared/types';
import { ACHIEVEMENTS, getNextRank } from '../../shared/config';
import { GameIcon } from './ui/GameIcon';

interface StatsViewProps {
  profile: PlayerProfile;
  onBack: () => void;
}

export const StatsView = ({ profile, onBack }: StatsViewProps) => {
  const { nextRank, xpNeeded } = getNextRank(profile.xp);

  const formatAvgTime = (ms: number) => {
    if (!ms) return '--';
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const unlockedSet = new Set(profile.achievements);

  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-cartoon-cream flex h-9 cursor-pointer items-center gap-1.5 px-3 font-cartoon text-xs shadow-[0_2px_0_#262320]"
        >
          <span>← BACK</span>
        </button>
        <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
          DETECTIVE PROFILE
        </h2>
        <div className="w-16" />
      </div>

      {/* Profile Card (Notebook style with Scotch Tape) */}
      <div className="card-notebook relative mb-5 flex flex-col items-center p-5 pt-6 text-center shadow-[0_5px_0_#262320]">
        <div className="scotch-tape" />

        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl border-[2.5px] border-[#262320] bg-[#27A468] shadow-[0_3px_0_#262320]">
          <GameIcon name="fedora" size="lg" />
        </div>
        <h3 className="font-cartoon text-xl text-[#262320] tracking-wide">
          {profile.username}
        </h3>
        <span className="badge-cartoon-yellow mt-1 text-xs">
          {profile.rank}
        </span>
        <p className="font-cartoon mt-1 text-xs text-[#61584F] tracking-wider">
          {profile.xp} TOTAL XP
        </p>

        {/* Progress Bar */}
        <div className="mt-3.5 w-full max-w-xs">
          <div className="mb-1 flex justify-between font-cartoon text-[11px] text-[#61584F]">
            <span>{profile.rank}</span>
            <span>{nextRank ? `${xpNeeded} XP TO ${nextRank.title}` : 'MAX RANK'}</span>
          </div>
          <div className="h-3.5 w-full overflow-hidden rounded-full border-[2px] border-[#262320] bg-[#F6EFE0] p-0.5 shadow-[inset_0_2px_4px_rgba(38,35,32,0.15)]">
            <div
              className="h-full rounded-full border-[1px] border-[#262320] bg-[#27A468] shadow-[0_1px_0_#166A3F]"
              style={{
                width: nextRank
                  ? `${Math.min(100, Math.round((profile.xp / nextRank.minXp) * 100))}%`
                  : '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Career Statistics (6 Chunky Cartoon Tiles) */}
      <div className="mb-2.5">
        <span className="ribbon-red-tape text-xs">
          CAREER STATISTICS
        </span>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            Cases Solved
          </span>
          <p className="font-cartoon mt-0.5 text-2xl text-[#262320]">
            {profile.casesSolved}
          </p>
        </div>

        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            Current Streak
          </span>
          <p className="font-cartoon mt-0.5 flex items-center justify-center gap-1 text-2xl text-[#E44949]">
            <GameIcon name="flame" size="xs" />
            <span>{profile.currentStreak}</span>
          </p>
        </div>

        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            Longest Streak
          </span>
          <p className="font-cartoon mt-0.5 text-2xl text-[#262320]">
            {profile.longestStreak}
          </p>
        </div>

        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            Perfect Solves
          </span>
          <p className="font-cartoon mt-0.5 text-2xl text-[#27A468]">
            {profile.perfectDeductions}
          </p>
        </div>

        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            No-Hint Solves
          </span>
          <p className="font-cartoon mt-0.5 text-2xl text-[#F5B229]">
            {profile.noHintSolves}
          </p>
        </div>

        <div className="card-notebook p-3 text-center shadow-[0_3px_0_#262320]">
          <span className="font-cartoon text-[10px] text-[#61584F] tracking-wider uppercase">
            Avg Solving Time
          </span>
          <p className="font-cartoon mt-0.5 text-xl text-[#262320]">
            {formatAvgTime(profile.averageSolvingTimeMs)}
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-2.5">
        <span className="badge-cartoon-yellow text-xs">
          ACHIEVEMENTS ({profile.achievements.length} / {ACHIEVEMENTS.length})
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedSet.has(ach.id);
          return (
            <div
              key={ach.id}
              className={`flex items-center gap-3 rounded-xl border-[2px] border-[#262320] p-3 transition-all ${
                isUnlocked
                  ? 'bg-[#FFFDF8] shadow-[0_3px_0_#262320]'
                  : 'bg-[#F6EFE0]/60 opacity-60 border-dashed'
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[2px] border-[#262320] ${
                  isUnlocked ? 'bg-[#F5B229] shadow-[0_1.5px_0_#262320]' : 'bg-[#E5DAC6]'
                }`}
              >
                {isUnlocked ? (
                  <GameIcon name="badge" size="sm" />
                ) : (
                  <GameIcon name="lock" size="sm" />
                )}
              </div>
              <div>
                <h4
                  className={`font-cartoon text-xs tracking-wide ${
                    isUnlocked ? 'text-[#262320]' : 'text-[#61584F]'
                  }`}
                >
                  {ach.title}
                </h4>
                <p className="font-body text-[11px] font-semibold text-[#61584F] leading-tight mt-0.5">
                  {ach.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
