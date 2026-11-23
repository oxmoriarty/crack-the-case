import React from 'react';

export type GameIconName =
  | 'magnifier'
  | 'flame'
  | 'badge'
  | 'medal'
  | 'trophy'
  | 'star'
  | 'pin'
  | 'scale'
  | 'lightbulb'
  | 'fedora'
  | 'detective'
  | 'siren'
  | 'case-file'
  | 'clipboard'
  | 'users'
  | 'user'
  | 'home'
  | 'check'
  | 'cross'
  | 'refresh'
  | 'share'
  | 'chat'
  | 'chart'
  | 'lock'
  | 'calendar'
  | 'clock'
  | 'help';

export type GameIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type GameIconProps = {
  name: GameIconName;
  size?: GameIconSize | number;
  className?: string;
  variant?: 'duotone' | 'outline' | 'solid';
  style?: React.CSSProperties;
};

const SIZE_MAP: Record<GameIconSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4.5 h-4.5',
  md: 'w-5.5 h-5.5',
  lg: 'w-7 h-7',
  xl: 'w-9 h-9',
};

export const GameIcon: React.FC<GameIconProps> = ({
  name,
  size = 'md',
  className = '',
  variant = 'duotone',
  style,
}) => {
  const sizeClass = typeof size === 'string' ? SIZE_MAP[size] || SIZE_MAP.md : '';
  const inlineSize = typeof size === 'number' ? { width: size, height: size } : {};

  const duotoneOpacity = variant === 'duotone' ? 0.22 : variant === 'solid' ? 1 : 0;
  const strokeWidth = 2.25;

  const renderIconPaths = () => {
    switch (name) {
      case 'magnifier':
        return (
          <>
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 10.5C7.5 8.84 8.84 7.5 10.5 7.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M15.5 15.5L20.5 20.5"
              stroke="currentColor"
              strokeWidth={strokeWidth + 0.5}
              strokeLinecap="round"
            />
            <circle cx="18" cy="18" r="1.25" fill="currentColor" />
          </>
        );

      case 'flame':
        return (
          <>
            <path
              d="M12 2C9.5 6 7 8.5 7 12.5C7 16.09 9.24 19 12 19C14.76 19 17 16.09 17 12.5C17 9.5 15.5 7 13.5 5C13.5 7.5 12 9 12 9C12 7 12 2 12 2Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C11 12.5 10 13.5 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.8 13.2 12.8 12 11Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'badge':
      case 'medal':
        return (
          <>
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="11.5" r="2.5" fill="currentColor" />
          </>
        );

      case 'trophy':
        return (
          <>
            <path
              d="M6 4H18V10C18 13.31 15.31 16 12 16C8.69 16 6 13.31 6 10V4Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6H3.5C2.67 6 2 6.67 2 7.5C2 9.5 3.5 11 5.5 11H6"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 6H20.5C21.33 6 22 6.67 22 7.5C22 9.5 20.5 11 18.5 11H18"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16V19M8 21H16"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7.5L12.8 9.2L14.6 9.4L13.2 10.7L13.6 12.5L12 11.6L10.4 12.5L10.8 10.7L9.4 9.4L11.2 9.2L12 7.5Z"
              fill="currentColor"
            />
          </>
        );

      case 'star':
        return (
          <path
            d="M12 2.5L14.9 8.4L21.4 9.3L16.7 13.9L17.8 20.4L12 17.3L6.2 20.4L7.3 13.9L2.6 9.3L9.1 8.4L12 2.5Z"
            fill="currentColor"
            fillOpacity={duotoneOpacity}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'pin':
        return (
          <>
            <path
              d="M16 3L21 8L17 12L15 11L11 15L11 18L9 20L8 15L4 14L6 12L9 12L13 8L12 6L16 3Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 15L4 20"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'scale':
        return (
          <>
            <path
              d="M12 3V20M8 21H16M4 7H20"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Pan */}
            <path
              d="M3 13C3 15.2 4.8 17 7 17C9.2 17 11 15.2 11 13H3Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7L3 13M10 7L11 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Right Pan */}
            <path
              d="M13 13C13 15.2 14.8 17 17 17C19.2 17 21 15.2 21 13H13Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 7L13 13M20 7L21 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </>
        );

      case 'lightbulb':
        return (
          <>
            <path
              d="M9 18H15M10 21H14M12 2C7.58 2 4 5.58 4 10C4 12.8 5.43 15.27 7.6 16.73C8.1 17.07 8.5 17.58 8.64 18.17L8.7 18.4H15.3L15.36 18.17C15.5 17.58 15.9 17.07 16.4 16.73C18.57 15.27 20 12.8 20 10C20 5.58 16.42 2 12 2Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9L11 12H13L14 9"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'fedora':
      case 'detective':
        return (
          <>
            {/* Brim */}
            <path
              d="M2 17C4.5 15.5 7.5 15 12 15C16.5 15 19.5 15.5 22 17C21 18.2 17 19 12 19C7 19 3 18.2 2 17Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Crown */}
            <path
              d="M6.5 15L7.2 9C7.4 7.2 8.5 5.8 10 5.2C10.8 5 11.5 5.3 12 5.3C12.5 5.3 13.2 5 14 5.2C15.5 5.8 16.6 7.2 16.8 9L17.5 15"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ribbon */}
            <path
              d="M6.8 13.5C9 13.1 15 13.1 17.2 13.5"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'siren':
        return (
          <>
            <path
              d="M5 19H19V20C19 20.55 18.55 21 18 21H6C5.45 21 5 20.55 5 20V19Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 19C7 13.48 9.24 9 12 9C14.76 9 17 13.48 17 19H7Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2V5M4 6L6.5 8M20 6L17.5 8"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'case-file':
      case 'clipboard':
        return (
          <>
            <rect
              x="5"
              y="5"
              width="14"
              height="16"
              rx="2.5"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Top Clip */}
            <path
              d="M9 5V3.5C9 3.22 9.22 3 9.5 3H14.5C14.78 3 15 3.22 15 3.5V5H9Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dossier Lines */}
            <path
              d="M9 10H15M9 13.5H15M9 17H12.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </>
        );

      case 'users':
        return (
          <>
            {/* Secondary user (behind) */}
            <circle
              cx="16"
              cy="7.5"
              r="3"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M18.5 15.5C19.7 16.3 21 17.5 21 19.5V20H15.5"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Primary user (front) */}
            <circle
              cx="9"
              cy="8"
              r="4"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M3 20V18.5C3 15.46 6.13 14 9 14C11.87 14 15 15.46 15 18.5V20H3Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'user':
        return (
          <>
            <circle
              cx="12"
              cy="7.5"
              r="4.5"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M4.5 20.5V18.5C4.5 15.2 8.2 13.5 12 13.5C15.8 13.5 19.5 15.2 19.5 18.5V20.5H4.5Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'home':
        return (
          <>
            <path
              d="M3 10.5L12 3L21 10.5V19.5C21 20.33 20.33 21 19.5 21H4.5C3.67 21 3 20.33 3 19.5V10.5Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 21V13.5C9.5 12.67 10.17 12 11 12H13C13.83 12 14.5 12.67 14.5 13.5V21"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'check':
        return (
          <path
            d="M5 12.5L9.5 17L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth + 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'cross':
        return (
          <path
            d="M6 6L18 18M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth + 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'refresh':
        return (
          <>
            <path
              d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C15.34 3 18.24 4.82 19.78 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M21 3V8H16"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'share':
        return (
          <>
            <circle
              cx="18"
              cy="5.5"
              r="3"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="6"
              cy="12"
              r="3"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="18"
              cy="18.5"
              r="3"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <path
              d="M8.6 10.7L15.4 6.8M8.6 13.3L15.4 17.2"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'chat':
        return (
          <>
            <path
              d="M4 18V6C4 4.9 4.9 4 6 4H18C19.1 4 20 4.9 20 6V15C20 16.1 19.1 17 18 17H7.5L4 20.5V18Z"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="10.5" r="1.25" fill="currentColor" />
            <circle cx="12" cy="10.5" r="1.25" fill="currentColor" />
            <circle cx="15.5" cy="10.5" r="1.25" fill="currentColor" />
          </>
        );

      case 'chart':
        return (
          <>
            <path
              d="M3 20.5H21"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <rect
              x="5"
              y="12"
              width="3.5"
              height="8.5"
              rx="1.25"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <rect
              x="10.25"
              y="7"
              width="3.5"
              height="13.5"
              rx="1.25"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <rect
              x="15.5"
              y="3.5"
              width="3.5"
              height="17"
              rx="1.25"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
          </>
        );

      case 'lock':
        return (
          <>
            <rect
              x="5"
              y="10"
              width="14"
              height="11"
              rx="2.5"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 10V6.5C8 4.29 9.79 2.5 12 2.5C14.21 2.5 16 4.29 16 6.5V10"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <circle cx="12" cy="15" r="1.5" fill="currentColor" />
          </>
        );

      case 'calendar':
        return (
          <>
            <rect
              x="4"
              y="5"
              width="16"
              height="16"
              rx="3"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 10H20"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M8 3V6M16 3V6"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <circle cx="8.5" cy="14.5" r="1.2" fill="currentColor" />
            <circle cx="12" cy="14.5" r="1.2" fill="currentColor" />
            <circle cx="15.5" cy="14.5" r="1.2" fill="currentColor" />
          </>
        );

      case 'clock':
        return (
          <>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <path
              d="M12 7V12L15.5 14"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case 'help':
        return (
          <>
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="currentColor"
              fillOpacity={duotoneOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <path
              d="M9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.3 13.5 11 12.6 11.7C12.1 12.1 11.8 12.6 11.8 13.2V13.8"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <circle cx="11.9" cy="16.8" r="1.25" fill="currentColor" />
          </>
        );

      default:
        return (
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
          />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 transition-transform ${sizeClass} ${className}`}
      style={{ ...inlineSize, ...style }}
      aria-hidden="true"
    >
      {renderIconPaths()}
    </svg>
  );
};
