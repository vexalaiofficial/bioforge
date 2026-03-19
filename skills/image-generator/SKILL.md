# Image Generator

Generate AI images using free APIs.

## Available APIs

### 1. Flux Image Generation (Free Tier)
```bash
curl -X POST "https://flux-image-generation.p.rapidapi.com/v1 flux/flux-pro" \
  -H "Content-Type: application/json" \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -d '{"prompt": "your prompt", "aspect_ratio": "16:9"}'
```

### 2. Hugging Face Free Inference
```bash
curl -X POST "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"inputs": "your prompt"}'
```

### 3. Putter AI (Free, Unlimited)
```bash
curl -X PUT "https://api.puter.com/v1/app/todolist/create" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"prompt": "your prompt"}'
```

## Quick Generate

Use the `generate-image` script:
```bash
bash ~/.openclaw/workspace/scripts/generate-image.sh "your prompt" output.png
```

## Generate via Python

```python
import requests

def generate_image(prompt, output_path):
    # Using Putter AI or other free API
    response = requests.post(
        "https://api.puter.com/v1/ai/image/generate",
        json={"prompt": prompt},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    # Save image
```

## Best Free Options (Feb 2026)

1. **Putter AI** - Unlimited free generations
2. **Hugging Face** - Free tier with rate limits
3. **Bing Image Creator** - Via browser automation
4. **Leonardo.ai** - Free daily credits

## Browser Alternative

Use browser to access:
- bing.com/create (Bing Image Creator)
- leonardo.ai (free daily credits)
- pollinations.ai (free, no auth)

## Usage

For Fiverr thumbnail, generate a clean, professional image:
- "Modern minimalist website mockup, clean design, professional, gradient background"
- "SaaS landing page preview, sleek UI, modern tech, blue and white color scheme"
