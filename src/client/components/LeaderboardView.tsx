import { useState } from 'react';
import type { PlayerProfile } from '../../shared/types';
import { GameIcon } from './ui/GameIcon';

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
      <div className="mb-4 flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-cartoon-cream flex h-9 cursor-pointer items-center gap-1.5 px-3 font-cartoon text-xs shadow-[0_2px_0_#262320]"
        >
          <span>← BACK</span>
        </button>
        <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
          SUBREDDIT STANDINGS
        </h2>
        <div className="w-16" />
      </div>

      {/* Tabs (Chunky 3D Buttons) */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('daily')}
          className={`flex h-11 cursor-pointer items-center justify-center rounded-xl font-cartoon text-xs tracking-wider uppercase transition-all select-none ${
            activeTab === 'daily'
              ? 'btn-cartoon-green shadow-[0_3px_0_#262320]'
              : 'btn-cartoon-cream shadow-[0_2.5px_0_#262320]'
          }`}
        >
          CASE #{caseNumber} DAILY
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex h-11 cursor-pointer items-center justify-center rounded-xl font-cartoon text-xs tracking-wider uppercase transition-all select-none ${
            activeTab === 'general'
              ? 'btn-cartoon-green shadow-[0_3px_0_#262320]'
              : 'btn-cartoon-cream shadow-[0_2.5px_0_#262320]'
          }`}
        >
          HALL OF FAME
        </button>
      </div>

      {/* Subreddit Standings Note */}
      <div className="card-notebook mb-4 p-3.5 shadow-[0_3px_0_#262320]">
        <p className="font-body text-xs font-semibold leading-relaxed text-[#262320]">
          Standings are isolated to this subreddit installation. Top 100 detectives ranked by score, solve time, and earliest submission.
        </p>
      </div>

      {/* Current Player Rank Card */}
      <div className="card-notebook mb-5 flex items-center justify-between p-4 shadow-[0_5px_0_#262320]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#F5B229] shadow-[0_2px_0_#262320]">
            <GameIcon name="star" size="xs" />
          </div>
          <div>
            <span className="badge-cartoon-yellow text-[10px]">
              YOUR RANKING
            </span>
            <h4 className="font-cartoon mt-0.5 text-sm text-[#262320] tracking-wide">
              {profile.username}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className="font-cartoon text-sm text-[#27A468]">
            {activeTab === 'daily' ? `${profile.casesSolved > 0 ? 'ACTIVE SOLVER' : 'UNSOLVED'}` : `${profile.xp} XP`}
          </span>
          <p className="font-cartoon text-[11px] text-[#61584F]">
            {profile.rank}
          </p>
        </div>
      </div>

      {/* Top 100 List Placeholder */}
      <div className="card-notebook relative p-6 pt-7 text-center shadow-[0_5px_0_#262320]">
        <div className="scotch-tape" />

        <div className="flex justify-center mb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-[2.5px] border-[#262320] bg-[#F5B229] shadow-[0_3px_0_#262320]">
            <GameIcon name="trophy" size="xl" />
          </div>
        </div>
        <h4 className="font-cartoon text-base text-[#262320] tracking-wide">
          {activeTab === 'daily'
            ? `CASE #${caseNumber} DAILY LEADERBOARD`
            : 'SUBREDDIT ALL-TIME LEADERBOARD'}
        </h4>
        <div className="mt-2 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            Full live community standings populate as detectives solve today's mystery.
          </p>
        </div>
      </div>
    </div>
  );
};
