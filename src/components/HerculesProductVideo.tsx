import React from 'react';

const PRODUCT_VIDEO_URL =
  'https://github.com/mnijhara/Hercules/releases/download/hercules-product-video/hercules-product-video.mp4';

export const HerculesProductVideo: React.FC = () => (
  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10 sm:aspect-video">
    <video
      className="h-full w-full object-cover"
      src={PRODUCT_VIDEO_URL}
      controls
      playsInline
      muted
      autoPlay
      preload="auto"
      poster="/assets/hercules-product-poster.svg"
      aria-label="Hercules product video"
    />
  </div>
);
