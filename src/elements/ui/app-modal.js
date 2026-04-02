class AppModal extends HTMLElement {
    static get observedAttributes() {
        return ["open"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.handleEsc = this.handleEsc.bind(this);
        this.handleBackdrop = this.handleBackdrop.bind(this);
    }

    connectedCallback() {
        this.render();
        if (this.open) this.onOpen();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    attributeChangedCallback(name) {
        if (name === "open") {
            this.render();
            this.open ? this.onOpen() : this.cleanup();
        }
    }

    /* =======================
       Props (getters)
    ======================= */

    get open() {
        return this.hasAttribute("open");
    }

    get size() {
        return this.getAttribute("size") || "md";
    }

    get position() {
        return this.getAttribute("position") || "center";
    }

    get blur() {
        return this.getAttribute("blur") !== "false";
    }

    get closeOnBackdrop() {
        return this.getAttribute("close-on-backdrop") !== "false";
    }

    get closeOnEsc() {
        return this.getAttribute("close-on-esc") !== "false";
    }

    /* =======================
       Methods
    ======================= */

    close() {
        this.removeAttribute("open");
        this.dispatchEvent(new CustomEvent("close"));
    }

    onOpen() {
        if (this.closeOnEsc) {
            window.addEventListener("keydown", this.handleEsc);
        }

        this.prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }

    cleanup() {
        window.removeEventListener("keydown", this.handleEsc);
        document.body.style.overflow = this.prevOverflow || "";
    }

    handleEsc(e) {
        if (e.key === "Escape") this.close();
    }

    handleBackdrop() {
        if (this.closeOnBackdrop) this.close();
    }

    /* =======================
       Styles Config
    ======================= */

    sizeClasses = {
        sm: "max-width: 24rem;",
        md: "max-width: 28rem;",
        lg: "max-width: 32rem;",
        xl: "max-width: 36rem;",
        full: "width:100%; height:100%; max-width:none;",
    };

    positionStyles = {
        center: "align-items:center; justify-content:center;",
        top: "align-items:flex-start; justify-content:center;",
        bottom: "align-items:flex-end; justify-content:center;",
        left: "align-items:center; justify-content:flex-start;",
        right: "align-items:center; justify-content:flex-end;",
        "top-left": "align-items:flex-start; justify-content:flex-start;",
        "top-right": "align-items:flex-start; justify-content:flex-end;",
        "bottom-left": "align-items:flex-end; justify-content:flex-start;",
        "bottom-right": "align-items:flex-end; justify-content:flex-end;",
    };

    /* =======================
       Render
    ======================= */

    render() {
        if (!this.open) {
            this.shadowRoot.innerHTML = "";
            return;
        }

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          ${this.positionStyles[this.position]}
        }

        .backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          ${this.blur ? "backdrop-filter: blur(4px);" : ""}
        }

        .panel {
          position: relative;
          z-index: 1;
          width: 100%;
          ${this.sizeClasses[this.size]}
        }
      </style>

      <div class="backdrop"></div>

      <div class="panel">
        <slot></slot>
      </div>
    `;

        this.shadowRoot
            .querySelector(".backdrop")
            ?.addEventListener("click", this.handleBackdrop);
    }
}

customElements.define("app-modal", AppModal);