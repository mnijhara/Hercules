import React, { useEffect, useRef, useState } from 'react';

const DURATION_MS = 12_000;
const FPS = 24;
const WIDTH = 1280;
const HEIGHT = 720;

type Scene = { start: number; end: number; eyebrow: string; title: string; body: string };

const scenes: Scene[] = [
  { start: 0, end: 2, eyebrow: 'THE FOUNDER PROBLEM', title: 'People work keeps pulling you back in.', body: 'Hiring, employee issues, follow-ups and people operations compete with founder time.' },
  { start: 2, end: 4, eyebrow: 'FRACTIONAL CHRO', title: 'Bring senior HR judgment into the loop.', body: 'Your Fractional CHRO sets priorities, makes the calls and owns the people strategy.' },
  { start: 4, end: 6, eyebrow: 'HERCULES AI WORKFORCE', title: 'Hercules prepares the work.', body: 'AI agents research, draft, organize and turn repeatable HR work into workflows.' },
  { start: 6, end: 8, eyebrow: 'WORKSPACE CONTEXT', title: 'The work starts where your team already works.', body: 'Use the context available across Slack, WhatsApp, Google Meet and email.' },
  { start: 8, end: 10, eyebrow: 'HUMAN JUDGMENT', title: 'AI prepares. CHRO decides.', body: 'Important people decisions stay with the human leader. Approved work gets executed.' },
  { start: 10, end: 12, eyebrow: 'THE OUTCOME', title: 'More founder time for the company.', body: 'A Fractional CHRO amplified by an AI HR workforce — without another management layer.' },
];

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function drawFilmFrame(ctx: CanvasRenderingContext2D, elapsed: number) {
  const seconds = Math.min(DURATION_MS / 1000, Math.max(0, elapsed / 1000));
  const scene = scenes[Math.min(scenes.length - 1, Math.floor(seconds / 2))];
  const local = seconds - scene.start;
  const fadeIn = Math.min(1, local / 0.35);
  const fadeOut = Math.min(1, Math.max(0, (scene.end - seconds) / 0.35));
  const alpha = Math.min(fadeIn, fadeOut);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bg.addColorStop(0, '#0b1020'); bg.addColorStop(0.55, '#121a2e'); bg.addColorStop(1, '#07101c');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalAlpha = 0.12; ctx.fillStyle = '#38bdf8';
  for (let x = 48; x < WIDTH; x += 48) for (let y = 48; y < HEIGHT; y += 48) ctx.fillRect(x, y, 2, 2);
  ctx.globalAlpha = 1;

  const panelX = 86; const panelY = 74; const panelW = WIDTH - 172; const panelH = HEIGHT - 148;
  ctx.fillStyle = 'rgba(12,18,32,0.92)'; roundedRect(ctx, panelX, panelY, panelW, panelH, 28);
  ctx.strokeStyle = 'rgba(148,163,184,0.18)'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#38bdf8'; ctx.font = '700 15px Arial, sans-serif'; ctx.fillText('HERCULES', panelX + 36, panelY + 40);
  ctx.fillStyle = '#64748b'; ctx.font = '600 13px Arial, sans-serif'; ctx.fillText('FRACTIONAL CHRO · AI HR WORKFORCE', panelX + 150, panelY + 40);

  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#38bdf8'; ctx.font = '700 15px Arial, sans-serif'; ctx.fillText(scene.eyebrow, panelX + 48, panelY + 132);
  ctx.fillStyle = '#f8fafc'; ctx.font = '800 48px Arial, sans-serif';
  const titleLines = scene.title.length > 39 ? [scene.title.slice(0, 39), scene.title.slice(39)] : [scene.title];
  titleLines.forEach((line, index) => ctx.fillText(line, panelX + 48, panelY + 205 + index * 58));
  ctx.fillStyle = '#cbd5e1'; ctx.font = '400 21px Arial, sans-serif';
  const bodyLines = scene.body.length > 76 ? [scene.body.slice(0, 76), scene.body.slice(76)] : [scene.body];
  bodyLines.forEach((line, index) => ctx.fillText(line, panelX + 48, panelY + 340 + index * 32));

  const cardY = panelY + 430;
  ['CHRO', 'AI WORKFORCE', 'WORKSPACE'].forEach((label, index) => {
    const x = panelX + 48 + index * 330;
    ctx.fillStyle = index === 1 ? 'rgba(56,189,248,0.14)' : 'rgba(30,41,59,0.9)'; roundedRect(ctx, x, cardY, 292, 72, 14);
    ctx.strokeStyle = index === 1 ? 'rgba(56,189,248,0.45)' : 'rgba(148,163,184,0.16)'; ctx.stroke();
    ctx.fillStyle = index === 1 ? '#7dd3fc' : '#e2e8f0'; ctx.font = '700 14px Arial, sans-serif'; ctx.fillText(label, x + 18, cardY + 30);
    ctx.fillStyle = '#64748b'; ctx.font = '400 12px Arial, sans-serif'; ctx.fillText(index === 0 ? 'Decides' : index === 1 ? 'Prepares' : 'Executes', x + 18, cardY + 51);
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgba(148,163,184,0.2)'; ctx.fillRect(panelX + 48, HEIGHT - 102, panelW - 96, 3);
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(panelX + 48, HEIGHT - 102, (panelW - 96) * (seconds / 12), 3);
  ctx.fillStyle = '#64748b'; ctx.font = '500 12px Arial, sans-serif'; ctx.fillText('AI prepares · CHRO decides · approved work gets executed', panelX + 48, HEIGHT - 74);
}

export const HerculesProductVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const playingRef = useRef(true);
  const videoUrlRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const elapsedRef = useRef(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [recordingReady, setRecordingReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    drawFilmFrame(ctx, 0);

    const stream = canvas.captureStream?.(FPS) ?? null;
    const Recorder = window.MediaRecorder;
    const mimeType = Recorder && ['video/webm;codecs=vp9', 'video/webm'].find(Recorder.isTypeSupported);
    let recorder: MediaRecorder | null = null;

    if (stream && Recorder && mimeType) {
      const chunks: BlobPart[] = [];
      recorder = new Recorder(stream, { mimeType, videoBitsPerSecond: 2_500_000 });
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        if (!chunks.length) return;
        const url = URL.createObjectURL(new Blob(chunks, { type: mimeType }));
        videoUrlRef.current = url;
        setVideoUrl(url);
        setRecordingReady(true);
      };
      recorder.start(250);
    }

    let raf = 0;
    startedAtRef.current = performance.now();
    const tick = (now: number) => {
      if (playingRef.current && !videoUrlRef.current) {
        elapsedRef.current = (now - startedAtRef.current) % DURATION_MS;
        drawFilmFrame(ctx, elapsedRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => { if (recorder?.state === 'recording') recorder.stop(); }, DURATION_MS + 150);

    return () => {
      cancelAnimationFrame(raf); window.clearTimeout(timer);
      if (recorder?.state === 'recording') recorder.stop();
      recorderRef.current = null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => () => { if (videoUrl) URL.revokeObjectURL(videoUrl); }, [videoUrl]);

  const toggle = () => {
    if (videoUrl) {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) { video.play().catch(() => undefined); playingRef.current = true; setPlaying(true); }
      else { video.pause(); playingRef.current = false; setPlaying(false); }
      return;
    }
    if (!playing) {
      startedAtRef.current = performance.now() - elapsedRef.current;
      playingRef.current = true;
      setPlaying(true);
    } else {
      playingRef.current = false;
      setPlaying(false);
    }
  };

  const replay = () => {
    if (videoUrl && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => undefined);
      playingRef.current = true;
      setPlaying(true);
      return;
    }
    elapsedRef.current = 0;
    startedAtRef.current = performance.now();
    playingRef.current = true;
    setPlaying(true);
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10">
      {videoUrl ? (
        <video ref={videoRef} className="h-full w-full" src={videoUrl} controls playsInline muted preload="auto" autoPlay aria-label="Hercules product walkthrough" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      ) : (
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="h-full w-full" aria-label="Hercules product film animation" role="img" />
      )}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/75 px-3 py-2 text-xs text-white backdrop-blur-sm">
        <span>{recordingReady ? 'Hercules product video' : 'Hercules product film · 12s'}</span>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={toggle} className="rounded-lg px-2.5 py-1.5 font-bold hover:bg-white/10" aria-label={playing ? 'Pause product video' : 'Play product video'}>{playing ? 'Pause' : 'Play'}</button>
          <button type="button" onClick={replay} className="rounded-lg px-2.5 py-1.5 font-bold hover:bg-white/10" aria-label="Replay product video">Replay</button>
        </div>
      </div>
    </div>
  );
};
