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
      {/* Header Banner */}
      <div className="mb-4 border-b-[2.5px] border-[#262320] pb-3">
        <span className="font-cartoon text-xs text-[#61584F] tracking-wider">
          CASE #{caseData.caseNumber}
        </span>
        <h1 className="text-cartoon-shadow mt-1 text-2xl text-white tracking-wide">
          {caseData.title}
        </h1>
      </div>

      {/* Incident Box (Paper Notebook Card with Scotch Tape) */}
      <div className="card-notebook paper-stack relative mb-4 p-5 pt-6 text-left">
        <div className="scotch-tape" />

        <div className="mb-3 flex items-center gap-2">
          <span className="ribbon-red-tape text-xs">
            <GameIcon name="siren" size="xs" className="mr-1" />
            THE INCIDENT
          </span>
        </div>
        <div className="rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3.5 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <p className="font-body text-sm font-semibold leading-relaxed text-[#262320]">
            {caseData.incident}
          </p>
        </div>
      </div>

      {/* Detective Briefing Commentary (Paper Dossier Note) */}
      <div className="card-notebook relative mb-6 p-4 text-left">
        <div className="mb-2 flex items-center gap-2">
          <span className="badge-cartoon-yellow text-xs">
            <GameIcon name="fedora" size="xs" className="mr-1" />
            DETECTIVE'S BRIEFING
          </span>
        </div>
        <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
          Three or more suspects were present during the incident. Examine the evidence board for clues that contradict their statements. Exactly one clue decisively exposes the culprit.
        </p>
      </div>

      {/* Begin Investigation CTA */}
      <button
        type="button"
        disabled={isStarting}
        onClick={onBeginInvestigation}
        className="btn-cartoon-green flex h-13 w-full cursor-pointer items-center justify-center text-base shadow-[0_5px_0_#262320] disabled:opacity-60"
      >
        {isStarting ? (
          <span className="flex items-center gap-2">
            <GameIcon name="refresh" size="sm" className="animate-spin" />
            <span>OPENING EVIDENCE DOSSIER...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GameIcon name="magnifier" size="sm" />
            <span>BEGIN INVESTIGATION</span>
          </span>
        )}
      </button>

      <p className="mt-3 text-center font-cartoon text-[11px] text-[#61584F] tracking-wide">
        ⏱ THE TIMER STARTS WHEN YOU BEGIN INVESTIGATION
      </p>
    </div>
  );
};
