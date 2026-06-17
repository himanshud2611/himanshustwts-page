# Chinese Frontier AI Research

A static, source-backed tracker of Chinese frontier AI research techniques from 2022 onward.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Update the tracker

Edit `catalog.md` for the main atlas. The web page reads the `Lab-wise Innovation Map` section and renders it as a filterable table.

Each technique item should include:

- lab heading: company or lab cluster, for example `### DeepSeek`.
- `vertical`: one of the core research categories, such as `Pre-training`, `Architecture`, `Inference`, `Reinforcement Learning`, `Agents`, `Multimodal`, `Training Systems`, `Data`, or `Evaluation`.
- `summary`: what the method or research idea is.
- `cost`: concrete efficiency, active-parameter, token, FLOP, MFU, rollout, hardware, or deployment claim when available.
- `alpha`: why the result matters for research direction.
- `links`: prefer primary sources: papers, official blogs, GitHub repos, Hugging Face model cards, ModelScope, or docs.

## Logos

The first table column renders company logos from `logos/`. Drop logo files into that folder using the filenames listed in `logos/README.md`.

If you use PNG/WebP instead of SVG, update the matching path in the `companyLogos` map in `app.js`. Until a file exists, the table falls back to the company name.

## Good source feeds

- DeepSeek: `https://github.com/deepseek-ai`
- Qwen: `https://qwenlm.github.io` and `https://github.com/QwenLM`
- MiniMax: `https://github.com/MiniMax-AI`
- Moonshot/Kimi: `https://github.com/MoonshotAI`
- Z.ai/GLM: `https://z.ai/blog` and `https://github.com/zai-org`
- InternLM / Shanghai AI Lab: `https://github.com/InternLM`
- ByteDance Seed: `https://seed.bytedance.com/en`
- Baidu ERNIE: `https://ernie.baidu.com`
- Tencent Hunyuan: `https://github.com/Tencent-Hunyuan`
- OpenCompass: `https://opencompass.readthedocs.io`
