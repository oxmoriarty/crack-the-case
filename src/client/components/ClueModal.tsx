import type { Clue } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';

interface ClueModalProps {
  clue: Clue | null;
  onClose: () => void;
}

export const ClueModal = ({ clue, onClose }: ClueModalProps) => {
  if (!clue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="card-notebook relative w-full max-w-md p-6 pt-7 shadow-[0_8px_0_#262320] animate-in fade-in zoom-in-95 duration-150">
        {/* Scotch Tape Top */}
        <div className="scotch-tape" />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#27A468] shadow-[0_2.5px_0_#262320]">
              <GameIcon name="magnifier" size="sm" />
            </div>
            <div>
              <span className="badge-cartoon-yellow text-[10px]">
                EVIDENCE CLUE
              </span>
              <h3 className="font-cartoon mt-0.5 text-lg text-[#262320] tracking-wide">
                {clue.title}
              </h3>
            </div>
          </div>
          {/* Close button (bone button) */}
          <button
            type="button"
            onClick={onClose}
            className="btn-cartoon-cream flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl shadow-[0_2px_0_#262320] active:translate-y-0.5 active:shadow-none"
          >
            <GameIcon name="cross" size="xs" />
          </button>
        </div>

        <div className="my-4 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-4 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <p className="font-body text-sm font-semibold leading-relaxed text-[#262320]">
            {clue.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-cartoon-green flex h-12 w-full cursor-pointer items-center justify-center text-sm shadow-[0_4px_0_#262320]"
        >
          <span>RETURN TO BOARD</span>
        </button>
      </div>
    </div>
  );
};
