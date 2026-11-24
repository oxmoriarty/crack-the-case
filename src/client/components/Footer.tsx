import type { Screen } from '../../shared/types';
import { GameIcon, type GameIconName } from './ui/GameIcon';

interface FooterProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Footer = ({ currentScreen, onNavigate }: FooterProps) => {
  const tabs: { screen: Screen; label: string; icon: GameIconName }[] = [
    { screen: 'home', label: 'Home', icon: 'home' },
    { screen: 'case_intro', label: 'Case', icon: 'case-file' },
    { screen: 'suspects', label: 'Suspects', icon: 'users' },
    { screen: 'clues', label: 'Clues', icon: 'magnifier' },
    { screen: 'verdict', label: 'Verdict', icon: 'scale' },
  ];

  return (
    <footer className="sticky bottom-0 z-20 flex h-20 w-full items-center justify-around border-t-[2.5px] border-[#262320] bg-[#FFFDF8] px-2 py-1 shadow-[0_-3px_0_rgba(38,35,32,0.1)]">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.screen;
        return (
          <button
            key={tab.screen}
            type="button"
            onClick={() => onNavigate(tab.screen)}
            className={`group flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl py-1.5 transition-all select-none ${
              isActive
                ? 'bg-[#27A468] text-white border-[2px] border-[#262320] border-b-[4px] border-b-[#166A3F] shadow-[0_2.5px_0_#262320] scale-105 -translate-y-1'
                : 'text-[#61584F] hover:text-[#262320] hover:bg-[#F6EFE0]/60 active:scale-95'
            }`}
          >
            <span
              className={`transition-transform duration-100 ${
                isActive ? 'scale-110 drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]' : 'group-hover:scale-105'
              }`}
            >
              <GameIcon name={tab.icon} size="sm" />
            </span>
            <span
              className={`mt-0.5 font-cartoon text-[11px] tracking-wide uppercase ${
                isActive ? 'text-white drop-shadow-[0_1px_1px_#166A3F]' : 'text-[#61584F]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
};
