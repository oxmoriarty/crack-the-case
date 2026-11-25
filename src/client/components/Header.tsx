import type { CaseDifficulty } from '../../shared/types';
import { GameIcon } from './ui/GameIcon';

interface HeaderProps {
  title: string;
  difficulty: CaseDifficulty;
  elapsedSeconds: number;
  hasUsedHint: boolean;
  onOpenHint: () => void;
  onBackToHome?: () => void;
  showTitle?: boolean;
}

export const Header = ({
  title,
  difficulty,
  elapsedSeconds,
  hasUsedHint,
  onOpenHint,
  onBackToHome,
  showTitle = true,
}: HeaderProps) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyBadge = (diff: CaseDifficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-[#27A468] text-white border-b-[#176B41]';
      case 'Standard':
        return 'bg-[#F5B229] text-[#262320] border-b-[#B0700D]';
      case 'Challenging':
        return 'bg-[#E44949] text-white border-b-[#961D1D]';
      default:
        return 'bg-[#D6C7AE] text-[#262320] border-b-[#A8987E]';
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b-[2.5px] border-[#262320] bg-[#FFFDF8] px-2 sm:px-3 shadow-[0_3px_0_rgba(38,35,32,0.1)]">
      {/* Left: Home button & Difficulty badge (same horizontal line, same height) */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="btn-cartoon-cream flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1 px-2 font-cartoon text-xs shadow-[0_2px_0_#262320] active:translate-y-0.5 active:shadow-none"
            title="Return to Main Case Menu"
          >
            <span>← HOME</span>
          </button>
        )}
        <span
          className={`inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-xl border-[2px] border-[#262320] border-b-[3px] px-2 font-cartoon text-xs tracking-wider uppercase shadow-[0_1.5px_0_#262320] ${getDifficultyBadge(
            difficulty
          )}`}
        >
          <GameIcon name="star" size="xs" />
          <span>{difficulty}</span>
        </span>
      </div>

      {/* Center: Centered Case Title (shown on all game pages except Case page) */}
      <div className="flex min-w-0 flex-1 items-center justify-center px-1 sm:px-2">
        {showTitle && (
          <h2 className="truncate text-center font-cartoon text-[11px] sm:text-xs tracking-wide text-[#262320]">
            {title}
          </h2>
        )}
      </div>

      {/* Right: Time counter & Hint button (same horizontal line, same height) */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        {/* Time counter pill beside Hint button */}
        <div className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-xl border-[2px] border-[#262320] bg-[#F6EFE0] px-2 shadow-[0_2px_0_#262320]">
          <GameIcon name="clock" size="xs" />
          <span className="font-cartoon text-xs text-[#262320] tracking-wider leading-none">
            {formatTime(elapsedSeconds)}
          </span>
        </div>

        {/* Hint button */}
        <button
          type="button"
          onClick={onOpenHint}
          className={`flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xl border-[2px] border-[#262320] px-2.5 font-cartoon text-xs tracking-wider uppercase transition-all select-none ${
            hasUsedHint
              ? 'border-b-[2px] bg-[#E5DAC6] text-[#7A7165] opacity-75 shadow-none'
              : 'border-b-[3px] border-b-[#B0700D] bg-[#F5B229] text-[#262320] shadow-[0_2px_0_#262320] hover:bg-[#FFC03D] active:translate-y-0.5 active:border-b-[2px] active:shadow-none'
          }`}
          title={hasUsedHint ? 'Hint already viewed' : 'View optional hint'}
        >
          <GameIcon name="lightbulb" size="xs" />
          <span>HINT</span>
        </button>
      </div>
    </header>
  );
};
