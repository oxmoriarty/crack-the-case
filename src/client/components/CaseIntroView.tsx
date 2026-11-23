import type { CaseData } from '../../shared/cases/cases';
import { GameIcon } from './ui/GameIcon';

interface CaseIntroViewProps {
  caseData: CaseData;
  onBeginInvestigation: () => void;
  isStarting: boolean;
}

export const CaseIntroView = ({
  caseData,
  onBeginInvestigation,
  isStarting,
}: CaseIntroViewProps) => {
  return (
    <div className="flex w-full flex-col p-4 pb-8">
      {/* Header */}
      <div className="mb-4 border-b border-[#E8DCC8] pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#455653]">
            CASE #{caseData.caseNumber}
          </span>
          <span className="rounded-full bg-[#E0F2F1] border border-[#087E78]/30 px-2.5 py-0.5 text-xs font-bold text-[#087E78]">
            {caseData.difficulty}
          </span>
        </div>
        <h1 className="mt-1 text-xl font-black text-[#173B3A]">
          {caseData.title}
        </h1>
      </div>

      {/* Incident Box */}
      <div className="mb-4 rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-center gap-2">
          <GameIcon name="siren" size="sm" className="text-[#F07868]" />
          <h3 className="text-xs font-black uppercase tracking-wider text-[#087E78]">
            The Incident
          </h3>
        </div>
        <p className="text-sm font-medium leading-relaxed text-[#173B3A]">
          {caseData.incident}
        </p>
      </div>

      {/* Detective Briefing Commentary */}
      <div className="mb-6 rounded-2xl border border-[#E8DCC8]/60 bg-[#FFFAF2] p-4 text-xs">
        <div className="mb-1 flex items-center gap-2 text-[#087E78] font-bold">
          <GameIcon name="fedora" size="sm" className="text-[#087E78]" />
          <span>Detective's Briefing</span>
        </div>
        <p className="leading-relaxed text-[#455653]">
          Three or more suspects were present during the incident. Examine the evidence board for clues that contradict their statements. Exactly one clue decisively exposes the culprit.
        </p>
      </div>

      {/* Begin Investigation CTA */}
      <button
        type="button"
        disabled={isStarting}
        onClick={onBeginInvestigation}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#087E78] font-bold text-white shadow-md transition-all hover:bg-[#065C58] active:scale-98 disabled:opacity-60"
      >
        {isStarting ? (
          <span className="flex items-center gap-2">
            <GameIcon name="refresh" size="sm" className="animate-spin text-white" />
            <span>Opening Evidence Dossier...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GameIcon name="magnifier" size="sm" className="text-white" />
            <span>Begin Investigation</span>
          </span>
        )}
      </button>

      <p className="mt-2 text-center text-[11px] text-[#455653]">
        The timer starts when you begin investigation
      </p>
    </div>
  );
};
