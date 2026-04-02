class AppModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.handleEscape = this.handleEscape.bind(this);
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    disconnectedCallback() {
        document.removeEventListener("keydown", this.handleEscape);
    }

    static get observedAttributes() {
        return ["open", "title", "size"];
    }

    attributeChangedCallback() {
        this.render();
        this.bindEvents();
    }

    get isOpen() {
        return this.hasAttribute("open");
    }

    open() {
        this.setAttribute("open", "");
        this.dispatchEvent(new CustomEvent("modal-open", { bubbles: true, composed: true }));
    }

    close() {
        this.removeAttribute("open");
        this.dispatchEvent(new CustomEvent("modal-close", { bubbles: true, composed: true }));
    }

    handleEscape(e) {
        if (e.key === "Escape" && this.isOpen) {
            this.close();
        }
    }

    bindEvents() {
        const overlay = this.shadowRoot.querySelector(".overlay");
        const closeBtn = this.shadowRoot.querySelector(".close-btn");
        const panel = this.shadowRoot.querySelector(".modal");

        if (overlay) {
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            };
        }

        if (closeBtn) {
            closeBtn.onclick = () => this.close();
        }

        if (panel) {
            panel.onclick = (e) => e.stopPropagation();
        }

        document.removeEventListener("keydown", this.handleEscape);
        if (this.isOpen) {
            document.addEventListener("keydown", this.handleEscape);
        }
    }

    render() {
        const title = this.getAttribute("title") || "Modal Title";
        const size = this.getAttribute("size") || "md";

        const sizeMap = {
            sm: "400px",
            md: "500px",
            lg: "700px",
            xl: "900px"
        };

        const width = sizeMap[size] || sizeMap.md;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: Arial, sans-serif;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: ${this.isOpen ? "flex" : "none"};
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal {
          background: white;
          width: 100%;
          max-width: ${width};
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: popIn 0.2s ease;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          border: none;
          background: transparent;
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
        }

        .body {
          padding: 20px;
        }

        .footer {
          padding: 16px 20px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <div class="header">
            <h2 class="title">${title}</h2>
            <button class="close-btn" aria-label="Close modal">&times;</button>
          </div>

          <div class="body">
            <slot name="body">Modal content goes here.</slot>
          </div>

          <div class="footer">
            <slot name="footer">
              <button id="defaultClose">Close</button>
            </slot>
          </div>
        </div>
      </div>
    `;

        const defaultClose = this.shadowRoot.querySelector("#defaultClose");
        if (defaultClose) {
            defaultClose.onclick = () => this.close();
        }
    }
}

customElements.define("app-modal", AppModal);