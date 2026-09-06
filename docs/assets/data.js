/* Mock data for the Forge mockups. Illustrative only — students build their own. */

const DATA = {
  me: { name: "Priya Raman", initials: "PR", org: "Northwind Labs", role: "member" },

  agents: [
    {
      id: "a1",
      name: "Issue Digest",
      desc: "Triages open GitHub issues by severity and posts a morning digest to Slack.",
      status: "live",
      topology: "supervisor",
      servers: ["github", "slack"],
      score: 82, grade: "B",
      runs: 41, lastRun: "2h ago",
      schedule: "Weekdays 08:00",
      model: "claude-sonnet-5",
      instructions:
        "You are an engineering assistant for the platform team. Each run, gather open issues, " +
        "classify them by severity, and produce a short digest. Be concise. Never invent issue numbers.",
      tools: [
        { server: "github", tool: "list_issues",  risk: "read",  approval: "auto" },
        { server: "github", tool: "get_issue",    risk: "read",  approval: "auto" },
        { server: "slack",  tool: "post_message", risk: "write", approval: "ask"  }
      ],
      subagents: [
        { name: "triager",  role: "Classifies each issue P0 / P1 / P2 with a one-line reason." },
        { name: "reporter", role: "Turns the triaged list into a Slack digest under 200 words." }
      ]
    },
    {
      id: "a2",
      name: "Release Notes Writer",
      desc: "Reads merged pull requests since the last tag and drafts release notes for review.",
      status: "live",
      topology: "single",
      servers: ["github"],
      score: 76, grade: "A",
      runs: 18, lastRun: "yesterday",
      schedule: null,
      model: "gemini-2.5-flash",
      instructions: "Draft release notes grouped by feature, fix and chore. Link every PR.",
      tools: [
        { server: "github", tool: "list_pulls", risk: "read", approval: "auto" },
        { server: "github", tool: "get_commit", risk: "read", approval: "auto" }
      ],
      subagents: []
    },
    {
      id: "a3",
      name: "Onboarding Buddy",
      desc: "Answers new-joiner questions from the internal handbook and files IT access tickets.",
      status: "draft",
      topology: "supervisor",
      servers: ["filesystem", "jira"],
      score: 54, grade: "C",
      runs: 6, lastRun: "4d ago",
      schedule: null,
      model: "claude-sonnet-5",
      instructions: "Answer from the handbook only. If access is needed, raise a ticket.",
      tools: [
        { server: "filesystem", tool: "search_files", risk: "read",  approval: "auto" },
        { server: "jira",       tool: "create_issue", risk: "write", approval: "ask"  }
      ],
      subagents: [
        { name: "handbook", role: "Answers policy questions from handbook files." },
        { name: "it_desk",  role: "Raises access tickets when the answer needs one." }
      ]
    },
    {
      id: "a4",
      name: "Vendor Invoice Checker",
      desc: "Compares incoming invoices against purchase orders and flags mismatches for finance.",
      status: "pending_review",
      topology: "single",
      servers: ["filesystem", "sqlite"],
      score: 79, grade: "B",
      runs: 23, lastRun: "6h ago",
      schedule: "Daily 06:00",
      model: "claude-sonnet-5",
      instructions: "Match invoice totals to the PO. Flag anything over 2% variance.",
      tools: [
        { server: "filesystem", tool: "read_file", risk: "read", approval: "auto" },
        { server: "sqlite",     tool: "query",     risk: "read", approval: "auto" }
      ],
      subagents: []
    },
    {
      id: "a5",
      name: "Standup Summariser",
      desc: "Collects yesterday's Slack standup thread and produces a blockers-first summary.",
      status: "degraded",
      topology: "single",
      servers: ["slack"],
      score: 61, grade: "D",
      runs: 12, lastRun: "3d ago",
      schedule: "Weekdays 09:30",
      model: "llama-3.3-70b",
      instructions: "Summarise standup. Lead with blockers.",
      tools: [
        { server: "slack", tool: "read_channel", risk: "read",  approval: "auto" },
        { server: "slack", tool: "post_message", risk: "write", approval: "ask"  }
      ],
      subagents: []
    },
    {
      id: "a6",
      name: "Docs Freshness Bot",
      desc: "Finds documentation pages that reference code paths which no longer exist.",
      status: "live",
      topology: "single",
      servers: ["filesystem", "git"],
      score: 88, grade: "A",
      runs: 57, lastRun: "31m ago",
      schedule: "Sundays 02:00",
      model: "claude-sonnet-5",
      instructions: "Cross-check documented paths against the repository tree.",
      tools: [
        { server: "filesystem", tool: "search_files", risk: "read", approval: "auto" },
        { server: "git",        tool: "list_tree",    risk: "read", approval: "auto" }
      ],
      subagents: []
    }
  ],

  servers: [
    {
      name: "github", scope: "global", transport: "http", auth: "api_key",
      status: "ok", connected: true, checked: "12m ago",
      desc: "Issues, pull requests, commits and repository trees.",
      tools: [
        { name: "list_issues",  risk: "read",  desc: "List issues in a repository." },
        { name: "get_issue",    risk: "read",  desc: "Fetch one issue with comments." },
        { name: "list_pulls",   risk: "read",  desc: "List pull requests." },
        { name: "get_commit",   risk: "read",  desc: "Fetch a commit by SHA." },
        { name: "create_issue", risk: "write", desc: "Open a new issue." },
        { name: "close_issue",  risk: "write", desc: "Close an existing issue." }
      ]
    },
    {
      name: "slack", scope: "global", transport: "http", auth: "oauth",
      status: "ok", connected: false, checked: "12m ago",
      desc: "Read channels and post messages to a workspace.",
      tools: [
        { name: "read_channel", risk: "read",  desc: "Read recent messages in a channel." },
        { name: "post_message", risk: "write", desc: "Post a message to a channel." },
        { name: "delete_message", risk: "destructive", desc: "Delete a message." }
      ]
    },
    {
      name: "filesystem", scope: "global", transport: "stdio", auth: "none",
      status: "ok", connected: true, checked: "12m ago",
      desc: "Read and search files in a mounted directory.",
      tools: [
        { name: "read_file",    risk: "read",        desc: "Read a file's contents." },
        { name: "search_files", risk: "read",        desc: "Search files by pattern." },
        { name: "write_file",   risk: "write",       desc: "Write to a file." },
        { name: "delete_file",  risk: "destructive", desc: "Delete a file." }
      ]
    },
    {
      name: "sqlite", scope: "global", transport: "stdio", auth: "none",
      status: "ok", connected: true, checked: "12m ago",
      desc: "Query a local SQLite database.",
      tools: [
        { name: "query",  risk: "read",  desc: "Run a read-only SQL query." },
        { name: "schema", risk: "read",  desc: "Describe tables and columns." },
        { name: "execute", risk: "destructive", desc: "Run an arbitrary statement." }
      ]
    },
    {
      name: "git", scope: "global", transport: "stdio", auth: "none",
      status: "ok", connected: true, checked: "12m ago",
      desc: "Inspect a local git repository.",
      tools: [
        { name: "list_tree", risk: "read", desc: "List tracked files." },
        { name: "log",       risk: "read", desc: "Read commit history." }
      ]
    },
    {
      name: "jira", scope: "tenant", transport: "http", auth: "api_key",
      status: "down", connected: true, checked: "9m ago",
      desc: "Internal Jira. Registered by Northwind Labs — private to this workspace.",
      tools: [
        { name: "search_issues", risk: "read",  desc: "JQL search." },
        { name: "create_issue",  risk: "write", desc: "Create a ticket." },
        { name: "transition",    risk: "write", desc: "Move a ticket between states." }
      ]
    }
  ],

  connections: [
    { server: "github",     status: "active",  added: "12 Aug", used: "2h ago",  by: "Priya Raman" },
    { server: "filesystem", status: "active",  added: "12 Aug", used: "31m ago", by: "Priya Raman" },
    { server: "sqlite",     status: "active",  added: "14 Aug", used: "6h ago",  by: "Priya Raman" },
    { server: "git",        status: "active",  added: "14 Aug", used: "31m ago", by: "Priya Raman" },
    { server: "jira",       status: "expired", added: "02 Jul", used: "4d ago",  by: "Priya Raman" }
  ],

  marketplace: [
    {
      id: "m1", name: "Incident Postmortem Drafter",
      desc: "Reads an incident channel and the related tickets, then drafts a blameless postmortem.",
      org: "Helios Systems", score: 91, grade: "A", installs: 214,
      requires: ["slack", "jira"], topology: "supervisor"
    },
    {
      id: "m2", name: "Contract Clause Reviewer",
      desc: "Checks uploaded contracts against your standard clause library and flags deviations.",
      org: "Meridian Legal", score: 87, grade: "A", installs: 156,
      requires: ["filesystem"], topology: "supervisor"
    },
    {
      id: "m3", name: "Issue Digest",
      desc: "Triages open GitHub issues by severity and posts a morning digest to Slack.",
      org: "Northwind Labs", score: 82, grade: "B", installs: 98,
      requires: ["github", "slack"], topology: "supervisor"
    },
    {
      id: "m4", name: "Expense Policy Checker",
      desc: "Reviews submitted expenses against company policy and routes exceptions to finance.",
      org: "Helios Systems", score: 84, grade: "B", installs: 73,
      requires: ["sqlite"], topology: "single"
    },
    {
      id: "m5", name: "Customer Email Triage",
      desc: "Sorts inbound support email by intent and urgency, drafts a first reply for approval.",
      org: "Bluepeak Support", score: 78, grade: "B", installs: 61,
      requires: ["gmail"], topology: "supervisor"
    },
    {
      id: "m6", name: "Docs Freshness Bot",
      desc: "Finds documentation pages that reference code paths which no longer exist.",
      org: "Northwind Labs", score: 88, grade: "A", installs: 44,
      requires: ["filesystem", "git"], topology: "single"
    }
  ],

  submissions: [
    {
      id: "s1", agent: "Vendor Invoice Checker", org: "Northwind Labs", by: "Priya Raman",
      submitted: "2 hours ago", score: 79, grade: "B", waiting: "2h",
      desc: "Compares incoming invoices against purchase orders and flags mismatches for finance.",
      requires: ["filesystem", "sqlite"],
      checks: [
        { ok: true,  t: "Write and destructive tools require approval" },
        { ok: true,  t: "All tool servers healthy and version-pinned" },
        { ok: true,  t: "No credentials found in configuration or traces" },
        { ok: false, t: "Two granted tools were never used in 23 runs" },
        { ok: true,  t: "Tested 23 times in the playground" }
      ]
    },
    {
      id: "s2", agent: "Meeting Notes Distiller", org: "Helios Systems", by: "Tom Achebe",
      submitted: "yesterday", score: 85, grade: "A", waiting: "1d",
      desc: "Turns a transcript into decisions, owners and dates, then files follow-up tickets.",
      requires: ["filesystem", "jira"],
      checks: [
        { ok: true, t: "Write and destructive tools require approval" },
        { ok: true, t: "All tool servers healthy and version-pinned" },
        { ok: true, t: "No credentials found in configuration or traces" },
        { ok: true, t: "All granted tools used at least once" },
        { ok: true, t: "Tested 31 times in the playground" }
      ]
    },
    {
      id: "s3", agent: "Churn Risk Watcher", org: "Bluepeak Support", by: "Dana Ilic",
      submitted: "3 days ago", score: 68, grade: "C", waiting: "3d",
      desc: "Scores accounts for churn risk from support volume and sentiment.",
      requires: ["sqlite", "slack"],
      checks: [
        { ok: false, t: "post_message is set to run without approval" },
        { ok: true,  t: "All tool servers healthy and version-pinned" },
        { ok: true,  t: "No credentials found in configuration or traces" },
        { ok: false, t: "Four granted tools were never used" },
        { ok: true,  t: "Tested 9 times in the playground" }
      ]
    }
  ],

  runs: [
    { when: "2h ago",  status: "ok",   trigger: "Schedule",   ms: 8420,  usd: 0.031, out: "Posted digest — 3 P0, 11 P1" },
    { when: "1d ago",  status: "ok",   trigger: "Playground", ms: 7110,  usd: 0.028, out: "Posted digest — 1 P0, 9 P1" },
    { when: "1d ago",  status: "wait", trigger: "Playground", ms: 5240,  usd: 0.019, out: "Paused — approval for post_message" },
    { when: "2d ago",  status: "ok",   trigger: "Schedule",   ms: 9030,  usd: 0.034, out: "Posted digest — 0 P0, 14 P1" },
    { when: "2d ago",  status: "err",  trigger: "Schedule",   ms: 1180,  usd: 0.002, out: "slack: 401 — connection expired" },
    { when: "3d ago",  status: "ok",   trigger: "API",        ms: 8890,  usd: 0.030, out: "Posted digest — 2 P0, 8 P1" }
  ]
};

const STATUS = {
  live:           { cls: "ok",     label: "live" },
  draft:          { cls: "",       label: "draft" },
  pending_review: { cls: "warn",   label: "in review" },
  published:      { cls: "accent", label: "published" },
  degraded:       { cls: "danger", label: "degraded" }
};

const RISK = { read: "", write: "warn", destructive: "danger" };
