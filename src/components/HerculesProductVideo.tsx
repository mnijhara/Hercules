import React from 'react';

const PRODUCT_VIDEO_URL =
  'https://github.com/mnijhara/Hercules/releases/download/hercules-product-video/hercules-product-video.mp4';

export const HerculesProductVideo: React.FC = () => (
  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10">
    <video
      className="h-full w-full object-cover"
      src={PRODUCT_VIDEO_URL}
      controls
      playsInline
      muted
      autoPlay
      preload="auto"
      poster="/assets/hercules-product-poster.svg"
      aria-label="Hercules product film"
    />
    <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-sky-300 backdrop-blur-sm">
      HERCULES PRODUCT FILM · 12S
    </div>
  </div>
);
