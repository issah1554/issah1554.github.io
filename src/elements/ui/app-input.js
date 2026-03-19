class AppInput extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "text";
    const placeholder = this.getAttribute("placeholder") || "";
    const color = this.getAttribute("color") || "primary";
    const size = this.getAttribute("size") || "md";
    const rounded = this.getAttribute("rounded") || "md";
    const variant = this.getAttribute("variant") || "solid";
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
        solid: "bg-main-50 text-primary-500 border border-main-300",
        outline: "bg-transparent text-primary-500 border border-main-300",
        text: "bg-transparent text-primary-500 border-none"
      },
      secondary: {
        solid: "bg-main-50 text-secondary-500 border border-main-600",
        outline: "bg-transparent text-secondary-500 border border-main-600",
        text: "bg-transparent text-secondary-500 border-none"
      },
      neutral: {
        solid: "bg-main-50 text-neutral-500 border border-main-600",
        outline: "bg-transparent text-neutral-500 border border-main-600",
        text: "bg-transparent text-neutral-500 border-none"
      },
      success: {
        solid: "bg-main-50 text-success-500 border border-main-300",
        outline: "bg-transparent text-success-500 border border-success-500",
        text: "bg-transparent text-success-500 border-none"
      },
      warning: {
        solid: "bg-main-50 text-warning-500 border border-main-300",
        outline: "bg-transparent text-warning-500 border border-warning-500",
        text: "bg-transparent text-warning-500 border-none"
      },
      error: {
        solid: "bg-main-50 text-danger-500 border border-main-300",
        outline: "bg-transparent text-danger-500 border border-danger-500",
        text: "bg-transparent text-danger-500 border-none"
      },
      info: {
        solid: "bg-main-50 text-info-500 border border-main-300",
        outline: "bg-transparent text-info-500 border border-info-500",
        text: "bg-transparent text-info-500 border-none"
      },
      light: {
        solid: "bg-main-100 text-main-900 border border-main-300",
        outline: "bg-transparent text-main-700 border border-main-400",
        text: "bg-transparent text-main-700 border-none"
      },
      dark: {
        solid: "bg-main-900 text-main-50 border border-main-300",
        outline: "bg-transparent text-main-900 border border-main-300",
        text: "bg-transparent text-main-900 border-none"
      }
    };

    const focusRingMap = {
      primary: "focus:ring-primary-400 focus:border-0",
      secondary: "focus:ring-secondary-400 focus:border-0",
      neutral: "focus:ring-neutral-400 focus:border-0",
      success: "focus:ring-success-400 focus:border-0",
      warning: "focus:ring-warning-400 focus:border-0",
      error: "focus:ring-danger-400 focus:border-0",
      info: "focus:ring-info-400 focus:border-0",
      light: "focus:ring-main-300 focus:border-0",
      dark: "focus:ring-main-900 focus:border-0"
    };

    const selectedSize = sizes[size] || sizes.md;
    const selectedRounded = roundedMap[rounded] || roundedMap.md;
    const selectedColor = colorVariants[color] || colorVariants.primary;
    const selectedVariant = selectedColor[variant] || selectedColor.solid;
    const selectedRing = focusRingMap[color] || focusRingMap.primary;

    this.innerHTML = `
      <input 
        type="${type}" 
        placeholder="${placeholder}" 
        class="${selectedSize} ${selectedRounded} ${selectedVariant} ${selectedRing} ${hostClass} focus:outline-none focus:ring-2 transition"
      />
    `;

    this.querySelector("input").addEventListener("input", (e) => {
      console.log(`Input value: ${e.target.value}`);
    });
  }
}

customElements.define("app-input", AppInput);
