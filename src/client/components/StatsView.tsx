import type { PlayerProfile } from '../../shared/types';
import { ACHIEVEMENTS, getNextRank } from '../../shared/config';

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
      <div className="mb-4 flex items-center justify-between border-b border-[#E8DCC8] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1 text-xs font-bold text-[#087E78] hover:underline"
        >
          ← Back
        </button>
        <h2 className="text-base font-black text-[#173B3A]">Detective Profile</h2>
        <div className="w-10" />
      </div>

      {/* Profile Card */}
      <div className="mb-5 flex flex-col items-center rounded-2xl border border-[#E8DCC8] bg-white p-5 text-center shadow-xs">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E78] text-3xl shadow-sm">
          🕵️
        </div>
        <h3 className="text-lg font-black text-[#173B3A]">{profile.username}</h3>
        <span className="mt-0.5 rounded-full bg-[#E0F2F1] px-3 py-0.5 text-xs font-bold text-[#087E78]">
          {profile.rank}
        </span>
        <p className="mt-1 text-xs font-semibold text-[#455653]">
          {profile.xp} Total XP
        </p>

        {/* Progress Bar */}
        <div className="mt-3 w-full max-w-xs">
          <div className="mb-1 flex justify-between text-[11px] text-[#455653]">
            <span>{profile.rank}</span>
            <span>{nextRank ? `${xpNeeded} XP to ${nextRank.title}` : 'Max'}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8DCC8]">
            <div
              className="h-full rounded-full bg-[#087E78]"
              style={{
                width: nextRank
                  ? `${Math.min(100, Math.round((profile.xp / nextRank.minXp) * 100))}%`
                  : '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* 6 Career Stats Grid */}
      <h3 className="mb-2 text-xs font-black uppercase tracking-wider text-[#087E78]">
        Career Statistics
      </h3>
      <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">Cases Solved</span>
          <p className="text-xl font-black text-[#173B3A]">{profile.casesSolved}</p>
        </div>

        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">Current Streak</span>
          <p className="text-xl font-black text-[#F07868]">
            🔥 {profile.currentStreak}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">Longest Streak</span>
          <p className="text-xl font-black text-[#173B3A]">{profile.longestStreak}</p>
        </div>

        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">Perfect Deductions</span>
          <p className="text-xl font-black text-[#087E78]">
            {profile.perfectDeductions}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">No-Hint Solves</span>
          <p className="text-xl font-black text-[#856404]">{profile.noHintSolves}</p>
        </div>

        <div className="rounded-xl border border-[#E8DCC8] bg-white p-3 text-center shadow-2xs">
          <span className="text-[10px] font-bold text-[#455653]">Avg Solving Time</span>
          <p className="text-xl font-black text-[#173B3A]">
            {formatAvgTime(profile.averageSolvingTimeMs)}
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <h3 className="mb-2 text-xs font-black uppercase tracking-wider text-[#087E78]">
        Achievements ({profile.achievements.length} / {ACHIEVEMENTS.length})
      </h3>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedSet.has(ach.id);
          return (
            <div
              key={ach.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                isUnlocked
                  ? 'border-[#E9B949] bg-white shadow-2xs'
                  : 'border-[#E8DCC8]/60 bg-white/40 opacity-60'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
                  isUnlocked ? 'bg-[#E9B949]/30' : 'bg-gray-100 grayscale'
                }`}
              >
                {isUnlocked ? '🎖️' : '🔒'}
              </div>
              <div>
                <h4
                  className={`text-xs font-black ${
                    isUnlocked ? 'text-[#173B3A]' : 'text-gray-500'
                  }`}
                >
                  {ach.title}
                </h4>
                <p className="text-[11px] text-[#455653]">{ach.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
