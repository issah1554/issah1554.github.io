class AppButton extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Click";
    const color = this.getAttribute("color") || "primary";
    const size = this.getAttribute("size") || "md";
    const variant = this.getAttribute("variant") || "solid";
    const rounded = this.getAttribute("rounded") || "md";
    const hostClass = this.getAttribute("class") || "";

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

    const colorVariants = {
      primary: {
        solid: "bg-primary-600 text-white border-none",
        outline: "bg-transparent text-primary-600 border border-primary-600",
        text: "bg-transparent text-primary-600 border-none"
      },
      secondary: {
        solid: "bg-secondary-600 text-white border-none",
        outline: "bg-transparent text-secondary-600 border border-secondary-600",
        text: "bg-transparent text-secondary-600 border-none"
      },
      accent: {
        solid: "bg-accent-600 text-white border-none",
        outline: "bg-transparent text-accent-600 border border-accent-600",
        text: "bg-transparent text-accent-600 border-none"
      },
      neutral: {
        solid: "bg-neutral-600 text-white border-none",
        outline: "bg-transparent text-neutral-600 border border-neutral-600",
        text: "bg-transparent text-neutral-600 border-none"
      },
      success: {
        solid: "bg-success-600 text-white border-none",
        outline: "bg-transparent text-success-600 border border-success-600",
        text: "bg-transparent text-success-600 border-none"
      },
      warning: {
        solid: "bg-warning-600 text-white border-none",
        outline: "bg-transparent text-warning-600 border border-warning-600",
        text: "bg-transparent text-warning-600 border-none"
      },
      error: {
        solid: "bg-danger-600 text-white border-none",
        outline: "bg-transparent text-danger-600 border border-danger-600",
        text: "bg-transparent text-danger-600 border-none"
      },
      info: {
        solid: "bg-info-600 text-white border-none",
        outline: "bg-transparent text-info-600 border border-info-600",
        text: "bg-transparent text-info-600 border-none"
      },
      light: {
        solid: "bg-main-200 text-black border-none",
        outline: "bg-transparent text-main-500 border border-main-400",
        text: "bg-transparent text-main-500 border-none"
      },
      dark: {
        solid: "bg-main-900 text-white border-none",
        outline: "bg-transparent text-main-900 border border-main-900",
        text: "bg-transparent text-main-900 border-none"
      }
    };

    const selectedSize = sizes[size] || sizes.md;
    const selectedRounded = roundedMap[rounded] || roundedMap.md;
    const selectedColor = colorVariants[color] || colorVariants.primary;
    const selectedVariant = selectedColor[variant] || selectedColor.solid;

    this.innerHTML = `
      <button
        class="${selectedSize} ${selectedRounded} ${selectedVariant} ${hostClass} cursor-pointer transition hover:opacity-90"
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
