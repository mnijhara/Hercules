from PIL import Image, ImageDraw, ImageFont
import math, os, subprocess

W, H, FPS, DURATION = 1280, 720, 30, 12
FRAMES = 'product-video-frames'
os.makedirs(FRAMES, exist_ok=True)
font = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
small = ImageFont.truetype(font, 22)
body = ImageFont.truetype(font, 28)
title = ImageFont.truetype(bold, 58)
eyebrow = ImageFont.truetype(bold, 18)
brand = ImageFont.truetype(bold, 22)
scenes = [
    ('THE FOUNDER PROBLEM', 'People work keeps pulling you back in.', 'Hiring, employee issues, follow-ups and people operations compete with founder time.'),
    ('FRACTIONAL CHRO', 'Bring senior HR judgment into the loop.', 'Your Fractional CHRO sets priorities, makes the calls and owns the people strategy.'),
    ('HERCULES AI WORKFORCE', 'Hercules prepares the work.', 'AI agents research, draft, organize and turn repeatable HR work into workflows.'),
    ('WORKSPACE CONTEXT', 'The work starts where your team already works.', 'Use the context available across Slack, WhatsApp, Google Meet and email.'),
    ('HUMAN JUDGMENT', 'AI prepares. CHRO decides.', 'Important people decisions stay with the human leader. Approved work gets executed.'),
    ('THE OUTCOME', 'More founder time for the company.', 'A Fractional CHRO amplified by an AI HR workforce — without another management layer.'),
]

def wrap(draw, text, fnt, width):
    lines, line = [], ''
    for word in text.split():
        candidate = (line + ' ' + word).strip()
        if line and draw.textlength(candidate, font=fnt) > width:
            lines.append(line); line = word
        else:
            line = candidate
    if line: lines.append(line)
    return lines

for frame in range(FPS * DURATION):
    t = frame / FPS
    scene_index = min(5, int(t // 2))
    local = t - scene_index * 2
    fade = min(1.0, local / 0.35, (2 - local) / 0.35)
    image = Image.new('RGB', (W, H), '#07101c')
    draw = ImageDraw.Draw(image)
    glow_x = int(900 + 80 * math.sin(t * 0.7))
    glow_y = int(150 + 45 * math.cos(t * 0.5))
    for radius in range(220, 10, -10):
        draw.ellipse((glow_x-radius, glow_y-radius, glow_x+radius, glow_y+radius), fill=(8 + min(12, (220-radius)//4), 18 + min(22, (220-radius)//4), 35 + min(35, (220-radius)//4)))
    draw.rounded_rectangle((70, 60, 1210, 660), radius=32, fill='#0c1424', outline='#2c3c52', width=2)
    draw.text((110, 92), 'HERCULES', font=brand, fill='#38bdf8')
    draw.text((290, 97), 'FRACTIONAL CHRO  ·  AI HR WORKFORCE', font=small, fill='#64748b')
    eyebrow_text, title_text, body_text = scenes[scene_index]
    offset = int((1 - fade) * 30)
    draw.text((115 + offset, 180), eyebrow_text, font=eyebrow, fill='#38bdf8')
    for index, line in enumerate(wrap(draw, title_text, title, 920)[:2]):
        draw.text((115 + offset, 225 + index * 70), line, font=title, fill='#f8fafc')
    for index, line in enumerate(wrap(draw, body_text, body, 920)[:2]):
        draw.text((115 + offset, 390 + index * 38), line, font=body, fill='#cbd5e1')
    for index, (label, sub) in enumerate((('CHRO', 'DECIDES'), ('AI WORKFORCE', 'PREPARES'), ('WORKSPACE', 'EXECUTES'))):
        x = 115 + index * 350
        fill = '#0d3043' if index == 1 else '#142236'
        outline = '#38bdf8' if index == 1 else '#374b64'
        draw.rounded_rectangle((x, 515, x + 310, 585), radius=15, fill=fill, outline=outline, width=2)
        draw.text((x + 18, 530), label, font=small, fill='#7dd3fc' if index == 1 else '#e2e8f0')
        draw.text((x + 18, 558), sub, font=ImageFont.truetype(font, 16), fill='#64748b')
    draw.rounded_rectangle((115, 625, 1165, 631), radius=3, fill='#283446')
    draw.rounded_rectangle((115, 625, 115 + int(1050 * t / DURATION), 631), radius=3, fill='#38bdf8')
    image.save(f'{FRAMES}/frame-{frame:04d}.png', quality=95)

subprocess.run([
    'ffmpeg', '-y', '-framerate', str(FPS), '-i', f'{FRAMES}/frame-%04d.png',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-crf', '20', '-preset', 'medium', 'hercules-product-video.mp4'
], check=True)
