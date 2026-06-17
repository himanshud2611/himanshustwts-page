const themes = [
  {
    title: "Architecture is the cost lever",
    body: "The important object is often the method: MLA, DeepSeekMoE, Lightning Attention, loss-free routing, MSA, QK-Norm, MuonClip, and hybrid MoE designs.",
    tag: "Architecture"
  },
  {
    title: "RL moved beyond chat alignment",
    body: "GRPO, CISPO, partial rollouts, long2short, self-critique rewards, curriculum RL, and execution feedback are now core research primitives.",
    tag: "Post-training"
  },
  {
    title: "Long-horizon agents need systems",
    body: "Million-token context, tool-use RL, deep search, replay buffers, synthetic environments, and rollout infrastructure are becoming one stack.",
    tag: "Agents"
  },
  {
    title: "Open recipes travel fastest",
    body: "The highest signal comes from papers, repos, training reports, model cards, and deployment cookbooks, not only benchmark headlines.",
    tag: "Research ops"
  }
];

const researchItems = [
  {
    id: "glm-130b",
    title: "GLM-130B",
    lab: "Tsinghua / Zhipu",
    year: 2022,
    date: "Aug 2022",
    vertical: "Pre-training",
    openness: "Open weights",
    model: "130B dense bilingual foundation model",
    edge: "Early open bilingual frontier-scale LLM",
    tags: ["pre-training", "Chinese-English", "dense model", "GLM", "open weights"],
    summary: "One of the earliest major Chinese open foundation models at frontier scale, preceding the post-ChatGPT domestic LLM wave.",
    cost: "The later ChatGLM paper frames GLM-130B as the starting point for the GLM family before smaller ChatGLM and GLM-4 agentic variants.",
    alpha: "This is the baseline ancestor: it shows that China's open LLM ecosystem did not begin with DeepSeek, but with several years of bilingual foundation-model work.",
    links: [
      { label: "GLM family paper", url: "https://arxiv.org/html/2406.12793" },
      { label: "THUDM GitHub", url: "https://github.com/THUDM/GLM-130B" }
    ]
  },
  {
    id: "deepseek-v2",
    title: "DeepSeek-V2",
    lab: "DeepSeek",
    year: 2024,
    date: "May 2024",
    vertical: "Architecture",
    openness: "Open weights",
    model: "236B MoE, 21B active, 128K context",
    edge: "MLA + DeepSeekMoE",
    tags: ["MoE", "MLA", "KV cache", "SFT", "RL", "cost"],
    summary: "A strong economical MoE language model that introduced Multi-head Latent Attention for KV-cache compression and DeepSeekMoE for sparse training efficiency.",
    cost: "The paper reports 42.5% lower training cost than DeepSeek 67B, 93.3% lower KV cache, and 5.76x maximum generation throughput.",
    alpha: "This is the template behind the China efficiency wave: compress inference state, activate only a fraction of parameters, then spend post-training on reasoning and chat behavior.",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2405.04434" },
      { label: "GitHub", url: "https://github.com/deepseek-ai/DeepSeek-V2" }
    ]
  },
  {
    id: "deepseek-v3",
    title: "DeepSeek-V3",
    lab: "DeepSeek",
    year: 2024,
    date: "Dec 2024",
    vertical: "Pre-training",
    openness: "Open weights",
    model: "671B MoE, 37B active",
    edge: "Aux-loss-free load balancing + MTP",
    tags: ["MoE", "FP8", "multi-token prediction", "load balancing", "training systems"],
    summary: "A scaled DeepSeek MoE system using MLA, DeepSeekMoE, auxiliary-loss-free load balancing, multi-token prediction, and FP8-oriented training practice.",
    cost: "Its reported design is optimized around economical frontier-scale training and inference, keeping only 37B parameters active per token.",
    alpha: "The important lesson is co-design: architecture, precision, load balancing, prediction objective, and hardware-aware systems are treated as one research surface.",
    links: [
      { label: "Technical report", url: "https://arxiv.org/pdf/2412.19437" },
      { label: "GitHub org", url: "https://github.com/deepseek-ai" }
    ]
  },
  {
    id: "deepseek-r1",
    title: "DeepSeek-R1 / R1-Zero",
    lab: "DeepSeek",
    year: 2025,
    date: "Jan 2025",
    vertical: "Reinforcement Learning",
    openness: "Open weights",
    model: "Reasoning model family distilled from V3",
    edge: "GRPO and RL-driven reasoning",
    tags: ["RL", "GRPO", "reasoning", "distillation", "math", "code"],
    summary: "A reasoning release that made large-scale RL and distillation central to open-weight reasoning models.",
    cost: "GRPO avoids a separate critic model by estimating baselines from grouped responses, reducing RL training overhead relative to PPO-style setups.",
    alpha: "The exportable idea is not only the model; it is the recipe of cold-start data, RL, rejection sampling, and distillation into smaller models.",
    links: [
      { label: "Review of techniques", url: "https://arxiv.org/html/2503.11486" },
      { label: "DeepSeek GitHub", url: "https://github.com/deepseek-ai" }
    ]
  },
  {
    id: "qwen25",
    title: "Qwen2.5",
    lab: "Alibaba Qwen",
    year: 2024,
    date: "Sep 2024",
    vertical: "Pre-training",
    openness: "Mixed",
    model: "Dense family up to 72B; hosted MoE variants",
    edge: "18T-token scaling + broad specialist family",
    tags: ["pre-training", "SFT", "RLHF", "coder", "math", "multilingual"],
    summary: "A broad language model series scaled from 7T to 18T tokens with stronger post-training, then used as a base for Qwen math, coder, reasoning, and multimodal variants.",
    cost: "Qwen2.5-72B is positioned against far larger open-weight models, while hosted Qwen2.5-Turbo and Plus emphasize cost-effective serving.",
    alpha: "Qwen is the ecosystem player: lots of sizes, Apache releases where possible, and specialist branches that compound developer adoption.",
    links: [
      { label: "Technical report", url: "https://arxiv.org/abs/2412.15115" },
      { label: "Qwen blog", url: "https://qwenlm.github.io/blog/qwen2.5-max/" }
    ]
  },
  {
    id: "qwen3",
    title: "Qwen3",
    lab: "Alibaba Qwen",
    year: 2025,
    date: "Apr 2025",
    vertical: "Post-training",
    openness: "Open weights",
    model: "Dense and MoE models, 0.6B to 235B-A22B",
    edge: "Thinking / non-thinking mode switch",
    tags: ["reasoning", "agents", "MoE", "multilingual", "tool use"],
    summary: "A model family that exposes both thinking and non-thinking modes, with dense and MoE checkpoints for reasoning, coding, chat, tool use, and multilingual workloads.",
    cost: "MoE options like 30B-A3B and 235B-A22B make the capability/runtime tradeoff explicit for deployment.",
    alpha: "The product insight is controllable reasoning budget: users and systems can choose deeper thinking only when the task needs it.",
    links: [
      { label: "GitHub", url: "https://github.com/QwenLM/Qwen3" },
      { label: "Qwen home", url: "https://qwenlm.github.io/" }
    ]
  },
  {
    id: "minimax-01",
    title: "MiniMax-01",
    lab: "MiniMax",
    year: 2025,
    date: "Jan 2025",
    vertical: "Long Context",
    openness: "Open weights",
    model: "456B MoE, 45.9B active; text and VL variants",
    edge: "Lightning Attention for long-context agents",
    tags: ["linear attention", "MoE", "long context", "vision-language", "agents"],
    summary: "A foundation model and vision-language series based on hybrid attention and MoE, designed for long-context understanding and agent workloads.",
    cost: "MiniMax-Text-01 reports 456B total parameters with 45.9B active per token and very long context support through Lightning Attention plus softmax attention.",
    alpha: "MiniMax is betting that context length plus cheaper long generation becomes a decisive agent capability, not just a benchmark feature.",
    links: [
      { label: "GitHub", url: "https://github.com/MiniMax-AI/MiniMax-01" },
      { label: "Hugging Face article", url: "https://huggingface.co/blog/MiniMax-AI/minimax01" }
    ]
  },
  {
    id: "minimax-m1",
    title: "MiniMax-M1",
    lab: "MiniMax",
    year: 2025,
    date: "Jun 2025",
    vertical: "Reinforcement Learning",
    openness: "Open weights",
    model: "Hybrid-attention reasoning model, 1M context",
    edge: "Efficient test-time compute",
    tags: ["RL", "test-time compute", "lightning attention", "long context", "reasoning"],
    summary: "A reasoning model built on MiniMax-Text-01, combining hybrid MoE architecture, lightning attention, and long-context test-time scaling.",
    cost: "The repo states M1 uses 25% of DeepSeek-R1's FLOPs at a 100K generation length while supporting 1M-token context.",
    alpha: "Reasoning models are becoming an inference-systems problem: if long thought is expensive, attention design is the lever.",
    links: [
      { label: "GitHub", url: "https://github.com/MiniMax-AI/MiniMax-M1" },
      { label: "Paper", url: "https://arxiv.org/abs/2506.13585" }
    ]
  },
  {
    id: "kimi-k15",
    title: "Kimi k1.5",
    lab: "Moonshot AI",
    year: 2025,
    date: "Jan 2025",
    vertical: "Reinforcement Learning",
    openness: "Research release",
    model: "Multimodal long-CoT reasoning model",
    edge: "Long-context RL with partial rollouts",
    tags: ["RL", "long-CoT", "partial rollouts", "multimodal", "reasoning"],
    summary: "A report on scaling reinforcement learning with long context, partial rollouts, and simple policy optimization rather than complex tree search.",
    cost: "Partial rollouts reuse previous trajectories to reduce regeneration cost, while RL context scales to 128K.",
    alpha: "The paper reframes context length as a training-time RL variable, not only an inference feature.",
    links: [
      { label: "Paper", url: "https://arxiv.org/html/2501.12599" },
      { label: "GitHub", url: "https://github.com/MoonshotAI/kimi-k1.5" }
    ]
  },
  {
    id: "kimi-k2",
    title: "Kimi K2",
    lab: "Moonshot AI",
    year: 2025,
    date: "Jul 2025",
    vertical: "Agents",
    openness: "Open weights",
    model: "1T MoE, 32B active",
    edge: "Agentic data synthesis + general RL",
    tags: ["agents", "MoE", "tool use", "RL", "MuonClip", "coding"],
    summary: "An open agentic intelligence model using a trillion-parameter MoE backbone, MuonClip optimizer, large-scale agentic data synthesis, and joint reinforcement learning.",
    cost: "K2 activates 32B of 1T parameters and reports zero loss spikes across 15.5T pre-training tokens using MuonClip.",
    alpha: "Kimi's bet is that agent behavior is trained through environment interaction and synthetic trajectories, not only instruction data.",
    links: [
      { label: "Project page", url: "https://moonshotai.github.io/Kimi-K2/" },
      { label: "Paper", url: "https://arxiv.org/html/2507.20534" }
    ]
  },
  {
    id: "glm-4-all-tools",
    title: "GLM-4 All Tools",
    lab: "Zhipu / Z.ai",
    year: 2024,
    date: "Jan 2024",
    vertical: "Agents",
    openness: "API / mixed",
    model: "GLM-4 family, 128K context",
    edge: "Tool-using agent alignment",
    tags: ["agents", "tool use", "planning", "Chinese-English", "alignment"],
    summary: "A GLM-4 version aligned to autonomously plan, call tools such as web browsing and Python, and solve complex multi-step tasks.",
    cost: "GLM-4-Air was positioned as a lower-latency and lower-cost variant of the January GLM-4 model.",
    alpha: "Zhipu was early in turning a frontier model into an agent substrate inside a consumer and enterprise product surface.",
    links: [
      { label: "Paper", url: "https://arxiv.org/html/2406.12793" },
      { label: "ChatGLM", url: "https://chatglm.cn/" }
    ]
  },
  {
    id: "glm-45",
    title: "GLM-4.5",
    lab: "Zhipu / Z.ai",
    year: 2025,
    date: "Jul 2025",
    vertical: "Agents",
    openness: "Open weights",
    model: "355B MoE, 32B active; Air 106B/12B active",
    edge: "Unified reasoning, coding, and agents",
    tags: ["MoE", "agents", "coding", "RL", "thinking mode"],
    summary: "A flagship MoE family designed to unify reasoning, coding, and agentic tasks with thinking and non-thinking modes.",
    cost: "The Air variant compresses the active-parameter budget to 12B for cheaper deployment while preserving the same product direction.",
    alpha: "GLM-4.5 is part of the shift from chatbot quality to code-agent reliability and deep-search workflows.",
    links: [
      { label: "Official blog", url: "https://z.ai/blog/glm-4.5" },
      { label: "GitHub", url: "https://github.com/zai-org/GLM-4.5" }
    ]
  },
  {
    id: "internlm2",
    title: "InternLM2",
    lab: "Shanghai AI Lab",
    year: 2024,
    date: "Mar 2024",
    vertical: "Pre-training",
    openness: "Open weights",
    model: "InternLM2 family",
    edge: "Open foundation + toolchain stack",
    tags: ["foundation model", "math", "code", "Chinese", "OpenCompass", "LMDeploy"],
    summary: "A multilingual foundation model line paired with open toolchains for fine-tuning, deployment, agents, and evaluation.",
    cost: "The ecosystem around InternLM includes LMDeploy for compression/serving, XTuner for fine-tuning, Lagent for agents, and OpenCompass for evaluation.",
    alpha: "Shanghai AI Lab's value is not a single checkpoint; it is a research infrastructure stack that makes domestic models easier to train, evaluate, and deploy.",
    links: [
      { label: "GitHub", url: "https://github.com/InternLM/InternLM" },
      { label: "Paper", url: "https://arxiv.org/abs/2403.17297" }
    ]
  },
  {
    id: "internlm-math",
    title: "InternLM-Math",
    lab: "Shanghai AI Lab",
    year: 2024,
    date: "Jan 2024",
    vertical: "Reinforcement Learning",
    openness: "Open weights",
    model: "7B and 20B math models",
    edge: "Verifiable bilingual reasoning",
    tags: ["math", "verifiable reasoning", "Chinese-English", "code interpreter"],
    summary: "A bilingual math reasoning model line focused on verifiable reasoning, released with checkpoints and evaluation code.",
    cost: "Small 7B/20B models are used to test math-specific pre-training, SFT, voting, and tool-use strategies before scaling.",
    alpha: "The important pattern is vertical specialization: narrower data and verifiable feedback can make smaller models unusually useful.",
    links: [
      { label: "GitHub", url: "https://github.com/InternLM/InternLM-Math" },
      { label: "Paper", url: "https://arxiv.org/abs/2402.06332" }
    ]
  },
  {
    id: "seed-vl",
    title: "Seed1.5-VL",
    lab: "ByteDance Seed",
    year: 2025,
    date: "May 2025",
    vertical: "Multimodal",
    openness: "API / report",
    model: "532M vision encoder + 20B active MoE LLM",
    edge: "Efficient multimodal reasoning",
    tags: ["vision-language", "MoE", "video", "GUI", "reasoning"],
    summary: "A vision-language foundation model aimed at general multimodal understanding, reasoning, video comprehension, and agentic GUI tasks.",
    cost: "The release emphasizes a relatively modest 532M vision encoder and 20B active-parameter MoE LLM while reporting strong benchmark coverage.",
    alpha: "ByteDance is turning multimodal capability into an efficient product primitive for visual agents and Doubao/Volcano Engine surfaces.",
    links: [
      { label: "GitHub", url: "https://github.com/ByteDance-Seed/Seed1.5-VL" },
      { label: "Paper", url: "https://arxiv.org/abs/2505.07062" }
    ]
  },
  {
    id: "seed-coder",
    title: "Seed-Coder",
    lab: "ByteDance Seed",
    year: 2025,
    date: "Jun 2025",
    vertical: "Data",
    openness: "Open weights",
    model: "8B code model family",
    edge: "Model-centric code data curation",
    tags: ["code", "data curation", "DPO", "GRPO", "LongCoT", "self-improvement"],
    summary: "An 8B code model family where the model helps curate and filter its own pre-training data, followed by instruction tuning, DPO, and LongCoT RL for reasoning.",
    cost: "Seed-Coder tests data quality and RL recipes at a manageable 8B scale with 6T code-focused tokens.",
    alpha: "This is a high-ROI research direction: better data pipelines can be validated cheaply before being used to train larger code agents.",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2506.03524" },
      { label: "Hugging Face", url: "https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Base" }
    ]
  },
  {
    id: "ernie-45",
    title: "ERNIE 4.5",
    lab: "Baidu ERNIE",
    year: 2025,
    date: "Jun 2025",
    vertical: "Multimodal",
    openness: "Open weights",
    model: "10-model family up to 424B, 47B active",
    edge: "Heterogeneous multimodal MoE",
    tags: ["multimodal", "MoE", "PaddlePaddle", "MFU", "Apache-2.0"],
    summary: "An open family of text and vision-language models with a heterogeneous modality-aware MoE architecture and PaddlePaddle toolchain.",
    cost: "Baidu reports 47% MFU for the largest ERNIE 4.5 language model pre-training and Apache 2.0 availability for the family.",
    alpha: "Baidu's angle is industrial deployment: model family, framework, toolkits, inference, and multi-hardware support released together.",
    links: [
      { label: "Official blog", url: "https://ernie.baidu.com/blog/posts/ernie4.5/" },
      { label: "GitHub", url: "https://github.com/PaddlePaddle/ERNIE" }
    ]
  },
  {
    id: "hunyuan-large",
    title: "Hunyuan-Large",
    lab: "Tencent Hunyuan",
    year: 2024,
    date: "Nov 2024",
    vertical: "Architecture",
    openness: "Open weights",
    model: "389B MoE, 52B active, 256K context",
    edge: "Mixed expert routing + KV compression",
    tags: ["MoE", "long context", "synthetic data", "KV cache", "scaling laws"],
    summary: "A large open-source Tencent MoE model emphasizing synthetic data, mixed expert routing, KV-cache compression, and expert-specific learning rates.",
    cost: "Only 52B of 389B parameters are active, with long-context support up to 256K tokens.",
    alpha: "Tencent's contribution is practical MoE scaling lessons from a company with massive internal product surfaces.",
    links: [
      { label: "Paper", url: "https://arxiv.org/html/2411.02265" },
      { label: "GitHub", url: "https://github.com/Tencent-Hunyuan/Tencent-Hunyuan-Large" }
    ]
  },
  {
    id: "yi",
    title: "Yi Foundation Models",
    lab: "01.AI",
    year: 2024,
    date: "Mar 2024",
    vertical: "Pre-training",
    openness: "Open weights",
    model: "6B and 34B base/chat/VL/long-context family",
    edge: "High-quality bilingual data engineering",
    tags: ["data quality", "Chinese-English", "long context", "vision-language", "local models"],
    summary: "A family of bilingual foundation, chat, long-context, and vision-language models with emphasis on data deduplication, filtering, and carefully polished instruction data.",
    cost: "Yi trained on 3.1T English and Chinese tokens and extended context to 200K with lightweight continual pre-training.",
    alpha: "Yi is a reminder that data quality and polish can make smaller open models punch above their size.",
    links: [
      { label: "Paper", url: "https://arxiv.org/html/2403.04652" },
      { label: "GitHub", url: "https://github.com/01-ai/Yi" }
    ]
  },
  {
    id: "baichuan2",
    title: "Baichuan 2",
    lab: "Baichuan",
    year: 2023,
    date: "Sep 2023",
    vertical: "Pre-training",
    openness: "Research + commercial license",
    model: "7B and 13B multilingual models",
    edge: "Transparent training dynamics",
    tags: ["pre-training", "checkpoints", "Chinese", "medical", "law", "training dynamics"],
    summary: "An early Chinese open LLM series trained from scratch on 2.6T tokens, with base/chat models and intermediate checkpoints for studying training dynamics.",
    cost: "The release made small-to-mid-size Chinese/English models and training checkpoints available when the ecosystem was still forming.",
    alpha: "Intermediate checkpoints are underused research assets: they let you study when capabilities emerge, not just final benchmark scores.",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2309.10305" },
      { label: "GitHub", url: "https://github.com/baichuan-inc/Baichuan2" }
    ]
  },
  {
    id: "pangu-ultra",
    title: "Pangu Ultra",
    lab: "Huawei Pangu",
    year: 2025,
    date: "Apr 2025",
    vertical: "Training Systems",
    openness: "Commercial / reports",
    model: "135B dense on Ascend NPUs; MoE report 718B",
    edge: "Frontier training on domestic hardware",
    tags: ["Ascend", "MindSpore", "dense LLM", "MoE", "training stability", "systems"],
    summary: "A Huawei training-systems line showing dense and sparse frontier-scale training on Ascend NPUs with stability and systems optimizations.",
    cost: "The dense report trains 135B parameters on 8,192 Ascend NPUs; the MoE report studies 718B sparse training and MFU on Ascend hardware.",
    alpha: "This is strategically important because it tests whether frontier-scale recipes can be moved off NVIDIA-centric stacks.",
    links: [
      { label: "Dense report", url: "https://arxiv.org/abs/2504.07866" },
      { label: "GitHub", url: "https://github.com/pangu-tech/pangu-ultra" }
    ]
  },
  {
    id: "opencompass",
    title: "OpenCompass",
    lab: "Shanghai AI Lab",
    year: 2023,
    date: "2023 onward",
    vertical: "Evaluation",
    openness: "Open source",
    model: "Evaluation platform",
    edge: "Chinese + global benchmark harness",
    tags: ["evaluation", "C-Eval", "CMMLU", "MMLU", "leaderboard", "benchmarking"],
    summary: "A universal evaluation framework and leaderboard ecosystem for testing LLMs across knowledge, reasoning, code, long context, Chinese tasks, and subjective evaluation.",
    cost: "Evaluation infrastructure reduces duplicated benchmarking work and creates a shared language for comparing domestic and international models.",
    alpha: "Any serious China AI tracker should monitor the evaluators, because benchmark choice shapes what labs optimize next.",
    links: [
      { label: "Docs", url: "https://opencompass.readthedocs.io/" },
      { label: "Paper", url: "https://arxiv.org/html/2605.19276" }
    ]
  }
];
