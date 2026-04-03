import { UserAvatar } from "../../ui/user-avatar.js";

export class AppNavbar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Databenki";
    this.innerHTML = /* html */`
      <style>
        .app-shell {
          display: block;
          background: var(--color-primary-900);
          color: var(--color-main-100);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
          width: 100%;
          height: 100%;
        }

        .sidenav {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: var(--color-primary-800);
          box-sizing: border-box;
          overflow: hidden;
        }

        .brand .eyebrow {
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-primary-300);
        }

        .brand h1 {
          margin: 10px 0 4px;
          font-size: 24px;
          font-weight: 600;
          color: var(--color-main-50);
        }

        .brand .logo {
          display: block;
          width: 128px;
          height: auto;
          margin: 10px auto 4px;
        }

        .brand p {
          margin: 0;
          font-size: 13px;
          color: var(--color-main-400);
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


        .profile .role {
          font-size: 12px;
          color: var(--color-main-400);
        }

        .nav-scroll {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding-right: 6px;
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
          color: var(--color-main-500);
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .nav .nav-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .nav .nav-item i {
          font-size: 16px;
        }

        .nav a:hover {
          background: var(--color-primary-700);
          transform: translateX(3px);
        }

        .nav a.active {
          background: var(--color-primary-600);
          color: var(--color-main-50);
          font-weight: 600;
        }

        .pill {
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--color-primary-400);
          color: var(--color-main-950);
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        .meta {
          font-size: 11px;
          color: var(--color-main-500);
        }

        .sidebar-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 6px 6px;
          margin-top: auto;
          border-top: 1px solid var(--color-primary-700);
        }

        .sidebar-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          color: var(--color-main-500);
          text-decoration: none;
          border: 1px solid transparent;
          transition: transform 0.2s ease, background 0.2s ease, border 0.2s ease;
        }

        .sidebar-actions a:hover {
          background: var(--color-primary-700);
          border-color: var(--color-primary-600);
          transform: translateY(-1px);
        }

        .sidebar-actions i {
          font-size: 18px;
        }

        @media (max-width: 900px) {
          .sidenav {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--color-main-800);
          }
        }
      </style>

      <div class="app-shell">
        <aside class="sidenav ">
          <div class="brand border-b border-primary-700 pb-3">
            <img class="logo" src="/assets/img/logo2.png" alt="${title} logo" />
          </div>

          <div class="profile px-3">
            <user-avatar
              alt="Admin User"
              initials="AU"
              size="50"
              status="online"
              rounded="full"
            ></user-avatar>
            <div class="meta">
              <span class="text-main-500 text-xl">Admin User</span>
            </div>
          </div>

          <nav class="nav nav-scroll px-3">
            <a href="/home">
              <span class="nav-item">
                <i class="bi bi-speedometer2"></i>
                <span>Overview</span>
              </span>
            </a>
            <a href="/users">
              <span class="nav-item">
                <i class="bi bi-people"></i>
                <span>Contacts</span>
              </span>
            </a>
            <a href="/messaging">
              <span class="nav-item">
                <i class="bi bi-chat-dots"></i>
                <span>Messaging</span>
              </span>
            </a>
            <a href="/logs">
              <span class="nav-item">
                <i class="bi bi-journal-text"></i>
                <span>Logs</span>
              </span>
            </a>
          </nav>

          <div class="sidebar-actions">
            <a href="#" aria-label="Theme" data-theme-toggle>
              <i class="bi bi-moon-stars"></i>
            </a>
            <a href="#" aria-label="Settings">
              <i class="bi bi-gear"></i>
            </a>
            <a href="/profile" aria-label="Profile">
              <i class="bi bi-person"></i>
            </a>            
            <a href="/auth/login" aria-label="Log out">
              <i class="bi bi-box-arrow-right"></i>
            </a>
          </div>
        </aside>
      </div>
    `;

    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      root.setAttribute("data-theme", storedTheme);
    }

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

    const themeToggle = this.querySelector("[data-theme-toggle]");
    if (themeToggle) {
      themeToggle.addEventListener("click", (event) => {
        event.preventDefault();
        const isDark = root.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";
        root.setAttribute("data-theme", nextTheme);
        window.localStorage.setItem("theme", nextTheme);
      });
    }
  }
}

customElements.define("app-navbar", AppNavbar);
