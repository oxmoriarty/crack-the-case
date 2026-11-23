interface HintModalProps {
  hintText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HintModal = ({ hintText, isOpen, onClose }: HintModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[#E9B949] bg-[#FFF5E6] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9B949]/30 text-xl">
            💡
          </div>
          <div>
            <h3 className="text-base font-bold text-[#173B3A]">Detective's Hint</h3>
            <p className="text-xs text-[#F07868] font-semibold">
              Using a hint forfeits the 10-point unassisted bonus
            </p>
          </div>
        </div>

        <div className="my-5 rounded-xl border border-[#E8DCC8] bg-white p-4 shadow-xs">
          <p className="text-sm font-medium leading-relaxed text-[#173B3A]">
            "{hintText}"
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-xl bg-[#087E78] py-2.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-[#065C58] active:scale-98"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
