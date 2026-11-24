import type { CaseDifficulty } from '../../shared/types';
import { GameIcon } from './ui/GameIcon';

interface HeaderProps {
  title: string;
  difficulty: CaseDifficulty;
  elapsedSeconds: number;
  hasUsedHint: boolean;
  onOpenHint: () => void;
  onBackToHome?: () => void;
}

export const Header = ({
  title,
  difficulty,
  elapsedSeconds,
  hasUsedHint,
  onOpenHint,
  onBackToHome,
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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b-[2.5px] border-[#262320] bg-[#FFFDF8] px-3 shadow-[0_3px_0_rgba(38,35,32,0.1)]">
      {/* Left: Back to Home + Difficulty Badge */}
      <div className="flex items-center gap-1.5">
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="btn-cartoon-cream flex h-8 cursor-pointer items-center gap-1 px-2 font-cartoon text-[11px] shadow-[0_2px_0_#262320] active:translate-y-0.5 active:shadow-none"
            title="Return to Main Case Menu"
          >
            <span>← HOME</span>
          </button>
        )}
        <span
          className={`hidden xs:inline-flex sm:inline-flex items-center gap-1 rounded-full border-[2px] border-[#262320] border-b-[3.5px] px-2 py-0.5 font-cartoon text-[11px] tracking-wider uppercase shadow-[0_1.5px_0_#262320] ${getDifficultyBadge(
            difficulty
          )}`}
        >
          <GameIcon name="star" size="xs" />
          <span>{difficulty}</span>
        </span>
      </div>

      {/* Center: Case Title & Timer Pill */}
      <div className="flex flex-col items-center">
        <h2 className="max-w-[170px] truncate text-center font-cartoon text-xs tracking-wide text-[#262320] sm:max-w-xs sm:text-sm">
          {title}
        </h2>
        {/* Cartoon Timer Pill */}
        <div className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border-[2px] border-[#262320] bg-[#F6EFE0] px-2.5 py-0.5 shadow-[inset_0_2px_4px_rgba(38,35,32,0.15)]">
          <GameIcon name="clock" size="xs" />
          <span className="font-cartoon text-xs text-[#262320] tracking-wider">
            {formatTime(elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* Right: Hint Button (Chunky 3D Bevel) */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onOpenHint}
          className={`flex cursor-pointer items-center gap-1.5 rounded-xl border-[2px] border-[#262320] px-3 py-1 font-cartoon text-xs tracking-wider uppercase transition-all select-none ${
            hasUsedHint
              ? 'border-b-[2px] bg-[#E5DAC6] text-[#7A7165] opacity-75 shadow-none'
              : 'border-b-[4px] border-b-[#B0700D] bg-[#F5B229] text-[#262320] shadow-[0_3px_0_#262320] hover:bg-[#FFC03D] active:translate-y-1 active:border-b-[2px] active:shadow-none'
          }`}
          title={hasUsedHint ? 'Hint already viewed' : 'View optional hint (-10 unassisted pts)'}
        >
          <GameIcon name="lightbulb" size="xs" />
          <span>HINT</span>
        </button>
      </div>
    </header>
  );
};
