import type { Suspect } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';

interface SuspectCardsProps {
  suspects: readonly Suspect[];
}

export const SuspectCards = ({ suspects }: SuspectCardsProps) => {
  return (
    <div className="flex w-full flex-col p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[#E8DCC8] pb-2">
        <div className="flex items-center gap-2">
          <GameIcon name="users" size="md" className="text-[#087E78]" />
          <div>
            <h2 className="text-base font-black tracking-tight text-[#173B3A]">
              Suspect Statements
            </h2>
            <p className="text-xs text-[#455653]">
              Read each suspect's testimony carefully
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#E0F2F1] px-2.5 py-0.5 text-xs font-bold text-[#087E78]">
          {suspects.length} Suspects
        </span>
      </div>

      {/* Vertical list of cards */}
      <div className="flex flex-col gap-3">
        {suspects.map((suspect) => (
          <div
            key={suspect.id}
            className="flex flex-col rounded-2xl border border-[#E8DCC8] bg-white p-4 shadow-xs"
          >
            {/* Suspect Info Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E0F2F1] border border-[#087E78]/20">
                <GameIcon name="user" size="md" className="text-[#087E78]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-black text-[#173B3A]">
                  {suspect.name}
                </h3>
                <span className="inline-block rounded-md bg-[#FFF5E6] px-2 py-0.5 text-xs font-bold text-[#087E78]">
                  {suspect.role}
                </span>
              </div>
            </div>

            {/* Suspect Statement */}
            <div className="mt-3 rounded-xl border border-[#E8DCC8]/60 bg-[#FFFAF2] p-3">
              <p className="text-xs italic leading-relaxed text-[#173B3A]">
                "{suspect.statement}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
