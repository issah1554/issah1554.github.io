export class UserAvatar extends HTMLElement {
  static get observedAttributes() {
    return [
      "src",
      "alt",
      "size",
      "initials",
      "status",
      "status-border-color",
      "fallback-bg-color",
      "show-status",
      "show-status-ring",
      "rounded",
      "show-edit-button"
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.imgError = false;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.imgError = false;
    this.render();
  }

  getStatusColor(status) {
    const statusColor = {
      online: "#16a34a",
      offline: "#6b7280",
      disabled: "#dc2626",
      pending: "#f59e0b"
    };

    return statusColor[status] || statusColor.offline;
  }

  getRadius(rounded) {
    const roundedMap = {
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      full: "9999px"
    };

    return roundedMap[rounded] || roundedMap.full;
  }

  getInitials(initials, alt) {
    return (initials || alt || "")
      .trim()
      .split(" ")
      .map(word => word[0] ? word[0].toUpperCase() : "")
      .slice(0, 2)
      .join("");
  }

  render() {
    const src = this.getAttribute("src") || "";
    const alt = this.getAttribute("alt") || "User Avatar";
    const size = parseInt(this.getAttribute("size") || "40", 10);
    const initials = this.getAttribute("initials") || "";
    const status = this.getAttribute("status") || "offline";
    const statusBorderColor = this.getAttribute("status-border-color") || "#ffffff";
    const fallbackBgColor = this.getAttribute("fallback-bg-color") || "var(--color-primary-700)";
    const rounded = this.getAttribute("rounded") || "full";
    const showEditButton = this.getAttribute("show-edit-button") === "true";
    const showStatus = this.getAttribute("show-status") === "true";
    const showStatusRing = this.getAttribute("show-status-ring") !== "false";

    const displayInitials = this.getInitials(initials, alt);
    const radius = this.getRadius(rounded);
    const cornerSize = size / 4;
    const statusColor = this.getStatusColor(status);
    const borderWidth = showStatusRing ? 2 : 0;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: inline-block;
        }

        .avatar-wrapper {
          position: relative;
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
          border-radius: ${radius};
          border: ${borderWidth}px solid ${statusColor};
          padding: ${borderWidth}px;
          vertical-align: middle;
        }

        .avatar-img,
        .avatar-fallback {
          width: 100%;
          height: 100%;
          border-radius: calc(${radius} - ${borderWidth}px);
        }

        .avatar-img {
          object-fit: cover;
          display: block;
        }

        .avatar-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${fallbackBgColor};
          color: #ffffff;
          font-weight: 600;
          font-size: ${size / 2.5}px;
          user-select: none;
        }

        .status-dot,
        .edit-btn {
          position: absolute;
          right: 0;
          bottom: 0;
          width: ${cornerSize}px;
          height: ${cornerSize}px;
          border-radius: 9999px;
        }

        .status-dot {
          background: ${statusColor};
          border: 1px solid ${statusBorderColor};
        }

        .edit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${statusColor};
          border: 1px solid #ffffff;
          cursor: pointer;
          padding: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .edit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
        }

        .edit-btn:focus {
          outline: none;
        }

        .edit-btn svg {
          width: 12px;
          height: 12px;
          color: white;
        }
      </style>

      <div class="avatar-wrapper" title="${alt}">
        ${
          src && !this.imgError
            ? `<img class="avatar-img" src="${src}" alt="${alt}" />`
            : `<div class="avatar-fallback">${displayInitials}</div>`
        }

        ${
          showEditButton
            ? `
              <button type="button" class="edit-btn" aria-label="Edit avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 5h2m2 0h.01M17.586 3.586a2 2 0 112.828 2.828L7 19l-4 1 1-4L17.586 3.586z"
                  />
                </svg>
              </button>
            `
            : showStatus
            ? `
              <span
                class="status-dot"
                title="${status.charAt(0).toUpperCase() + status.slice(1)}"
              ></span>
            `
            : ""
        }
      </div>
    `;

    const img = this.shadowRoot.querySelector(".avatar-img");
    if (img) {
      img.addEventListener("error", () => {
        this.imgError = true;
        this.render();
      });
    }

    const editBtn = this.shadowRoot.querySelector(".edit-btn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("edit", {
            bubbles: true,
            composed: true
          })
        );
      });
    }
  }
}

customElements.define("user-avatar", UserAvatar);
