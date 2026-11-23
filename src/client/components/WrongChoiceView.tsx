interface WrongChoiceViewProps {
  onRetry: () => void;
}

export const WrongChoiceView = ({ onRetry }: WrongChoiceViewProps) => {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-150">
      {/* Icon / Detective Reaction */}
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FCE8E6] border-2 border-[#F07868]/40 shadow-sm">
        <span className="text-4xl" role="img" aria-label="Thinking detective">
          🧐
        </span>
        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#F07868] text-white text-xs font-bold shadow-xs">
          ✕
        </div>
      </div>

      {/* Headings */}
      <h2 className="text-2xl font-black tracking-tight text-[#173B3A]">
        WRONG CHOICE
      </h2>
      <p className="mt-1 text-base font-bold text-[#F07868]">
        Not quite! Try again.
      </p>

      {/* Advisory card */}
      <div className="my-6 w-full max-w-sm rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#087E78]">
            Detective's Advice
          </h4>
        </div>
        <p className="text-xs leading-relaxed text-[#455653]">
          The facts don't match that accusation. Re-examine the timeline, compare the suspect statements, and inspect each clue on the board.
        </p>
      </div>

      {/* Retry CTA */}
      <button
        type="button"
        onClick={onRetry}
        className="flex h-12 w-full max-w-sm cursor-pointer items-center justify-center rounded-xl bg-[#087E78] text-base font-bold text-white shadow-md transition-all hover:bg-[#065C58] active:scale-98"
      >
        <span className="mr-2">🔄</span> Retry Deduction
      </button>

      <p className="mt-3 text-[11px] text-[#455653]">
        Your elapsed time and viewed clues are preserved
      </p>
    </div>
  );
};
