import type { Suspect } from '../../../shared/cases/cases';
import { SUSPECT_PRESETS } from './suspectAvatarData';

export type SuspectAvatarProps = {
  suspect?: Pick<Suspect, 'id' | 'name'> | { id: string; name?: string };
  gender?: 'male' | 'female';
  variant?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

// Preset color palettes strictly derived from the 24 reference cartoon avatars
const SKIN_TONES = {
  fair: { skin: '#FCD5B5', shadow: '#E2A57E', neck: '#D2926A' },
  tan: { skin: '#D69762', shadow: '#B5733C', neck: '#9A5B28' },
  brown: { skin: '#9F6539', shadow: '#7F4820', neck: '#663614' },
  dark: { skin: '#543525', shadow: '#3B2113', neck: '#2A150A' },
};

const HAIR_COLORS = {
  black: '#18181B',
  darkBrown: '#3B2314',
  chestnut: '#5B321A',
  auburn: '#9A3412',
  silver: '#94A3B8',
  platinum: '#CBD5E1',
};

export const SuspectAvatar = ({
  suspect,
  gender: explicitGender,
  variant: explicitVariant,
  size = 'md',
  className = '',
}: SuspectAvatarProps) => {
  const suspectId = suspect?.id || 'unknown';
  const preset = SUSPECT_PRESETS[suspectId];

  const isFemale =
    explicitGender !== undefined
      ? explicitGender === 'female'
      : preset
      ? preset.gender === 'female'
      : true;

  const variantIndex =
    explicitVariant !== undefined
      ? explicitVariant % 12
      : preset
      ? preset.variant % 12
      : 0;

  const sizeClasses = {
    sm: 'w-11 h-11',
    md: 'w-13 h-13',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#262320] bg-white shadow-[0_2.5px_0_#262320] overflow-hidden select-none ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`avatar-clip-${suspectId}`}>
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </defs>

        <g clipPath={`url(#avatar-clip-${suspectId})`}>
          {/* Subtle soft off-white background */}
          <rect width="100" height="100" fill="#F8FAFC" />

          {isFemale ? (
            <FemaleAvatar variant={variantIndex} />
          ) : (
            <MaleAvatar variant={variantIndex} />
          )}
        </g>
      </svg>
    </div>
  );
};

// -------------------------------------------------------------
// 12 DISTINCT FEMALE CARTOON AVATARS (Matching reference image)
// -------------------------------------------------------------
const FemaleAvatar = ({ variant }: { variant: number }) => {
  switch (variant) {
    // 0: Row 1, Col 2 - Fair skin, straight dark shoulder hair, grey shirt with white collar
    case 0: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Back hair */}
          <path d="M 28 35 C 28 65, 30 78, 33 85 C 37 85, 38 68, 38 55 Z" fill={HAIR_COLORS.darkBrown} />
          <path d="M 72 35 C 72 65, 70 78, 67 85 C 63 85, 62 68, 62 55 Z" fill={HAIR_COLORS.darkBrown} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#64748B" />
          <path d="M 44 68 L 50 76 L 56 68 L 50 64 Z" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front hair: shoulder straight with center part */}
          <path d="M 31 42 C 30 25, 45 22, 50 24 C 55 22, 70 25, 69 42 C 69 50, 66 60, 65 68 C 62 66, 63 46, 56 36 C 53 32, 50 32, 50 32 C 50 32, 47 32, 44 36 C 37 46, 38 66, 35 68 C 34 60, 31 50, 31 42 Z" fill={HAIR_COLORS.darkBrown} />
        </g>
      );
    }

    // 1: Row 1, Col 4 - Warm tan skin, brown rounded bob, red scoop top
    case 1: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Back bob hair */}
          <circle cx="50" cy="43" r="23" fill={HAIR_COLORS.chestnut} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#DC2626" />
          {/* Scoop neck cutout */}
          <path d="M 38 68 C 38 78, 62 78, 62 68 Z" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front curved bob */}
          <path d="M 30 42 C 30 24, 44 21, 50 21 C 56 21, 70 24, 70 42 C 70 52, 67 60, 62 61 C 65 52, 64 36, 54 33 C 51 32, 50 32, 50 32 C 49 32, 46 33, 36 36 C 35 52, 34 52, 38 61 C 33 60, 30 52, 30 42 Z" fill={HAIR_COLORS.chestnut} />
        </g>
      );
    }

    // 2: Row 1, Col 6 - Rich golden brown skin, auburn wavy hair, sleek black top
    case 2: {
      const { skin, neck } = SKIN_TONES.brown;
      return (
        <g>
          {/* Back wavy hair */}
          <path d="M 26 35 C 24 55, 23 75, 30 85 C 36 85, 36 65, 36 50 Z" fill={HAIR_COLORS.auburn} />
          <path d="M 74 35 C 76 55, 77 75, 70 85 C 64 85, 64 65, 64 50 Z" fill={HAIR_COLORS.auburn} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#18181B" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front wavy auburn strands */}
          <path d="M 29 40 C 29 23, 44 20, 50 20 C 56 20, 71 23, 71 40 C 71 54, 75 70, 71 78 C 66 76, 65 55, 60 44 C 55 35, 50 33, 50 33 C 49 34, 43 38, 38 48 C 34 58, 33 76, 29 78 C 25 70, 29 54, 29 40 Z" fill={HAIR_COLORS.auburn} />
        </g>
      );
    }

    // 3: Row 2, Col 1 - Deep dark skin, black wavy hair over shoulder, sky blue top
    case 3: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Back hair */}
          <path d="M 25 35 C 22 55, 20 75, 27 90 C 33 90, 35 70, 36 50 Z" fill={HAIR_COLORS.black} />
          <path d="M 75 35 C 78 55, 80 75, 73 90 C 67 90, 65 70, 64 50 Z" fill={HAIR_COLORS.black} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#38BDF8" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front wavy textured hair */}
          <path d="M 28 40 C 27 24, 43 20, 50 20 C 57 20, 72 24, 72 40 C 72 52, 69 64, 71 78 C 66 76, 64 56, 62 45 C 57 34, 51 32, 50 32 C 49 32, 44 35, 38 45 C 36 56, 34 76, 29 78 C 29 64, 28 52, 28 40 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 4: Row 2, Col 3 - Deep dark skin, sleek high topknot bun, burgundy blazer, white collar
    case 4: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Topknot bun */}
          <ellipse cx="50" cy="18" rx="8" ry="7" fill={HAIR_COLORS.black} />
          {/* Torso - Burgundy blazer */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#881337" />
          {/* White inner shirt V-opening */}
          <polygon points="50,86 42,68 58,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Sleek pulled-back hairline */}
          <path d="M 33 38 C 33 24, 43 22, 50 22 C 57 22, 67 24, 67 38 C 67 40, 64 36, 58 34 C 53 32, 50 32, 50 32 C 50 32, 47 32, 42 34 C 36 36, 33 40, 33 38 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 5: Row 2, Col 5 - Rich golden brown skin, asymmetric chic bob, royal purple blazer
    case 5: {
      const { skin, neck } = SKIN_TONES.brown;
      return (
        <g>
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#4338CA" />
          <polygon points="50,84 42,68 58,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Asymmetric swept bob hair */}
          <path d="M 30 38 C 29 23, 44 20, 50 20 C 58 20, 71 22, 71 42 C 71 52, 67 62, 63 68 C 61 54, 62 40, 53 35 C 48 32, 45 32, 40 33 C 33 35, 30 46, 30 52 C 28 45, 29 38, 30 38 Z" fill={HAIR_COLORS.auburn} />
        </g>
      );
    }

    // 6: Row 3, Col 2 - Fair skin, sleek black hair with center part, bright pink top
    case 6: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Back straight hair */}
          <path d="M 28 35 C 28 60, 29 76, 34 82 C 38 82, 38 65, 38 52 Z" fill={HAIR_COLORS.black} />
          <path d="M 72 35 C 72 60, 71 76, 66 82 C 62 82, 62 65, 62 52 Z" fill={HAIR_COLORS.black} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#EC4899" />
          {/* Scoop neck */}
          <path d="M 39 68 C 39 76, 61 76, 61 68 Z" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Sleek straight black hair framing */}
          <path d="M 31 40 C 30 24, 45 22, 50 24 C 55 22, 70 24, 69 40 C 69 52, 66 62, 64 68 C 61 64, 62 46, 56 36 C 53 32, 50 32, 50 32 C 50 32, 47 32, 44 36 C 38 46, 39 64, 36 68 C 34 62, 31 52, 31 40 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 7: Row 3, Col 4 - Warm tan skin, black side-part hair, cyan collared top
    case 7: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Back hair */}
          <circle cx="50" cy="44" r="23" fill={HAIR_COLORS.black} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#06B6D4" />
          <polygon points="50,78 44,68 56,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front styled side-part */}
          <path d="M 29 40 C 29 22, 44 20, 50 20 C 57 20, 71 22, 71 40 C 71 50, 67 58, 63 64 C 61 52, 60 40, 52 34 C 47 32, 42 32, 37 34 C 34 40, 31 52, 31 58 C 30 52, 29 46, 29 40 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 8: Row 3, Col 6 - Deep dark skin, short rounded bob, magenta scoop top
    case 8: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Back bob */}
          <circle cx="50" cy="42" r="23" fill={HAIR_COLORS.black} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#A21CAF" />
          <path d="M 39 68 C 39 76, 61 76, 61 68 Z" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front rounded bob bangs */}
          <path d="M 29 42 C 29 23, 44 20, 50 20 C 56 20, 71 23, 71 42 C 71 52, 68 59, 63 60 C 65 52, 64 36, 55 33 C 51 32, 50 32, 50 32 C 49 32, 45 33, 35 36 C 36 52, 35 52, 37 60 C 32 59, 29 52, 29 42 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 9: Row 4, Col 1 - Fair skin, older silver/grey hair with bangs, coral red blouse
    case 9: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Back grey hair */}
          <path d="M 27 36 C 26 55, 27 75, 33 83 C 38 83, 38 66, 38 52 Z" fill={HAIR_COLORS.silver} />
          <path d="M 73 36 C 74 55, 73 75, 67 83 C 62 83, 62 66, 62 52 Z" fill={HAIR_COLORS.silver} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#E11D48" />
          <path d="M 43 68 L 50 75 L 57 68 Z" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front silver hair with bangs */}
          <path d="M 30 40 C 29 23, 44 20, 50 20 C 56 20, 71 23, 70 40 C 70 54, 66 66, 63 70 C 62 62, 63 46, 56 36 C 52 32, 50 32, 50 32 C 48 32, 45 34, 40 37 C 35 48, 35 62, 37 70 C 33 66, 30 54, 30 40 Z" fill={HAIR_COLORS.silver} />
        </g>
      );
    }

    // 10: Row 4, Col 3 - Warm tan skin, older silver parted hair, fuchsia top with white inner
    case 10: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Back silver hair */}
          <circle cx="50" cy="44" r="23" fill={HAIR_COLORS.platinum} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#C026D3" />
          <polygon points="50,82 43,68 57,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front silver hair */}
          <path d="M 29 40 C 29 22, 44 20, 50 20 C 56 20, 71 22, 71 40 C 71 52, 68 62, 63 64 C 61 54, 60 42, 52 34 C 48 32, 44 32, 38 35 C 34 42, 32 54, 37 64 C 32 62, 29 52, 29 40 Z" fill={HAIR_COLORS.platinum} />
        </g>
      );
    }

    // 11: Row 4, Col 5 - Rich golden brown skin, older platinum hair, crimson red V-neck
    case 11:
    default: {
      const { skin, neck } = SKIN_TONES.brown;
      return (
        <g>
          {/* Back hair */}
          <path d="M 27 36 C 26 55, 27 75, 33 85 C 38 85, 38 66, 38 52 Z" fill={HAIR_COLORS.platinum} />
          <path d="M 73 36 C 74 55, 73 75, 67 85 C 62 85, 62 66, 62 52 Z" fill={HAIR_COLORS.platinum} />
          {/* Torso */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#B91C1C" />
          {/* V-neck cutout */}
          <polygon points="50,82 40,68 60,68" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="23" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front platinum swept hair */}
          <path d="M 30 40 C 29 22, 44 20, 50 20 C 56 20, 71 22, 70 40 C 70 55, 66 68, 62 72 C 61 62, 62 46, 55 35 C 51 32, 49 32, 47 33 C 41 38, 37 54, 38 72 C 34 68, 30 55, 30 40 Z" fill={HAIR_COLORS.platinum} />
        </g>
      );
    }
  }
};

// -----------------------------------------------------------
// 12 DISTINCT MALE CARTOON AVATARS (Matching reference image)
// -----------------------------------------------------------
const MaleAvatar = ({ variant }: { variant: number }) => {
  switch (variant) {
    // 0: Row 1, Col 1 - Fair skin, brown side-swept hair, brown turtleneck
    case 0: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Torso - Brown Turtleneck */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#5C3A21" />
          {/* Turtleneck collar */}
          <rect x="40" y="60" width="20" height="12" rx="4" fill="#4A2E18" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="16" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front styled side-swept brown hair */}
          <path d="M 31 38 C 30 22, 42 18, 52 18 C 62 18, 70 22, 69 36 C 68 40, 64 36, 60 32 C 54 28, 46 26, 40 28 C 34 30, 32 35, 31 38 Z" fill={HAIR_COLORS.chestnut} />
        </g>
      );
    }

    // 1: Row 1, Col 3 - Warm tan skin, short dark brown hair, dark suit with blue tie
    case 1: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Torso - Dark charcoal suit */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#27272A" />
          {/* White shirt triangle */}
          <polygon points="50,86 42,66 58,66" fill="#FFFFFF" />
          {/* Royal blue tie */}
          <polygon points="50,68 53,74 52,94 50,98 48,94 47,74" fill="#2563EB" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front dark short styled hair */}
          <path d="M 32 36 C 31 22, 44 19, 50 19 C 58 19, 69 22, 68 36 C 67 39, 63 35, 58 31 C 52 27, 44 26, 38 29 C 34 31, 33 34, 32 36 Z" fill={HAIR_COLORS.darkBrown} />
        </g>
      );
    }

    // 2: Row 1, Col 5 - Rich golden brown skin, spiky brown hair, white shirt with red tie
    case 2: {
      const { skin, neck } = SKIN_TONES.brown;
      return (
        <g>
          {/* Torso - White button-down */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#E2E8F0" />
          {/* Red tie */}
          <polygon points="50,68 53,74 52,94 50,98 48,94 47,74" fill="#DC2626" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Spiky hair volume */}
          <path d="M 31 36 C 30 20, 38 18, 44 16 L 47 13 L 50 16 L 54 13 L 57 16 C 64 18, 70 21, 69 36 C 68 40, 63 34, 58 30 C 51 26, 43 26, 38 29 C 34 31, 32 34, 31 36 Z" fill={HAIR_COLORS.chestnut} />
        </g>
      );
    }

    // 3: Row 2, Col 2 - Warm tan skin, short dark brown hair, teal polo shirt
    case 3: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Torso - Teal polo */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#0D9488" />
          {/* Polo collar */}
          <path d="M 40 68 L 50 78 L 60 68 L 50 64 Z" fill="#0F766E" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Front neat hair */}
          <path d="M 32 38 C 31 22, 42 19, 50 19 C 58 19, 69 22, 68 38 C 67 40, 63 35, 57 32 C 52 28, 45 28, 38 31 C 34 33, 33 36, 32 38 Z" fill={HAIR_COLORS.darkBrown} />
        </g>
      );
    }

    // 4: Row 2, Col 4 - Deep dark skin, full groomed black beard, denim blue shirt
    case 4: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Torso - Denim blue shirt */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#3B82F6" />
          <polygon points="50,78 44,68 56,68" fill="#1D4ED8" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Full beard & mustache */}
          <path d="M 34 46 C 34 58, 40 67, 50 67 C 60 67, 66 58, 66 46 C 66 49, 62 57, 50 57 C 38 57, 34 49, 34 46 Z" fill={HAIR_COLORS.black} />
          <path d="M 42 53 C 46 51, 54 51, 58 53 C 55 55, 45 55, 42 53 Z" fill={HAIR_COLORS.black} />
          {/* Top hair */}
          <path d="M 32 36 C 31 22, 42 19, 50 19 C 58 19, 69 22, 68 36 C 67 39, 63 35, 57 32 C 51 28, 44 28, 38 30 C 34 32, 33 34, 32 36 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 5: Row 2, Col 6 - Deep dark skin, neat goatee & mustache, green polo
    case 5: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Torso - Green polo */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#047857" />
          <polygon points="50,78 44,68 56,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Neat Goatee & mustache */}
          <ellipse cx="50" cy="62" rx="6" ry="4" fill={HAIR_COLORS.black} />
          <path d="M 43 53 C 46 51, 54 51, 57 53 C 55 55, 45 55, 43 53 Z" fill={HAIR_COLORS.black} />
          {/* Top short crop hair */}
          <path d="M 32 36 C 31 22, 42 19, 50 19 C 58 19, 69 22, 68 36 C 67 39, 63 35, 57 32 C 51 28, 44 28, 38 30 C 34 32, 33 34, 32 36 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 6: Row 3, Col 1 - Fair skin, sleek black side-part, black suit with grey tie
    case 6: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Torso - Black suit */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#18181B" />
          {/* White shirt triangle */}
          <polygon points="50,86 42,66 58,66" fill="#FFFFFF" />
          {/* Grey tie */}
          <polygon points="50,68 53,74 52,94 50,98 48,94 47,74" fill="#4B5563" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Sleek black parted hair */}
          <path d="M 31 38 C 30 20, 44 18, 52 18 C 62 18, 70 21, 69 36 C 68 40, 63 35, 56 31 C 50 27, 43 27, 37 30 C 34 32, 32 35, 31 38 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 7: Row 3, Col 3 - Warm tan skin, short black hair, royal blue V-neck
    case 7: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Torso - Royal blue V-neck */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#2563EB" />
          <polygon points="50,82 42,68 58,68" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Short casual black hair */}
          <path d="M 32 38 C 31 22, 42 19, 50 19 C 58 19, 69 22, 68 38 C 67 40, 63 35, 57 32 C 51 28, 44 28, 38 31 C 34 33, 33 36, 32 38 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 8: Row 3, Col 5 - Deep dark skin, textured spiky hair, grey suit with black tie
    case 8: {
      const { skin, neck } = SKIN_TONES.dark;
      return (
        <g>
          {/* Torso - Grey suit */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#4B5563" />
          <polygon points="50,86 42,66 58,66" fill="#FFFFFF" />
          <polygon points="50,68 53,74 52,94 50,98 48,94 47,74" fill="#18181B" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.5" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Textured spiky dark hair */}
          <path d="M 31 36 C 30 20, 38 18, 44 16 L 47 13 L 50 16 L 54 13 L 57 16 C 64 18, 70 21, 69 36 C 68 40, 63 34, 58 30 C 51 26, 43 26, 38 29 C 34 31, 32 34, 31 36 Z" fill={HAIR_COLORS.black} />
        </g>
      );
    }

    // 9: Row 4, Col 2 - Rich golden brown skin, older grey hair, emerald green shirt
    case 9: {
      const { skin, neck } = SKIN_TONES.brown;
      return (
        <g>
          {/* Torso - Green shirt */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#10B981" />
          <polygon points="50,78 44,68 56,68" fill="#047857" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Grey hair */}
          <path d="M 31 38 C 30 20, 42 18, 51 18 C 61 18, 70 21, 69 36 C 68 40, 63 35, 57 31 C 51 27, 44 27, 38 30 C 34 32, 32 35, 31 38 Z" fill={HAIR_COLORS.silver} />
        </g>
      );
    }

    // 10: Row 4, Col 4 - Fair skin, older grey hair & trimmed grey beard, brown sweater
    case 10: {
      const { skin, neck } = SKIN_TONES.fair;
      return (
        <g>
          {/* Torso - Brown sweater */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#78350F" />
          <path d="M 38 68 C 38 76, 62 76, 62 68 Z" fill={skin} />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Trimmed grey beard */}
          <path d="M 34 46 C 34 58, 40 67, 50 67 C 60 67, 66 58, 66 46 C 66 49, 62 57, 50 57 C 38 57, 34 49, 34 46 Z" fill={HAIR_COLORS.silver} />
          {/* Grey hair */}
          <path d="M 31 38 C 30 20, 42 18, 51 18 C 61 18, 70 21, 69 36 C 68 40, 63 35, 57 31 C 51 27, 44 27, 38 30 C 34 32, 32 35, 31 38 Z" fill={HAIR_COLORS.silver} />
        </g>
      );
    }

    // 11: Row 4, Col 6 - Warm tan skin, older silver hair, lime green polo
    case 11:
    default: {
      const { skin, neck } = SKIN_TONES.tan;
      return (
        <g>
          {/* Torso - Lime green polo */}
          <path d="M 12 100 C 12 76, 26 68, 50 68 C 74 68, 88 76, 88 100 Z" fill="#65A30D" />
          <polygon points="50,78 44,68 56,68" fill="#FFFFFF" />
          {/* Neck */}
          <rect x="43" y="47" width="14" height="21" fill={skin} />
          <path d="M 43 51 C 47 57, 53 57, 57 51 Z" fill={neck} opacity="0.4" />
          {/* Head */}
          <path d="M 33 42 C 33 26, 67 26, 67 42 C 67 56, 58 64, 50 64 C 42 64, 33 56, 33 42 Z" fill={skin} />
          {/* Silver hair */}
          <path d="M 31 38 C 30 20, 42 18, 51 18 C 61 18, 70 21, 69 36 C 68 40, 63 35, 57 31 C 51 27, 44 27, 38 30 C 34 32, 32 35, 31 38 Z" fill={HAIR_COLORS.silver} />
        </g>
      );
    }
  }
};
