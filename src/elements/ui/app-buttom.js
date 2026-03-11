class MyButton extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Click";
    const variant = this.getAttribute("variant") || "primary";

    const styles = {
      primary: "bg-blue-600 text-white border-none",
      secondary: "bg-gray-200 text-gray-900 border-none",
      info: "bg-cyan-500 text-white border-none",
      success: "bg-green-600 text-white border-none",
      warning: "bg-amber-500 text-white border-none",
      danger: "bg-red-600 text-white border-none",
      pending: "bg-gray-500 text-white border-none",
      outline: "bg-transparent text-blue-600 border border-blue-600"
    };

    const selected = styles[variant] || styles.primary;

    this.innerHTML = `
      <button
        class="px-4 py-2 text-sm rounded-md cursor-pointer transition hover:opacity-90 ${selected}"
      >
        ${label}
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      console.log(`${variant} button clicked`);
    });
  }
}

customElements.define("my-button", MyButton);