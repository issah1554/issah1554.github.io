import "./app-navbar.js";
import "./app-topbar.js";
import "./footer.js";
import "./app-right-drawer.js";

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
          color: var(--main-100);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
        }

        .sidebar {
          width: 260px;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
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
          margin-left: 260px;
          min-height: 100vh;
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
            position: relative;
            top: auto;
            left: auto;
            bottom: auto;
            border-right: none;
            border-bottom: 1px solid var(--main-800);
          }

          .content {
            margin-left: 0;
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
