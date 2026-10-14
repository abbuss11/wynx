import React from 'react';

interface WynxMotifProps {
  variant?: 'gold' | 'white';
  opacity?: number;
  className?: string;
  density?: 'compact' | 'standard' | 'large';
}

export const WynxMotif: React.FC<WynxMotifProps> = ({
  variant = 'gold',
  opacity = 0.08,
  className = '',
  density = 'standard'
}) => {
  const strokeColor = variant === 'gold' ? '#FFA500' : '#FFFFFF';
  const patternId = `wynx-motif-${variant}-${density}`;

  const tileWidth = density === 'compact' ? 140 : density === 'large' ? 280 : 180;
  const tileHeight = density === 'compact' ? 140 : density === 'large' ? 280 : 180;

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            width={tileWidth}
            height={tileHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* Base Coordinate System normalized to tile size */}
            <g
              transform={`scale(${tileWidth / 200})`}
              stroke={strokeColor}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Central Hexagon */}
              <polygon points="100,80 117.32,90 117.32,110 100,120 82.68,110 82.68,90" />
              <polygon points="100,86 112,93 112,107 100,114 88,107 88,93" opacity="0.6" />

              {/* 6 Radial WYNX Crest Elements */}
              {/* North Unit (0 deg) */}
              <g transform="translate(100, 52)">
                {/* Chevron */}
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                {/* Wings */}
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                {/* Shield W */}
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* North-East Unit (60 deg) */}
              <g transform="translate(142, 75) rotate(60)">
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* South-East Unit (120 deg) */}
              <g transform="translate(142, 125) rotate(120)">
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* South Unit (180 deg) */}
              <g transform="translate(100, 148) rotate(180)">
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* South-West Unit (240 deg) */}
              <g transform="translate(58, 125) rotate(240)">
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* North-West Unit (300 deg) */}
              <g transform="translate(58, 75) rotate(300)">
                <path d="M 0 -22 L 20 -8 L 14 -3 L 0 -14 L -14 -3 L -20 -8 Z" />
                <path d="M -18 -8 C -22 -16 -26 -22 -20 -28 C -16 -24 -14 -18 -14 -12" />
                <path d="M 18 -8 C 22 -16 26 -22 20 -28 C 16 -24 14 -18 14 -12" />
                <path d="M -16 -2 L 0 8 L 16 -2 L 16 14 C 16 20 8 24 0 24 C -8 24 -16 20 -16 14 Z" />
              </g>

              {/* Corner Interlocking Accents to ensure seamless 2D tiling */}
              {/* Top-Left Corner (0,0) */}
              <g transform="translate(0, 0)">
                <polygon points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5" />
                <path d="M 0 12 L 12 20 L 8 24 L 0 18 L -8 24 L -12 20 Z" />
              </g>

              {/* Top-Right Corner (200,0) */}
              <g transform="translate(200, 0)">
                <polygon points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5" />
                <path d="M 0 12 L 12 20 L 8 24 L 0 18 L -8 24 L -12 20 Z" />
              </g>

              {/* Bottom-Left Corner (0,200) */}
              <g transform="translate(0, 200)">
                <polygon points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5" />
                <path d="M 0 -12 L 12 -20 L 8 -24 L 0 -18 L -8 -24 L -12 -20 Z" />
              </g>

              {/* Bottom-Right Corner (200,200) */}
              <g transform="translate(200, 200)">
                <polygon points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5" />
                <path d="M 0 -12 L 12 -20 L 8 -24 L 0 -18 L -8 -24 L -12 -20 Z" />
              </g>
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
