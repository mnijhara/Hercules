import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, MessageSquare } from 'lucide-react';
import { useModalFocus } from './useModalFocus';

interface VideoDemoModalProps { isOpen: boolean; onClose: () => void; onOpenAddSlackModal: () => void; }
const W = 1280; const H = 720; const DURATION = 12000; const FPS = 24;
const scenes = [
  ['THE FOUNDER PROBLEM', 'People work keeps pulling you back in.', 'Hiring, employee issues and people operations compete with founder time.'],
  ['FRACTIONAL CHRO', 'Bring senior HR judgment into the loop.', 'Your Fractional CHRO sets priorities, makes the calls and owns people strategy.'],
  ['HERCULES AI WORKFORCE', 'Hercules prepares the work.', 'AI agents research, draft, organize and turn repeatable HR work into workflows.'],
  ['WORKSPACE CONTEXT', 'The work starts where your team already works.', 'Use context across Slack, WhatsApp, Google Meet and email.'],
  ['HUMAN JUDGMENT', 'AI prepares. CHRO decides.', 'Important people decisions stay with the human leader. Approved work gets executed.'],
  ['THE OUTCOME', 'More founder time for the company.', 'A Fractional CHRO amplified by an AI HR workforce — without another management layer.'],
] as const;

function draw(ctx: CanvasRenderingContext2D, ms: number) {
  const t = Math.min(ms / 1000, 12); const i = Math.min(5, Math.floor(t / 2)); const local = t - i * 2; const fade = Math.min(1, local / .3, (2 - local) / .3); const [eyebrow, title, body] = scenes[i];
  ctx.clearRect(0, 0, W, H); const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#08101f'); g.addColorStop(1, '#10223a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = .1; ctx.fillStyle = '#38bdf8'; for (let x=32;x<W;x+=48) for(let y=32;y<H;y+=48) ctx.fillRect(x,y,2,2); ctx.globalAlpha = fade;
  ctx.fillStyle = 'rgba(10,18,32,.94)'; ctx.roundRect(72,64,W-144,H-128,28); ctx.fill(); ctx.strokeStyle='rgba(148,163,184,.18)'; ctx.stroke();
  ctx.globalAlpha = 1; ctx.fillStyle='#38bdf8'; ctx.font='700 15px Arial'; ctx.fillText('HERCULES',108,108); ctx.fillStyle='#64748b'; ctx.font='600 13px Arial'; ctx.fillText('FRACTIONAL CHRO · AI HR WORKFORCE',250,108); ctx.globalAlpha=fade;
  ctx.fillStyle='#7dd3fc'; ctx.font='700 15px Arial'; ctx.fillText(eyebrow,120,195); ctx.fillStyle='#f8fafc'; ctx.font='800 46px Arial'; ctx.fillText(title,120,260); ctx.fillStyle='#cbd5e1'; ctx.font='400 20px Arial'; ctx.fillText(body,120,320);
  [['CHRO','DECIDES'],['AI WORKFORCE','PREPARES'],['WORKSPACE','EXECUTES']].forEach(([a,b],n)=>{const x=120+n*340;ctx.fillStyle=n===1?'rgba(56,189,248,.14)':'rgba(30,41,59,.9)';ctx.roundRect(x,410,300,82,14);ctx.fill();ctx.strokeStyle=n===1?'rgba(56,189,248,.5)':'rgba(148,163,184,.16)';ctx.stroke();ctx.fillStyle='#e2e8f0';ctx.font='700 14px Arial';ctx.fillText(a,x+18,445);ctx.fillStyle='#64748b';ctx.font='400 12px Arial';ctx.fillText(b,x+18,468);});
  ctx.globalAlpha=1; ctx.fillStyle='rgba(148,163,184,.2)';ctx.fillRect(120,590,W-240,3);ctx.fillStyle='#38bdf8';ctx.fillRect(120,590,(W-240)*(t/12),3);ctx.fillStyle='#64748b';ctx.font='500 12px Arial';ctx.fillText('AI prepares · CHRO decides · approved work gets executed',120,620);ctx.globalAlpha=1;
}

const ProductVideo: React.FC = () => {
  const canvasRef=useRef<HTMLCanvasElement>(null); const [url,setUrl]=useState<string|null>(null); const [unsupported,setUnsupported]=useState(false);
  useEffect(()=>{const c=canvasRef.current;if(!c)return;const stream=c.captureStream?.(FPS);const Ctor=window.MediaRecorder;if(!stream||!Ctor){setUnsupported(true);return;}const mime=['video/webm;codecs=vp9','video/webm','video/mp4'].find(Ctor.isTypeSupported);if(!mime){setUnsupported(true);return;}const ctx=c.getContext('2d');if(!ctx){setUnsupported(true);return;}const chunks:BlobPart[]=[];const rec=new Ctor(stream,{mimeType:mime,videoBitsPerSecond:2200000});const start=performance.now();let raf=0;const frame=(now:number)=>{const e=Math.min(DURATION,now-start);draw(ctx,e);if(e<DURATION)raf=requestAnimationFrame(frame);};rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};rec.onstop=()=>{setUrl(URL.createObjectURL(new Blob(chunks,{type:mime})))};rec.start(250);raf=requestAnimationFrame(frame);const timer=window.setTimeout(()=>rec.stop(),DURATION+150);return()=>{cancelAnimationFrame(raf);window.clearTimeout(timer);if(rec.state!=='inactive')rec.stop();stream.getTracks().forEach(track=>track.stop());};},[]);
  if(unsupported)return <div className="flex aspect-video items-center justify-center rounded-2xl bg-slate-900 p-8 text-center text-sm text-slate-300">This browser cannot generate the product video format. The interactive AI demo remains available on the page.</div>;
  return <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950">{url?<video src={url} className="h-full w-full" controls playsInline muted autoPlay aria-label="Hercules product walkthrough"/>:<><canvas ref={canvasRef} width={W} height={H} className="h-full w-full" aria-hidden="true"/><div className="absolute inset-x-0 bottom-0 bg-slate-950/75 px-4 py-3 text-center text-xs text-slate-300" role="status" aria-live="polite">Preparing the Hercules product video…</div></>}</div>;
};

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ isOpen, onClose, onOpenAddSlackModal }) => {
  const dialogRef=useModalFocus(isOpen,onClose); if(!isOpen)return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-3 backdrop-blur-md sm:p-4" role="dialog" aria-modal="true" aria-labelledby="hercules-video-title"><div ref={dialogRef} tabIndex={-1} className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl outline-none sm:my-8 sm:rounded-3xl"><button type="button" onClick={onClose} aria-label="Close Hercules product video" className="absolute right-3 top-3 z-30 rounded-full bg-slate-950/80 p-2 text-white ring-1 ring-white/15"><X className="h-5 w-5"/></button><div className="border-b border-white/10 px-5 pb-4 pt-5 sm:px-7 sm:pb-5 sm:pt-6"><div className="flex items-center gap-2 text-sky-400"><Sparkles className="h-4 w-4"/><span className="text-[10px] font-mono font-bold tracking-[.18em]">HERCULES PRODUCT VIDEO</span></div><h2 id="hercules-video-title" className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">See how Hercules works.</h2><p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-400">Watch the workflow: Fractional CHRO judgment amplified by an AI HR workforce.</p></div><div className="p-3 sm:p-5"><ProductVideo/><p className="mt-3 text-center text-xs text-slate-500">AI prepares · CHRO decides · approved work gets executed</p><button type="button" onClick={()=>{onClose();onOpenAddSlackModal();}} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-4 py-2.5 text-xs font-extrabold text-slate-950"><MessageSquare className="h-3.5 w-3.5"/> Request workspace setup</button></div></div></div>;
};
