export class AppFooter extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "All systems operational";
    this.innerHTML = `
      <style>
        .footer {
          padding: 16px 26px;
          border-top: 1px solid var(--main-200);
          background: var(--main-50);
          color: var(--main-600);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--success-100);
          color: var(--success-700);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        a {
          color: var(--primary-600);
          text-decoration: none;
        }
      </style>

      <footer class="footer">
        <span>${label}</span>
        <span class="badge">Status</span>
        <a href="/">Support</a>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
