# Transcribix

A program leveraging local AI models for captioning videos.

All models run 100% locally. No API keys, no tokens, no internet at runtime.

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge)](LICENSE)

## Features

- 11 local speech-to-text models compared
- Word-level timestamps for caption generation
- SRT, VTT, and **ASS subtitles with custom styling** (font, color, size, position, outline, shadow)
- **Configurable words per caption chunk** (1-8 words)
- **Burn subtitles directly onto video** with ffmpeg
- **Colorful CLI** with verbose output, system info, and position preview
- **Gradio Web UI** for browser-based use
- Interactive file selection (CLI lists media files or accepts manual path)
- No API keys required — everything runs on your hardware
- GPU and CPU support with auto-detection
- Multiple language support (up to 99 languages)

## Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Python | 3.10+ | 3.11 |
| RAM | 8 GB | 16 GB+ |
| GPU VRAM | 1 GB (Moonshine) | 6 GB+ (large-v3 models) |
| GPU | Any CUDA-capable | NVIDIA RTX 3060+ |
| Disk | 2 GB | 10 GB+ (models vary) |
| OS | Linux, macOS, Windows | Linux (best CUDA support) |
| ffmpeg | Required for video burning | Latest version |

**Note:** CPU-only mode works but is 5-10x slower than GPU. Use Python 3.11 for best compatibility with PyTorch. All models auto-detect GPU/CPU availability.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/C0m3b4ck/Transcribix.git
cd Transcribix

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install all models (or pick individual requirements files)
pip install -r requirements/all_models.txt

# Or install just one model
pip install -r requirements/faster_whisper.txt
```

## Usage

### CLI Mode

```bash
python captioning_comparison.py
```

The CLI will:
1. Display system information (OS, Python, GPU, ffmpeg)
2. Scan for media files and let you select one (or type a path)
3. Prompt for subtitle styling with a visual position preview
4. Show model details and real-time transcription progress
5. Generate SRT + ASS subtitle files and burn them onto video

### Gradio Web UI

```bash
pip install gradio
python app.py
```

Then open `http://localhost:7860` in your browser.

The web UI provides:
- File upload or file path input
- Model selection with live info display
- Full subtitle styling controls (font, color, size, position, outline, shadow)
- One-click transcription and subtitle burning
- Downloadable SRT/ASS files and burned video

To expose on your local network (e.g. for access from other devices):
```bash
python app.py --host 0.0.0.0 --port 7860
```

## CLI Example Output

```
╔══════════════════════════════════════════════════════════════╗
║   Transcribix — Local AI Models for YouTube Captioning      ║
║   11 models compared • 100% offline • No API keys            ║
║   by C0m3b4ck • Apache License 2.0                          ║
╚══════════════════════════════════════════════════════════════╝

System Information:
  OS:           Linux 6.8.0
  Python:        3.11.9
  Machine:       x86_64
  GPU:           NVIDIA RTX 3060 (12.0 GB VRAM)
  ffmpeg:        v8.0.1

Select Audio/Video File:
  Found files in current directory:
    1. my_video.mp4 (53.9 MB)
    2. podcast.wav (120.3 MB)

  Select file (1-2): 1
  Selected: my_video.mp4

SUBTITLE STYLING
────────────────────────────────────────────────────────────────

Available fonts (or type any font name):
   1. Arial
   2. Helvetica
   ...

Select font (number or name): 1
Select color (1-8): 1
Font size (12-72, default 24):
Select position (1-7, default 1):
Outline thickness (0-4, default 2):
Shadow depth (0-3, default 1):
Words per caption (1-8, default 3):

Subtitle Position:
    ┌───┬───┬───┐
    │   │   │   │
    ├───┼───┼───┤
    │   │   │   │
    ├───┼───┼───┤
    │   │ █ │   │
    └───┴───┴───┘

STARTING TRANSCRIPTION
────────────────────────────────────────────────────────────────
Language: en (prob=0.99)
   0.0s →   7.8s  Hello and welcome...
   8.0s →  16.5s  So this is the entire board...

GENERATING OUTPUT FILES
────────────────────────────────────────────────────────────────
  SRT written to captions_faster_whisper.srt (208 blocks)
  ASS written to captions_faster_whisper.ass (208 blocks)

Burning subtitles to video...
Video saved to: output_faster_whisper.mp4

TRANSCRIPTION COMPLETE
────────────────────────────────────────────────────────────────
Summary:
  Words detected:  1234
  Time elapsed:    45.2s
  Words/second:    27.3

Output Files:
  SRT: captions_faster_whisper.srt
  ASS: captions_faster_whisper.ass
  Video: output_faster_whisper.mp4
```

## Supported Audio Formats

| Format | Status |
|--------|--------|
| MP4 | Supported |
| WAV | Supported |
| MP3 | Supported |
| M4A | Supported |
| FLAC | Supported |
| OGG | Supported |
| MKV | Supported |
| AVI | Supported |
| MOV | Supported |
| WebM | Supported |

## Speech-to-Text Models

### Whisper Variants (Same venv)

These models all use the Whisper architecture and can share dependencies.

| Model | VRAM | WER (English) | RTFx | Params | Languages | Word Timestamps | Install |
|-------|------|---------------|------|--------|-----------|-----------------|---------|
| **faster-whisper** | ~2.5 GB (int8) | ~7.4% | ~600x | 1.55B | 99 | Cross-attention | `pip install -r requirements/faster_whisper.txt` |
| **WhisperX** | ~3-10 GB | ~7.4% | ~150x | 1.55B | 99 | Forced alignment (BEST) | `pip install -r requirements/whisperx.txt` |
| **stable-ts** | ~3-10 GB | ~7.4% | ~100x | 1.55B | 99 | Drift-corrected | `pip install -r requirements/stable_ts.txt` |
| **Distil-Whisper** | ~4 GB (fp16) | ~7.5% | ~3,600x | 756M | 99 | Cross-attention | `pip install -r requirements/faster_whisper.txt` |
| **Whisper (original)** | 1-10 GB | ~7.4% | ~1-10x | 39M-1.55B | 99 | Cross-attention DTW | `pip install -r requirements/whisper_original.txt` |
| **whisper.cpp** | 1-10 GB | ~7.4% | ~5-15x (CPU) | 39M-1.55B | 99 | Native GGML | `pip install -r requirements/whisper_cpp.txt` |

### NVIDIA Models (Separate venv recommended)

| Model | VRAM | WER (English) | RTFx | Params | Languages | Word Timestamps | Install |
|-------|------|---------------|------|--------|-----------|-----------------|---------|
| **Parakeet TDT 0.6B** | ~2 GB | 6.32% | ~3,300x | 600M | 25 | Native transducer | `pip install -r requirements/parakeet.txt` |
| **Canary Qwen 2.5B** | ~6 GB | 5.63% | ~458x | 2.5B | English only | None (use with WhisperX) | `pip install -r requirements/canary_qwen.txt` |

### Lightweight Models

| Model | VRAM | WER (English) | RTFx | Params | Languages | Word Timestamps | Install |
|-------|------|---------------|------|--------|-----------|-----------------|---------|
| **Moonshine** | <1 GB | ~10% | ~80x | 61M | 8 | Cross-attention | `pip install -r requirements/moonshine.txt` |
| **SenseVoice (FunASR)** | ~1 GB | ~5.5% | ~50x | 234M | 50+ | Character-level | `pip install -r requirements/sensevoice.txt` |
| **Vosk** | <500 MB | ~12% | ~100x | ~50M | 20+ | Native per-word | `pip install -r requirements/vosk.txt` |

## Model Comparison Summary

| Model | Best For | Accuracy | Speed | VRAM | Ease of Setup |
|-------|----------|----------|-------|------|---------------|
| faster-whisper | General use | Good | Very Fast | Low | Easy |
| WhisperX | Word timestamps | Good | Fast | Medium | Medium |
| stable-ts | Subtitles | Good | Medium | Medium | Easy |
| Parakeet | English accuracy | Best | Fastest | Low | Hard (NeMo) |
| Canary Qwen | Top accuracy | Best | Medium | High | Hard (NeMo) |
| Distil-Whisper | Speed | Good | Fastest | Low | Easy |
| Moonshine | Edge/CPU | Fair | Fast | Very Low | Easy |
| SenseVoice | Languages (50+) | Good | Medium | Low | Medium |
| Vosk | Minimal resources | Fair | Fast | Very Low | Easy |
| Whisper original | Most languages | Good | Slow | High | Easy |
| whisper.cpp | CPU/anything | Good | Medium | High | Medium |

## Project Structure

```
Transcribix/
├── captioning_comparison.py    # Main script: all 11 models, CLI, subtitle generation
├── app.py                      # Gradio web UI
├── requirements/
│   ├── all_models.txt          # Combined dependencies for all models
│   ├── faster_whisper.txt      # Model 1: faster-whisper
│   ├── whisperx.txt            # Model 2: WhisperX
│   ├── stable_ts.txt           # Model 3: stable-ts
│   ├── parakeet.txt            # Model 4: Parakeet TDT
│   ├── canary_qwen.txt         # Model 5: Canary Qwen
│   ├── moonshine.txt           # Model 7: Moonshine
│   ├── sensevoice.txt          # Model 8: SenseVoice
│   ├── vosk.txt                # Model 9: Vosk
│   ├── whisper_original.txt    # Model 10: Whisper original
│   └── whisper_cpp.txt         # Model 11: whisper.cpp
├── .gitignore
├── README.md
└── Output files (generated):
    ├── captions_*.srt          # SRT subtitles
    ├── captions_*.ass          # ASS subtitles (styled)
    └── output_*.mp4            # Video with burned-in subtitles
```

## CUDA Setup (Optional)

If you have an NVIDIA GPU and want GPU acceleration, either:
1. Install CUDA toolkit from your package manager, or
2. Install via pip: `pip install nvidia-cublas-cu12 nvidia-cuda-runtime-cu12`

The script automatically detects CUDA availability and falls back to CPU if not found.

## Known Issues

- **NeMo models:** Parakeet and Canary require `nemo-toolkit[asr]` which has heavy dependencies
- **Whisper.cpp:** Requires C++ build or prebuilt binary; Python bindings less ergonomic
- **ffmpeg:** Required for video burning; must be installed separately

## Credits

Started on July 2026.

### Speech-to-Text Engines

- [faster-whisper](https://github.com/SYSTRAN/faster-whisper) — CTranslate2 Whisper (MIT License)
- [WhisperX](https://github.com/m-bain/whisperX) — Forced phoneme alignment (Apache 2.0)
- [stable-ts](https://github.com/jianfch/stable-ts) — Stabilized timestamps (MIT License)
- [NVIDIA NeMo](https://github.com/NVIDIA/NeMo) — Parakeet & Canary models (Apache 2.0)
- [Moonshine](https://github.com/usefulsensors/moonshine) — Ultra-lightweight ASR (MIT License)
- [FunASR](https://github.com/modelscope/FunASR) — SenseVoice (MIT License)
- [Vosk](https://github.com/alphacep/vosk-api) — Kaldi-based ASR (Apache 2.0)
- [OpenAI Whisper](https://github.com/openai/whisper) — Original implementation (MIT License)
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) — C++ port (MIT License)

### Other

- [Gradio](https://github.com/gradio-app/gradio) — Web UI framework (Apache 2.0)
- [tqdm](https://github.com/tqdm/tqdm) — Progress bars
- [ffmpeg](https://ffmpeg.org) — Video processing

## License

Apache License 2.0
