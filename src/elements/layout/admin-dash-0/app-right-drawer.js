export class AppRightDrawer extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.shadowRoot.innerHTML = `
      <style>
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 320px;
          background: var(--main-50);
          border-left: 1px solid var(--main-200);
          color: var(--main-900);
          transform: translateX(100%);
          transition: transform 0.25s ease;
          z-index: 20;
          display: flex;
          flex-direction: column;
        }

        .drawer.open {
          transform: translateX(0);
        }

        .drawer-header {
          padding: 18px 20px;
          border-bottom: 1px solid var(--main-200);
          background: var(--main-100);
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
        }

        .drawer-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .drawer-body {
          padding: 18px 20px;
          font-size: 14px;
          color: var(--main-600);
          flex: 1;
        }

        .trigger {
          position: fixed;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          background: var(--primary-600);
          color: var(--main-50);
          border: none;
          padding: 10px 12px;
          border-radius: 10px 0 0 10px;
          cursor: pointer;
          z-index: 21;
          font-size: 13px;
          letter-spacing: 0.04em;
          font-family: "Space Grotesk", "Syne", "Segoe UI", sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 44px;
        }

        .trigger svg {
          width: 18px;
          height: 18px;
          display: block;
          transition: transform 0.2s ease;
        }

        .trigger.open svg {
          transform: rotate(180deg);
        }
      </style>

      <button class="trigger" type="button" aria-label="Toggle drawer" aria-expanded="false">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
      
      <aside class="drawer" aria-hidden="true">
        <div class="drawer-header">
          <h3>Quick Panel</h3>
        </div>
        <div class="drawer-body">
          Add filters, notes, or shortcuts here.
        </div>
      </aside>
    `;

    const trigger = this.shadowRoot.querySelector(".trigger");
    const drawer = this.shadowRoot.querySelector(".drawer");
    let isDragging = false;
    let dragOffsetY = 0;

    trigger.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      drawer.setAttribute("aria-hidden", String(!isOpen));
      trigger.classList.toggle("open", isOpen);
    });

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    trigger.addEventListener("pointerdown", (event) => {
      isDragging = true;
      trigger.setPointerCapture(event.pointerId);
      const rect = trigger.getBoundingClientRect();
      dragOffsetY = event.clientY - rect.top;
    });

    trigger.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      const newTop = event.clientY - dragOffsetY;
      const maxTop = window.innerHeight - trigger.offsetHeight;
      const clampedTop = clamp(newTop, 0, maxTop);
      trigger.style.top = `${clampedTop}px`;
      trigger.style.transform = "none";
    });

    const stopDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      if (event) {
        trigger.releasePointerCapture(event.pointerId);
      }
    };

    trigger.addEventListener("pointerup", stopDrag);
    trigger.addEventListener("pointercancel", stopDrag);
  }
}

customElements.define("app-right-drawer", AppRightDrawer);
