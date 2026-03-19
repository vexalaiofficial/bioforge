#!/usr/bin/env bash
# Build an HTML player page from categorized audio directories
# Usage: player.sh <base_dir> <output_html>
# Expected structure: <base_dir>/music/*.mp3, <base_dir>/sfx/*.mp3, <base_dir>/voice/*.mp3

set -euo pipefail

BASE_DIR="${1:?Usage: player.sh <base_dir> <output_html>}"
OUTPUT_HTML="${2:?Output HTML path required}"

# Collect tracks by category
declare -A CATEGORIES=(
  [music]="Music"
  [sfx]="Sound Effects"
  [voice]="Voice"
)

declare -A COLORS=(
  [music]="#22c55e"
  [sfx]="#eab308"
  [voice]="#3b82f6"
)

# Build JSON data
TRACKS_JSON="{"
FIRST_CAT=true

for CATEGORY in music sfx voice; do
  DIR="$BASE_DIR/$CATEGORY"
  [[ -d "$DIR" ]] || continue
  
  MP3_FILES=()
  while IFS= read -r -d '' f; do
    MP3_FILES+=("$f")
  done < <(find "$DIR" -maxdepth 1 -name "*.mp3" -print0 2>/dev/null | sort -z)
  
  [[ ${#MP3_FILES[@]} -eq 0 ]] && continue
  
  if $FIRST_CAT; then
    FIRST_CAT=false
  else
    TRACKS_JSON+=","
  fi
  
  TRACKS_JSON+="\"$CATEGORY\":["
  
  FIRST=true
  for f in "${MP3_FILES[@]}"; do
    BASENAME=$(basename "$f")
    DISPLAY=$(echo "$BASENAME" | sed 's/-[0-9]*\.mp3$//' | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    REL_PATH=$(python3 -c "import os,sys; print(os.path.relpath(sys.argv[1], os.path.dirname(sys.argv[2])))" "$f" "$OUTPUT_HTML")
    
    if $FIRST; then
      FIRST=false
    else
      TRACKS_JSON+=","
    fi
    
    TRACKS_JSON+="{\"name\":\"$DISPLAY\",\"file\":\"$REL_PATH\"}"
  done
  
  TRACKS_JSON+="]"
done

TRACKS_JSON+="}"

# Generate HTML with embedded player
cat > "$OUTPUT_HTML" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audio Preview</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; color: #fff; min-height: 100vh; padding: 2rem; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin-bottom: 2rem; text-align: center; }
    .category { margin-bottom: 2rem; }
    .category-title { font-size: 1.1rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid; }
    .tracks { display: flex; flex-direction: column; gap: 0.5rem; }
    .track { display: flex; align-items: center; gap: 1rem; background: #1a1a1a; padding: 0.75rem 1rem; border-radius: 8px; }
    .track-name { flex: 1; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .play-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: #333; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .play-btn:hover { background: #444; }
    .play-btn.playing { background: var(--accent); }
    .progress { flex: 2; height: 4px; background: #333; border-radius: 2px; overflow: hidden; cursor: pointer; }
    .progress-bar { height: 100%; background: var(--accent); width: 0%; transition: width 0.1s; }
    .time { font-size: 0.75rem; color: #888; width: 40px; text-align: right; }
    @media (max-width: 600px) { .track { flex-wrap: wrap; } .progress { order: 3; flex: 1 1 100%; margin-top: 0.5rem; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎵 Audio Preview</h1>
    <div id="categories"></div>
  </div>
  <script>
    const trackData = $TRACKS_JSON;
    const categories = document.getElementById('categories');
    const colors = { music: '#22c55e', sfx: '#eab308', voice: '#3b82f6' };
    const labels = { music: 'Music', sfx: 'Sound Effects', voice: 'Voice' };
    let currentAudio = null;
    let currentBtn = null;

    function formatTime(s) {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' + sec : sec);
    }

    function playTrack(btn, file, progressBar, timeDisplay) {
      if (currentBtn && currentBtn !== btn) {
        currentBtn.classList.remove('playing');
        currentBtn.innerHTML = '▶';
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
      }
      
      if (currentBtn === btn && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        btn.classList.remove('playing');
        btn.innerHTML = '▶';
        return;
      }
      
      if (!currentAudio || currentBtn !== btn) {
        currentAudio = new Audio(file);
        currentAudio.addEventListener('timeupdate', () => {
          const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
          progressBar.style.width = pct + '%';
          timeDisplay.textContent = formatTime(currentAudio.currentTime);
        });
        currentAudio.addEventListener('ended', () => {
          btn.classList.remove('playing');
          btn.innerHTML = '▶';
          progressBar.style.width = '0%';
          timeDisplay.textContent = '0:00';
        });
      }
      
      currentAudio.play();
      currentBtn = btn;
      btn.classList.add('playing');
      btn.innerHTML = '⏸';
    }

    for (const [cat, tracks] of Object.entries(trackData)) {
      const catDiv = document.createElement('div');
      catDiv.className = 'category';
      catDiv.innerHTML = '<div class="category-title" style="border-color:' + colors[cat] + ';color:' + colors[cat] + '">' + labels[cat] + '</div><div class="tracks"></div>';
      const tracksDiv = catDiv.querySelector('.tracks');
      
      for (const track of tracks) {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        trackDiv.style.setProperty('--accent', colors[cat]);
        trackDiv.innerHTML = '<button class="play-btn">▶</button><span class="track-name">' + track.name + '</span><div class="progress"><div class="progress-bar"></div></div><span class="time">0:00</span>';
        
        const btn = trackDiv.querySelector('.play-btn');
        const pb = trackDiv.querySelector('.progress-bar');
        const td = trackDiv.querySelector('.time');
        
        btn.addEventListener('click', () => playTrack(btn, track.file, pb, td));
        tracksDiv.appendChild(trackDiv);
      }
      
      categories.appendChild(catDiv);
    }
  </script>
</body>
</html>
HTMLEOF

TOTAL=0
for cat in music sfx voice; do
  d="$BASE_DIR/$cat"
  [[ -d "$d" ]] && TOTAL=$((TOTAL + $(find "$d" -maxdepth 1 -name "*.mp3" 2>/dev/null | wc -l)))
done

echo "Player built: $OUTPUT_HTML ($TOTAL tracks)" >&2
echo "$OUTPUT_HTML"
