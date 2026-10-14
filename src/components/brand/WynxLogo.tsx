import React from 'react';

export type WynxLogoVariant =
  | 'full' // Emblem + WYNX wordmark
  | 'emblem' // Solid orange roof + solid white shield
  | 'emblem-gold' // Pure gold/orange outline (LogoTracéOr1)
  | 'emblem-white' // Pure white outline (LogoTracé)
  | 'chevrons' // 3 stacked gradient chevrons (Tracé1)
  | 'wordmark'; // WYNX text only

interface WynxLogoProps {
  variant?: WynxLogoVariant;
  className?: string;
  size?: number | string;
  height?: number | string;
  width?: number | string;
}

export const WynxLogo: React.FC<WynxLogoProps> = ({
  variant = 'full',
  className = '',
  size,
  height,
  width
}) => {
  // 1. TRACÉ 1: 3 Stacked Gradient Ascending Chevrons
  if (variant === 'chevrons') {
    return (
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: width || size || 'auto',
          height: height || size || '100%',
          display: 'inline-block'
        }}
      >
        <defs>
          {/* Top Yellow-Gold Gradient */}
          <linearGradient id="chevronTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD000" />
            <stop offset="100%" stopColor="#FFA200" />
          </linearGradient>
          {/* Middle Amber-Orange Gradient */}
          <linearGradient id="chevronMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#FF6600" />
          </linearGradient>
          {/* Bottom Electric Orange Gradient */}
          <linearGradient id="chevronBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6600" />
            <stop offset="100%" stopColor="#E53900" />
          </linearGradient>
        </defs>

        {/* Top Chevron */}
        <path
          d="M 100 12 L 194 72 L 158 98 L 100 58 L 42 98 L 6 72 Z"
          fill="url(#chevronTopGrad)"
        />

        {/* Middle Chevron */}
        <path
          d="M 100 78 L 194 138 L 158 164 L 100 124 L 42 164 L 6 138 Z"
          fill="url(#chevronMidGrad)"
        />

        {/* Bottom Chevron */}
        <path
          d="M 100 144 L 194 204 L 158 230 L 100 190 L 42 230 L 6 204 Z"
          fill="url(#chevronBotGrad)"
        />
      </svg>
    );
  }

  // 2. LOGO TRACÉ OR (Golden Outline Emblem)
  if (variant === 'emblem-gold') {
    return (
      <svg
        viewBox="0 0 240 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: width || size || 'auto',
          height: height || size || '100%',
          display: 'inline-block'
        }}
      >
        <defs>
          <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="50%" stopColor="#FF8800" />
            <stop offset="100%" stopColor="#FF6A00" />
          </linearGradient>
        </defs>

        {/* Left Leaf Outline */}
        <path
          d="M 16 68 C 12 36 28 14 36 6 C 42 28 50 44 44 58 C 36 50 24 56 16 68 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 28 20 C 32 36 34 50 36 60"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Leaf Outline */}
        <path
          d="M 224 68 C 228 36 212 14 204 6 C 198 28 190 44 196 58 C 204 50 216 56 224 68 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 212 20 C 208 36 206 50 204 60"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Chevron Roof Outline */}
        <path
          d="M 120 18 L 228 78 L 194 98 L 120 54 L 46 98 L 12 78 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 120 30 L 210 80 L 186 94 L 120 58 L 54 94 L 30 80 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Shield "W" Outline */}
        <path
          d="M 38 102 L 120 156 L 202 102 L 202 178 C 202 216 164 238 120 238 C 76 238 38 216 38 178 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner W Detail Outline */}
        <path
          d="M 52 118 L 120 164 L 188 118 L 188 172 C 188 198 158 222 120 222 C 82 222 52 198 52 172 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Central W cutout crest */}
        <path
          d="M 80 148 L 120 190 L 160 148 L 140 136 L 120 156 L 100 136 Z"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 3. LOGO TRACÉ BLANC (White Outline Emblem)
  if (variant === 'emblem-white') {
    return (
      <svg
        viewBox="0 0 240 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: width || size || 'auto',
          height: height || size || '100%',
          display: 'inline-block'
        }}
      >
        {/* Left Leaf Outline */}
        <path
          d="M 16 68 C 12 36 28 14 36 6 C 42 28 50 44 44 58 C 36 50 24 56 16 68 Z"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 28 20 C 32 36 34 50 36 60"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Leaf Outline */}
        <path
          d="M 224 68 C 228 36 212 14 204 6 C 198 28 190 44 196 58 C 204 50 216 56 224 68 Z"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 212 20 C 208 36 206 50 204 60"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Chevron Roof Outline */}
        <path
          d="M 120 18 L 228 78 L 194 98 L 120 54 L 46 98 L 12 78 Z"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 120 30 L 210 80 L 186 94 L 120 58 L 54 94 L 30 80 Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Shield "W" Outline */}
        <path
          d="M 38 102 L 120 156 L 202 102 L 202 178 C 202 216 164 238 120 238 C 76 238 38 216 38 178 Z"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner W Detail Outline */}
        <path
          d="M 52 118 L 120 164 L 188 118 L 188 172 C 188 198 158 222 120 222 C 82 222 52 198 52 172 Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Central W cutout crest */}
        <path
          d="M 80 148 L 120 190 L 160 148 L 140 136 L 120 156 L 100 136 Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 4. SOLID EMBLEM ONLY (LogoStyleIntégré1)
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 240 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: width || size || 'auto',
          height: height || size || '100%',
          display: 'inline-block'
        }}
      >
        <defs>
          <linearGradient id="emblemOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA600" />
            <stop offset="100%" stopColor="#FF7700" />
          </linearGradient>
        </defs>

        {/* Left Leaf in Solid Orange */}
        <path
          d="M 16 68 C 12 36 28 14 36 6 C 42 28 50 44 44 58 C 36 50 24 56 16 68 Z"
          fill="url(#emblemOrangeGrad)"
        />
        <path
          d="M 28 20 C 32 36 34 50 36 60"
          stroke="#090A0D"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Right Leaf in Solid Orange */}
        <path
          d="M 224 68 C 228 36 212 14 204 6 C 198 28 190 44 196 58 C 204 50 216 56 224 68 Z"
          fill="url(#emblemOrangeGrad)"
        />
        <path
          d="M 212 20 C 208 36 206 50 204 60"
          stroke="#090A0D"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Chevron Roof (Orange frame) */}
        <path
          d="M 120 18 L 228 78 L 194 98 L 120 54 L 46 98 L 12 78 Z"
          fill="url(#emblemOrangeGrad)"
        />

        {/* Solid White/Silver "W" Shield */}
        <path
          d="M 38 106 L 120 156 L 202 106 L 202 180 C 202 216 164 238 120 238 C 76 238 38 216 38 180 Z"
          fill="#ECEFF4"
        />
        {/* Dark inner cut creating the sharp "W" lettermark */}
        <path
          d="M 80 148 L 120 188 L 160 148 L 140 136 L 120 154 L 100 136 Z"
          fill="#090A0D"
        />
      </svg>
    );
  }

  // 5. WORDMARK ONLY ("WYNX")
  if (variant === 'wordmark') {
    return (
      <svg
        viewBox="0 0 440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: width || size || 'auto',
          height: height || size || '100%',
          display: 'inline-block'
        }}
      >
        {/* W */}
        <path
          d="M 0 10 L 28 110 L 62 110 L 88 38 L 114 110 L 148 110 L 176 10 L 138 10 L 124 74 L 98 10 L 78 10 L 52 74 L 38 10 Z"
          fill="#FFFFFF"
        />
        {/* Y */}
        <path
          d="M 188 10 L 222 64 L 222 110 L 254 110 L 254 64 L 288 10 L 252 10 L 238 42 L 224 10 Z"
          fill="#FFFFFF"
        />
        {/* N */}
        <path
          d="M 302 10 L 302 110 L 332 110 L 368 44 L 368 110 L 398 110 L 398 10 L 368 10 L 332 76 L 332 10 Z"
          fill="#FFFFFF"
        />
        {/* X */}
        <path
          d="M 406 10 L 436 58 L 406 110 L 438 110 L 452 82 L 466 110 L 498 110 L 468 58 L 498 10 L 466 10 L 452 38 L 438 10 Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 6. DEFAULT FULL LOGO (LogoStyleIntégré.svg / WinxLogo.svg)
  // Perfectly balanced Emblem + WYNX Bold Wordmark
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Emblem */}
      <svg
        viewBox="0 0 240 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105 duration-300"
        style={{
          width: height ? `calc(${height} * 1.05)` : size || '36px',
          height: height || size || '36px',
          display: 'block'
        }}
      >
        <defs>
          <linearGradient id="fullEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAA00" />
            <stop offset="100%" stopColor="#FF7700" />
          </linearGradient>
        </defs>

        {/* Left Leaf */}
        <path
          d="M 16 68 C 12 36 28 14 36 6 C 42 28 50 44 44 58 C 36 50 24 56 16 68 Z"
          fill="url(#fullEmblemGrad)"
        />
        <path
          d="M 28 20 C 32 36 34 50 36 60"
          stroke="#090A0D"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Right Leaf */}
        <path
          d="M 224 68 C 228 36 212 14 204 6 C 198 28 190 44 196 58 C 204 50 216 56 224 68 Z"
          fill="url(#fullEmblemGrad)"
        />
        <path
          d="M 212 20 C 208 36 206 50 204 60"
          stroke="#090A0D"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Chevron Roof */}
        <path
          d="M 120 18 L 228 78 L 194 98 L 120 54 L 46 98 L 12 78 Z"
          fill="url(#fullEmblemGrad)"
        />

        {/* Shield "W" in Solid White/Silver */}
        <path
          d="M 38 106 L 120 156 L 202 106 L 202 180 C 202 216 164 238 120 238 C 76 238 38 216 38 180 Z"
          fill="#ECEFF4"
        />
        {/* Dark inner cut creating the sharp "W" lettermark */}
        <path
          d="M 80 148 L 120 188 L 160 148 L 140 136 L 120 154 L 100 136 Z"
          fill="#090A0D"
        />
      </svg>

      {/* Wordmark WYNX */}
      <span className="font-display font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center leading-none text-xl sm:text-2xl transition-colors">
        <span className="transition-colors">W</span>
        <span className="transition-colors">Y</span>
        <span className="transition-colors">N</span>
        <span className="text-[#FF8800] group-hover:text-[#FFA000] transition-colors">X</span>
      </span>
    </div>
  );
};
