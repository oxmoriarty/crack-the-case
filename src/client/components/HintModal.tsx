import { GameIcon } from './ui/GameIcon';

interface HintModalProps {
  hintText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HintModal = ({ hintText, isOpen, onClose }: HintModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="card-notebook relative w-full max-w-sm p-6 pt-7 shadow-[0_8px_0_#262320] animate-in fade-in zoom-in-95 duration-150">
        <div className="scotch-tape" />

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-[2.5px] border-[#262320] bg-[#F5B229] shadow-[0_2.5px_0_#262320]">
            <GameIcon name="lightbulb" size="md" />
          </div>
          <div>
            <span className="badge-cartoon-yellow text-[10px]">
              DETECTIVE'S HINT
            </span>
            <p className="font-cartoon mt-0.5 text-xs text-[#E44949] tracking-wide">
              USING A HINT FORFEITS THE 10-PT UNASSISTED BONUS
            </p>
          </div>
        </div>

        <div className="my-4 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-4 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <p className="font-body text-sm font-semibold italic leading-relaxed text-[#262320]">
            "{hintText}"
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-cartoon-green flex h-12 w-full cursor-pointer items-center justify-center text-sm shadow-[0_4px_0_#262320]"
        >
          <span>GOT IT, CONTINUE</span>
        </button>
      </div>
    </div>
  );
};
