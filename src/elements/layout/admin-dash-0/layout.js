export class AppLayout extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.shadowRoot.innerHTML = `
      <style>
        .layout {
          min-height: 100vh;
          display: flex;
          background: var(--main-950);
          color: var(--main-100);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
        }

        .sidebar {
          width: 260px;
          border-right: 1px solid var(--main-800);
          background: var(--main-950);
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--main-100);
          color: var(--main-900);
          position: relative;
          z-index: 1;
        }

        .main {
          flex: 1;
          padding: 28px 26px;
          background: var(--main-100);
        }

        app-navbar {
          display: block;
          width: 100%;
          height: 100%;
        }

        ::slotted(app-navbar) {
          display: block;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 900px) {
          .layout {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--main-800);
          }
        }
      </style>

      <div class="layout">
        <aside class="sidebar">
          <slot name="sidebar">
            <app-navbar></app-navbar>
          </slot>
        </aside>

        <section class="content">
          <slot name="topbar">
            <app-topbar></app-topbar>
          </slot>
          <main class="main">
            <slot></slot>
          </main>
          <slot name="footer">
            <app-footer></app-footer>
          </slot>
        </section>
        <app-right-drawer></app-right-drawer>
      </div>
    `;
  }
}

customElements.define("app-layout", AppLayout);
