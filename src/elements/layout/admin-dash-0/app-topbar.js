export class AppTopbar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Dashboard";
    const subtitle = this.getAttribute("subtitle") || "Welcome back";
    this.innerHTML = `
      <style>
        .topbar {
          padding: 18px 26px;
          border-bottom: 1px solid var(--main-200);
          background: linear-gradient(
            120deg,
            var(--primary-300),
            var(--info-300),
            var(--accent-300)
          );
          color: var(--main-950);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
        }

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--main-900);
        }

        h2 {
          margin: 6px 0 2px;
          font-size: 24px;
        }

        p {
          margin: 0;
          font-size: 14px;
          color: var(--main-800);
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .actions input {
          border-radius: 999px;
          border: 1px solid var(--main-200);
          padding: 8px 14px;
          font-size: 13px;
          background: var(--main-50);
          color: var(--main-900);
          outline: none;
        }

        .actions button {
          border-radius: 999px;
          border: none;
          padding: 8px 16px;
          background: var(--main-950);
          color: var(--main-50);
          font-size: 13px;
          cursor: pointer;
        }
      </style>

      <header class="topbar">
        <div class="row">
          <div>
            <div class="eyebrow">Topbar</div>
            <h2>${title}</h2>
            <p>${subtitle}</p>
          </div>
          <div class="actions">
            <input type="search" placeholder="Search" />
            <button type="button">New report</button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-topbar", AppTopbar);
