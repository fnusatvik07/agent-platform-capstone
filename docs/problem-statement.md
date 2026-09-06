# Problem Statement

### Data Sense — Agent Builder Capstone Project

---

## Objective

**Build a working, multi-tenant agent platform.**

A user signs in, describes an agent in plain English, and your platform builds it, deploys it, and
gives them a chat window to test it in. When they are happy with it, they publish it — an admin
reviews it, and once approved, people in other companies can install it into their own workspace
with their own credentials.

You are not building an agent. You are building **the thing that builds agents**.

By the end you will have produced software that does all of the following:

- authenticates users and keeps each company's data completely separate
- stores and encrypts third-party credentials
- catalogues MCP servers and reads their capabilities automatically
- runs a multi-step LangGraph conversation that pauses for human input and survives restarts
- generates, deploys, runs and scores agents from configuration
- puts a human approval step in front of anything risky
- exposes every agent over an API

**The UI you need to build:** https://fnusatvik07.github.io/agent-platform-capstone/

Match the behaviour, not the pixels. Build it in whatever framework you like.

---

## Why this problem

In most companies today, every team that wants an AI agent writes it from scratch. That means the
same LangGraph boilerplate copied into six repositories, API keys hardcoded in each one, and no
way for anyone to reuse what another team already built.

Nobody can answer the two questions that actually matter: *what agents are running here, and what
are they allowed to touch?*

You are building the platform that answers both.

---

## What you are building

Three tabs. That is the whole product.

| Tab | What happens there |
|---|---|
| **MCP Registry** | Register MCP servers. Connect to them once with your own credentials. |
| **Build** | Chat to describe an agent. The platform picks tools, checks connections, builds it. |
| **My Agents** | Your agents as cards. Open one → test it in a playground → publish it. |

Plus a **Marketplace** everyone can install from, and an **Admin Review** queue that guards the
door to it.

---

## The flow you must deliver

Six steps, end to end. Your demo walks this path without cuts.

### Step 1 — Register a tool server

I open **MCP Registry**, paste in an MCP server address, and save it.

Your platform connects to that server and **asks it what tools it has**. It stores the answer.
I do not type tool names in by hand — if I could, the whole registry would be a lie the moment a
server changed.

Each tool is recorded as read, write, or destructive. That marking matters in step 4.

*Mockup: [MCP Registry](https://fnusatvik07.github.io/agent-platform-capstone/screens/registry.html)*

### Step 2 — Connect to it

The server needs a token. I paste mine in once, and it is encrypted immediately. I never see it
again and neither does anything else in the system that does not strictly need it.

Every agent I build from now on reuses this connection.

*Mockup: [Connections](https://fnusatvik07.github.io/agent-platform-capstone/screens/connections.html)*

### Step 3 — Describe an agent

I go to **Build** and type:

> *"I want an agent that reads my open GitHub issues every morning and posts a summary to Slack."*

Your platform then:

1. works out what the agent needs to do
2. searches its registry and **shows me the servers it thinks it needs** — I tick the ones I want
3. **checks whether I am connected to each one.** GitHub, yes. Slack, no — so it stops and asks me
   to add a Slack token before it will go any further
4. builds the agent and deploys it
5. shows me the finished result: name, description, what it can do, its score

**Those two moments where it stops and waits for me are the centre of this project.** They are
LangGraph interrupts, and the build must survive a server restart while it is paused and pick up
exactly where it left off.

*Mockup: [Build](https://fnusatvik07.github.io/agent-platform-capstone/screens/build.html)*

### Step 4 — Test it

The agent now appears in **My Agents** as a card. I click the card and get its page: what it does,
its graph, its tools, its scores, its run history, and its API endpoint.

There is a **playground** — a chat window where I talk to the agent and watch it work.

When the agent tries to do something risky, like posting to Slack, **it stops and asks me first**.
I click Approve or Reject right there in the chat.

*Mockups: [My Agents](https://fnusatvik07.github.io/agent-platform-capstone/screens/my-agents.html) ·
[Agent page](https://fnusatvik07.github.io/agent-platform-capstone/screens/agent.html?id=a1) ·
[Playground](https://fnusatvik07.github.io/agent-platform-capstone/screens/agent.html?id=a1&tab=playground)*

### Step 5 — Publish it

Once I am happy, I click **Publish to Marketplace**.

It does not go live. It goes to an admin, who sees what the agent is, what it can do, and how it
scored — and either approves it or sends it back with notes.

**That approval might sit there for three days.** Across two deploys and a weekend. Your system
has to handle that, and answering must resume the run from exactly where it stopped.

*Mockup: [Admin Review](https://fnusatvik07.github.io/agent-platform-capstone/screens/review.html)*

### Step 6 — Someone else installs it

A person in a **different company** opens the **Marketplace**, finds the agent, and clicks
**Add to my workspace**.

They get their own copy, and they are asked to supply their own credentials. They never touch the
original. The original owner's tokens never go anywhere.

*Mockup: [Marketplace](https://fnusatvik07.github.io/agent-platform-capstone/screens/marketplace.html)*

---

## The rules

These are the constraints that separate a real platform from a demo. **How** you satisfy them is
your design decision. **That** you satisfy them is not negotiable.

### 1. An agent is configuration, not code

When your platform "builds" an agent, it must not generate Python and run it. It writes a
configuration document. One runtime reads that document and assembles the agent.

Everything good about this project comes from that one decision — versioning, safety, and the
ability to publish an agent into someone else's workspace at all. Work out for yourself what that
document needs to contain. That is the central design problem of this capstone.

### 2. One person cannot see another person's things

Simple, and absolute. My agents, my connections, my runs — mine. Nobody else in the platform can
see them, and no other company's data reaches me.

Do not enforce this by remembering to add a filter to every query. One forgotten filter is a data
breach. Find a way to make it structurally impossible.

**How this is tested:** we delete your application-level check and try again. Isolation must still
hold.

The marketplace is the single deliberate exception — which is exactly why an admin guards it.

### 3. Credentials go in once and vanish

A token is encrypted on the way in. It is never written into an agent's configuration, never
appears in a prompt, never lands in a log or a saved conversation. When a tool needs it: fetch it,
use it, drop it.

**How this is tested:** we search everything your system stored for the token we gave you. Finding
it anywhere is a fail.

### 4. Risky actions ask a human first

Any tool that writes or deletes must pause and wait for a person before it runs.

This has to be enforced by the platform. Putting *"always ask before posting"* in the agent's
instructions is not a control — it is a suggestion, and models do not always follow suggestions.

### 5. Publishing strips the company out

What reaches the marketplace is the agent's **design**: what it does and what kinds of access it
needs. Not who built it, not their credentials, not anything internal to their company.

**How this is tested:** we hand you an agent with company-confidential material planted inside it,
and check what comes out the other side.

### 6. Scores must mean something

Every agent carries two numbers: **how well it works** and **how safely it is set up**.

You decide how to calculate them. But you must be able to point at exactly why a number is what it
is — no asking a model to guess a score.

Then make them matter: an agent that scores badly **cannot be published**. The button is disabled
and it says why. A score that blocks nothing is decoration.

### 7. Every agent gets an endpoint

Agents built here are usable from outside your UI. Each one has a URL you can call.

On the agent's page there is a **Download Postman Collection** button. A person should be able to
download it, hit Send, and get a response from their agent.

One detail worth getting right: a token belonging to another company that calls your agent's URL
gets **404**, not 403. A 403 confirms the agent exists.

### 8. At least one agent must be a real multi-agent system

Ship a demo agent that is more than a single tool-calling loop: a coordinator that delegates to at
least two specialists, with a human approval step in the middle.

It must be built **through your own platform**, not hand-written. That is the proof your platform
can produce agents shaped like this, and not just simple ones.

---

## What to submit

| | |
|---|---|
| **1. A GitHub repository** | Your platform. `docker compose up` and it runs. A README that explains how to start it and how to log in. No paid accounts required. |
| **2. A demo recording** | The six steps above, start to finish, without cuts. |
| **3. A design document** | One or two pages: how you made each rule true, and what you would do differently with another month. |
| **4. The multi-agent demo agent** | Built through your own platform. |

### The presentation

You will present your work **live for 45 minutes**. Plan for roughly:

- **15 minutes** — demo the six-step flow on your running platform
- **15 minutes** — walk through your design: your agent configuration format, how you isolated
  tenants, how you handled credentials, where your graph pauses
- **15 minutes** — questions. Expect to be asked why you made specific choices, and what breaks if
  a particular assumption fails

Bring the running system. Slides alone will not do.

---

## How you are graded

Nine checks. Each one passes or fails. All of them get run against your submission.

| # | Check |
|---|---|
| 1 | One user cannot reach another user's agents — **with your application filter removed** |
| 2 | A credential we supply appears nowhere in anything your system stored |
| 3 | An agent with an unguarded write tool cannot be published |
| 4 | Planted confidential material does not survive publication to the marketplace |
| 5 | Killing the server mid-build resumes correctly on restart |
| 6 | An approval left pending overnight still resumes the next day |
| 7 | The playground runs the multi-agent demo end to end, including its approval step |
| 8 | The downloaded Postman collection gets a real response |
| 9 | Asking for another company's agent by ID does not reveal that it exists |

Your presentation is graded alongside these. A system that passes all nine but that you cannot
explain is not a pass.

---

## Practical notes

**Nothing here needs a paid account.** Free model tiers, or a model running on your own machine,
are both fine. Free public MCP servers exist — and write one yourself if you need something
specific.

**One warning that will save you a week.** LangGraph Platform is not free, and self-hosting its
Agent Server needs a paid licence key. Free tracing is available and worth turning on, but plan to
run your own server from day one.

**Before you start, go and look at
[LangSmith Fleet](https://docs.langchain.com/langsmith/fleet/index).** It is a shipped product that
does roughly what you are being asked to build. Read how it handles
[agent identity](https://docs.langchain.com/langsmith/fleet/agent-identity),
[approvals](https://docs.langchain.com/langsmith/fleet/essentials),
[schedules](https://docs.langchain.com/langsmith/fleet/schedules) and
[calling agents from code](https://docs.langchain.com/langsmith/fleet/code). Borrow shamelessly.

---

## If you finish early

Schedules, so agents run on their own. Streaming in the playground. Agent versioning and rollback.
Ratings in the marketplace. OAuth connections instead of pasted tokens. Agents that use other
agents as tools.

## Do not attempt these

They will eat your time and teach you very little here: code generation with sandboxing, single
sign-on, token exchange protocols, per-agent service accounts, canary deployments.
