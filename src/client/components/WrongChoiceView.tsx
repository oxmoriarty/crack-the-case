import { GameIcon } from './ui/GameIcon';

interface WrongChoiceViewProps {
  onRetry: () => void;
}

export const WrongChoiceView = ({ onRetry }: WrongChoiceViewProps) => {
  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-150">
      {/* Icon Badge */}
      <div className="relative mb-4 flex h-22 w-22 items-center justify-center rounded-3xl border-[2.5px] border-[#262320] border-b-[5px] border-b-[#961D1D] bg-[#E44949] shadow-[0_5px_0_#262320]">
        <GameIcon name="fedora" size="xl" />
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#262320] bg-[#262320] shadow-[0_2px_0_#262320]">
          <GameIcon name="cross" size="xs" />
        </div>
      </div>

      {/* Comic Cartoon Heading */}
      <h2 className="text-cartoon-red text-3xl tracking-wide">
        INCORRECT!
      </h2>
      <div className="mt-1">
        <span className="ribbon-red-tape text-xs">
          NOT QUITE! TRY AGAIN
        </span>
      </div>

      {/* Advisory card (Notebook Paper Card with Tape) */}
      <div className="card-notebook relative my-5 w-full max-w-sm p-4 pt-5 text-left shadow-[0_5px_0_#262320]">
        <div className="scotch-tape" />

        <div className="mb-2 flex items-center gap-2">
          <span className="badge-cartoon-yellow text-[10px]">
            <GameIcon name="lightbulb" size="xs" className="mr-1" />
            DETECTIVE'S ADVICE
          </span>
        </div>
        <div className="rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <p className="font-body text-xs font-semibold leading-relaxed text-[#262320]">
            The facts don't match that accusation. Re-examine the timeline, compare the suspect statements, and inspect each clue on the board.
          </p>
        </div>
      </div>

      {/* Retry CTA */}
      <button
        type="button"
        onClick={onRetry}
        className="btn-cartoon-yellow flex h-13 w-full max-w-sm cursor-pointer items-center justify-center gap-2.5 text-base shadow-[0_5px_0_#262320]"
      >
        <GameIcon name="refresh" size="sm" />
        <span>RETRY DEDUCTION</span>
      </button>

      <p className="mt-3 font-cartoon text-[11px] text-[#61584F] tracking-wide">
        ⏱ YOUR ELAPSED TIME AND VIEWED CLUES ARE PRESERVED
      </p>
    </div>
  );
};
