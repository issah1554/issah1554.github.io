class AppButton extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Click";
    const color = this.getAttribute("color") || "primary";
    const size = this.getAttribute("size") || "md";
    const variant = this.getAttribute("variant") || "solid";
    const rounded = this.getAttribute("rounded") || "md";

    const colors = {
      primary: "primary",
      secondary: "secondary",
      accent: "accent",
      neutral: "neutral",
      success: "success",
      warning: "warning",
      error: "danger",
      info: "info",
      light: "gray",
      dark: "gray"
    };

    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
      xl: "px-6 py-3 text-lg",
      "2xl": "px-7 py-4 text-xl"
    };

    const roundedMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    };

    const baseColor = colors[color] || colors.primary;

    const variants = {
      solid: `bg-${baseColor}-600 text-white border-none`,
      outline: `bg-transparent text-${baseColor}-600 border border-${baseColor}-600`,
      text: `bg-transparent text-${baseColor}-600 border-none`
    };

    const selectedVariant = variants[variant] || variants.solid;
    const selectedSize = sizes[size] || sizes.md;
    const selectedRounded = roundedMap[rounded] || roundedMap.md;

    this.innerHTML = `
      <button
        class="${selectedSize} ${selectedRounded} ${selectedVariant} cursor-pointer transition hover:opacity-90"
      >
        ${label}
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      console.log(`${color} ${variant} button clicked`);
    });
  }
}

customElements.define("app-button", AppButton);