class MyButton extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Click";
    const variant = this.getAttribute("variant") || "primary";

    const styles = {
      primary: {
        background: "#2563eb",
        color: "white",
        border: "none"
      },
      secondary: {
        background: "#e5e7eb",
        color: "#111827",
        border: "none"
      },
      info: {
        background: "#06b6d4",
        color: "white",
        border: "none"
      },
      success: {
        background: "#16a34a",
        color: "white",
        border: "none"
      },
      warning: {
        background: "#f59e0b",
        color: "white",
        border: "none"
      },
      danger: {
        background: "#dc2626",
        color: "white",
        border: "none"
      },
      pending: {
        background: "#6b7280",
        color: "white",
        border: "none"
      },
      outline: {
        background: "transparent",
        color: "#2563eb",
        border: "1px solid #2563eb"
      }
    };

    const selected = styles[variant] || styles.primary;

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        button {
          padding: 10px 16px;
          background: ${selected.background};
          color: ${selected.color};
          border: ${selected.border};
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }
      </style>

      <button>${label}</button>
    `;

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      console.log(`${variant} button clicked`);
    });
  }
}

customElements.define("my-button", MyButton);