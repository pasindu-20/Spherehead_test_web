// src/components/ui/maskUtils.ts
export function getSquareMaskStyle({
  x,
  y,
  size,
}: {
  x: number; // px from left
  y: number; // px from top
  size: number; // px
}) {
  // SVG mask: white = visible, black = transparent
  const svg = encodeURIComponent(`
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="1000" fill="white"/>
      <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="black"/>
    </svg>
  `);
  return {
    maskImage: `url("data:image/svg+xml,${svg}")`,
    WebkitMaskImage: `url("data:image/svg+xml,${svg}")`,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  } as React.CSSProperties;
}