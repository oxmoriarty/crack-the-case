import type { CaseDifficulty } from '../../shared/types';

interface HeaderProps {
  title: string;
  difficulty: CaseDifficulty;
  elapsedSeconds: number;
  hasUsedHint: boolean;
  onOpenHint: () => void;
}

export const Header = ({
  title,
  difficulty,
  elapsedSeconds,
  hasUsedHint,
  onOpenHint,
}: HeaderProps) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: CaseDifficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-[#E0F2F1] text-[#087E78] border-[#087E78]/30';
      case 'Standard':
        return 'bg-[#FFF3CD] text-[#856404] border-[#E9B949]/50';
      case 'Challenging':
        return 'bg-[#FCE8E6] text-[#D9534F] border-[#F07868]/40';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-[#E8DCC8] bg-[#FFF5E6]/95 px-4 backdrop-blur-xs">
      {/* Left: Difficulty Badge */}
      <div className="flex items-center">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wide ${getDifficultyColor(
            difficulty
          )}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Center: Case Title & Timer */}
      <div className="flex flex-col items-center">
        <h2 className="max-w-[180px] truncate text-center text-xs font-black tracking-tight text-[#173B3A] sm:max-w-xs sm:text-sm">
          {title}
        </h2>
        <div className="flex items-center gap-1 font-mono text-xs font-semibold text-[#087E78]">
          <span className="text-[11px]">⏱</span>
          <span>{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Right: Hint Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onOpenHint}
          className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all shadow-2xs ${
            hasUsedHint
              ? 'bg-[#E8DCC8] text-[#455653]'
              : 'bg-[#E9B949] text-[#173B3A] hover:bg-[#D4A338] active:scale-95'
          }`}
          title={hasUsedHint ? 'Hint already viewed' : 'View optional hint (-10 unassisted pts)'}
        >
          <span>💡</span>
          <span>{hasUsedHint ? 'Hint' : 'Hint'}</span>
        </button>
      </div>
    </header>
  );
};
