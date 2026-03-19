const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, 'frames');
const VIDEO_DIR = path.join(__dirname, 'output');

async function renderVideo() {
  // Clean and create directories
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.readdirSync(OUTPUT_DIR).forEach(f => fs.unlinkSync(path.join(OUTPUT_DIR, f)));
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const htmlPath = path.join(__dirname, 'record-video.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  console.log('Recording 30s video (900 frames)...');
  
  // Capture frames - 30 seconds at 30fps = 900 frames
  const totalFrames = 900;
  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, `frame_${String(i).padStart(4, '0')}.png`),
      omitBackground: false
    });
    if (i % 100 === 0) console.log(`  Frame ${i}/${totalFrames}`);
  }
  
  await browser.close();
  console.log('Compiling video with ffmpeg...');
  
  // Compile video
  const cmd = `ffmpeg -y -framerate 30 -i "${OUTPUT_DIR}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset fast "${VIDEO_DIR}/fiverr-promo-30s.mp4"`;
  execSync(cmd);
  
  const videoPath = path.join(VIDEO_DIR, 'fiverr-promo-30s.mp4');
  if (fs.existsSync(videoPath)) {
    const stats = fs.statSync(videoPath);
    console.log(`\n✅ 30s Video saved: ${videoPath}`);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  }
}

renderVideo().catch(console.error);