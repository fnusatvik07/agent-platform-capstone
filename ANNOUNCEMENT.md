# Capstone announcement — paste-ready

Attach: `docs/video/capstone-brief.mp4` · thumbnail `docs/video/thumbnail.png`

---

## Full post

**Capstone Project — Build an Agent Platform**

Over the last few weeks you've learned LangChain and LangGraph — graphs, state, tools, interrupts,
checkpointers, multi-agent handoffs. Your capstone puts all of it into one product.

**You are not building an agent. You are building the thing that builds agents.**

A person signs in, describes an agent in plain English, and your platform works out which tools it
needs, checks they have access to those tools, builds it and deploys it. They test it in a chat
window. When it works, they publish it — an admin reviews it, and once approved, people in other
companies can install it into their own workspace with their own credentials.

Three tabs: an **MCP Registry**, a **Build** chat, and **My Agents**. Plus a marketplace everyone can
install from, and an admin queue guarding the door to it.

Watch the 3-minute brief above before you read anything else. 👆

**Everything you need**

- 📋 Problem statement — https://fnusatvik07.github.io/agent-platform-capstone/brief.html
- 🖼 The UI you have to build — https://fnusatvik07.github.io/agent-platform-capstone/
- ✦ The build flow (start here) — https://fnusatvik07.github.io/agent-platform-capstone/screens/build.html
- 🎞 Slides — https://fnusatvik07.github.io/agent-platform-capstone/deck/
- 💻 Repo — https://github.com/fnusatvik07/agent-platform-capstone

There is deliberately **no starter code**. Designing the data model, the API and the agent
configuration format *is* the capstone.

**Teams**

- Groups of **four only**. Not three, not five.
- **DM me your team name and the four members** to register. Unregistered teams will not be
  assessed.
- Register before you start building.

**Timeline**

- You have **two weeks**.
- **Submission deadline: 20 September.**
- **Presentations start 21 September.** Each team presents live for 45 minutes — demo the flow,
  walk through your design, and answer for the choices you made. Bring the running system; slides
  alone will not do.

**How you'll be graded**

Nine checks, each one a pass or a fail, and all of them get run against your submission. Among them:
we will delete your tenant filter and try to read another user's agents, we will search everything
your system stored for a credential we gave you, and we will kill your server mid-build to see if it
resumes. The full list is at the end of the problem statement — read it before you design anything.

**One last thing:** nothing in this project requires a paid account. Free model tiers, or a model on
your own machine, are fine. And don't plan on LangGraph Platform — it isn't free, and self-hosting
its server needs a paid licence key. Run your own server from day one.

Questions in the thread. Good luck. 🚀

---

## Short version — for a chat / reminder

**Capstone is live: build an agent platform.** 🎥 3-min brief attached.

You're building the platform that *builds* agents — MCP registry, a chat that assembles an agent for
you, a playground to test it, and a human-reviewed marketplace.

📋 Brief: https://fnusatvik07.github.io/agent-platform-capstone/brief.html
🖼 The UI to build: https://fnusatvik07.github.io/agent-platform-capstone/

**Teams of 4 only.** DM me your team name + members to register.
**Deadline: 20 September.** Presentations start 21 September — 45 minutes per team, live, with the
system running.

No starter code, and nothing here needs a paid account.

---

## Reminder — a few days before the deadline

Capstone check-in ⏳

- Deadline is **20 September**. Presentations start the **21st**.
- If you haven't registered your team of four with me yet, DM me today.
- Before you submit, run the nine checks yourself — they're at the end of the brief:
  https://fnusatvik07.github.io/agent-platform-capstone/brief.html
- The two that catch most teams: a credential turning up in a trace, and a build that doesn't
  resume after the server restarts.
