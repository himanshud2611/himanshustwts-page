# The Chinese AI Research & Innovation Landscape, 2021–2026: A Comprehensive Technical Catalog

## TL;DR
- Chinese AI labs moved from catching up (2021–2023, with GLM, ERNIE 3.0, PanGu-α, CPM, WuDao/CogView) to setting the global open-weight frontier (2024–2026), pioneering durable techniques like Multi-Head Latent Attention (MLA), auxiliary-loss-free MoE load balancing, GRPO/GSPO/CISPO RL algorithms, the Muon/MuonClip optimizer at trillion-parameter scale, and native/sparse attention (NSA, DSA).
- DeepSeek, Alibaba's Qwen/Tongyi, Moonshot AI (Kimi), Zhipu AI (GLM), MiniMax, ByteDance Seed, Tencent Hunyuan, Baidu ERNIE, and Shanghai AI Lab (InternLM/InternVL) are the most prolific, each contributing primary-source papers spanning architecture, pre-training, RL/post-training, multimodality, agents, safety, and domain models.
- Almost every major innovation is documented in a primary source (arXiv, official GitHub, or lab blog) with open weights — this catalog pairs each technique with a verified link, organized by vertical, then company, then chronologically.

## Key Findings
- **Architecture lineage matters**: DeepSeek's MLA (V2, 2024) → auxiliary-loss-free balancing + MTP (V3, Dec 2024) → NSA (Feb 2025) → DSA (V3.2, late 2025) form a coherent efficiency arc copied across the industry. MiniMax's lightning (linear) attention and Moonshot's MuonClip are parallel architecture bets.
- **RL is the 2025 battleground**: GRPO (DeepSeek, Feb 2024) seeded a family — DAPO (ByteDance), GSPO (Qwen), CISPO (MiniMax) — each fixing a specific instability of token-level importance sampling, especially for MoE models.
- **Multimodal and generative breadth**: Qwen-VL/Qwen2.5-VL, GLM-4V/CogVLM, DeepSeek-VL2/Janus-Pro/DeepSeek-OCR, ERNIE-4.5-VL, Kimi-VL, Tencent HunyuanVideo/Hunyuan3D, and Alibaba Wan video span the full any-to-any spectrum.
- **Safety/security** is maturing with native Chinese-language guard models. Qwen3Guard (arXiv:2510.14276, Oct 2025) ships "Generative Qwen3Guard, which casts safety classification as an instruction-following task to enable fine-grained tri-class judgments (safe, controversial, unsafe); and Stream Qwen3Guard, which introduces a token-level classification head for real-time safety monitoring," supporting up to 119 languages under Apache 2.0.

## Lab-wise Innovation Map

### DeepSeek
- **DeepSeekMoE** — Architecture. Fine-grained expert segmentation plus shared-expert isolation for sparse MoE specialization; foundation for later DeepSeek MoE models. (arXiv:2405.04434, https://arxiv.org/abs/2405.04434)
- **Multi-Head Latent Attention (MLA)** — Architecture. Low-rank joint KV compression into a latent vector with decoupled RoPE; DeepSeek-V2 reports 93.3% lower KV cache and 5.76× max generation throughput versus DeepSeek 67B. (arXiv:2405.04434, https://arxiv.org/abs/2405.04434)
- **Auxiliary-loss-free load balancing** — Architecture. Per-expert routing bias balances MoE experts without an auxiliary loss interfering with the language-model gradient. (arXiv:2412.19437, https://arxiv.org/abs/2412.19437)
- **GRPO** — Reinforcement Learning. Group Relative Policy Optimization removes PPO's critic/value model and estimates baselines from group scores; introduced in DeepSeekMath and later used for R1-style reasoning. (arXiv:2402.03300, https://arxiv.org/abs/2402.03300)
- **R1-Zero** — Reinforcement Learning. Pure RL reasoning run without an SFT cold start, producing emergent self-verification, reflection, and longer reasoning behavior. (arXiv:2501.12948, https://arxiv.org/abs/2501.12948)
- **DeepSeek-R1** — Post-training. Cold-start data + multi-stage RL pipeline that made open reasoning models globally legible and distillable. (Nature, https://www.nature.com/articles/s41586-025-09422-z)
- **Reasoning distillation** — Post-training. Distills R1 reasoning behavior into smaller dense/open model families so reasoning is cheaper to serve and easier to run locally. (GitHub, https://github.com/deepseek-ai)
- **Multi-Token Prediction (MTP)** — Pre-training. Adds sequential prediction of future tokens for a denser training signal and speculative decoding; V3 reports 80–90% acceptance for predicting the second subsequent token and 1.8× TPS improvement. (arXiv:2412.19437, https://arxiv.org/abs/2412.19437)
- **FP8 mixed-precision training** — Training Systems. Fine-grained FP8 quantization and high-precision accumulation validated at frontier MoE scale. (arXiv:2412.19437, https://arxiv.org/abs/2412.19437)
- **DualPipe** — Training Systems. Bidirectional pipeline parallelism that overlaps computation and communication for cross-node MoE training. (arXiv:2412.19437, https://arxiv.org/abs/2412.19437)
- **FlashMLA** — Inference. Open decoding kernel optimized for MLA inference on Hopper GPUs. (GitHub, https://github.com/deepseek-ai/FlashMLA)
- **DeepEP** — Training Systems. Expert-parallel communication library / load-balancing system for MoE training and inference efficiency. (GitHub, https://github.com/deepseek-ai/DeepEP)
- **DeepGEMM** — Training Systems. Open GEMM library from DeepSeek Open Source Week for high-performance FP8/low-precision matrix multiplication in training and inference kernels. (GitHub, https://github.com/deepseek-ai/DeepGEMM)
- **Native Sparse Attention (NSA)** — Long-context. Natively trainable sparse attention with coarse compression, fine token selection, and sliding windows; reports up to 9.0× forward, 6.0× backward, and 11.6× decoding speedups at 64K context. (arXiv:2502.11089, https://arxiv.org/abs/2502.11089)
- **DeepSeek Sparse Attention (DSA)** — Long-context. MLA-compatible sparse attention using a lightweight indexer to select top-k KV entries and reduce long-context cost toward linear scaling. (arXiv:2512.02556, https://arxiv.org/abs/2512.02556)
- **Compressed Sparse Attention (CSA)** — Long-context. V4-family compressed sparse attention branch that compresses KV blocks and selects relevant context for 1M-token inference. (Hugging Face, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **Heavily Compressed Attention (HCA)** — Long-context. V4-family attention branch that uses aggressive compression to give the model a cheap global view of very long context. (Hugging Face, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **Manifold-Constrained Hyper-Connections (mHC)** — Architecture. V4-family residual-stream replacement that widens inter-layer signal paths and constrains mixing for stability in very deep models. (Hugging Face, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **Muon optimizer adoption** — Pre-training. V4-family training stack uses Muon-style optimization for faster convergence and stability. (Hugging Face, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **Engram / conditional memory** — Architecture. N-gram-style conditional memory module with deterministic lookup, tokenizer compression, multi-head hashing, contextualized gating, CPU-RAM offload, and prefetch overlap. (arXiv:2601.07372, https://arxiv.org/abs/2601.07372)
- **DeepSeekMath corpus recipe** — Data. 120B math-related tokens mined and mixed with code/natural-language data; introduced GRPO and produced strong math reasoning at 7B scale. (arXiv:2402.03300, https://arxiv.org/abs/2402.03300)
- **DeepSeek-Coder / Coder-V2** — Code. Code-specialized pretraining line that became a substrate for math and reasoning transfer; Coder-V2 extends this with MoE. (arXiv:2401.14196, https://arxiv.org/abs/2401.14196; arXiv:2406.11931, https://arxiv.org/abs/2406.11931)
- **DeepSeek-Prover / Prover-V2** — Domain. Theorem proving via synthetic formal data and later RL-based subgoal decomposition for formal math. (arXiv:2405.14333, https://arxiv.org/abs/2405.14333; arXiv:2504.21801, https://arxiv.org/abs/2504.21801)
- **DeepSeek-VL / VL2** — Multimodal. Vision-language understanding line, with VL2 adding MoE VLM scaling. (arXiv:2403.05525, https://arxiv.org/abs/2403.05525; arXiv:2412.10302, https://arxiv.org/abs/2412.10302)
- **Janus / Janus-Pro** — Multimodal. Decouples visual encoding for unified multimodal understanding and generation; Janus-Pro scales the data/model recipe. (arXiv:2410.13848, https://arxiv.org/abs/2410.13848; arXiv:2501.17811, https://arxiv.org/abs/2501.17811)
- **DeepSeek-OCR** — Multimodal. Optical context compression: maps text into 2D visual tokens to compress documents and explore long-context memory/forgetting tradeoffs. (arXiv:2510.18234, https://arxiv.org/abs/2510.18234; GitHub, https://github.com/deepseek-ai/DeepSeek-OCR)
- **DeepSeek-V3.2-Speciale competitive math recipe** — Reinforcement Learning. High-compute reasoning specialization with large post-training budget for IMO/IOI-style performance. (arXiv:2512.02556, https://arxiv.org/abs/2512.02556)
- **Large-scale agentic task synthesis** — Agents. Reported direction in recent DeepSeek reasoning/agent model work: generate tool-use and long-horizon task data at scale for agentic training. (Hugging Face, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **DSML tool-calling schema** — Agents. DeepSeek-V4 prompt encoding defines DSML markup for tool schemas, tool calls, reasoning blocks, and tool results. (Hugging Face encoding docs, https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/encoding/README.md)

### Alibaba / Qwen
- **Qwen foundation model recipe** — Pre-training. Original Qwen technical report establishing Alibaba's bilingual/multilingual LLM family and open-weight release cadence. (arXiv:2309.16609, https://arxiv.org/abs/2309.16609)
- **Qwen2.5 scaling** — Pre-training. Scaled high-quality pretraining from 7T to 18T tokens and served as the base for Math, Coder, QwQ, VL, and Omni variants. (arXiv:2412.15115, https://arxiv.org/abs/2412.15115)
- **Qwen3 hybrid thinking/non-thinking** — Post-training. One model supports reasoning mode, direct-response mode, and thinking budgets for controllable compute. (arXiv:2505.09388, https://arxiv.org/abs/2505.09388)
- **Qwen3-2507 split variants** — Post-training. Reintroduced instruct-only and thinking-only model variants after community feedback, separating fast instruction following from deeper reasoning when useful. (Docs, https://qwen.readthedocs.io/)
- **QwQ** — Reinforcement Learning. Reasoning-focused Qwen line that preceded Qwen3's hybrid reasoning integration. (GitHub, https://github.com/QwenLM)
- **GSPO** — Reinforcement Learning. Group Sequence Policy Optimization moves importance ratios and clipping to sequence level to stabilize RL for MoE models. (arXiv:2507.18071, https://arxiv.org/abs/2507.18071; blog, https://qwenlm.github.io/blog/gspo/)
- **Qwen-Agent / structured tool calling** — Agents. Tool-call templates, parsers, MCP-style integrations, and reasoning content for multi-turn tool workflows. (Docs, https://qwen.readthedocs.io/en/latest/getting_started/concepts.html)
- **Qwen-Agent long-document RAG** — Retrieval. Agentic RAG recipes for question answering over super-long documents, combining retrieval, tool use, and model context more efficiently than pure long-context prompting. (GitHub, https://github.com/QwenLM/Qwen-Agent)
- **Qwen3-Coder** — Code. Coding-agent model line with tool-call demos and environment interaction support for autonomous programming. (GitHub, https://github.com/QwenLM/Qwen-Agent)
- **Qwen-VL / Qwen2-VL / Qwen2.5-VL** — Multimodal. Open vision-language line for OCR, grounding, document, GUI, and visual reasoning workloads. (arXiv:2308.12966, https://arxiv.org/abs/2308.12966; arXiv:2502.13923, https://arxiv.org/abs/2502.13923)
- **Qwen-Audio / Qwen2-Audio** — Multimodal. Universal audio understanding and audio-language pretraining. (arXiv:2311.07919, https://arxiv.org/abs/2311.07919; arXiv:2407.10759, https://arxiv.org/abs/2407.10759)
- **Qwen3Guard** — Safety. Multilingual safety guard model family with generative and streaming classifiers for fine-grained real-time moderation. (arXiv:2510.14276, https://arxiv.org/abs/2510.14276)
- **Qwen3 Embedding / Reranker** — Retrieval. Embedding and reranking models initialized from Qwen3 with instruction-aware retrieval and MRL support. (arXiv:2506.05176, https://arxiv.org/abs/2506.05176)
- **Wan video models** — Multimodal. Open large-scale video generation models from Alibaba. (arXiv:2503.20314, https://arxiv.org/abs/2503.20314)

### Moonshot AI / Kimi
- **Kimi k1.5 long-context RL** — Reinforcement Learning. Scales RL context to 128K for reasoning without MCTS, value functions, or process reward models. (arXiv:2501.12599, https://arxiv.org/abs/2501.12599)
- **Mooncake** — Serving. KV-cache-centric disaggregated serving architecture for long-context Kimi-style inference. (Kimi blog, https://www.kimi.com/blog/)
- **MoBA** — Long-context. Mixture of Block Attention for long-context LLMs, listed in Kimi's official research feed. (Kimi blog, https://www.kimi.com/blog/)
- **Partial rollouts** — Reinforcement Learning. Pauses long unfinished trajectories and resumes them in later RL iterations so long-CoT training does not block rollout workers. (arXiv:2501.12599, https://arxiv.org/abs/2501.12599)
- **Long2short reasoning transfer** — Post-training. Transfers long-CoT gains into shorter, cheaper answers using length-penalty RL, model merging, and rejection sampling. (arXiv:2501.12599, https://arxiv.org/abs/2501.12599)
- **MuonClip** — Pre-training. Adds QK-Clip to Muon to prevent attention-logit explosions; Kimi K2 reports 15.5T-token pretraining with zero loss spikes. (arXiv:2507.20534, https://arxiv.org/abs/2507.20534)
- **Kimi K2 trillion-parameter MoE** — Architecture. 1T total / 32B active MoE optimized for non-thinking frontier knowledge, math, coding, and agentic tasks. (Project page, https://moonshotai.github.io/Kimi-K2/)
- **Large-scale agentic data synthesis** — Agents. Synthesizes tools, agents, tasks, rubrics, and trajectories across real/synthetic environments for tool-use learning. (arXiv:2507.20534, https://arxiv.org/abs/2507.20534)
- **Self-critique rubric reward** — Reinforcement Learning. Combines verifiable rewards with model-generated rubric feedback for subjective tasks where exact answers are unavailable. (arXiv:2507.20534, https://arxiv.org/abs/2507.20534)
- **Gym-like general RL framework** — Reinforcement Learning. Extensible environment framework for training across verifiable and non-verifiable tasks. (arXiv:2507.20534, https://arxiv.org/abs/2507.20534)
- **Kimi-VL / Kimi-VL-Thinking** — Multimodal. MoE vision-language model with native-resolution MoonViT, long context, and long-CoT visual reasoning. (arXiv:2504.07491, https://arxiv.org/abs/2504.07491; GitHub, https://github.com/MoonshotAI/Kimi-VL)
- **Kimina-Prover** — Domain. Moonshot formal/math reasoning line for theorem proving, listed in Kimi's official research feed. (Kimi blog, https://www.kimi.com/blog/)
- **Kimi-Audio** — Multimodal. Audio model line from Moonshot's official research feed for speech/audio understanding and generation. (Kimi blog, https://www.kimi.com/blog/)
- **Kimi-Dev** — Code. Open coding model line from Moonshot's research feed, positioned for software engineering tasks. (Kimi blog, https://www.kimi.com/blog/)
- **Kimi-Researcher** — Agents. Research-agent direction from Moonshot's official feed, focused on long-form information seeking and synthesis. (Kimi blog, https://www.kimi.com/blog/)
- **Kimi Vendor Verifier** — Evaluation. Official Kimi research item for verifying vendor/tool behavior in agentic workflows. (Kimi blog, https://www.kimi.com/blog/)
- **Agent Swarm / Parallel-Agent RL** — Agents. Kimi K2.5 introduces self-directed parallel orchestration with up to 100 sub-agents and Parallel-Agent Reinforcement Learning. (Kimi blog, https://www.kimi.com/blog/kimi-k2-5; arXiv:2602.02276, https://arxiv.org/abs/2602.02276)
- **WorldVQA** — Multimodal. Moonshot research item around world/visual question answering, listed in the official research feed. (Kimi blog, https://www.kimi.com/blog/)
- **Kimi K2.6** — Code. Official Kimi research feed lists K2.6 as advancing open-source coding capability. (Kimi blog, https://www.kimi.com/blog/)

### MiniMax
- **Lightning Attention** — Architecture. I/O-aware linear attention variant interleaved with softmax attention for long reasoning and million-token context. (arXiv:2501.08313, https://arxiv.org/abs/2501.08313)
- **MiniMax-01 / Text-01 hybrid MoE** — Architecture. 456B total / 45.9B active MoE with Lightning Attention, softmax attention, and long-context training. (GitHub, https://github.com/MiniMax-AI/MiniMax-01)
- **LASP+** — Training Systems. Linear Attention Sequence Parallelism Plus improves sequence parallelism for long-context linear attention. (arXiv:2501.08313, https://arxiv.org/abs/2501.08313)
- **Varlen ring attention** — Training Systems. Reduces redundant computation for packed long sequences in the MiniMax-01 training stack. (arXiv:2501.08313, https://arxiv.org/abs/2501.08313)
- **CISPO** — Reinforcement Learning. Clips importance-sampling weights instead of token updates to stabilize long-CoT RL for MiniMax-M1. (arXiv:2506.13585, https://arxiv.org/abs/2506.13585)
- **MiniMax-M1 efficient test-time compute** — Inference. Uses Lightning Attention so 100K-token generation consumes roughly 25% of DeepSeek-R1 FLOPs while supporting 1M context. (arXiv:2506.13585, https://arxiv.org/abs/2506.13585)
- **MiniMax Sparse Attention (MSA)** — Long-context. M3-era sparse attention selects relevant KV blocks for 1M-token multimodal/agentic workloads. (GitHub, https://github.com/MiniMax-AI/MiniMax-M3)
- **MiniMax-M3 multimodal long-horizon agents** — Agents. Native multimodal model positioned for long-horizon coding, video understanding, and agent workflows. (GitHub, https://github.com/MiniMax-AI/MiniMax-M3)
- **MiniMax-VL-01 dynamic-resolution vision** — Multimodal. Visual model built on MiniMax-Text-01 with ViT-MLP-LLM architecture and dynamic image tiling/resolution for multimodal reasoning. (GitHub, https://github.com/MiniMax-AI/MiniMax-01)

### Zhipu AI / GLM
- **GLM autoregressive blank infilling** — Pre-training. Unifies understanding and generation with blank-infilling pretraining objective. (arXiv:2103.10360, https://arxiv.org/abs/2103.10360)
- **GLM-130B** — Pre-training. Early open bilingual 130B foundation model and anchor for the later GLM/ChatGLM family. (arXiv:2210.02414, https://arxiv.org/abs/2210.02414)
- **ChatGLM / GLM-4 alignment stack** — Post-training. Chinese-English chat alignment and multi-stage post-training that led into GLM-4. (arXiv:2406.12793, https://arxiv.org/abs/2406.12793)
- **GLM-4 All Tools** — Agents. Tool-using GLM-4 variant that plans and calls browser, Python, image, and external tools for complex tasks. (arXiv:2406.12793, https://arxiv.org/abs/2406.12793)
- **GLM-4.5 depth-over-width MoE** — Architecture. 355B total / 32B active MoE prioritizing depth, 96 attention heads, GQA, QK-Norm, MTP, and Muon optimizer. (arXiv:2508.06471, https://arxiv.org/abs/2508.06471)
- **Hybrid thinking/non-thinking mode** — Post-training. GLM-4.5 family supports reasoning/tool mode and fast direct-response mode. (Blog, https://z.ai/blog/glm-4.5)
- **GLM-4.6 / GLM-4.7 ARC iterations** — Agents. Follow-on open GLM releases refining the Agentic, Reasoning, and Coding model line. (GitHub, https://github.com/zai-org/GLM-4.5)
- **GLM-5 agentic engineering** — Agents. Scales to 744B total / 40B active, integrates DSA, and targets complex systems engineering and long-horizon agentic tasks. (Blog, https://z.ai/blog/glm-5)
- **GLM-Z1 reasoning transfer** — Reinforcement Learning. Reasoning model line whose capabilities feed into GLM-4.5's hybrid reasoning stack. (Blog, https://z.ai/blog/glm-4.5)
- **slime RL infrastructure** — Training Systems. Megatron + SGLang RL framework for synchronous/asynchronous agentic rollouts, long-horizon tasks, sandboxes, tools, and verifiers. (GitHub, https://github.com/THUDM/slime)
- **Difficulty-curriculum RL for ARC** — Reinforcement Learning. GLM-4.5 post-training targets agentic, reasoning, and coding tasks with full-context RL, dynamic sampling temperatures, and adaptive clipping. (Blog, https://z.ai/blog/glm-4.5)
- **CogView / CogView2** — Multimodal. Early transformer-based text-to-image generation line from the WuDao era. (arXiv:2105.13290, https://arxiv.org/abs/2105.13290)
- **CogVLM** — Multimodal. Visual expert module plugged into pretrained language models for vision-language understanding. (arXiv:2311.03079, https://arxiv.org/abs/2311.03079)
- **CogAgent** — Agents. Vision-language model for GUI agents and screen interaction. (arXiv:2312.08914, https://arxiv.org/abs/2312.08914)

### ByteDance Seed
- **DAPO** — Reinforcement Learning. Decoupled Clip and Dynamic sAmpling Policy Optimization; open large-scale RL recipe with clip-higher, dynamic sampling, token-level loss, and overlong filtering. (arXiv:2503.14476, https://arxiv.org/abs/2503.14476)
- **Seed-Coder data curation** — Data. Model-centric code data pipeline where LLMs help curate and filter GitHub/code-web data for 8B code models. (arXiv:2506.03524, https://arxiv.org/abs/2506.03524)
- **Seed-Coder reasoning** — Code. LongCoT RL and GRPO/DAPO-style training for multi-step code reasoning. (arXiv:2506.03524, https://arxiv.org/abs/2506.03524)
- **Seed1.5-VL** — Multimodal. Efficient VLM with 532M vision encoder and 20B active MoE LLM for general visual reasoning, video, and GUI tasks. (arXiv:2505.07062, https://arxiv.org/abs/2505.07062; GitHub, https://github.com/ByteDance-Seed/Seed1.5-VL)
- **Seed1.5-Thinking** — Reinforcement Learning. Reasoning model advanced via RL. (arXiv:2504.13914, https://arxiv.org/abs/2504.13914)
- **Seed Diffusion Preview** — Code. Discrete-state diffusion language model for code generation with non-sequential parallel decoding, reporting 2,146 token/s on H20 GPUs while preserving competitive code benchmark quality. (arXiv:2508.02193, https://arxiv.org/abs/2508.02193)
- **Seedream reasoning + search generation** — Multimodal. Image generation approach that adds deeper visual reasoning and real-time web search so generation can use current facts and better resolve complex spatial/textual instructions. (ByteDance Seed blog, https://seed.bytedance.com/en/blog/deeper-thinking-more-accurate-generation-introducing-seedream-5-0-lite)
- **Seedance 2.0 unified audio-video generation** — Multimodal. Native multimodal audio-video generation architecture supporting text, image, audio, and video inputs for controllable generation, reference editing, and long-term consistency. (arXiv:2604.14148, https://arxiv.org/abs/2604.14148; ByteDance Seed blog, https://seed.bytedance.com/en/blog/seedance-2-0-official-launch)
- **VeOmni model-centric distributed recipes** — Training Systems. PyTorch-native omni-modal training framework that decouples model definitions from distributed parallel logic, composing FSDP, sequence parallelism, and expert parallelism across modalities. (arXiv:2508.02317, https://arxiv.org/abs/2508.02317; GitHub, https://github.com/ByteDance-Seed/VeOmni)
- **Seed2.0 long-horizon agent execution** — Agents. System-level foundation-model recipe emphasizing multi-turn instruction following, structured output stability, tool use, and iterative plan-act-reflect cycles for real-world workflows. (GitHub, https://github.com/ByteDance-Seed/Seed2.0; ByteDance Seed, https://seed.bytedance.com/en/seed2)
- **Seed3D 2.0 two-stage geometry + unified PBR** — Multimodal. Simulation-ready 3D generation with coarse-to-fine geometry, locality-aware VAE compression, unified PBR texture/material generation, MoE scaling, and VLM semantic conditioning. (arXiv:2605.13862, https://arxiv.org/abs/2605.13862; ByteDance Seed blog, https://seed.bytedance.com/en/blog/seed3d-2-0-released-higher-precision-and-greater-usability)
- **UI-TARS** — Agents. Native GUI agent VLM trained from screenshots for perception, grounding, reasoning, memory, and action. (arXiv:2501.12326, https://arxiv.org/abs/2501.12326)
- **UI-TARS-1.5** — Agents. Adds RL-enabled reasoning before action for GUI and OS-world tasks. (HuggingFace, https://huggingface.co/ByteDance-Seed/UI-TARS-1.5-7B)
- **UI-TARS-2** — Agents. Multi-turn RL for GUI agents with a data flywheel, hybrid GUI environment, and DAPO-style clipping. (arXiv:2509.02544, https://arxiv.org/abs/2509.02544)

### Tencent Hunyuan
- **Hunyuan-Large mixed expert routing** — Architecture. 389B total / 52B active MoE with mixed expert routing, KV-cache compression, expert-specific LR, and large synthetic data. (arXiv:2411.02265, https://arxiv.org/abs/2411.02265)
- **Hunyuan-A13B fine-grained MoE** — Architecture. 80B total / 13B active fine-grained MoE model optimized for efficient reasoning and general use. (GitHub, https://github.com/Tencent-Hunyuan/Hunyuan-A13B)
- **Hunyuan-DiT** — Multimodal. Multi-resolution diffusion transformer with fine-grained Chinese text understanding. (arXiv:2405.08748, https://arxiv.org/abs/2405.08748)
- **HunyuanVideo** — Multimodal. Large video-generation system and open model line. (arXiv:2412.03603, https://arxiv.org/abs/2412.03603)
- **HunyuanVideo 1.5** — Multimodal. Adds SSTA, glyph-aware text encoding, and video super-resolution network. (arXiv:2511.18870, https://arxiv.org/abs/2511.18870)
- **Hunyuan3D** — Multimodal. Open text/image-to-3D asset generation line with PBR material support in 2.1. (GitHub, https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1)
- **HunyuanImage 3.0** — Multimodal. Open image generation/understanding model built on Hunyuan-A13B with LLM-based image understanding/generation and CoT training. (arXiv:2509.23951, https://arxiv.org/abs/2509.23951)
- **HunyuanWorld** — Multimodal. Open immersive 3D world generation direction. (GitHub, https://github.com/Tencent-Hunyuan/Hunyuan3D-2)
- **Tencent Hunyuan GitHub stack** — Training Systems. Official Hunyuan organization hosts HunyuanVideo, Hunyuan3D, HunyuanDiT, HunyuanImage, Hunyuan-A13B, and related open model tooling. (GitHub, https://github.com/Tencent-Hunyuan)

### Baidu ERNIE
- **ERNIE 3.0** — Pre-training. Knowledge-enhanced pretraining unifying auto-encoding and auto-regressive objectives. (arXiv:2107.02137, https://arxiv.org/abs/2107.02137)
- **ERNIE 3.0 Titan** — Pre-training. 260B-parameter scaled knowledge-enhanced model. (arXiv:2112.12731, https://arxiv.org/abs/2112.12731)
- **ERNIE 4.5 heterogeneous multimodal MoE** — Architecture. Modality-isolated routing with text experts, vision experts, shared experts, router orthogonal loss, and multimodal token-balanced loss. (Blog, https://ernie.baidu.com/blog/posts/ernie4.5/)
- **ERNIE 4.5 PaddlePaddle toolchain** — Training Systems. Open model family plus PaddlePaddle training, inference, quantization, and deployment tooling. (GitHub, https://github.com/PaddlePaddle/ERNIE)
- **ERNIEKit** — Training Systems. Industrial development toolkit for SFT, LoRA, DPO, QAT, PTQ, compression, and full-cycle ERNIE development. (Blog, https://ernie.baidu.com/blog/posts/ernie4.5/)
- **ERNIE-4.5-VL** — Multimodal. Vision-language model family with thinking variants, visual grounding, reward model, GRPO, and DAPO-style sampling/filtering. (HuggingFace, https://huggingface.co/baidu/ERNIE-4.5-VL-424B-A47B-Base-PT)
- **ERNIE-4.5-VL-28B-A3B-Thinking** — Multimodal. Lightweight VL reasoning model with 28B total / 3B active parameters, multimodal reasoning, grounding, GSPO/IcePop strategies, and "Thinking with Images" with zoom/search tools. (ERNIE blog, https://ernie.baidu.com/blog/posts/ernie-4.5-vl-28b-a3b-thinking/; Hugging Face, https://huggingface.co/baidu/ERNIE-4.5-VL-28B-A3B-Thinking)
- **ERNIE 5.0 native multimodal autoregression** — Multimodal. Unified text/image/audio/video framework with ultra-sparse MoE and next-group-of-tokens prediction. (arXiv:2602.04705, https://arxiv.org/abs/2602.04705)

### Huawei / Pangu
- **PanGu-α** — Pre-training. Large Chinese autoregressive LM with auto-parallel computation up to 200B parameters. (arXiv:2104.12369, https://arxiv.org/abs/2104.12369)
- **PanGu-Σ** — Training Systems. Trillion-parameter sparse model trained on Ascend 910 with MindSpore and expert computation/storage separation. (arXiv:2303.10845, https://arxiv.org/abs/2303.10845)
- **Pangu Ultra dense** — Training Systems. 135B dense model trained on Ascend NPUs with depth-scaled sandwich norm for stability. (arXiv:2504.07866, https://arxiv.org/abs/2504.07866)
- **Pangu Ultra MoE** — Training Systems. 718B sparse MoE training recipe on Ascend NPUs with expert-parallel and memory-efficiency optimizations. (arXiv:2505.04519, https://arxiv.org/abs/2505.04519)
- **Pangu-Weather** — Domain. 3D high-resolution neural weather forecasting published in Nature. (arXiv:2211.02556, https://arxiv.org/abs/2211.02556)

### Shanghai AI Lab / InternLM / InternVL
- **InternLM** — Pre-training. Multilingual foundation model and open toolchain around training, deployment, agents, and evaluation. (GitHub, https://github.com/InternLM/InternLM)
- **InternLM2** — Pre-training. Canonical InternLM2 paper for the Shanghai AI Lab foundation model line. (arXiv:2403.17297, https://arxiv.org/abs/2403.17297)
- **InternLM-Math** — Domain. Bilingual math reasoning models with verifiable reasoning checkpoints and evaluation code. (arXiv:2402.06332, https://arxiv.org/abs/2402.06332)
- **InternVL** — Multimodal. Vision foundation model scaling line for visual-linguistic tasks. (arXiv:2312.14238, https://arxiv.org/abs/2312.14238)
- **LMDeploy** — Serving. Compression, deployment, and serving toolkit for LLMs. (GitHub, https://github.com/InternLM/lmdeploy)
- **XTuner** — Training Systems. Fine-tuning engine for LLMs and MoE models. (GitHub, https://github.com/InternLM/xtuner)
- **Lagent** — Agents. Lightweight framework for building LLM-based agents. (GitHub, https://github.com/InternLM/lagent)
- **OpenCompass** — Evaluation. Chinese/global LLM evaluation platform and benchmark stack. (Docs, https://opencompass.readthedocs.io/)

### BAAI / FlagOpen / OpenBMB
- **CPM** — Pre-training. First large-scale generative Chinese pretrained LM. (arXiv:2012.00413, https://arxiv.org/abs/2012.00413)
- **CPM-2** — Pre-training. Cost-effective large-scale pretraining plus MoE. (arXiv:2106.10715, https://arxiv.org/abs/2106.10715)
- **WuDao / CogView-era generative work** — Multimodal. Major early Chinese multimodal/generative scaling program. (CogView arXiv:2105.13290, https://arxiv.org/abs/2105.13290)
- **BGE-M3** — Retrieval. Multi-functional, multilingual, multi-granular embeddings with dense/sparse/multi-vector retrieval. (arXiv:2402.03216, https://arxiv.org/abs/2402.03216; GitHub, https://github.com/FlagOpen/FlagEmbedding)
- **MiniCPM** — Pre-training. Small language models with scalable training strategies. (arXiv:2404.06395, https://arxiv.org/abs/2404.06395)

### 01.AI
- **Yi foundation models** — Pre-training. 01.AI open bilingual foundation models with data-quality emphasis, long-context variants, and Yi-VL. (arXiv:2403.04652, https://arxiv.org/abs/2403.04652)
- **Yi-Lightning** — Architecture. Hybrid dense-MoE language model line from 01.AI, positioned as the larger efficient Yi family variant. (Official, https://www.01.ai/yi-models)
- **Yi-Coder** — Code. Sub-10B open code model line focused on strong coding performance at small scale. (HuggingFace, https://huggingface.co/01-ai)
- **Yi-Coder 128K** — Code. Small code model line supporting 128K long-context modeling and 52 programming languages. (Official, https://www.01.ai/yi-models)
- **Yi-VL** — Multimodal. Vision-language model line supporting bilingual text-image conversations and image-text recognition. (Official, https://www.01.ai/yi-models)

### Baichuan AI
- **Baichuan 2** — Pre-training. 7B/13B multilingual models trained from scratch on 2.6T tokens with intermediate checkpoints for training-dynamics research. (arXiv:2309.10305, https://arxiv.org/abs/2309.10305)
- **Baichuan-Omni-1.5** — Multimodal. End-to-end omni-modal model supporting text, image, video, and audio inputs with text/audio outputs; especially strong in medical multimodal settings. (GitHub, https://github.com/baichuan-inc/Baichuan-Omni-1.5)
- **Baichuan-M1-14B** — Domain. Medical-focused LLM trained from scratch on 20T medical/general tokens while retaining general math/code capability. (arXiv:2502.12671, https://arxiv.org/abs/2502.12671; GitHub, https://github.com/baichuan-inc/Baichuan-M1-14B)

### StepFun
- **Step-Audio** — Multimodal. Unified 130B speech-text model plus speech data engine, instruction-driven voice control, and tool/role-play capabilities for intelligent speech interaction. (arXiv:2502.11946, https://arxiv.org/abs/2502.11946; GitHub, https://github.com/stepfun-ai/Step-Audio)
- **Step-Audio 2** — Multimodal. End-to-end audio LLM with latent audio encoding, discrete audio token generation, reasoning-centric RL, RAG, and external audio/search tools. (arXiv:2507.16632, https://arxiv.org/abs/2507.16632; GitHub, https://github.com/stepfun-ai/Step-Audio2)
- **Step-Audio-R1 / R1.5** — Reinforcement Learning. Audio reasoning model line using modality-grounded reasoning distillation and later RLHF-style optimization for long-turn speech dialogue. (GitHub, https://github.com/stepfun-ai/Step-Audio-R1)
- **Step3 MFA + AFD** — Architecture. 321B MoE multimodal model co-designed with Multi-Matrix Factorization Attention and Attention-FFN Disaggregation for cost-effective decoding. (Official, https://chat.stepfun.com/research/en/step3)
- **StepMesh** — Training Systems. GPUDirect RDMA communication library for attention/FFN disaggregation with low latency and zero SM usage. (Official, https://chat.stepfun.com/research/en/step3)

### Kuaishou / Kling / KAT
- **KAT-Coder scalable agentic RL** — Code. Agentic coding model line trained with real-world industrial codebases and scalable RL; KAT-Dev-32B is open-source while KAT-Coder is served by API. (Project, https://kwaipilot.github.io/KAT-Coder/)
- **KAT-Coder-V2 specialize-then-unify** — Code. Decomposes agentic coding into SWE, WebCoding, Terminal, WebSearch, and General experts, then unifies via on-policy distillation. (arXiv:2603.27703, https://arxiv.org/abs/2603.27703)
- **Kwai Keye-VL** — Multimodal. Short-video VLM trained on 600B+ video-heavy tokens with staged pretraining, five-mode cold-start reasoning, RL, and KC-MMBench. (arXiv:2507.01949, https://arxiv.org/abs/2507.01949)
- **Kwai Keye-VL-2.0** — Multimodal. MoE long-video VLM that adapts DSA to GQA multimodal architectures, adds MOPD, Context-RL, and Video-RL for agentic video understanding. (arXiv:2606.10651, https://arxiv.org/abs/2606.10651)
- **Kling AI video platform** — Multimodal. Commercial text/image-to-video generation platform with official API and research organization presence. (Docs, https://klingai.com/document-api/quickStart/productIntroduction/overview)

### Ant Group / InclusionAI
- **Ling-1T** — Architecture. Open trillion-parameter Ling/BaiLing MoE foundation model family, with Ling non-thinking, Ring thinking, and Ming multimodal branches. (Press, https://www.antgroup.com/en/news-media/press-releases/1759982400000)
- **Ring-1T** — Reinforcement Learning. Trillion-parameter thinking model trained from Ling-1T-base with icepop RL stabilization and ASystem/AReaL large-scale RL infrastructure. (Hugging Face, https://huggingface.co/inclusionAI/Ring-1T)
- **Ming multimodal series** — Multimodal. InclusionAI's multimodal branch for image, text, audio, and video, built around the Ling model family. (GitHub, https://github.com/inclusionAI)
- **UI-Venus** — Agents. Native screenshot-only UI agent for GUI grounding and navigation. (GitHub, https://github.com/inclusionAI)
- **ASearcher / AWorld** — Agents. Open research-agent projects for search, reproduction, and iterative idea improvement. (GitHub, https://github.com/inclusionAI)

### Xiaomi MiMo
- **MiMo-7B reasoning-first pretraining** — Reinforcement Learning. Compact model trained from scratch for math/code reasoning; releases base, SFT, RL-Zero, and RL checkpoints. (GitHub, https://github.com/XiaomiMiMo/MiMo)
- **MiMo speculative MTP** — Inference. MiMo adds an MTP layer for speculative decoding, with reported high acceptance rate. (GitHub, https://github.com/XiaomiMiMo/MiMo)
- **MiMo-VL-7B** — Multimodal. Native-resolution ViT + MLP projector + MiMo-7B language backbone for compact visual reasoning. (arXiv:2506.03569, https://arxiv.org/abs/2506.03569)
- **Mixed On-policy Reinforcement Learning (MORL)** — Reinforcement Learning. MiMo-VL post-training framework integrating rewards across perception, grounding, reasoning, and preference alignment. (GitHub, https://github.com/XiaomiMiMo/MiMo-VL)

### Meituan LongCat
- **LongCat-Flash dynamic activation MoE** — Architecture. 560B MoE with zero-computation experts and dynamic 18.6B-31.3B activation depending on token/context demand. (arXiv:2509.01322, https://arxiv.org/abs/2509.01322)
- **Shortcut-connected MoE** — Training Systems. LongCat-Flash architecture enlarges the compute-communication overlap window for fast inference. (GitHub, https://github.com/meituan-longcat/LongCat-Flash-Chat)
- **LongCat-Flash-Thinking** — Reinforcement Learning. Reasoning model trained with DORA distributed RL, formal reasoning, agentic reasoning, and tool-use techniques. (GitHub, https://github.com/meituan-longcat/LongCat-Flash-Thinking)
- **Dual-path tool reasoning** — Agents. LongCat-Flash-Thinking retains high-quality queries that genuinely require tool assistance to strengthen adaptive tool use. (GitHub, https://github.com/meituan-longcat/LongCat-Flash-Thinking)
- **LongCat-Video** — Multimodal. Open video generation model line with technical reports for video and avatar generation. (GitHub, https://github.com/meituan-longcat/LongCat-Video)

### SenseTime / SenseNova
- **SenseNova V6 / V6.5 multimodal reasoning** — Multimodal. Commercial multimodal model system using multimodal chain-of-thought, global memory, reinforcement learning, and later interleaved image-text thought chains. (SenseTime, https://www.sensetime.com/en/news-detail/51169566?categoryId=1072; SenseTime V6.5, https://www.sensetime.com/en/news-detail/51169861)
- **SenseNova-MARS** — Agents. Agentic VLM framework for interleaved visual reasoning and tool use with image search, text search, image crop tools, HR-MMSearch, and BN-GSPO. (arXiv:2512.24330, https://arxiv.org/abs/2512.24330; GitHub, https://github.com/OpenSenseNova/SenseNova-MARS; SenseTime, https://www.sensetime.com/en/news-detail/51170506?categoryId=1072)
- **SenseNova-U1** — Multimodal. Native unified multimodal understanding and generation model using the NEO-unify architecture and mixture-of-transformers variants. (arXiv:2605.12500, https://arxiv.org/abs/2605.12500)

## Details

---
### VERTICAL 1: MODEL ARCHITECTURE (attention, MoE, normalization, positional encoding)

**DeepSeek**
- **DeepSeekMoE (fine-grained experts + shared experts)** — 2024. Fine-grained expert segmentation and shared-expert isolation for MoE; foundation of all later DeepSeek MoE models. Introduced in DeepSeek-V2. (arXiv:2405.04434, https://arxiv.org/abs/2405.04434)
- **Multi-Head Latent Attention (MLA)** — May 2024. Low-rank joint KV compression into a latent vector + decoupled RoPE; beats MHA quality with far smaller KV cache. The DeepSeek-V2 abstract states: "compared with DeepSeek 67B, DeepSeek-V2 achieves significantly stronger performance, and meanwhile saves 42.5% of training costs, reduces the KV cache by 93.3%, and boosts the maximum generation throughput to 5.76 times." (arXiv:2405.04434, https://arxiv.org/abs/2405.04434)
- **Auxiliary-loss-free load balancing** — Dec 2024. Per-expert learnable bias added to routing scores (excluded from gating weights) to balance experts without an auxiliary loss that distorts the LM gradient. Introduced in DeepSeek-V3. (arXiv:2412.19437, https://arxiv.org/abs/2412.19437)
- **Native Sparse Attention (NSA)** — Feb 2025. Hardware-aligned, natively trainable sparse attention combining coarse token compression, fine-grained token selection, and a sliding window. The paper (Yuan et al.) reports: "NSA achieves up to 9.0× forward and 6.0× backward speedup at 64k context length during training. In decoding, NSA achieves up to 11.6× speedup at 64k context length," while matching or beating full attention on benchmarks. (arXiv:2502.11089, https://arxiv.org/abs/2502.11089)
- **DeepSeek Sparse Attention (DSA)** — late 2025 (V3.2). A "lightning indexer" (FP8, ReLU, few heads) computes index scores to select top-k KV entries, instantiated under MLA; reduces long-context complexity toward linear with substantial per-token GPU cost reduction. Introduced in DeepSeek-V3.2-Exp and DeepSeek-V3.2. (arXiv:2512.02556, https://arxiv.org/abs/2512.02556)

**Alibaba / Qwen**
- **Qwen3 hybrid thinking/non-thinking architecture** — May 2025. Unified framework integrating reasoning ("thinking") and rapid ("non-thinking") modes with a thinking-budget mechanism; dense + MoE models from 0.6B to 235B (Qwen3-235B-A22B). (arXiv:2505.09388, https://arxiv.org/abs/2505.09388)

**MiniMax**
- **Lightning attention (linear attention) + hybrid MoE** — Jan 2025. MiniMax-01/Text-01: linear-attention-based architecture, 456B total / 45.9B active params, 1M-token training context extrapolating to 4M at inference. (arXiv:2501.08313, https://arxiv.org/abs/2501.08313)

**Moonshot AI**
- See MuonClip under Pre-training. Kimi K2 uses a 1T-param MoE (32B active) with reduced attention heads optimized for inference. (GitHub: https://github.com/MoonshotAI/Kimi-K2; tech report arXiv:2507.20534, https://arxiv.org/abs/2507.20534)

**Zhipu AI**
- **GLM-4.5 depth-over-width MoE** — Aug 2025. 355B total / 32B active MoE; prioritizes depth, 96 attention heads/layer, QK-Norm, GQA, MTP, and the Muon optimizer. (arXiv:2508.06471, https://arxiv.org/abs/2508.06471)

**Baidu**
- **ERNIE 4.5 heterogeneous multimodal MoE** — Jun 2025. Modality-isolated routing with text experts, vision experts, and shared experts; router orthogonal loss + multimodal token-balanced loss; largest variant 424B total / 47B active. (Technical Report: https://yiyan.baidu.com/blog/publication/ERNIE_Technical_Report.pdf; blog https://ernie.baidu.com/blog/posts/ernie4.5/)

**Tencent**
- **Hunyuan-A13B fine-grained MoE** — Jun 2025. 80B total / 13B active fine-grained MoE LLM with dynamic reasoning. (GitHub: https://github.com/Tencent-Hunyuan/Hunyuan-A13B)

**Foundational architecture (2021–2023)**
- **GLM (autoregressive blank infilling)** — Tsinghua/Zhipu, 2021. Unifies understanding and generation via a blank-infilling pretraining objective (ACL 2022). (arXiv:2103.10360, https://arxiv.org/abs/2103.10360)
- **GLM-130B (open bilingual)** — Tsinghua/Zhipu, 2022 (ICLR 2023). (arXiv:2210.02414, https://arxiv.org/abs/2210.02414)

---
### VERTICAL 2: PRE-TRAINING (optimizers, FP8, data, scaling, MTP)

**DeepSeek**
- **FP8 mixed-precision training** — Dec 2024. First validation of FP8 training at extremely large scale; fine-grained 1×128 / 128×128 tile quantization with high-precision accumulation, loss delta <0.25% vs BF16. (DeepSeek-V3, arXiv:2412.19437)
- **Multi-Token Prediction (MTP)** — Dec 2024. Sequential additional-token prediction (maintains causal chain) for a denser training signal; also reused for speculative decoding. The DeepSeek-V3 report states "an MTP module achieves an acceptance rate of 80% to 90% for predicting the second subsequent token, which increases the generation TPS by 1.8x compared to the scenario without the MTP module." (arXiv:2412.19437)
- **DualPipe bidirectional pipeline parallelism** — Dec 2024. Near-full computation–communication overlap for cross-node MoE training. (arXiv:2412.19437)

**Moonshot AI**
- **MuonClip optimizer (Muon + QK-Clip)** — Jul 2025. Combines the token-efficient Muon optimizer with QK-Clip, which caps attention logits to prevent exploding attention scores; enabled a stable 15.5T-token pretraining run of the 1T-param Kimi K2 with no loss-spike interventions. (Kimi K2 Technical Report, arXiv:2507.20534, https://arxiv.org/abs/2507.20534; GitHub https://github.com/MoonshotAI/Kimi-K2)

**Zhipu AI**
- **Muon optimizer at scale + 23T-token multi-stage corpus** — Aug 2025. The GLM-4.5 abstract reports "multi-stage training on 23T tokens"; per InfoQ's coverage this is "a 22T-token corpus, including 7T tokens dedicated to code and reasoning." (arXiv:2508.06471)

**Foundational pre-training (2020–2023)**
- **PanGu-α** — Huawei Noah's Ark + Peng Cheng Lab, 2021. Large autoregressive Chinese LM with auto-parallel computation, up to 200B params. (arXiv:2104.12369, https://arxiv.org/abs/2104.12369)
- **ERNIE 3.0** — Baidu, 2021. Knowledge-enhanced pretraining unifying auto-encoding and auto-regressive networks. (arXiv:2107.02137, https://arxiv.org/abs/2107.02137)
- **ERNIE 3.0 Titan** — Baidu + PCL, 2021. 260B-param scaled version. (arXiv:2112.12731, https://arxiv.org/abs/2112.12731)
- **CPM** — Tsinghua/BAAI, 2020. First large-scale generative Chinese pretrained LM. (arXiv:2012.00413, https://arxiv.org/abs/2012.00413)
- **CPM-2** — Tsinghua/BAAI, 2021. Cost-effective large-scale pretraining + MoE. (arXiv:2106.10715, https://arxiv.org/abs/2106.10715)
- **Qwen Technical Report** — Alibaba, 2023. Origin of the Qwen family. (arXiv:2309.16609, https://arxiv.org/abs/2309.16609)

---
### VERTICAL 3: REINFORCEMENT LEARNING & POST-TRAINING (GRPO, DAPO, GSPO, CISPO, reasoning, RL infra)

**DeepSeek**
- **GRPO (Group Relative Policy Optimization)** — Feb 2024. Critic-free PPO variant that "foregoes the critic model, instead estimating the baseline from group scores, significantly reducing training resources." Introduced in DeepSeekMath; became the most-copied RL algorithm in the field. (arXiv:2402.03300, https://arxiv.org/abs/2402.03300)
- **DeepSeek-R1 / R1-Zero (pure-RL reasoning)** — Jan 2025. R1-Zero trained via large-scale RL with no SFT cold start, exhibiting emergent self-reflection/verification (AIME 2024 pass@1 rose from 15.6% to 71.0%); R1 adds multi-stage training + cold-start data, matching OpenAI-o1-1217. Published in Nature (vol. 645, pp. 633–638, 2025). (arXiv:2501.12948, https://arxiv.org/abs/2501.12948)
- **Scalable RL framework (V3.2)** — late 2025. Allocates a post-training compute budget exceeding 10% of pre-training cost; the high-compute "Speciale" variant achieved gold-medal-level IMO/IOI performance and performs comparably to GPT-5. (arXiv:2512.02556)

**ByteDance Seed**
- **DAPO (Decoupled Clip and Dynamic sAmpling Policy Optimization)** — Mar 2025. Open-source large-scale RL system with four key techniques (decoupled clip / clip-higher, dynamic sampling, token-level loss, overlong filtering); reached 50 points on AIME 2024 with the Qwen2.5-32B base, beating DeepSeek-R1-Zero-Qwen-32B with 50% of the training steps. (arXiv:2503.14476, https://arxiv.org/abs/2503.14476)
- **Seed1.5-Thinking** — Apr 2025. Reasoning model advanced via RL. (arXiv:2504.13914)

**Alibaba / Qwen**
- **GSPO (Group Sequence Policy Optimization)** — Jul 2025. Defines the importance ratio at the sequence level (length-normalized) and performs sequence-level clipping; fixes GRPO's MoE instability (expert-activation volatility — ~10% of activated experts change per gradient step in Qwen3-30B-A3B), and powered Qwen3 RL. (arXiv:2507.18071, https://arxiv.org/abs/2507.18071; blog https://qwenlm.github.io/blog/gspo/)

**MiniMax**
- **CISPO** — Jun 2025. Clips importance-sampling weights rather than token updates; combined with hybrid lightning attention, completed full RL training of MiniMax-M1 on 512 H800s in three weeks for ~$534,700. M1 is the first open-weight large-scale hybrid-attention reasoning model (1M context, consuming ~25% of DeepSeek-R1's FLOPs at 100K generation length). (arXiv:2506.13585, https://arxiv.org/abs/2506.13585; GitHub https://github.com/MiniMax-AI/MiniMax-M1)

**Moonshot AI**
- **Kimi k1.5 (RL scaling for reasoning)** — Jan 2025. Long-context RL scaling + an online policy mirror descent variant; deliberately avoids MCTS, value functions, and process reward models; introduces long2short distillation. Matches OpenAI o1 (77.5 AIME, 96.2 MATH-500, 94th-percentile Codeforces). (arXiv:2501.12599, https://arxiv.org/abs/2501.12599)

**Zhipu AI**
- **slime RL infrastructure** — Aug 2025. Open-source RL infra with decoupled, agent-first design; flexible hybrid (synchronous co-located + asynchronous decoupled) training; three modules (Megatron training, SGLang+Router rollout, Data Buffer). Powered GLM-4.5. (arXiv:2508.06471; GitHub https://github.com/zai-org/GLM-4.5)

---
### VERTICAL 4: ALIGNMENT, SAFETY & SECURITY

**Alibaba / Qwen**
- **Qwen3Guard** — Oct 2025. Multilingual safety guardrail family (0.6B/4B/8B, 119 languages), trained on 1.19M labeled prompts/responses. Two variants: "Generative Qwen3Guard, which casts safety classification as an instruction-following task to enable fine-grained tri-class judgments (safe, controversial, unsafe); and Stream Qwen3Guard, which introduces a token-level classification head for real-time safety monitoring during incremental text generation." Demonstrated as an RLAIF feedback signal; released under Apache 2.0. (arXiv:2510.14276, https://arxiv.org/abs/2510.14276)

---
### VERTICAL 5: MULTIMODAL & VISION-LANGUAGE

**DeepSeek**
- **DeepSeek-VL** — Mar 2024. Real-world vision-language understanding. (arXiv:2403.05525, https://arxiv.org/abs/2403.05525)
- **DeepSeek-VL2 (MoE VLM)** — Dec 2024. (arXiv:2412.10302, https://arxiv.org/abs/2412.10302)
- **Janus** — Oct 2024. Decouples visual encoding for unified multimodal understanding + generation. (arXiv:2410.13848, https://arxiv.org/abs/2410.13848). Related: JanusFlow (arXiv:2411.07975).
- **Janus-Pro** — Jan 2025. Data + model scaling of Janus. (arXiv:2501.17811, https://arxiv.org/abs/2501.17811)
- **DeepSeek-OCR (Contexts Optical Compression)** — Oct 2025. DeepEncoder (SAM-base + CLIP-large, ~380M) + DeepSeek3B-MoE-A570M decoder; compresses text via optical 2D mapping with 97% OCR precision at <10× compression and ~60% at 20×; explores "memory forgetting" for LLM long context, and on OmniDocBench surpasses GOT-OCR2.0 using only 100 vision tokens. (arXiv:2510.18234, https://arxiv.org/abs/2510.18234; GitHub https://github.com/deepseek-ai/DeepSeek-OCR)

**Alibaba / Qwen**
- **Qwen-VL** — 2023. Versatile vision-language model. (arXiv:2308.12966, https://arxiv.org/abs/2308.12966)
- **Qwen-Audio** — 2023. Universal audio understanding via audio-language pretraining. (arXiv:2311.07919, https://arxiv.org/abs/2311.07919). Qwen2-Audio: arXiv:2407.10759.
- **Qwen2-VL** — Sep 2024. (arXiv:2409.12191)
- **Qwen2.5-VL** — Feb 2025. (arXiv:2502.13923, https://arxiv.org/abs/2502.13923)
- **Wan (Wan2.1 video generation)** — Mar 2025. Open large-scale video generative models. (arXiv:2503.20314, https://arxiv.org/abs/2503.20314)

**Zhipu AI**
- **CogView** — 2021. Text-to-image generation via transformers (NeurIPS 2021); canonical WuDao-era generative paper. (arXiv:2105.13290, https://arxiv.org/abs/2105.13290). CogView2: arXiv:2204.14217.
- **CogVLM** — 2023. Visual expert module for pretrained LMs. (arXiv:2311.03079, https://arxiv.org/abs/2311.03079)
- **CogAgent** — 2023. VLM for GUI agents (CVPR 2024). (arXiv:2312.08914, https://arxiv.org/abs/2312.08914)

**Baidu**
- **ERNIE-4.5-VL** — Jun 2025. Multimodal MoE with reasoning ("Thinking") variants and visual grounding; reward model initialized from ERNIE-4.5-Base, GRPO with DAPO-style dynamic sampling + overlong filtering. (HuggingFace https://huggingface.co/baidu/ERNIE-4.5-VL-424B-A47B-Base-PT)

**Moonshot AI**
- **Kimi-VL / Kimi-VL-Thinking** — Apr 2025. MoE VLM, ~3B activated params, native-resolution MoonViT encoder, 128K context, long-CoT reasoning variant (Kimi-VL-Thinking-2506). (arXiv:2504.07491, https://arxiv.org/abs/2504.07491; GitHub https://github.com/MoonshotAI/Kimi-VL)

**Tencent**
- **Hunyuan-DiT** — May 2024. Multi-resolution diffusion transformer with fine-grained Chinese understanding. (arXiv:2405.08748, https://arxiv.org/abs/2405.08748)
- **HunyuanVideo** — Dec 2024. Systematic framework for large video generative models. (arXiv:2412.03603, https://arxiv.org/abs/2412.03603)
- **HunyuanVideo 1.5** — Nov 2025. 8.3B DiT with selective + sliding tile attention (SSTA), glyph-aware text encoding, and a video super-resolution network. (arXiv:2511.18870, https://arxiv.org/abs/2511.18870)
- **Hunyuan3D 1.0/2.0/2.1** — 2024–2025. Scaling diffusion for high-res textured 3D assets; 2.1 adds fully open-source, production-ready PBR materials. (1.0: arXiv:2411.02293; 2.0: arXiv:2501.12202; 2.1: arXiv:2506.15442; GitHub https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1)
- **HunyuanImage 3.0** — Sep 2025. Image generation built on the Hunyuan-A13B MoE backbone. (arXiv:2509.23951, https://arxiv.org/abs/2509.23951)
- **HunyuanWorld 1.0** — Jul 2025. First open-source simulation-capable immersive 3D world generation model. (GitHub https://github.com/Tencent-Hunyuan/Hunyuan3D-2)

**Shanghai AI Lab**
- **InternVL** — Dec 2023. Scaling vision foundation models for visual-linguistic tasks (CVPR 2024). (arXiv:2312.14238, https://arxiv.org/abs/2312.14238). InternVL 1.5 = arXiv:2404.16821; InternVL 2.5 = arXiv:2412.05271.

---
### VERTICAL 6: AGENTS & TOOL USE

**ByteDance Seed**
- **UI-TARS** — Jan 2025. Native GUI agent VLM perceiving only screenshots; unifies perception, reasoning, grounding, memory; iterative training with reflective online traces. (arXiv:2501.12326, https://arxiv.org/abs/2501.12326)
- **UI-TARS-1.5** — Apr 2025. Adds RL-enabled reasoning before action; SOTA on OSWorld and game benchmarks. (HuggingFace https://huggingface.co/ByteDance-Seed/UI-TARS-1.5-7B)
- **UI-TARS-2** — Sep 2025. Multi-turn RL for GUI agents; data flywheel, stabilized multi-turn RL framework, hybrid GUI environment integrating file systems; uses decoupled DAPO-style clip bounds. (arXiv:2509.02544, https://arxiv.org/abs/2509.02544)

**Moonshot AI / Zhipu** — Kimi K2 and GLM-4.5/4.6/4.7 are agent-native foundation models (see Architecture/RL sections); GLM-4.7's blog reports 73.8% on SWE-bench and improvements on Terminal-Bench 2.0.

---
### VERTICAL 7: LONG-CONTEXT & EFFICIENCY / INFERENCE / SERVING

**DeepSeek**
- **FlashMLA** — 2025. Open-source efficient MLA decoding kernel for Hopper GPUs, released during DeepSeek Open Source Week. (GitHub: deepseek-ai/FlashMLA)
- **DeepSeek-V3.2-Exp continued training for DSA** — late 2025. Trains a lightning indexer (1000 warm-up steps, 2.1B tokens) then full sparse adaptation (15000 steps of 480×128K-token sequences, 943.7B tokens, selecting 2048 KV tokens/query). (arXiv:2512.02556)

**MiniMax** — Lightning attention enables M1 to use ~25% of DeepSeek-R1's FLOPs at 100K generation length. (arXiv:2506.13585)

---
### VERTICAL 8: EMBEDDINGS & RETRIEVAL

**BAAI**
- **BGE-M3** — Feb 2024. Multi-functional (dense + sparse + multi-vector), multilingual (100+ languages), multi-granular (up to 8192 tokens) embeddings via self-knowledge distillation; based on XLM-RoBERTa. (arXiv:2402.03216, https://arxiv.org/abs/2402.03216; GitHub https://github.com/FlagOpen/FlagEmbedding)

**Alibaba / Qwen**
- **Qwen3 Embedding & Reranking** — Jun 2025. 0.6B/4B/8B embedding + reranker models initialized from Qwen3 foundation models; MRL support, instruction-aware. (arXiv:2506.05176, https://arxiv.org/abs/2506.05176)

---
### VERTICAL 9: CODE MODELS

**DeepSeek**
- **DeepSeek-Coder** — Jan 2024. (arXiv:2401.14196, https://arxiv.org/abs/2401.14196)
- **DeepSeek-Coder-V2** — Jun 2024. MoE code model breaking the closed-source barrier. (arXiv:2406.11931, https://arxiv.org/abs/2406.11931)

**Zhipu AI** — GLM-4.5/4.6/4.7 coding (SWE-bench, Terminal-Bench), with GLM-4.7 reporting 73.8% on SWE-bench. (GitHub https://github.com/zai-org/GLM-4.5)

---
### VERTICAL 10: DOMAIN-SPECIFIC (math, theorem proving, weather, science)

**DeepSeek**
- **DeepSeekMath** — Feb 2024. 120B math-token corpus mined from Common Crawl; 51.7% on MATH (60.9% with self-consistency over 64 samples); introduced GRPO. (arXiv:2402.03300, https://arxiv.org/abs/2402.03300)
- **DeepSeek-Prover** — May 2024. Theorem proving via large-scale synthetic data. (arXiv:2405.14333, https://arxiv.org/abs/2405.14333). V1.5 (Aug 2024) likely arXiv:2408.08152 (flagged, not independently re-verified).
- **DeepSeek-Prover-V2** — Apr 2025. Formal math reasoning via RL for subgoal decomposition. (arXiv:2504.21801, https://arxiv.org/abs/2504.21801)

**Huawei**
- **Pangu-Weather** — 2022/2023. 3D high-resolution global weather forecasting with neural networks; arXiv preprint 2022, then published in Nature (vol. 619, pp. 533–538, 2023; DOI 10.1038/s41586-023-06185-3). (arXiv:2211.02556, https://arxiv.org/abs/2211.02556)

---
### Other notable labs & models
- **01.AI — Yi** — 2024. Open foundation models. (arXiv:2403.04652, https://arxiv.org/abs/2403.04652)
- **OpenBMB — MiniCPM** — 2024. Small LMs with scalable training strategies. (arXiv:2404.06395, https://arxiv.org/abs/2404.06395)
- **RWKV** — 2023. RNN-transformer hybrid (Findings of EMNLP 2023); open community project led by China-based Bo Peng. (arXiv:2305.13048, https://arxiv.org/abs/2305.13048)
- **Shanghai AI Lab — InternLM2** — 2024. The original InternLM v1 (June 2023) was released as a GitHub technical report without a distinct arXiv ID; InternLM2 is the canonical paper. (arXiv:2403.17297, https://arxiv.org/abs/2403.17297)

## Recommendations
- **For architecture/efficiency researchers**: Start with DeepSeek's MLA → NSA → DSA papers and MiniMax's lightning attention; these define the current sparse/linear attention frontier. Threshold to watch: whether DSA-style indexer approaches hold quality beyond 256K context — if accuracy regressions appear on retrieval/needle tasks, full or hybrid attention may remain preferred.
- **For RL practitioners**: Adopt GRPO as a baseline, then move to GSPO (for MoE training stability) or DAPO (for large-scale verifiable-reward tasks). Choose CISPO when training cost is the binding constraint.
- **For builders**: Qwen3, GLM-4.5/4.6, Kimi K2, and DeepSeek-V3.2 are the strongest open-weight bases as of mid-2026; pair with Qwen3Guard for safety moderation and BGE-M3 / Qwen3-Embedding for retrieval.
- **Re-evaluate quarterly**: The release cadence (e.g., the K2 line shipped multiple updates between mid-2025 and 2026) means leaderboards shift fast; revisit when a new flagship claims frontier parity, and prefer primary technical reports over secondary summaries for benchmark numbers.

## Caveats
- Some 2026-dated items (e.g., DeepSeek-V3.2 final, ERNIE 5.0, GLM-4.7, DeepSeek-OCR2) are documented primarily in technical reports, GitHub READMEs, or third-party analyses rather than peer-reviewed venues; arXiv preprints are not peer-reviewed and benchmark claims are self-reported.
- ERNIE 4.5's technical report is hosted on Baidu's site (and HuggingFace) rather than arXiv; the citation block in HuggingFace model cards left the arXiv eprint field blank.
- "WuDao 2.0" (BAAI, June 2021) has no single dedicated arXiv paper; CogView is the canonical associated publication.
- The original InternLM (v1) lacks a distinct arXiv ID; there is also no paper titled exactly "InternVL 2.0" — use InternVL 1.5 (arXiv:2404.16821) / 2.5 (arXiv:2412.05271).
- DeepSeek-Prover-V1.5 (likely arXiv:2408.08152) was flagged by research but not independently re-verified in this pass.
- This catalog is comprehensive but not exhaustive. Additional active labs whose specific primary-source links were not all individually verified here — SenseTime, iFlytek (Spark), Baichuan, StepFun (Step series), Kuaishou (Kling video, KAT-Coder), Ant Group (Ming/Bailing), Fudan (MOSS), and various Chinese Academy of Sciences groups — continue to produce relevant work and warrant separate verification before citation.