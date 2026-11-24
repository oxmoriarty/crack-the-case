import { useState } from 'react';
import type { Clue } from '../../shared/cases/cases';
import { ClueModal } from './ClueModal';
import { GameIcon } from './ui/GameIcon';

interface DetectiveBoardProps {
  clues: readonly Clue[];
}

export const DetectiveBoard = ({ clues }: DetectiveBoardProps) => {
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Board Header */}
      <div className="mb-4 flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#E44949] shadow-[0_2.5px_0_#262320]">
            <GameIcon name="pin" size="md" />
          </div>
          <div>
            <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
              DETECTIVE BOARD
            </h2>
            <p className="font-cartoon text-xs text-[#61584F] tracking-wider">
              TAP ANY STICKER TO INSPECT FULL DETAILS
            </p>
          </div>
        </div>
        <span className="badge-cartoon-yellow text-xs">
          {clues.length} CLUES
        </span>
      </div>

      {/* Board Surface (Tactile Grid of Note Cards) */}
      <div className="relative grid grid-cols-1 gap-4.5 rounded-2xl border-[2.5px] border-[#262320] bg-[#828F7C] p-4 shadow-[0_6px_0_#262320] sm:grid-cols-2">
        {clues.map((clue, idx) => {
          const rot = clue.rotationDeg ?? (idx % 2 === 0 ? -1.5 : 1.5);
          return (
            <div
              key={clue.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedClue(clue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedClue(clue);
                }
              }}
              style={{ transform: `rotate(${rot}deg)` }}
              className="group relative flex cursor-pointer flex-col rounded-2xl border-[2.5px] border-[#262320] bg-[#FFFDF8] p-4 pt-5 shadow-[0_5px_0_#262320] transition-all hover:scale-102 hover:shadow-[0_7px_0_#262320] active:scale-98 active:translate-y-1"
            >
              {/* Scotch Tape sticker at top */}
              <div className="scotch-tape" />

              <div className="flex items-center justify-between">
                <span className="badge-cartoon-green text-[10px]">
                  CLUE #{idx + 1}
                </span>
                <span className="font-cartoon text-xs text-[#E44949] group-hover:underline">
                  INSPECT ↗
                </span>
              </div>

              <h4 className="mt-2 font-cartoon text-sm text-[#262320] tracking-wide group-hover:text-[#27A468]">
                {clue.title}
              </h4>

              <div className="mt-2 rounded-lg border-[1.5px] border-[#262320]/30 bg-[#F6EFE0] p-2.5 shadow-[inset_0_1px_3px_rgba(38,35,32,0.08)]">
                <p className="line-clamp-3 font-body text-xs font-semibold leading-relaxed text-[#262320]">
                  {clue.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enlarged Clue Modal */}
      <ClueModal clue={selectedClue} onClose={() => setSelectedClue(null)} />
    </div>
  );
};
