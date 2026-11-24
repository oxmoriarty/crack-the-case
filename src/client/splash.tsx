import './index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GameIcon } from './components/ui/GameIcon';

export const Splash = () => {
  return (
    <div className="flex min-h-[340px] w-full flex-col items-center justify-center p-4 text-center select-none bg-[#8E9B87]">
      {/* Outer Notebook Card */}
      <div className="card-notebook spiral-binder relative w-full max-w-sm p-6 pt-7 text-center">
        {/* Top Masking Tape Decorator */}
        <div className="scotch-tape" />

        {/* 3D Magnifying Glass Badge with Star */}
        <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-[2.5px] border-[#262320] border-b-[4.5px] border-b-[#166A3F] bg-[#27A468] shadow-[0_4px_0_#262320]">
          <GameIcon name="magnifier" size="lg" />
          <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-[2px] border-[#262320] bg-[#F5B229] shadow-[0_2px_0_#262320]">
            <GameIcon name="star" size="xs" />
          </div>
        </div>

        {/* Big Cartoon 3D Game Title */}
        <h1 className="text-cartoon-shadow text-3xl text-white tracking-wide">
          CRACK THE CASE
        </h1>
        <div className="mt-1">
          <span className="ribbon-red-tape text-xs">
            A NEW MYSTERY EVERY DAY
          </span>
        </div>

        {/* Today's Case Preview Note */}
        <div className="my-4 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] p-3 shadow-[inset_0_2px_4px_rgba(38,35,32,0.1)]">
          <div className="flex items-center justify-between font-cartoon text-xs text-[#262320]">
            <span className="badge-cartoon-yellow text-[10px]">
              DAILY MYSTERY
            </span>
            <span className="font-cartoon text-xs text-[#E44949]">
              ⏱ 5-10 MIN
            </span>
          </div>
          <p className="mt-2 font-body text-xs font-semibold leading-relaxed text-[#262320]">
            Review the clues, study suspect statements, and deduce the truth!
          </p>
        </div>

        {/* Launch CTA Button (Chunky 3D Beveled Green) */}
        <button
          type="button"
          className="btn-cartoon-green flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 text-base shadow-[0_5px_0_#262320]"
          onClick={(e) => {
            try {
              requestExpandedMode(e.nativeEvent, 'game');
            } catch {
              // ignore
            }
            if (
              typeof window !== 'undefined' &&
              window.self === window.top &&
              typeof navigator !== 'undefined' &&
              !navigator.userAgent.includes('jsdom')
            ) {
              window.location.href = '/game.html';
            }
          }}
        >
          <GameIcon name="magnifier" size="sm" />
          <span>BEGIN INVESTIGATION</span>
        </button>
      </div>
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
