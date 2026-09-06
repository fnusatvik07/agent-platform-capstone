<div align="center">

# Build an Agent Platform

### Data Sense — Agent Builder Capstone Project

**You are not building an agent. You are building the thing that builds agents.**

[**📋 Read the problem statement**](PROBLEM-STATEMENT.md) &nbsp;·&nbsp;
[**🖼 See the UI you must build**](https://fnusatvik07.github.io/agent-platform-capstone/) &nbsp;·&nbsp;
[**🎞 Slides**](https://fnusatvik07.github.io/agent-platform-capstone/deck/)

</div>

---

## The capstone

This is the final project for the **Agent Builder** course at Data Sense. It brings together
everything covered in the LangChain and LangGraph modules — graphs, state, tools, interrupts,
checkpointers, multi-agent handoffs — and asks you to build a real product with them.

A person types what they want in plain English. Your platform works out which tools it needs,
checks they have access to those tools, builds the agent and deploys it. They test it in a chat
window. When it works, they publish it so other teams can use it — after an admin has approved it.

## What you build

Three tabs, plus a marketplace and an admin queue.

| Tab | What happens there |
|---|---|
| **MCP Registry** | Register MCP servers. Connect to them once with your own credentials. |
| **Build** | Chat to describe an agent. The platform picks tools, checks connections, builds it. |
| **My Agents** | Your agents as cards. Open one → test it in a playground → publish it. |

The flow you must deliver, end to end:

```
register a server  →  connect once  →  describe an agent in chat
   →  test it in the playground  →  publish it  →  an admin approves
   →  someone in another company installs it
```

## The rules

Seven of them. All are testable, and all of them get tested.

1. An agent is **configuration, not code** — the platform writes a document, never generates Python
2. **One person cannot see another person's things** — structurally, not by remembering a filter
3. **Credentials go in once and vanish** — encrypted, never in a config, a prompt, or a log
4. **Risky actions ask a human first** — enforced by the platform, not by the agent's instructions
5. **Publishing strips the company out** — what travels is the design, nothing internal
6. **Scores must mean something** — explainable, and they block publication when they are low
7. **At least one agent is genuinely multi-agent** — built through your platform, not hand-written

Full detail, and the nine checks you are graded against, are in the
[problem statement](PROBLEM-STATEMENT.md).

## How you are assessed

| | |
|---|---|
| **Submission** | A GitHub repository containing your platform |
| **Presentation** | 45 minutes, live — you demo the flow and defend your design decisions |
| **Grading** | Nine automated checks (pass/fail) plus your presentation |

## What is in this repository

```
PROBLEM-STATEMENT.md    the brief — read this first
docs/                   the UI you need to build, as browsable mockups
  index.html            start here
  brief.html            the problem statement, on the web
  screens/              sign in · MCP registry · connections · build
                        my agents · agent detail · admin review · marketplace
  deck/                 slides
```

> **There is no starter code here, and that is deliberate.** Designing the data model, the API and
> the agent configuration format *is* the capstone. The mockups show you what the finished product
> does — not how to build it.

## Before you start

Two things that will save you a week.

**Go and look at [LangSmith Fleet](https://docs.langchain.com/langsmith/fleet/index).** It is a
shipped product doing roughly what you are being asked to build. Read how it handles
[agent identity](https://docs.langchain.com/langsmith/fleet/agent-identity),
[approvals](https://docs.langchain.com/langsmith/fleet/essentials) and
[schedules](https://docs.langchain.com/langsmith/fleet/schedules). Borrow shamelessly.

**Do not plan on LangGraph Platform.** It is not free, and self-hosting its Agent Server needs a
paid licence key. Free tracing is available and worth turning on, but plan to run your own server
from day one. Everything this project needs can be run at no cost — free model tiers, or a model
on your own machine.
