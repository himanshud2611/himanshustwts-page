Everyone is poasting about how beastly models have become. Opus 4.5, GPT-5.2-Codex, Gemini-3-Pro and the recent Chinese ones (from the likes of GLM 4.7 and Minimax-M2.1). If you've shipped anything real with these models, you might have acknowledged that harness matters more than weights. In other words, we have same model with different scaffoldings with completely different outcomes.

So, **what is harness?** It's everything that isn't the model.

- the loop that keeps it running.
- the execution environment.
- the context management.
- the tool definitions + permissions
- the decision of when to stop and when to keep going.

When people say "Claude Code is mind blowing" they're not just saying Claude (or Opus) is good but actually saying Anthropic built a harness that lets MODEL be good at being an agent. Cursor, Mogra, Aider - these are all harnesses.

Let's go into a bit detail.

**The Loop.**

It might sound trivial but it's not. How many iterations before you force a checkpoint? How do you handle reasoning spirals? When do you inject a "step back" nudge?

[IMAGE: image.png - Upload this image in Substack]

Anthropic's [research blog](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) on long-running agents found that even Opus 4.5 on the Claude Agent SDK would fail at multi-day tasks without an *initializer agent* that sets up context and a progress file that bridges context windows. 

[IMAGE: image 1.png - Upload this image in Substack]

The loop is where you encode your philosophy about autonomy vs control. If it is too tight, the agent might feels lobotomized and if it is too loose, the model might start burning tokens. Cursor [found](https://cursor.com/blog/codex-model-harness) that preserving reasoning traces was critical for codex model performance - dropping them significantly degraded output quality. Effectively its a harness decision, not a model capability.

[IMAGE: image 2.png - Upload this image in Substack]

**The Execution Environment.**

The model needs to actually do things. For coding agents this means shell access, file operations and what not. But the design space is vast. Do you sandbox or run on bare metal? CC runs on your actual machine - maximum power, maximum blast radius. Cowork, [which launched this week](https://x.com/claudeai/status/2010805682434666759?s=20), runs in a virtualized linux environment using apple's vzframwork - same agent sdk, different containment. Codex runs cloud sandboxes preloaded with repos. [Mogra](https://mogra.xyz/) runs private cloud sandboxes with GUI. There is no free lunch here, just tradeoffs that should be explicit. The execution environment is also where security lives. More in this [blog.](https://x.com/himanshustwts/status/2010686932410675311?s=20)

**Context Management.**

This is the quiet hard problem. Models have finite windows. Codebases and work contexts are infinite. How do you decide what earns a place in context? Naive approaches stuff everything and the context goes exponential.  Better approaches build retrieval, dependency graphs, relevance scoring. The best harnesses treat context like scarce compute - *every token should be load-bearing*.

[Codebase Indexing](https://cursor.com/docs/context/semantic-search) in Cursor:

[IMAGE: image 3.png - Upload this image in Substack]

[Compaction](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) in Claude Code:

[IMAGE: image 4.png - Upload this image in Substack]

[claude . md](https://code.claude.com/docs/en/memory) scratchpad persists across sessions:

[IMAGE: image 5.png - Upload this image in Substack]

Apparently: garbage context in, garbage actions out. Anthropic explicitly calls out that context management enables agents to work "for an arbitrarily long time" - but *only if the harness is doing intelligent windowing.*

[IMAGE: image 6.png - Upload this image in Substack]

The big labs have figured out that the harness is the product surface where value accrues. Anthropic built CC as a general agent harness, then realized it was too powerful to stay in the terminal. [Boris](https://x.com/bcherny/status/2010809450844831752?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E2010809450844831752%7Ctwgr%5Ebf872184458e2d93ca836ead22974bc79fe43cdd%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fventurebeat.com%2Ftechnology%2Fanthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no) noticed people using CC for vacation research, slide decks, wedding photo recovery, oven control. The underlying agent was good but the interface was limiting to normies. So they built Cowork in 1.5 weeks using CC itself - to bring the *same harness to non-developers*.

This is the strategic insight here. Start with developers because they tolerate rough edges and give signal. Build the harness for that hard use case. Then generalize. Anthropic now has CC (terminal), Cowork (desktop), Claude in chrome (browser), all running on the same claude agent sdk. 
**One harness, Multiple surfaces.** And the SDK is now available for anyone to build custom agents - finance, customer support, personal assistants. We are witnessing harness becoming the platform.

Cursor took a different path - build the harness into an IDE (give visual control and diff views + support multiple models). They're explicitly tuning their harness per model - renaming tools to match shell equivalents for codex, preserving reasoning traces and adjusting prompts. 

**The Metadata Pattern.**

As models converge in capability, differentiation shifts to harness quality. [Philipp](https://www.philschmid.de/agent-harness-2026) mentioned that "the harness is the dataset" - the trajectories your harness captures become your competitive advantage.

[IMAGE: image 7.png - Upload this image in Substack]

Labs will use harness telemetry to detect exactly when models drift, then feed that back into training. The training and inference environments are converging. The harness is becoming the feedback loop that is going to shape the next generation of models.
