import { useState } from 'react';
import type { PlayerProfile } from '../../shared/types';

interface LeaderboardViewProps {
  profile: PlayerProfile;
  caseNumber: number;
  onBack: () => void;
}

export const LeaderboardView = ({
  profile,
  caseNumber,
  onBack,
}: LeaderboardViewProps) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'general'>('daily');

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
        <h2 className="text-base font-black text-[#173B3A]">Subreddit Standings</h2>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="mb-4 grid grid-cols-2 rounded-xl border border-[#E8DCC8] bg-white p-1">
        <button
          type="button"
          onClick={() => setActiveTab('daily')}
          className={`cursor-pointer rounded-lg py-2 text-xs font-bold transition-all ${
            activeTab === 'daily'
              ? 'bg-[#087E78] text-white shadow-xs'
              : 'text-[#455653] hover:text-[#173B3A]'
          }`}
        >
          Case #{caseNumber} Daily
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`cursor-pointer rounded-lg py-2 text-xs font-bold transition-all ${
            activeTab === 'general'
              ? 'bg-[#087E78] text-white shadow-xs'
              : 'text-[#455653] hover:text-[#173B3A]'
          }`}
        >
          General Hall of Fame
        </button>
      </div>

      {/* Subreddit Standings Note */}
      <div className="mb-4 rounded-xl border border-[#E8DCC8]/60 bg-[#FFFAF2] p-3 text-xs text-[#455653]">
        <p className="font-medium">
          Standings are isolated to this subreddit installation. Top 100 detectives ranked by score, solve time, and earliest submission.
        </p>
      </div>

      {/* Current Player Rank Card */}
      <div className="mb-5 flex items-center justify-between rounded-2xl border-2 border-[#087E78] bg-[#E0F2F1] p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#087E78] font-mono text-xs font-bold text-white">
            ★
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#087E78]">
              Your Ranking
            </span>
            <h4 className="text-sm font-black text-[#173B3A]">
              {profile.username}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm font-black text-[#087E78]">
            {activeTab === 'daily' ? `${profile.casesSolved > 0 ? 'Active Solver' : 'Unsolved'}` : `${profile.xp} XP`}
          </span>
          <p className="text-[10px] font-semibold text-[#455653]">
            {profile.rank}
          </p>
        </div>
      </div>

      {/* Top 100 List Placeholder (Phase 1 Stub) */}
      <div className="rounded-2xl border border-[#E8DCC8] bg-white p-5 text-center shadow-xs">
        <span className="text-3xl">🏆</span>
        <h4 className="mt-2 text-sm font-black text-[#173B3A]">
          {activeTab === 'daily'
            ? `Case #${caseNumber} Daily Leaderboard`
            : 'Subreddit All-Time Leaderboard'}
        </h4>
        <p className="mt-1 text-xs text-[#455653]">
          Full live community standings populate as detectives solve today's mystery.
        </p>
      </div>
    </div>
  );
};
