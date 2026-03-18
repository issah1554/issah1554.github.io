class AppInput extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "text";
    const placeholder = this.getAttribute("placeholder") || "";
    const color = this.getAttribute("color") || "primary";
    const size = this.getAttribute("size") || "md";
    const rounded = this.getAttribute("rounded") || "md";
    const variant = this.getAttribute("variant") || "solid";

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
        solid: "bg-white text-primary-600 border border-primary-600",
        outline: "bg-transparent text-primary-600 border border-primary-600",
        text: "bg-transparent text-primary-600 border-none"
      },
      secondary: {
        solid: "bg-white text-secondary-600 border border-secondary-600",
        outline: "bg-transparent text-secondary-600 border border-secondary-600",
        text: "bg-transparent text-secondary-600 border-none"
      },
      neutral: {
        solid: "bg-white text-neutral-600 border border-neutral-600",
        outline: "bg-transparent text-neutral-600 border border-neutral-600",
        text: "bg-transparent text-neutral-600 border-none"
      },
      success: {
        solid: "bg-white text-success-600 border border-success-600",
        outline: "bg-transparent text-success-600 border border-success-600",
        text: "bg-transparent text-success-600 border-none"
      },
      warning: {
        solid: "bg-white text-warning-600 border border-warning-600",
        outline: "bg-transparent text-warning-600 border border-warning-600",
        text: "bg-transparent text-warning-600 border-none"
      },
      error: {
        solid: "bg-white text-danger-600 border border-danger-600",
        outline: "bg-transparent text-danger-600 border border-danger-600",
        text: "bg-transparent text-danger-600 border-none"
      },
      info: {
        solid: "bg-white text-info-600 border border-info-600",
        outline: "bg-transparent text-info-600 border border-info-600",
        text: "bg-transparent text-info-600 border-none"
      },
      light: {
        solid: "bg-gray-100 text-gray-900 border border-gray-300",
        outline: "bg-transparent text-gray-700 border border-gray-400",
        text: "bg-transparent text-gray-700 border-none"
      },
      dark: {
        solid: "bg-gray-900 text-white border border-gray-900",
        outline: "bg-transparent text-gray-900 border border-gray-900",
        text: "bg-transparent text-gray-900 border-none"
      }
    };

    const selectedSize = sizes[size] || sizes.md;
    const selectedRounded = roundedMap[rounded] || roundedMap.md;
    const selectedColor = colorVariants[color] || colorVariants.primary;
    const selectedVariant = selectedColor[variant] || selectedColor.solid;

    this.innerHTML = `
      <input 
        type="${type}" 
        placeholder="${placeholder}" 
        class="${selectedSize} ${selectedRounded} ${selectedVariant} focus:outline-none focus:ring-2 focus:ring-${color}-400 transition"
      />
    `;

    this.querySelector("input").addEventListener("input", (e) => {
      console.log(`Input value: ${e.target.value}`);
    });
  }
}

customElements.define("app-input", AppInput);