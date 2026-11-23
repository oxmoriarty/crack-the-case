import './index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GameIcon } from './components/ui/GameIcon';

export const Splash = () => {
  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center p-6 text-center select-none bg-[#FFF5E6]">
      {/* Badge / Detective Icon */}
      <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E78] shadow-md">
        <GameIcon name="magnifier" size="lg" className="text-white" />
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E9B949] text-xs font-bold text-[#173B3A] shadow-sm">
          <GameIcon name="star" size="xs" className="text-[#173B3A]" />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-black tracking-tight text-[#173B3A]">
        CRACK THE CASE
      </h1>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#087E78]">
        A New Mystery Every Day
      </p>

      {/* Today's Case Preview Box */}
      <div className="my-4 w-full max-w-xs rounded-xl border border-[#E8DCC8] bg-white/80 p-3 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-[#455653]">
          <span className="rounded bg-[#E0F2F1] px-2 py-0.5 text-[#087E78]">
            DAILY MYSTERY
          </span>
          <span className="text-[#F07868]">5-10 min</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-[#173B3A]">
          Review the clues, study suspect statements, and deduce the truth!
        </p>
      </div>

      {/* Launch CTA */}
      <button
        type="button"
        className="flex h-12 w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087E78] font-bold text-white shadow-md transition-all hover:bg-[#065C58] active:scale-98"
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
      >
        <GameIcon name="magnifier" size="sm" className="text-white" />
        <span>Begin Investigation</span>
      </button>

      <p className="mt-3 text-[11px] text-[#455653]">
        One shared case per day across Reddit
      </p>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <Splash />
    </StrictMode>
  );
}
