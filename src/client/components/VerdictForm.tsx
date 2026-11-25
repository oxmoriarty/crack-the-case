import type { Suspect, Clue } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';
import { SuspectAvatar } from './ui/SuspectAvatar';

interface VerdictFormProps {
  suspects: readonly Suspect[];
  clues: readonly Clue[];
  selectedCulpritId: string | null;
  selectedClueId: string | null;
  onSelectCulprit: (id: string) => void;
  onSelectClue: (id: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const VerdictForm = ({
  suspects,
  clues,
  selectedCulpritId,
  selectedClueId,
  onSelectCulprit,
  onSelectClue,
  onSubmit,
  isSubmitting,
}: VerdictFormProps) => {
  const isComplete = selectedCulpritId !== null && selectedClueId !== null;

  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Header */}
      <div className="mb-4 border-b-[2.5px] border-[#262320] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[2px] border-[#262320] bg-[#F5B229] shadow-[0_2.5px_0_#262320]">
            <GameIcon name="scale" size="md" />
          </div>
          <div>
            <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
              SUBMIT YOUR VERDICT
            </h2>
          </div>
        </div>
      </div>

      {/* Section 1: Choose Culprit */}
      <div className="mb-5">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="ribbon-red-tape text-xs">
            1. ACCUSE CULPRIT
          </span>
          <span className="font-cartoon text-[11px] text-[#61584F]">
            {selectedCulpritId ? '✓ SELECTED' : 'CHOOSE 1 SUSPECT'}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {suspects.map((suspect) => {
            const isSelected = selectedCulpritId === suspect.id;
            return (
              <button
                key={suspect.id}
                type="button"
                onClick={() => onSelectCulprit(suspect.id)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border-[2.5px] border-[#262320] p-3 text-left transition-all select-none ${
                  isSelected
                    ? 'border-b-[5px] border-b-[#166A3F] bg-[#27A468] text-white shadow-[0_4px_0_#262320] scale-[1.01]'
                    : 'border-b-[4.5px] border-b-[#D6C7AE] bg-[#FFFDF8] text-[#262320] shadow-[0_3px_0_#262320] hover:bg-[#FFFFFF] active:translate-y-1 active:border-b-[2.5px] active:shadow-none'
                }`}
              >
                <div className="flex items-center gap-3">
                  <SuspectAvatar suspect={suspect} size="sm" />
                  <div>
                    <h4
                      className={`font-cartoon text-sm tracking-wide ${
                        isSelected ? 'text-white' : 'text-[#262320]'
                      }`}
                    >
                      {suspect.name}
                    </h4>
                    <span
                      className={`font-cartoon text-xs ${
                        isSelected ? 'text-white/80' : 'text-[#61584F]'
                      }`}
                    >
                      {suspect.role}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-[#262320] shadow-[0_1.5px_0_#262320] ${
                    isSelected ? 'bg-[#F5B229]' : 'bg-[#F6EFE0]'
                  }`}
                >
                  {isSelected && <GameIcon name="check" size="xs" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Choose Decisive Clue */}
      <div className="mb-6">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="badge-cartoon-yellow text-xs">
            2. DECISIVE CLUE
          </span>
          <span className="font-cartoon text-[11px] text-[#61584F]">
            {selectedClueId ? '✓ SELECTED' : 'CHOOSE 1 CLUE'}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {clues.map((clue) => {
            const isSelected = selectedClueId === clue.id;
            return (
              <button
                key={clue.id}
                type="button"
                onClick={() => onSelectClue(clue.id)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border-[2.5px] border-[#262320] p-3 text-left transition-all select-none ${
                  isSelected
                    ? 'border-b-[5px] border-b-[#166A3F] bg-[#27A468] text-white shadow-[0_4px_0_#262320] scale-[1.01]'
                    : 'border-b-[4.5px] border-b-[#D6C7AE] bg-[#FFFDF8] text-[#262320] shadow-[0_3px_0_#262320] hover:bg-[#FFFFFF] active:translate-y-1 active:border-b-[2.5px] active:shadow-none'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[2px] border-[#262320] ${
                      isSelected ? 'bg-white/20' : 'bg-[#F6EFE0]'
                    }`}
                  >
                    <GameIcon name="magnifier" size="sm" />
                  </div>
                  <div className="min-w-0">
                    <h4
                      className={`font-cartoon truncate text-sm tracking-wide ${
                        isSelected ? 'text-white' : 'text-[#262320]'
                      }`}
                    >
                      {clue.title}
                    </h4>
                    <p
                      className={`truncate font-body text-xs font-semibold ${
                        isSelected ? 'text-white/80' : 'text-[#61584F]'
                      }`}
                    >
                      {clue.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2px] border-[#262320] shadow-[0_1.5px_0_#262320] ${
                    isSelected ? 'bg-[#F5B229]' : 'bg-[#F6EFE0]'
                  }`}
                >
                  {isSelected && <GameIcon name="check" size="xs" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="button"
        disabled={!isComplete || isSubmitting}
        onClick={onSubmit}
        className={`flex h-13 w-full cursor-pointer items-center justify-center text-base font-cartoon uppercase tracking-wider transition-all select-none ${
          isComplete && !isSubmitting
            ? 'btn-cartoon-green shadow-[0_5px_0_#262320]'
            : 'cursor-not-allowed border-[2.5px] border-[#262320] border-b-[4px] border-b-[#A8987E] bg-[#E5DAC6] text-[#7A7165] opacity-75 shadow-none'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <GameIcon name="refresh" size="sm" className="animate-spin" />
            <span>SUBMITTING DEDUCTION...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GameIcon name="scale" size="sm" />
            <span>SUBMIT OFFICIAL VERDICT</span>
          </span>
        )}
      </button>

      {!isComplete && (
        <p className="mt-2.5 text-center font-cartoon text-[11px] text-[#61584F] tracking-wide">
          SELECT BOTH ONE CULPRIT AND ONE DECISIVE CLUE TO SUBMIT
        </p>
      )}
    </div>
  );
};
