import { GameIcon } from './ui/GameIcon';

interface HelpViewProps {
  onBack: () => void;
}

export const HelpView = ({ onBack }: HelpViewProps) => {
  return (
    <div className="flex w-full flex-col p-4 pb-12">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-[2.5px] border-[#262320] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-cartoon-cream flex h-9 cursor-pointer items-center gap-1.5 px-3 font-cartoon text-xs shadow-[0_2px_0_#262320]"
        >
          <span>← BACK</span>
        </button>
        <h2 className="text-cartoon-shadow text-xl text-white tracking-wide">
          CASE HANDBOOK
        </h2>
        <div className="w-16" />
      </div>

      <div className="flex flex-col gap-4 text-xs text-[#262320]">
        {/* Section 1: How to Play */}
        <section className="card-notebook p-4 shadow-[0_4px_0_#262320]">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-cartoon-green text-xs">
              <GameIcon name="magnifier" size="xs" className="mr-1" />
              1. HOW TO PLAY
            </span>
          </div>
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            Every day, players investigate one shared mystery. Review the case introduction, read all suspect statements, and examine the clues on the detective board. When ready, submit your verdict by selecting exactly <strong>one culprit</strong> and <strong>one decisive clue</strong>.
          </p>
        </section>

        {/* Section 2: Understanding Clues */}
        <section className="card-notebook p-4 shadow-[0_4px_0_#262320]">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-cartoon-yellow text-xs">
              <GameIcon name="pin" size="xs" className="mr-1" />
              2. UNDERSTANDING CLUES
            </span>
          </div>
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            Each case contains up to five clues. While several clues help establish timeline or eliminate possibilities, exactly <strong>one decisive clue</strong> provides the incontrovertible proof that exposes the culprit. Tap any sticker to inspect it.
          </p>
        </section>

        {/* Section 3: Hints */}
        <section className="card-notebook p-4 shadow-[0_4px_0_#262320]">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-cartoon-yellow text-xs">
              <GameIcon name="lightbulb" size="xs" className="mr-1" />
              3. DETECTIVE HINTS
            </span>
          </div>
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            One authored hint is available for every case. Opening the hint guides your reasoning without spoiling the solution. Using a hint removes only the 10-point unassisted score bonus and 10 XP; it does not invalidate your solve or streak.
          </p>
        </section>

        {/* Section 4: Scoring and Streaks */}
        <section className="card-notebook p-4 shadow-[0_4px_0_#262320]">
          <div className="mb-2 flex items-center gap-2">
            <span className="ribbon-red-tape text-xs">
              <GameIcon name="scale" size="xs" className="mr-1" />
              4. SCORING & STREAKS
            </span>
          </div>
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            Daily scores reach up to 100 points: 40 for the correct culprit, 40 for the decisive clue, up to 10 for time efficiency, and 10 for unassisted solves. Identifying the correct culprit completes the case. Wrong attempts can be retried without penalty until solved.
          </p>
        </section>

        {/* Section 5: Daily Cases */}
        <section className="card-notebook p-4 shadow-[0_4px_0_#262320]">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-cartoon-green text-xs">
              <GameIcon name="calendar" size="xs" className="mr-1" />
              5. DAILY RESET
            </span>
          </div>
          <p className="font-body text-xs font-semibold leading-relaxed text-[#61584F]">
            A new case is published daily at 00:00 UTC. Older cases remain accessible through their Reddit posts, and late solves contribute to career stats and XP, but streaks require solving within the release window.
          </p>
        </section>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={onBack}
          className="btn-cartoon-green flex h-13 w-full cursor-pointer items-center justify-center text-sm shadow-[0_5px_0_#262320]"
        >
          <span>RETURN TO INVESTIGATION</span>
        </button>
      </div>
    </div>
  );
};
