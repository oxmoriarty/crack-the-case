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

export type GameIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export type GameIconProps = {
  name: GameIconName;
  size?: GameIconSize;
  className?: string;
  style?: React.CSSProperties;
};

const SIZE_MAP: Record<string, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-14 h-14',
};

export const GameIcon: React.FC<GameIconProps> = ({
  name,
  size = 'md',
  className = '',
  style,
}) => {
  const sizeClass = typeof size === 'string' ? SIZE_MAP[size] || SIZE_MAP.md : '';
  const inlineSize = typeof size === 'number' ? { width: size, height: size } : {};

  const renderIcon = () => {
    switch (name) {
      /* =========================================================================
         1. MAGNIFIER: Golden brass rim, cyan crystal lens with glare, mahogany handle
         ========================================================================= */
      case 'magnifier':
        return (
          <>
            <defs>
              <linearGradient id="ctc-mag-handle-3d" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <linearGradient id="ctc-mag-gold-rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="25%" stopColor="#FBBF24" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="ctc-mag-lens-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#7DD3FC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Handle shadow & wooden body */}
            <path
              d="M17.5 14.5L24 21L21 24L14.5 17.5"
              fill="#271202"
            />
            <rect
              x="14"
              y="16"
              width="5.5"
              height="10.5"
              rx="2.5"
              transform="rotate(-45 14 16)"
              fill="url(#ctc-mag-handle-3d)"
              stroke="#271202"
              strokeWidth="1.75"
            />
            {/* Handle highlight */}
            <path
              d="M16 17.5L21.5 23"
              stroke="#FDE68A"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Brass Ferrule Ring */}
            <circle
              cx="14.5"
              cy="14.5"
              r="2.75"
              fill="#F59E0B"
              stroke="#78350F"
              strokeWidth="1.5"
            />

            {/* Outer Rim 3D Bevel (Drop/Depth) */}
            <circle
              cx="10"
              cy="10.5"
              r="8"
              fill="#78350F"
            />

            {/* Gold Metal Ring */}
            <circle
              cx="10"
              cy="9.5"
              r="8"
              fill="url(#ctc-mag-gold-rim)"
              stroke="#451A03"
              strokeWidth="1.75"
            />

            {/* Inner Ring Dark Rim */}
            <circle
              cx="10"
              cy="9.5"
              r="5.75"
              fill="#0369A1"
              stroke="#78350F"
              strokeWidth="1.25"
            />

            {/* Crystal Glass Lens */}
            <circle
              cx="10"
              cy="9.5"
              r="5.5"
              fill="url(#ctc-mag-lens-glass)"
            />

            {/* Lens Specular Reflection (Diagonal curved gleam) */}
            <path
              d="M6.5 6C7.5 5 9 4.5 10.5 4.5C12.5 4.5 13.5 5.5 14 6"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M6 8C6.5 7.2 7.5 6.8 8.5 6.8"
              stroke="#FFFFFF"
              strokeWidth="1.25"
              strokeLinecap="round"
              opacity="0.75"
            />
          </>
        );

      /* =========================================================================
         2. FLAME: 3-layer 3D cartoon fire with yellow glow core & sparks
         ========================================================================= */
      case 'flame':
        return (
          <>
            <defs>
              <linearGradient id="ctc-flame-outer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="40%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
              <linearGradient id="ctc-flame-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <linearGradient id="ctc-flame-core" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>

            {/* 3D Dark Outline Base */}
            <path
              d="M12 1.5C9.2 5.5 5.5 8.5 5.5 13.5C5.5 18 8.5 22.5 12 22.5C15.5 22.5 18.5 18 18.5 13.5C18.5 9.5 16 6.8 13.8 4C13.8 6.5 12.5 8 12.5 8C12.5 5.5 12 1.5 12 1.5Z"
              fill="#7F1D1D"
              transform="translate(0, 1)"
            />

            {/* Outer Flame (Ruby/Red) */}
            <path
              d="M12 1.5C9.2 5.5 5.5 8.5 5.5 13.5C5.5 18 8.5 22.5 12 22.5C15.5 22.5 18.5 18 18.5 13.5C18.5 9.5 16 6.8 13.8 4C13.8 6.5 12.5 8 12.5 8C12.5 5.5 12 1.5 12 1.5Z"
              fill="url(#ctc-flame-outer)"
              stroke="#7F1D1D"
              strokeWidth="1.5"
            />

            {/* Middle Flame (Radiant Orange) */}
            <path
              d="M12 6.5C10 9.5 7.8 12 7.8 15C7.8 18 9.5 20.8 12 20.8C14.5 20.8 16.2 18 16.2 15C16.2 12.2 14.5 9.8 13.2 8C13 9.8 12.2 10.8 12.2 10.8C12.2 9 12 6.5 12 6.5Z"
              fill="url(#ctc-flame-mid)"
            />

            {/* Inner Core (White-Hot Yellow Glow) */}
            <path
              d="M12 12C11 13.8 9.8 15.2 9.8 17C9.8 18.8 10.8 20 12 20C13.2 20 14.2 18.8 14.2 17C14.2 15.2 13 13.8 12 12Z"
              fill="url(#ctc-flame-core)"
            />

            {/* Glossy Specular Highlight Arc */}
            <path
              d="M8.5 11C7.8 12.5 7.5 14 7.5 15.5"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Floating Sparks */}
            <circle cx="18" cy="6" r="1.2" fill="#FDE047" stroke="#EA580C" strokeWidth="0.8" />
            <circle cx="6" cy="7.5" r="1" fill="#FEF08A" stroke="#EA580C" strokeWidth="0.7" />
          </>
        );

      /* =========================================================================
         3. TROPHY: 3D Gold Cup, Star badge, layered base, specular sheen
         ========================================================================= */
      case 'trophy':
        return (
          <>
            <defs>
              <linearGradient id="ctc-trophy-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="30%" stopColor="#FACC15" />
                <stop offset="70%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
              <linearGradient id="ctc-trophy-base" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="50%" stopColor="#451A03" />
                <stop offset="100%" stopColor="#271202" />
              </linearGradient>
            </defs>

            {/* Handles 3D Shadow & Body */}
            <path
              d="M6 5H3.5C2.1 5 1 6.1 1 7.5C1 10.5 3 12.8 5.8 13H6.5"
              stroke="#713F12"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M6 5H3.5C2.1 5 1 6.1 1 7.5C1 10.5 3 12.8 5.8 13H6.5"
              stroke="url(#ctc-trophy-gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 5H20.5C21.9 5 23 6.1 23 7.5C23 10.5 21 12.8 18.2 13H17.5"
              stroke="#713F12"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M18 5H20.5C21.9 5 23 6.1 23 7.5C23 10.5 21 12.8 18.2 13H17.5"
              stroke="url(#ctc-trophy-gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Pedestal Base */}
            <path
              d="M8 21.5H16L15 19H9L8 21.5Z"
              fill="#271202"
              stroke="#271202"
              strokeWidth="1.5"
            />
            <rect
              x="6.5"
              y="20"
              width="11"
              height="3.5"
              rx="1.5"
              fill="url(#ctc-trophy-base)"
              stroke="#713F12"
              strokeWidth="1.25"
            />
            <rect
              x="8"
              y="20.5"
              width="8"
              height="1"
              rx="0.5"
              fill="#FDE68A"
              opacity="0.8"
            />

            {/* Stem Pillar */}
            <path
              d="M10.5 15.5V19.5H13.5V15.5"
              fill="#CA8A04"
              stroke="#713F12"
              strokeWidth="1.5"
            />

            {/* Main Cup 3D Depth Shadow */}
            <path
              d="M5 3.5H19V10.5C19 14.5 15.8 17 12 17C8.2 17 5 14.5 5 10.5V3.5Z"
              fill="#713F12"
              transform="translate(0, 0.8)"
            />

            {/* Main Cup Body */}
            <path
              d="M5 3H19V10C19 14.2 15.8 16.8 12 16.8C8.2 16.8 5 14.2 5 10V3Z"
              fill="url(#ctc-trophy-gold)"
              stroke="#713F12"
              strokeWidth="1.75"
            />

            {/* Cup Rim Lip */}
            <ellipse
              cx="12"
              cy="3.2"
              rx="7"
              ry="1.5"
              fill="#FEF08A"
              stroke="#713F12"
              strokeWidth="1.25"
            />

            {/* Embossed Star on Cup */}
            <path
              d="M12 6.5L13 8.6L15.2 8.8L13.5 10.4L14 12.6L12 11.4L10 12.6L10.5 10.4L8.8 8.8L11 8.6L12 6.5Z"
              fill="#FFFBEB"
              stroke="#B45309"
              strokeWidth="0.8"
            />

            {/* Specular Glare Shine */}
            <path
              d="M7.5 5C7.2 7 7.5 9 8.2 10.5"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        );

      /* =========================================================================
         4. STAR: Chunky 3D Casual Game Star with Golden Bevels
         ========================================================================= */
      case 'star':
        return (
          <>
            <defs>
              <linearGradient id="ctc-star-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="35%" stopColor="#FDE047" />
                <stop offset="80%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
            </defs>

            {/* 3D Bottom Extrusion */}
            <path
              d="M12 2.5L14.8 8.5L21.3 9.4L16.6 14L17.7 20.5L12 17.4L6.3 20.5L7.4 14L2.7 9.4L9.2 8.5L12 2.5Z"
              fill="#78350F"
              transform="translate(0, 1.5)"
            />

            {/* Main Star Body */}
            <path
              d="M12 2L14.8 8L21.3 8.9L16.6 13.5L17.7 20L12 16.9L6.3 20L7.4 13.5L2.7 8.9L9.2 8L12 2Z"
              fill="url(#ctc-star-body)"
              stroke="#78350F"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />

            {/* Star Inner Bevel Highlights */}
            <path
              d="M12 4.5L13.8 8.8L12 16"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="12" cy="7.5" r="1.25" fill="#FFFFFF" opacity="0.9" />
          </>
        );

      /* =========================================================================
         5. BADGE / MEDAL: 3D Sheriff / Detective Shield with Star & Ribbon
         ========================================================================= */
      case 'badge':
      case 'medal':
        return (
          <>
            <defs>
              <linearGradient id="ctc-badge-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#FACC15" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>

            {/* 3D Shadow Base */}
            <path
              d="M12 2C6.5 2 4.5 4.5 4.5 11C4.5 17.5 10 21.5 12 22C14 21.5 19.5 17.5 19.5 11C19.5 4.5 17.5 2 12 2Z"
              fill="#451A03"
              transform="translate(0, 1.2)"
            />

            {/* Shield Body */}
            <path
              d="M12 1.8C6.5 1.8 4.5 4.3 4.5 10.8C4.5 17.3 10 21.3 12 21.8C14 21.3 19.5 17.3 19.5 10.8C19.5 4.3 17.5 1.8 12 1.8Z"
              fill="url(#ctc-badge-gold)"
              stroke="#713F12"
              strokeWidth="1.75"
            />

            {/* Inner Shield Inset */}
            <path
              d="M12 3.8C8 3.8 6.5 5.5 6.5 10.5C6.5 15.5 10.5 18.8 12 19.3C13.5 18.8 17.5 15.5 17.5 10.5C17.5 5.5 16 3.8 12 3.8Z"
              fill="#B45309"
              opacity="0.25"
              stroke="#FEF08A"
              strokeWidth="1.25"
            />

            {/* Center Star Emblem */}
            <path
              d="M12 7L13.2 9.8L16.2 10.2L14 12.3L14.6 15.3L12 13.8L9.4 15.3L10 12.3L7.8 10.2L10.8 9.8L12 7Z"
              fill="#FFFBEB"
              stroke="#713F12"
              strokeWidth="1"
            />

            {/* Highlight Shine Arc */}
            <path
              d="M7 6.5C8 5 9.8 4.5 11.5 4.5"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        );

      /* =========================================================================
         6. PIN: 3D Cherry Red Cork Pushpin with Specular Ball Highlight & Steel Needle
         ========================================================================= */
      case 'pin':
        return (
          <>
            <defs>
              <linearGradient id="ctc-pin-needle" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <radialGradient id="ctc-pin-head" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FF8787" />
                <stop offset="40%" stopColor="#FA5252" />
                <stop offset="85%" stopColor="#C92A2A" />
                <stop offset="100%" stopColor="#5C1414" />
              </radialGradient>
            </defs>

            {/* Steel Needle Tip */}
            <path
              d="M12 14L8.5 23.5L13.5 18"
              fill="url(#ctc-pin-needle)"
              stroke="#1E293B"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />

            {/* Pin Lower Rim Drop Shadow */}
            <ellipse
              cx="12.5"
              cy="15"
              rx="4"
              ry="2"
              fill="#5C1414"
            />

            {/* Pin Body Lower Collar */}
            <path
              d="M9 13.5C9 14.8 10.5 15.8 12.5 15.8C14.5 15.8 16 14.8 16 13.5L15 10H10L9 13.5Z"
              fill="#C92A2A"
              stroke="#5C1414"
              strokeWidth="1.5"
            />

            {/* Pin Sphere Head */}
            <circle
              cx="12.5"
              cy="8"
              r="6.5"
              fill="url(#ctc-pin-head)"
              stroke="#5C1414"
              strokeWidth="1.75"
            />

            {/* Specular Highlight Orb */}
            <ellipse
              cx="10.5"
              cy="5.8"
              rx="2.5"
              ry="1.5"
              transform="rotate(-25 10.5 5.8)"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </>
        );

      /* =========================================================================
         7. SCALE: 3D Golden Scales of Justice with Balanced Brass Pans
         ========================================================================= */
      case 'scale':
        return (
          <>
            <defs>
              <linearGradient id="ctc-scale-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="35%" stopColor="#FBBF24" />
                <stop offset="80%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>

            {/* Pillar & Beam */}
            <path
              d="M11 3.5V20H13V3.5"
              fill="#92400E"
              stroke="#451A03"
              strokeWidth="1.5"
            />
            {/* Top Beam */}
            <rect
              x="2.5"
              y="6"
              width="19"
              height="2.5"
              rx="1.25"
              fill="url(#ctc-scale-gold)"
              stroke="#451A03"
              strokeWidth="1.5"
            />
            {/* Top Sphere Finial */}
            <circle
              cx="12"
              cy="3.5"
              r="2.2"
              fill="url(#ctc-scale-gold)"
              stroke="#451A03"
              strokeWidth="1.5"
            />
            {/* Heavy Base */}
            <rect
              x="7"
              y="19.5"
              width="10"
              height="3"
              rx="1.5"
              fill="url(#ctc-scale-gold)"
              stroke="#451A03"
              strokeWidth="1.5"
            />

            {/* Left Pan Chains */}
            <path d="M4 8L2.5 13.5M9 8L10.5 13.5" stroke="#92400E" strokeWidth="1.25" />
            {/* Left Brass Pan */}
            <path
              d="M2 13.5C2 16.5 4.2 18.5 6.5 18.5C8.8 18.5 11 16.5 11 13.5H2Z"
              fill="url(#ctc-scale-gold)"
              stroke="#451A03"
              strokeWidth="1.5"
            />
            <ellipse cx="6.5" cy="13.5" rx="4.5" ry="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

            {/* Right Pan Chains */}
            <path d="M15 8L13.5 13.5M20 8L21.5 13.5" stroke="#92400E" strokeWidth="1.25" />
            {/* Right Brass Pan */}
            <path
              d="M13 13.5C13 16.5 15.2 18.5 17.5 18.5C19.8 18.5 22 16.5 22 13.5H13Z"
              fill="url(#ctc-scale-gold)"
              stroke="#451A03"
              strokeWidth="1.5"
            />
            <ellipse cx="17.5" cy="13.5" rx="4.5" ry="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          </>
        );

      /* =========================================================================
         8. LIGHTBULB: Glowing 3D Glass Bulb, Filament loop, Brass Screw Base
         ========================================================================= */
      case 'lightbulb':
        return (
          <>
            <defs>
              <radialGradient id="ctc-bulb-glow" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#FEF08A" />
                <stop offset="75%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#CA8A04" />
              </radialGradient>
              <linearGradient id="ctc-bulb-screw" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#64748B" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            {/* Screw Base */}
            <rect x="9.5" y="16.5" width="5" height="1.8" rx="0.9" fill="url(#ctc-bulb-screw)" stroke="#1E293B" strokeWidth="1.2" />
            <rect x="10" y="18.3" width="4" height="1.8" rx="0.9" fill="url(#ctc-bulb-screw)" stroke="#1E293B" strokeWidth="1.2" />
            <ellipse cx="12" cy="20.5" rx="1.5" ry="1" fill="#1E293B" />

            {/* Glass Bulb 3D Shadow Base */}
            <path
              d="M12 2C7.5 2 4.5 5.5 4.5 9.8C4.5 12.8 6 14.8 7.8 16.5H16.2C18 14.8 19.5 12.8 19.5 9.8C19.5 5.5 16.5 2 12 2Z"
              fill="#854D0E"
              transform="translate(0, 1)"
            />

            {/* Glowing Glass Body */}
            <path
              d="M12 1.8C7.5 1.8 4.5 5.3 4.5 9.6C4.5 12.6 6 14.6 7.8 16.3H16.2C18 14.6 19.5 12.6 19.5 9.6C19.5 5.3 16.5 1.8 12 1.8Z"
              fill="url(#ctc-bulb-glow)"
              stroke="#713F12"
              strokeWidth="1.75"
            />

            {/* Glowing Filament */}
            <path
              d="M9.5 10L11 13H13L14.5 10"
              stroke="#B45309"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Specular Glare Arc */}
            <path
              d="M7 6.5C8 4.8 10 4 12 4"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Radial Light Rays */}
            <line x1="12" y1="0.5" x2="12" y2="0" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="4" x2="2" y2="3" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="21" y1="4" x2="22" y2="3" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );

      /* =========================================================================
         9. FEDORA / DETECTIVE: 3D Detective Hat with Teal Ribbon & Felt Shading
         ========================================================================= */
      case 'fedora':
      case 'detective':
        return (
          <>
            <defs>
              <linearGradient id="ctc-hat-felt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="45%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <linearGradient id="ctc-hat-ribbon" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#087E78" />
                <stop offset="50%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>

            {/* Brim 3D Base Shadow */}
            <ellipse
              cx="12"
              cy="18.2"
              rx="10.5"
              ry="3.8"
              fill="#271202"
            />

            {/* Crown Body */}
            <path
              d="M6.5 15L7.2 8C7.5 5.8 9 4.2 11 4C11.5 4 12 4.4 12.5 4C13 4.4 13.5 4 14 4C16 4.2 17.5 5.8 17.8 8L18.5 15Z"
              fill="url(#ctc-hat-felt)"
              stroke="#271202"
              strokeWidth="1.75"
            />

            {/* Detective Ribbon */}
            <path
              d="M6.8 14.8C9.5 14 15.5 14 18.2 14.8L18.4 13C15.5 12.2 9.5 12.2 6.6 13L6.8 14.8Z"
              fill="url(#ctc-hat-ribbon)"
              stroke="#042F2E"
              strokeWidth="1.2"
            />
            {/* Golden Ribbon Buckle */}
            <rect x="8.5" y="12.5" width="2" height="2.5" rx="0.5" fill="#FACC15" stroke="#78350F" strokeWidth="0.75" />

            {/* Brim Upper Surface */}
            <ellipse
              cx="12"
              cy="17"
              rx="10.5"
              ry="3.2"
              fill="url(#ctc-hat-felt)"
              stroke="#271202"
              strokeWidth="1.75"
            />

            {/* Crown Specular Highlight */}
            <path
              d="M8.5 7.5C9 6.2 10.2 5.5 11.5 5.5"
              stroke="#FDE68A"
              strokeWidth="1.25"
              strokeLinecap="round"
              opacity="0.7"
            />
          </>
        );

      /* =========================================================================
         10. SIREN: 3D Emergency Police Beacon with Chrome Base & Light Flash
         ========================================================================= */
      case 'siren':
        return (
          <>
            <defs>
              <linearGradient id="ctc-siren-dome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFA8A8" />
                <stop offset="40%" stopColor="#FA5252" />
                <stop offset="85%" stopColor="#C92A2A" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
              <linearGradient id="ctc-siren-chrome" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Chrome Base */}
            <ellipse cx="12" cy="20.5" rx="8.5" ry="2.5" fill="#1E293B" />
            <rect x="4.5" y="17.5" width="15" height="3" rx="1.5" fill="url(#ctc-siren-chrome)" stroke="#1E293B" strokeWidth="1.5" />

            {/* 3D Siren Dome Shadow */}
            <path
              d="M6 18C6 11 8.5 7 12 7C15.5 7 18 11 18 18H6Z"
              fill="#5C1414"
              transform="translate(0, 0.8)"
            />

            {/* Glowing Red Dome */}
            <path
              d="M6 17.5C6 10.8 8.5 6.8 12 6.8C15.5 6.8 18 10.8 18 17.5H6Z"
              fill="url(#ctc-siren-dome)"
              stroke="#5C1414"
              strokeWidth="1.75"
            />

            {/* Dome Specular Glare Arc */}
            <path
              d="M8.5 15C8.5 11 10 9 12 9"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Alert Flashes */}
            <line x1="12" y1="4" x2="12" y2="1.5" stroke="#F87171" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="4.5" y1="5.5" x2="2.5" y2="3.5" stroke="#F87171" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="19.5" y1="5.5" x2="21.5" y2="3.5" stroke="#F87171" strokeWidth="1.75" strokeLinecap="round" />
          </>
        );

      /* =========================================================================
         11. CASE-FILE / CLIPBOARD: 3D Manila Dossier, Silver Clamp, Document Lines
         ========================================================================= */
      case 'case-file':
      case 'clipboard':
        return (
          <>
            <defs>
              <linearGradient id="ctc-case-manila" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="60%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Board 3D Bottom Shadow */}
            <rect x="4" y="4.5" width="16" height="18" rx="2.5" fill="#78350F" />

            {/* Manila Board */}
            <rect
              x="4"
              y="3.5"
              width="16"
              height="18"
              rx="2.5"
              fill="url(#ctc-case-manila)"
              stroke="#78350F"
              strokeWidth="1.75"
            />

            {/* White Paper Sheet */}
            <rect
              x="6"
              y="6"
              width="12"
              height="13.5"
              rx="1.5"
              fill="#FFFFFF"
              stroke="#D97706"
              strokeWidth="1"
            />

            {/* Document Red Confid. Stamp or Lines */}
            <rect x="8" y="9" width="8" height="1.5" rx="0.75" fill="#087E78" />
            <rect x="8" y="12" width="6.5" height="1.2" rx="0.6" fill="#94A3B8" />
            <rect x="8" y="14.5" width="7.5" height="1.2" rx="0.6" fill="#94A3B8" />

            {/* Silver Top Metal Clamp */}
            <rect
              x="8"
              y="2"
              width="8"
              height="3.5"
              rx="1"
              fill="#E2E8F0"
              stroke="#475569"
              strokeWidth="1.25"
            />
            <circle cx="12" cy="3.5" r="0.75" fill="#475569" />
          </>
        );

      /* =========================================================================
         12. USERS: Duo of Colorful Cartoon Suspect Avatars with 3D Depth
         ========================================================================= */
      case 'users':
        return (
          <>
            <defs>
              <linearGradient id="ctc-user-teal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="50%" stopColor="#087E78" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
              <linearGradient id="ctc-user-coral" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="50%" stopColor="#F07868" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
            </defs>

            {/* Secondary Avatar (Right, Coral) */}
            <circle cx="16.5" cy="7.5" r="3.5" fill="url(#ctc-user-coral)" stroke="#7F1D1D" strokeWidth="1.25" />
            <path
              d="M13 19V17C13 14.5 15 13.5 17 13.5C19 13.5 21 14.5 21 17V19H13Z"
              fill="url(#ctc-user-coral)"
              stroke="#7F1D1D"
              strokeWidth="1.25"
            />

            {/* Primary Avatar 3D Depth & Body (Left, Teal) */}
            <circle cx="8.5" cy="8" r="4.2" fill="url(#ctc-user-teal)" stroke="#042F2E" strokeWidth="1.5" />
            <ellipse cx="7.2" cy="6.8" rx="1.5" ry="0.8" fill="#FFFFFF" opacity="0.75" />
            <path
              d="M3 20V17.5C3 14.2 6 13 8.5 13C11 13 14 14.2 14 17.5V20H3Z"
              fill="url(#ctc-user-teal)"
              stroke="#042F2E"
              strokeWidth="1.5"
            />
          </>
        );

      /* =========================================================================
         13. USER: Single Cartoon Detective / Suspect Badge
         ========================================================================= */
      case 'user':
        return (
          <>
            <defs>
              <linearGradient id="ctc-user-solo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="40%" stopColor="#087E78" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>

            {/* 3D Shadow Base */}
            <circle cx="12" cy="7.5" r="5" fill="#042F2E" transform="translate(0, 0.8)" />
            <path
              d="M4.5 21.5V18.5C4.5 14.8 8.2 13 12 13C15.8 13 19.5 14.8 19.5 18.5V21.5H4.5Z"
              fill="#042F2E"
              transform="translate(0, 0.8)"
            />

            {/* Head */}
            <circle cx="12" cy="7.5" r="5" fill="url(#ctc-user-solo)" stroke="#042F2E" strokeWidth="1.75" />
            <ellipse cx="10.5" cy="5.5" rx="1.8" ry="1" fill="#FFFFFF" opacity="0.8" />

            {/* Shoulders */}
            <path
              d="M4.5 21V18.5C4.5 14.8 8.2 13 12 13C15.8 13 19.5 14.8 19.5 18.5V21H4.5Z"
              fill="url(#ctc-user-solo)"
              stroke="#042F2E"
              strokeWidth="1.75"
            />
          </>
        );

      /* =========================================================================
         14. HOME: Cozy Cartoon Detective Agency Cottage with Chimney & Lighted Door
         ========================================================================= */
      case 'home':
        return (
          <>
            <defs>
              <linearGradient id="ctc-home-roof" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="ctc-home-wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>

            {/* Chimney */}
            <rect x="16" y="3.5" width="2.5" height="5" rx="0.5" fill="#78350F" stroke="#271202" strokeWidth="1" />
            <ellipse cx="17.2" cy="3.5" rx="1.5" ry="0.6" fill="#D97706" />

            {/* Wall Body */}
            <rect x="4.5" y="10" width="15" height="11" rx="1.5" fill="url(#ctc-home-wall)" stroke="#78350F" strokeWidth="1.75" />

            {/* Arched Cozy Door */}
            <path
              d="M9.5 21V14.5C9.5 13.1 10.6 12 12 12C13.4 12 14.5 13.1 14.5 14.5V21H9.5Z"
              fill="#D97706"
              stroke="#78350F"
              strokeWidth="1.25"
            />
            <circle cx="13.5" cy="16.5" r="0.6" fill="#FDE68A" />

            {/* Sloping Cartoon Roof */}
            <path
              d="M2.5 11.5L12 3L21.5 11.5"
              stroke="#7F1D1D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 11L12 2.5L21.5 11"
              stroke="url(#ctc-home-roof)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      /* =========================================================================
         15. CHECK: 3D Juicy Emerald Green Button Checkmark
         ========================================================================= */
      case 'check':
        return (
          <>
            <defs>
              <linearGradient id="ctc-check-emerald" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* 3D Depth Shadow */}
            <path
              d="M4.5 12.5L9.5 17.5L19.5 6.5"
              stroke="#064E3B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vibrant Green Checkmark */}
            <path
              d="M4.5 11.5L9.5 16.5L19.5 5.5"
              stroke="url(#ctc-check-emerald)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* White Gloss Glare Line */}
            <path
              d="M5 11L8.5 14.5L18.5 5"
              stroke="#FFFFFF"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </>
        );

      /* =========================================================================
         16. CROSS: 3D Ruby Red Button 'X'
         ========================================================================= */
      case 'cross':
        return (
          <>
            <defs>
              <linearGradient id="ctc-cross-ruby" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
            </defs>

            {/* 3D Depth Shadow */}
            <path
              d="M6 7L18 19M18 7L6 19"
              stroke="#7F1D1D"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Vibrant Red 'X' */}
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="url(#ctc-cross-ruby)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Gloss Highlight */}
            <circle cx="6" cy="6" r="1" fill="#FFFFFF" opacity="0.85" />
            <circle cx="18" cy="6" r="1" fill="#FFFFFF" opacity="0.85" />
          </>
        );

      /* =========================================================================
         17. REFRESH: 3D Cyan Circular Game Arrow with Directional Glare
         ========================================================================= */
      case 'refresh':
        return (
          <>
            <defs>
              <linearGradient id="ctc-refresh-cyan" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>

            {/* 3D Shadow Base */}
            <path
              d="M21 13C21 18 16.8 22 12 22C7.2 22 3 18 3 13C3 8 7.2 4 12 4C15.3 4 18.2 5.8 19.8 8.5"
              fill="none"
              stroke="#082F49"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Arrow Ring */}
            <path
              d="M21 12C21 17 16.8 21 12 21C7.2 21 3 17 3 12C3 7 7.2 3 12 3C15.3 3 18.2 4.8 19.8 7.5"
              fill="none"
              stroke="url(#ctc-refresh-cyan)"
              strokeWidth="3.25"
              strokeLinecap="round"
            />

            {/* Arrow Head */}
            <path
              d="M21.5 2.5V8.5H15.5"
              fill="none"
              stroke="url(#ctc-refresh-cyan)"
              strokeWidth="3.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Specular Highlight Arc */}
            <path
              d="M6 8C7.5 5.5 9.5 4.5 12 4.5"
              stroke="#FFFFFF"
              strokeWidth="1.25"
              strokeLinecap="round"
              opacity="0.8"
            />
          </>
        );

      /* =========================================================================
         18. SHARE: 3D Golden Orb Network Nodes
         ========================================================================= */
      case 'share':
        return (
          <>
            <defs>
              <radialGradient id="ctc-share-orb" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </radialGradient>
            </defs>

            {/* Linking Rods */}
            <path d="M8.5 10.5L15.5 6.5M8.5 13.5L15.5 17.5" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <path d="M8.5 10.5L15.5 6.5M8.5 13.5L15.5 17.5" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Top Right Orb */}
            <circle cx="17.5" cy="5.5" r="3.8" fill="url(#ctc-share-orb)" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="16.5" cy="4.2" r="1.1" fill="#FFFFFF" opacity="0.85" />

            {/* Center Left Orb */}
            <circle cx="6.5" cy="12" r="3.8" fill="url(#ctc-share-orb)" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="5.5" cy="10.7" r="1.1" fill="#FFFFFF" opacity="0.85" />

            {/* Bottom Right Orb */}
            <circle cx="17.5" cy="18.5" r="3.8" fill="url(#ctc-share-orb)" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="16.5" cy="17.2" r="1.1" fill="#FFFFFF" opacity="0.85" />
          </>
        );

      /* =========================================================================
         19. CHAT: 3D Comic Speech Bubble with Snoo-Orange Accent
         ========================================================================= */
      case 'chat':
        return (
          <>
            <defs>
              <linearGradient id="ctc-chat-bubble" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8A65" />
                <stop offset="40%" stopColor="#FF5722" />
                <stop offset="100%" stopColor="#D84315" />
              </linearGradient>
            </defs>

            {/* 3D Bottom Shadow */}
            <path
              d="M4 18.5V6C4 4.5 5 3.5 6.5 3.5H17.5C19 3.5 20 4.5 20 6V15C20 16.5 19 17.5 17.5 17.5H8L4 21.5V18.5Z"
              fill="#BF360C"
            />

            {/* Bubble Body */}
            <path
              d="M4 17.5V5.5C4 4 5 3 6.5 3H17.5C19 3 20 4 20 5.5V14.5C20 16 19 17 17.5 17H8L4 20.5V17.5Z"
              fill="url(#ctc-chat-bubble)"
              stroke="#BF360C"
              strokeWidth="1.75"
            />

            {/* Three White Talking Dots */}
            <circle cx="8.5" cy="10" r="1.5" fill="#FFFFFF" />
            <circle cx="12" cy="10" r="1.5" fill="#FFFFFF" />
            <circle cx="15.5" cy="10" r="1.5" fill="#FFFFFF" />

            {/* Gloss Highlight Arc */}
            <path
              d="M6 5.5H16"
              stroke="#FFCCBC"
              strokeWidth="1.25"
              strokeLinecap="round"
              opacity="0.8"
            />
          </>
        );

      /* =========================================================================
         20. CHART: 3D Podium Step Bars (Bronze, Silver, Gold)
         ========================================================================= */
      case 'chart':
        return (
          <>
            <defs>
              <linearGradient id="ctc-bar-teal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>
              <linearGradient id="ctc-bar-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="ctc-bar-coral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
            </defs>

            {/* Base Platform */}
            <rect x="2" y="20" width="20" height="2.5" rx="1" fill="#451A03" />

            {/* Bar 1 (Left, Short, Coral) */}
            <rect x="4" y="12" width="4.5" height="8.5" rx="1.5" fill="url(#ctc-bar-coral)" stroke="#7F1D1D" strokeWidth="1.5" />
            <rect x="4.8" y="12.6" width="2.9" height="1" rx="0.5" fill="#FFFFFF" opacity="0.7" />

            {/* Bar 2 (Middle, Tall, Teal) */}
            <rect x="9.75" y="7" width="4.5" height="13.5" rx="1.5" fill="url(#ctc-bar-teal)" stroke="#042F2E" strokeWidth="1.5" />
            <rect x="10.55" y="7.6" width="2.9" height="1" rx="0.5" fill="#FFFFFF" opacity="0.8" />

            {/* Bar 3 (Right, Max, Gold) */}
            <rect x="15.5" y="3.5" width="4.5" height="17" rx="1.5" fill="url(#ctc-bar-gold)" stroke="#78350F" strokeWidth="1.5" />
            <rect x="16.3" y="4.1" width="2.9" height="1" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          </>
        );

      /* =========================================================================
         21. LOCK: 3D Heavy Brass Padlock with Steel Shackle
         ========================================================================= */
      case 'lock':
        return (
          <>
            <defs>
              <linearGradient id="ctc-lock-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#FACC15" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="ctc-lock-steel" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#64748B" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Steel Shackle */}
            <path
              d="M7.5 10.5V6.5C7.5 4 9.5 2 12 2C14.5 2 16.5 4 16.5 6.5V10.5"
              fill="none"
              stroke="#1E293B"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M7.5 10.5V6.5C7.5 4 9.5 2 12 2C14.5 2 16.5 4 16.5 6.5V10.5"
              fill="none"
              stroke="url(#ctc-lock-steel)"
              strokeWidth="2.25"
              strokeLinecap="round"
            />

            {/* 3D Bottom Shadow */}
            <rect x="4" y="10.8" width="16" height="12" rx="3" fill="#451A03" />

            {/* Brass Padlock Body */}
            <rect
              x="4"
              y="9.5"
              width="16"
              height="12"
              rx="3"
              fill="url(#ctc-lock-gold)"
              stroke="#713F12"
              strokeWidth="1.75"
            />

            {/* Keyhole */}
            <circle cx="12" cy="14" r="1.75" fill="#451A03" />
            <path d="M11 14.5L10.5 18H13.5L13 14.5" fill="#451A03" />

            {/* Specular Highlight */}
            <rect x="6" y="11" width="12" height="1.2" rx="0.6" fill="#FFFBEB" opacity="0.8" />
          </>
        );

      /* =========================================================================
         22. CALENDAR: 3D Flip Desk Calendar with Rings & Numbered Date
         ========================================================================= */
      case 'calendar':
        return (
          <>
            <defs>
              <linearGradient id="ctc-cal-header" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="60%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
            </defs>

            {/* 3D Page Shadow */}
            <rect x="3.5" y="5.5" width="17" height="16" rx="2.5" fill="#94A3B8" />

            {/* White Paper Page */}
            <rect
              x="3.5"
              y="4.5"
              width="17"
              height="16"
              rx="2.5"
              fill="#FFFFFF"
              stroke="#64748B"
              strokeWidth="1.5"
            />

            {/* Crimson Header Strip */}
            <path
              d="M3.5 7C3.5 5.6 4.6 4.5 6 4.5H18C19.4 4.5 20.5 5.6 20.5 7V9.5H3.5V7Z"
              fill="url(#ctc-cal-header)"
              stroke="#7F1D1D"
              strokeWidth="1.25"
            />

            {/* Binder Rings */}
            <rect x="7" y="2.5" width="2" height="4" rx="1" fill="#E2E8F0" stroke="#334155" strokeWidth="1" />
            <rect x="15" y="2.5" width="2" height="4" rx="1" fill="#E2E8F0" stroke="#334155" strokeWidth="1" />

            {/* Calendar Grid / Number Dot Accents */}
            <rect x="6.5" y="12" width="2.5" height="2" rx="0.5" fill="#087E78" />
            <rect x="10.75" y="12" width="2.5" height="2" rx="0.5" fill="#087E78" />
            <rect x="15" y="12" width="2.5" height="2" rx="0.5" fill="#F07868" />
            <rect x="6.5" y="15.5" width="2.5" height="2" rx="0.5" fill="#087E78" />
            <rect x="10.75" y="15.5" width="2.5" height="2" rx="0.5" fill="#087E78" />
            <rect x="15" y="15.5" width="2.5" height="2" rx="0.5" fill="#E9B949" />
          </>
        );

      /* =========================================================================
         23. CLOCK: 3D Stopwatch / Pocket Watch with Glare & Winder Button
         ========================================================================= */
      case 'clock':
        return (
          <>
            <defs>
              <linearGradient id="ctc-clock-rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="35%" stopColor="#FBBF24" />
                <stop offset="80%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="ctc-clock-face" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>

            {/* Top Winder Button */}
            <rect x="10.5" y="1" width="3" height="3" rx="1" fill="#D97706" stroke="#451A03" strokeWidth="1" />
            <path d="M10 2.5H14" stroke="#FEF08A" strokeWidth="1" />

            {/* Watch 3D Drop Shadow */}
            <circle cx="12" cy="13.8" r="9" fill="#451A03" />

            {/* Watch Golden Bezel */}
            <circle
              cx="12"
              cy="13"
              r="9"
              fill="url(#ctc-clock-rim)"
              stroke="#713F12"
              strokeWidth="1.75"
            />

            {/* White Dial Face */}
            <circle
              cx="12"
              cy="13"
              r="6.8"
              fill="url(#ctc-clock-face)"
              stroke="#713F12"
              strokeWidth="1.25"
            />

            {/* Dial Tick Marks */}
            <circle cx="12" cy="7.8" r="0.75" fill="#78350F" />
            <circle cx="12" cy="18.2" r="0.75" fill="#78350F" />
            <circle cx="6.8" cy="13" r="0.75" fill="#78350F" />
            <circle cx="17.2" cy="13" r="0.75" fill="#78350F" />

            {/* Watch Hands */}
            <line x1="12" y1="13" x2="12" y2="9.5" stroke="#1E293B" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="12" y1="13" x2="15" y2="14.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="13" r="1.2" fill="#DC2626" />

            {/* Glass Glare */}
            <path
              d="M7.5 9.5C8.8 8 10.5 7.5 12 7.5"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        );

      /* =========================================================================
         24. HELP: 3D Cyan Question Mark Token with Glossy Bubble Reflection
         ========================================================================= */
      case 'help':
        return (
          <>
            <defs>
              <radialGradient id="ctc-help-cyan" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="45%" stopColor="#087E78" />
                <stop offset="90%" stopColor="#065C58" />
                <stop offset="100%" stopColor="#042F2E" />
              </radialGradient>
            </defs>

            {/* 3D Drop Shadow */}
            <circle cx="12" cy="13" r="9.5" fill="#042F2E" />

            {/* Sphere Body */}
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="url(#ctc-help-cyan)"
              stroke="#042F2E"
              strokeWidth="1.75"
            />

            {/* Embossed Question Mark */}
            <path
              d="M9.5 9C9.5 7.6 10.6 6.5 12 6.5C13.4 6.5 14.5 7.6 14.5 9C14.5 10.3 13.5 11 12.6 11.7C12.1 12.1 11.8 12.6 11.8 13.2V13.8"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="11.8" cy="16.8" r="1.3" fill="#FFFFFF" />

            {/* Specular Highlight Orb */}
            <ellipse
              cx="8.5"
              cy="6.8"
              rx="3"
              ry="1.5"
              transform="rotate(-25 8.5 6.8)"
              fill="#FFFFFF"
              opacity="0.75"
            />
          </>
        );

      default:
        return (
          <circle cx="12" cy="12" r="8" fill="#FACC15" stroke="#78350F" strokeWidth="2" />
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
      {renderIcon()}
    </svg>
  );
};
