import { useState } from 'react';
import type { Clue } from '../../shared/cases/cases';
import { ClueModal } from './ClueModal';

interface DetectiveBoardProps {
  clues: readonly Clue[];
}

export const DetectiveBoard = ({ clues }: DetectiveBoardProps) => {
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  return (
    <div className="flex w-full flex-col p-4">
      {/* Board Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[#E8DCC8] pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">📌</span>
          <div>
            <h2 className="text-base font-black tracking-tight text-[#173B3A]">
              Detective Board
            </h2>
            <p className="text-xs text-[#455653]">
              Tap any sticker to inspect full details
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#E0F2F1] px-2.5 py-0.5 text-xs font-bold text-[#087E78]">
          {clues.length} Clues
        </span>
      </div>

      {/* Cork/Board Surface */}
      <div className="relative grid grid-cols-1 gap-4 rounded-2xl border-2 border-[#E8DCC8] bg-[#FFF5E6] p-4 shadow-sm sm:grid-cols-2">
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
              className="group relative flex cursor-pointer flex-col rounded-xl border border-[#E8DCC8] bg-white p-4 shadow-xs transition-all hover:scale-102 hover:shadow-md hover:border-[#087E78] active:scale-98"
            >
              {/* Tape sticker at top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-10 rounded-xs bg-[#E9B949]/50 shadow-2xs" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087E78]">
                  Clue #{idx + 1}
                </span>
                <span className="text-xs text-[#F07868]">Tap to read ↗</span>
              </div>

              <h4 className="mt-1 text-sm font-black text-[#173B3A] group-hover:text-[#087E78]">
                {clue.title}
              </h4>

              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#455653]">
                {clue.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Enlarged Clue Modal */}
      <ClueModal clue={selectedClue} onClose={() => setSelectedClue(null)} />
    </div>
  );
};
