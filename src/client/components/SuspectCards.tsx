import type { Suspect } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';
import { SuspectAvatar } from './ui/SuspectAvatar';

interface SuspectCardsProps {
  suspects: readonly Suspect[];
}

export const SuspectCards = ({ suspects }: SuspectCardsProps) => {
  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#27A468] shadow-[0_2.5px_0_#262320]">
            <GameIcon name="users" size="md" />
          </div>
          <div>
            <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
              SUSPECT STATEMENTS
            </h2>
            <p className="font-cartoon text-xs text-[#61584F] tracking-wider">
              READ EACH SUSPECT'S TESTIMONY CAREFULLY
            </p>
          </div>
        </div>
        <span className="badge-cartoon-yellow text-xs">
          {suspects.length} SUSPECTS
        </span>
      </div>

      {/* Vertical list of cards */}
      <div className="flex flex-col gap-3.5">
        {suspects.map((suspect, idx) => (
          <div
            key={suspect.id}
            className="card-notebook relative flex flex-col p-4 pt-5 shadow-[0_5px_0_#262320]"
          >
            {/* Corner Tape strip */}
            <div className={idx % 2 === 0 ? 'tape-corner-left' : 'tape-corner-right'} />

            {/* Suspect Info Header */}
            <div className="flex items-center gap-3">
              <SuspectAvatar suspect={suspect} size="lg" />
              <div className="min-w-0 flex-1">
                <h3 className="font-cartoon truncate text-base text-[#262320] tracking-wide">
                  {suspect.name}
                </h3>
                <span className="badge-cartoon-yellow mt-0.5 text-[11px]">
                  {suspect.role}
                </span>
              </div>
            </div>

            {/* Suspect Statement (Parchment Quote Memo) */}
            <div className="mt-3.5 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
              <p className="font-body text-xs font-semibold italic leading-relaxed text-[#262320]">
                "{suspect.statement}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
