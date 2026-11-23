import type { Screen } from '../../shared/types';

interface FooterProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Footer = ({ currentScreen, onNavigate }: FooterProps) => {
  const tabs: { screen: Screen; label: string; icon: string }[] = [
    { screen: 'home', label: 'Home', icon: '🏠' },
    { screen: 'case_intro', label: 'Case', icon: '📋' },
    { screen: 'suspects', label: 'Suspects', icon: '👥' },
    { screen: 'clues', label: 'Clues', icon: '🔍' },
    { screen: 'verdict', label: 'Verdict', icon: '⚖️' },
  ];

  return (
    <footer className="sticky bottom-0 z-20 flex h-16 w-full items-center justify-around border-t border-[#E8DCC8] bg-[#FFF5E6]/95 px-2 backdrop-blur-xs">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.screen;
        return (
          <button
            key={tab.screen}
            type="button"
            onClick={() => onNavigate(tab.screen)}
            className={`flex flex-1 cursor-pointer flex-col items-center justify-center py-1 transition-all ${
              isActive
                ? 'font-bold text-[#087E78]'
                : 'text-[#455653] hover:text-[#173B3A]'
            }`}
          >
            <span className={`text-base transition-transform ${isActive ? 'scale-115' : ''}`}>
              {tab.icon}
            </span>
            <span className="text-[11px] tracking-tight">{tab.label}</span>
            {isActive && (
              <span className="mt-0.5 h-1 w-6 rounded-full bg-[#087E78]" />
            )}
          </button>
        );
      })}
    </footer>
  );
};
