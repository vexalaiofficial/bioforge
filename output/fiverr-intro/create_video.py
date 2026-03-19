#!/usr/bin/env python3
"""Create text video using ImageMagick + ffmpeg"""
import subprocess
import os

OUTPUT_DIR = "/Users/vexalai/.openclaw/workspace/output/fiverr-intro/output"
FRAMES_DIR = "/Users/vexalai/.openclaw/workspace/output/fiverr-intro/frames"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Clean old frames
subprocess.run(f'rm -rf {FRAMES_DIR}/*', shell=True)

FPS = 30
W, H = 1920, 1080

scenes = [
    (0, 4, "Hi there! 👋", 90, "white"),
    (1, 4, "I'm Neil", 60, "#a1a1aa"),
    (5, 11, "RAG Chatbot  |  Discord Bot  |  Website", 42, "white"),
    (12, 17, "Fast & high-quality results", 52, "white"),
    (14, 17, "that actually move the needle", 36, "#a1a1aa"),
    (18, 25, "Ready to turn your idea into reality?", 46, "white"),
    (20, 25, "Let's make it happen together", 32, "#a1a1aa"),
    (22, 27, "Send me a message -- I reply fast!", 38, "#6366f1"),
    (26, 30, "Looking forward to working with you! 🚀", 44, "white"),
    (27, 30, "@neilwilliam", 52, "#6366f1"),
]

# Font options on macOS
font_options = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SF-Pro-Text-Regular.otf",
    "/Library/Fonts/Arial.ttf",
]

font_path = None
for f in font_options:
    if os.path.exists(f):
        font_path = f
        break

if not font_path:
    font_path = "/System/Library/Fonts/Helvetica.ttc"

print(f"Using font: {font_path}")

# Generate all 900 frames
print("Generating 900 frames...")
for frame_num in range(FPS * 30):
    t = frame_num / FPS
    frame_path_out = f"{FRAMES_DIR}/frame_{frame_num:04d}.png"
    
    # Find active text
    active_text = None
    active_size = 48
    active_color = "white"
    
    for start, end, text, size, color in scenes:
        if start <= t <= end:
            active_text = text
            active_size = size
            active_color = color
            break
    
    # Create frame with ImageMagick
    if active_text:
        escaped = active_text.replace("'", "\\'").replace(":", "\\:")
        cmd = [
            "magick",
            "-size", f"{W}x{H}",
            "xc:#0a0a0f",
            "-gravity", "center",
            "-pointsize", str(active_size),
            "-fill", active_color,
            "-font", font_path,
            "-annotate", "+0+0", active_text,
            frame_path_out
        ]
    else:
        cmd = ["magick", "-size", f"{W}x{H}", "xc:#0a0a0f", frame_path_out]
    
    subprocess.run(cmd, capture_output=True)
    
    if frame_num % 150 == 0:
        print(f"  Frame {frame_num}/900")

# Verify frames
frame_count = len([f for f in os.listdir(FRAMES_DIR) if f.startswith("frame_")])
print(f"Generated {frame_count} frames")

# Create video
print("Creating video...")
cmd = [
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", f"{FRAMES_DIR}/frame_%04d.png",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-crf", "18",
    f"{OUTPUT_DIR}/fiverr-intro.mp4"
]
result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode != 0:
    print("Error:", result.stderr[-800:])
else:
    size = os.path.getsize(f"{OUTPUT_DIR}/fiverr-intro.mp4")
    print(f"✅ Done! Video saved: {OUTPUT_DIR}/fiverr-intro.mp4 ({size/1024/1024:.2f} MB)")