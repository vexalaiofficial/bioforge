# TOOLS.md - Local Notes

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## gog (Google Workspace)
- Path: `/opt/homebrew/bin/gog`
- Auth: vexalaiofficial@gmail.com (gmail, calendar, drive)
- Contacts ✓ (People API enabled)
- Set `GOG_ACCOUNT=vexalaiofficial@gmail.com` to avoid repeat --account flag

## SearXNG (Metasearch Engine)
- Location: http://localhost:8888
- Config: ~/.openclaw/searxng/config/settings.yml
- Data: ~/.openclaw/searxng/data/
- API: curl "http://localhost:8888/search?q=QUERY&format=json"
- Management: docker start/stop/restart searxng
- Web UI: http://localhost:8888

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
