// tailwind.config.js

/** @type {import("tailwindcss").Config} */
export default {
  theme: {
    extend: {
      colors: {
        "wc-primary": "var(--color-primary)",
        "wc-primary-dark": "var(--color-primary-dark)",
        "wc-primary-light": "var(--color-primary-light)",

        "wc-background": "var(--color-background)",
        "wc-surface": "var(--color-surface)",
        "wc-surface-dark": "var(--color-surface-dark)",

        "wc-text": "var(--color-text)",
        "wc-text-heading": "var(--color-text-heading)",
        "wc-text-muted": "var(--color-text-muted)",
        "wc-text-inverse": "var(--color-text-inverse)",

        "wc-border": "var(--color-border)",
        "wc-border-focus": "var(--color-border-focus)",
      },

      fontFamily: {
        "wc-sans": ["var(--font-sans)"],
      },

      fontSize: {
        "wc-xs": "var(--text-xs)",
        "wc-sm": "var(--text-sm)",
        "wc-base": "var(--text-base)",
        "wc-lg": "var(--text-lg)",
        "wc-xl": "var(--text-xl)",
        "wc-2xl": "var(--text-2xl)",
        "wc-3xl": "var(--text-3xl)",
        "wc-4xl": "var(--text-4xl)",
        "wc-5xl": "var(--text-5xl)",
        "wc-6xl": "var(--text-6xl)",
      },

      fontWeight: {
        "wc-regular": "var(--font-regular)",
        "wc-medium": "var(--font-medium)",
        "wc-semibold": "var(--font-semibold)",
        "wc-bold": "var(--font-bold)",
      },

      lineHeight: {
        "wc-tight": "var(--leading-tight)",
        "wc-snug": "var(--leading-snug)",
        "wc-normal": "var(--leading-normal)",
        "wc-relaxed": "var(--leading-relaxed)",
      },

      spacing: {
        "wc-1": "var(--space-1)",
        "wc-2": "var(--space-2)",
        "wc-3": "var(--space-3)",
        "wc-4": "var(--space-4)",
        "wc-6": "var(--space-6)",
        "wc-8": "var(--space-8)",
        "wc-12": "var(--space-12)",
        "wc-16": "var(--space-16)",
        "wc-20": "var(--space-20)",
        "wc-24": "var(--space-24)",
        "wc-30": "var(--space-30)",

        "wc-section-mobile": "var(--section-padding-mobile)",
        "wc-section-desktop": "var(--section-padding-desktop)",
        "wc-section-large": "var(--section-padding-large)",

        "wc-container": "var(--container-padding)",
      },

      maxWidth: {
        "wc-container": "var(--container-max-width)",
        "wc-content-sm": "var(--content-width-sm)",
        "wc-content-md": "var(--content-width-md)",
        "wc-content-lg": "var(--content-width-lg)",
      },

      borderRadius: {
        "wc-sm": "var(--radius-sm)",
        "wc-md": "var(--radius-md)",
        "wc-lg": "var(--radius-lg)",
        "wc-xl": "var(--radius-xl)",
        "wc-2xl": "var(--radius-2xl)",
      },

      height: {
        "wc-control-sm": "var(--control-height-sm)",
        "wc-control-md": "var(--control-height-md)",
        "wc-control-lg": "var(--control-height-lg)",
      },

      padding: {
        "wc-button-x": "var(--button-padding-x)",
        "wc-button-y": "var(--button-padding-y)",
      },

      boxShadow: {
        "wc-sm": "var(--shadow-sm)",
        "wc-md": "var(--shadow-md)",
      },

      transitionDuration: {
        "wc-fast": "150ms",
        "wc-base": "200ms",
        "wc-slow": "300ms",
      },
    },
  },
};
