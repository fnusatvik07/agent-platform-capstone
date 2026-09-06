/* Shared shell + card rendering for the Forge mockups. */

const Forge = {

  NAV: [
    { key: "build",       href: "build.html",       icon: "✦", label: "Build" },
    { key: "my-agents",   href: "my-agents.html",   icon: "◧", label: "My Agents" },
    { key: "registry",    href: "registry.html",    icon: "⛁", label: "MCP Registry" },
    { key: "connections", href: "connections.html", icon: "⚿", label: "Connections" }
  ],
  NAV2: [
    { key: "marketplace", href: "marketplace.html", icon: "⬡", label: "Marketplace" },
    { key: "review",      href: "review.html",      icon: "☑", label: "Admin Review", admin: true }
  ],

  shell(active, opts = {}) {
    const me = DATA.me;
    const bar = document.getElementById("mockbar");
    if (bar) {
      bar.innerHTML = `
        <div class="row" style="gap:10px">
          <span class="tag">BUILD THIS</span>
          <span>${opts.build || "This is the UI you need to build. Everything in red is a note to you, not part of the design."}</span>
        </div>
        <div class="row" style="gap:14px">
          <a href="../brief.html">Problem statement</a>
          <a href="../index.html">All screens</a>
        </div>`;
    }

    const item = (n) => `
      <a class="nav-item ${n.key === active ? "active" : ""}" href="${n.href}">
        <span class="ic">${n.icon}</span>${n.label}
      </a>`;

    const sb = document.getElementById("sidebar");
    if (sb) {
      sb.innerHTML = `
        <a class="brand" href="../index.html"><span class="mark">F</span>Forge</a>
        <div class="nav-label">Workspace</div>
        ${Forge.NAV.map(item).join("")}
        <div class="nav-label">Shared</div>
        ${Forge.NAV2.map(item).join("")}
        <div class="sidebar-foot">
          <div class="who">
            <div class="avatar">${me.initials}</div>
            <div>
              <div style="font-weight:550">${me.name}</div>
              <div class="org">${opts.org || me.org}${opts.role === "admin" ? " · admin" : ""}</div>
            </div>
          </div>
        </div>`;
    }
  },

  topbar(title, sub, actions = "") {
    return `
      <div class="topbar">
        <div>
          <h1>${title}</h1>
          ${sub ? `<div class="sub">${sub}</div>` : ""}
        </div>
        <div class="row">${actions}</div>
      </div>`;
  },

  gradeEl(g) {
    return `<span class="grade ${g.toLowerCase()}">${g}</span>`;
  },

  statusBadge(s) {
    const st = STATUS[s] || STATUS.draft;
    return `<span class="badge ${st.cls}"><span class="dot"></span>${st.label}</span>`;
  },

  /* the card. an agent looks like this everywhere it appears. */
  agentCard(a) {
    return `
      <a class="agent-card" href="agent.html?id=${a.id}">
        <div class="head">
          <div class="name">${a.name}</div>
          ${Forge.statusBadge(a.status)}
        </div>
        <div class="desc">${a.desc}</div>
        <div class="tools">
          ${a.servers.map((s) => `<span class="chip">${s}</span>`).join("")}
          ${a.topology === "supervisor" ? `<span class="badge accent">multi-agent</span>` : ""}
        </div>
        <div class="foot">
          <div class="scores">
            <span class="score">Score <b>${a.score}</b></span>
            ${Forge.gradeEl(a.grade)}
          </div>
          <div>${a.schedule ? a.schedule + " · " : ""}${a.runs} runs · ${a.lastRun}</div>
        </div>
      </a>`;
  },

  listingCard(m) {
    return `
      <a class="agent-card" href="marketplace.html?id=${m.id}">
        <div class="head">
          <div class="name">${m.name}</div>
          ${m.topology === "supervisor" ? `<span class="badge accent">multi-agent</span>` : ""}
        </div>
        <div class="desc">${m.desc}</div>
        <div class="tools">
          ${m.requires.map((s) => `<span class="chip">${s}</span>`).join("")}
        </div>
        <div class="foot">
          <div class="scores">
            <span class="score">Score <b>${m.score}</b></span>
            ${Forge.gradeEl(m.grade)}
          </div>
          <div>${m.org} · ${m.installs} installs</div>
        </div>
      </a>`;
  },

  riskBadge(r) {
    const cls = RISK[r];
    return `<span class="badge ${cls}">${r}</span>`;
  },

  param(k, d) {
    return new URLSearchParams(location.search).get(k) || d;
  },

  /* red panel listing what must actually be built on this screen */
  reqPanel(items, title = "What you must build on this screen") {
    return `
      <div class="req">
        <div class="rh">${title}</div>
        <div class="reqlist" style="margin-top:8px">
          ${items.map((t, i) => `
            <div class="reqrow">
              <span class="pin">${i + 1}</span>
              <span class="t">${t}</span>
            </div>`).join("")}
        </div>
      </div>`;
  },

  /* a single red inline note */
  req(html, title = "Requirement") {
    return `<div class="req"><div class="rh">${title}</div>${html}</div>`;
  }
};
