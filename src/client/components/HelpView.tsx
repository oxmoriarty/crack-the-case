interface HelpViewProps {
  onBack: () => void;
}

export const HelpView = ({ onBack }: HelpViewProps) => {
  return (
    <div className="flex w-full flex-col p-4 pb-12">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[#E8DCC8] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1 text-xs font-bold text-[#087E78] hover:underline"
        >
          ← Back
        </button>
        <h2 className="text-base font-black text-[#173B3A]">Case Handbook</h2>
        <div className="w-10" />
      </div>

      <div className="flex flex-col gap-5 text-xs text-[#173B3A]">
        {/* Section 1: How to Play */}
        <section className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">🔎</span>
            <h3 className="text-sm font-black text-[#087E78]">1. How to Play</h3>
          </div>
          <p className="leading-relaxed text-[#455653]">
            Every day, players investigate one shared mystery. Review the case introduction, read all suspect statements, and examine the clues on the detective board. When ready, submit your verdict by selecting exactly <strong>one culprit</strong> and <strong>one decisive clue</strong>.
          </p>
        </section>

        {/* Section 2: Understanding Clues */}
        <section className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">📌</span>
            <h3 className="text-sm font-black text-[#087E78]">2. Understanding Clues</h3>
          </div>
          <p className="leading-relaxed text-[#455653]">
            Each case contains up to five clues. While several clues help establish timeline or eliminate possibilities, exactly <strong>one decisive clue</strong> provides the incontrovertible proof that exposes the culprit. Tap any sticker to inspect it.
          </p>
        </section>

        {/* Section 3: Hints */}
        <section className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">💡</span>
            <h3 className="text-sm font-black text-[#087E78]">3. Detective Hints</h3>
          </div>
          <p className="leading-relaxed text-[#455653]">
            One authored hint is available for every case. Opening the hint guides your reasoning without spoiling the solution. Using a hint removes only the 10-point unassisted score bonus and 10 XP; it does not invalidate your solve or streak.
          </p>
        </section>

        {/* Section 4: Scoring and Streaks */}
        <section className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">⚖️</span>
            <h3 className="text-sm font-black text-[#087E78]">4. Scoring & Streaks</h3>
          </div>
          <p className="leading-relaxed text-[#455653]">
            Daily scores reach up to 100 points: 40 for the correct culprit, 40 for the decisive clue, up to 10 for time efficiency, and 10 for unassisted solves. Identifying the correct culprit completes the case. Wrong attempts can be retried without penalty until solved.
          </p>
        </section>

        {/* Section 5: Daily Cases */}
        <section className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">🗓️</span>
            <h3 className="text-sm font-black text-[#087E78]">5. Daily Reset</h3>
          </div>
          <p className="leading-relaxed text-[#455653]">
            A new case is published daily at 00:00 UTC. Older cases remain accessible through their Reddit posts, and late solves contribute to career stats and XP, but streaks require solving within the release window.
          </p>
        </section>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#087E78] text-sm font-bold text-white shadow-md hover:bg-[#065C58]"
        >
          Return to Investigation
        </button>
      </div>
    </div>
  );
};
