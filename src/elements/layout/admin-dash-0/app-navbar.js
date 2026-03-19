import { UserAvatar } from "../../ui/user-avatar.js";

export class AppNavbar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "MyApp";
    this.innerHTML = `
      <style>
        .app-shell {
          display: inline-block;
          background: transparent;
          color: var(--main-100);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
          width: 100%;
        }

        .sidenav {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          gap: 20px;
          background: var(--color-primary-800);
          border-right: 1px solid var(--color-primary-900);
          box-sizing: border-box;
        }

        .brand .eyebrow {
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--primary-300);
        }

        .brand h1 {
          margin: 10px 0 4px;
          font-size: 24px;
          font-weight: 600;
          color: var(--main-50);
        }

        .brand p {
          margin: 0;
          font-size: 13px;
          color: var(--main-400);
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 8px 0 4px;
        }

        .profile .meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile .name {
          font-size: 14px;
          color: var(--main-100);
          font-weight: 600;
        }

        .profile .role {
          font-size: 12px;
          color: var(--main-400);
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
        }

        .nav a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 12px;
          color: var(--main-300);
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .nav a:hover {
          background: var(--color-primary-700);
          transform: translateX(3px);
        }

        .nav a.active {
          background: var(--primary-600);
          color: var(--main-50);
          font-weight: 600;
        }

        .pill {
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--primary-400);
          color: var(--main-950);
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        .meta {
          font-size: 11px;
          color: var(--main-500);
        }

        .status-card {
          margin-top: auto;
          border-radius: 16px;
          border: 1px solid var(--main-800);
          padding: 16px;
          background: var(--main-900);
          color: var(--main-300);
          font-size: 12px;
        }

        .status-card .label {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--main-500);
        }

        .status-card .message {
          margin: 10px 0 0;
          font-size: 14px;
          color: var(--main-100);
        }

        .status-card button {
          margin-top: 14px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid var(--primary-500);
          background: transparent;
          color: var(--primary-300);
          padding: 8px 10px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .status-card button:hover {
          background: var(--primary-700);
          color: var(--main-50);
        }

        @media (max-width: 900px) {
          .sidenav {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--main-800);
          }
        }
      </style>

      <div class="app-shell">
        <aside class="sidenav">
          <div class="brand">
            <h1>${title}</h1>
            <p>Ops console</p>
          </div>

          <div class="profile">
            <user-avatar
              alt="Admin User"
              initials="AU"
              size="44"
              status="online"
              rounded="full"
            ></user-avatar>
            <div class="meta">
              <span class="name">Admin User</span>
              <span class="role">Operations</span>
            </div>
          </div>

          <nav class="nav">
            <a href="/home">
              Overview
              <span class="pill">Live</span>
            </a>
            <a href="/labs">
              Labs
              <span class="meta">12</span>
            </a>
            <a href="/logs">
              Logs
              <span class="meta">3</span>
            </a>
            <a href="/specs">
              Specs
              <span class="meta">9</span>
            </a>
            <a href="/users">
              Users
              <span class="meta">46</span>
            </a>
            <a href="/notifications">
              Notifications
              <span class="meta">5</span>
            </a>
            <a href="/profile">
              Profile
              <span class="meta">1</span>
            </a>
          </nav>

          <div class="status-card">
            <div class="label">Status</div>
            <div class="message">All systems normal.</div>
            <button type="button">View report</button>
          </div>
        </aside>
      </div>
    `;

    const links = this.querySelectorAll(".nav a");
    const currentPath = window.location.pathname.replace(/\/$/, "");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const normalizedHref = href.replace(/\/$/, "");
      const match =
        currentPath === normalizedHref ||
        currentPath === `${normalizedHref}/index.html`;
      if (match) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

customElements.define("app-navbar", AppNavbar);
