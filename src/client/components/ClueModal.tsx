import type { Clue } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';

interface ClueModalProps {
  clue: Clue | null;
  onClose: () => void;
}

export const ClueModal = ({ clue, onClose }: ClueModalProps) => {
  if (!clue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-[#E8DCC8] bg-[#FFF5E6] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Top pin sticker graphic */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="h-4 w-12 rounded-sm bg-[#E9B949]/70 shadow-xs" />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#087E78]/10 text-base">
              <GameIcon name="magnifier" size="sm" className="text-[#087E78]" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#087E78]">
                Evidence Clue
              </span>
              <h3 className="text-lg font-black text-[#173B3A]">{clue.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#E8DCC8]/60 text-sm font-bold text-[#455653] hover:bg-[#E8DCC8]"
          >
            <GameIcon name="cross" size="xs" className="text-[#455653]" />
          </button>
        </div>

        <div className="my-5 rounded-xl border border-[#E8DCC8] bg-white p-4 shadow-inner">
          <p className="text-sm font-medium leading-relaxed text-[#173B3A]">
            {clue.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-xl bg-[#087E78] py-2.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-[#065C58] active:scale-98"
        >
          Return to Board
        </button>
      </div>
    </div>
  );
};
