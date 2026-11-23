import type { Suspect, Clue } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';

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
    <div className="flex w-full flex-col p-4">
      {/* Header */}
      <div className="mb-4 border-b border-[#E8DCC8] pb-2">
        <div className="flex items-center gap-2">
          <GameIcon name="scale" size="md" className="text-[#087E78]" />
          <div>
            <h2 className="text-base font-black tracking-tight text-[#173B3A]">
              Submit Your Verdict
            </h2>
            <p className="text-xs text-[#455653]">
              Select the culprit and the single decisive clue proving guilt
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Choose Culprit */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-[#087E78]">
            1. Accuse Culprit
          </label>
          <span className="text-[11px] font-semibold text-[#455653]">
            {selectedCulpritId ? 'Selected' : 'Choose 1 suspect'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {suspects.map((suspect) => {
            const isSelected = selectedCulpritId === suspect.id;
            return (
              <button
                key={suspect.id}
                type="button"
                onClick={() => onSelectCulprit(suspect.id)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-[#087E78] bg-[#E0F2F1] shadow-xs'
                    : 'border-[#E8DCC8] bg-white hover:border-[#087E78]/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? 'bg-[#087E78]/15' : 'bg-gray-100'}`}>
                    <GameIcon
                      name="user"
                      size="sm"
                      className={isSelected ? 'text-[#087E78]' : 'text-[#455653]'}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#173B3A]">
                      {suspect.name}
                    </h4>
                    <span className="text-xs text-[#455653]">{suspect.role}</span>
                  </div>
                </div>

                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-[#087E78] bg-[#087E78] text-white'
                      : 'border-[#E8DCC8] bg-white'
                  }`}
                >
                  {isSelected && <GameIcon name="check" size="xs" className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Choose Decisive Clue */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-[#087E78]">
            2. Decisive Clue
          </label>
          <span className="text-[11px] font-semibold text-[#455653]">
            {selectedClueId ? 'Selected' : 'Choose 1 clue'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {clues.map((clue) => {
            const isSelected = selectedClueId === clue.id;
            return (
              <button
                key={clue.id}
                type="button"
                onClick={() => onSelectClue(clue.id)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-[#087E78] bg-[#E0F2F1] shadow-xs'
                    : 'border-[#E8DCC8] bg-white hover:border-[#087E78]/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isSelected ? 'bg-[#087E78]/15' : 'bg-gray-100'}`}>
                    <GameIcon
                      name="magnifier"
                      size="sm"
                      className={isSelected ? 'text-[#087E78]' : 'text-[#455653]'}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-[#173B3A]">
                      {clue.title}
                    </h4>
                    <p className="truncate text-xs text-[#455653]">
                      {clue.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-[#087E78] bg-[#087E78] text-white'
                      : 'border-[#E8DCC8] bg-white'
                  }`}
                >
                  {isSelected && <GameIcon name="check" size="xs" className="text-white" />}
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
        className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-xl font-bold transition-all shadow-md active:scale-98 ${
          isComplete && !isSubmitting
            ? 'bg-[#087E78] text-white hover:bg-[#065C58]'
            : 'cursor-not-allowed bg-[#E8DCC8] text-[#455653]/60 shadow-none'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <GameIcon name="refresh" size="sm" className="animate-spin text-[#455653]" />
            <span>Submitting Deduction...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GameIcon name="scale" size="sm" className="text-white" />
            <span>Submit Official Verdict</span>
          </span>
        )}
      </button>

      {!isComplete && (
        <p className="mt-2 text-center text-[11px] text-[#455653]">
          Select both one culprit and one decisive clue to submit
        </p>
      )}
    </div>
  );
};
