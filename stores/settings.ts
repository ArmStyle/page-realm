import { defineStore } from "pinia";

export interface SettingsState {
  theme: "light" | "dark" | "eyecare";
  fontSize: number;
  lineHeight: number;
  eyeCareMode: boolean;
  quickSettingsVisible: boolean;
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "light",
    fontSize: 16,
    lineHeight: 1.6,
    eyeCareMode: false,
    quickSettingsVisible: false,
  }),

  actions: {
    setTheme(theme: "light" | "dark" | "eyecare") {
      this.theme = theme;
      if (typeof window !== "undefined") {
        // Remove all theme classes first
        document.documentElement.classList.remove(
          "dark",
          "eyecare",
        );

        // Apply the selected theme
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else if (theme === "eyecare") {
          document.documentElement.classList.add("eyecare");
        }

        localStorage.setItem("theme", theme);
      }
    },

    setFontSize(size: number) {
      this.fontSize = Math.max(12, Math.min(24, size));
      if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(
          "--font-size",
          `${this.fontSize}px`
        );
        localStorage.setItem("fontSize", this.fontSize.toString());
      }
    },

    setLineHeight(height: number) {
      this.lineHeight = Math.max(1, Math.min(3, height));
      if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(
          "--line-height",
          this.lineHeight.toString()
        );
        localStorage.setItem("lineHeight", this.lineHeight.toString());
      }
    },

    toggleQuickSettings() {
      this.quickSettingsVisible = !this.quickSettingsVisible;
      // Save quick settings visibility to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "quickSettingsVisible",
          this.quickSettingsVisible.toString()
        );
      }
    },

    initSettings() {
      if (typeof window !== "undefined") {
        // Load theme - check system preference if no saved theme
        const savedTheme = localStorage.getItem("theme") as
          | "light"
          | "dark"
          | "eyecare";
        let theme: "light" | "dark" | "eyecare" = "light";

        if (
          savedTheme &&
          ["light", "dark", "eyecare"].includes(savedTheme)
        ) {
          theme = savedTheme;
        } else {
          // Check system preference
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ) {
            theme = "dark";
          }
        }

        this.setTheme(theme);

        // Load font size
        const savedFontSize = parseInt(
          localStorage.getItem("fontSize") || "16"
        );
        this.setFontSize(savedFontSize);

        // Load line height
        const savedLineHeight = parseFloat(
          localStorage.getItem("lineHeight") || "1.6"
        );
        this.setLineHeight(savedLineHeight);

        // Update eyeCareMode based on theme for backward compatibility
        this.eyeCareMode = theme === "eyecare";

        // Load quick settings visibility
        const savedQuickSettingsVisible =
          localStorage.getItem("quickSettingsVisible") === "true";
        this.quickSettingsVisible = savedQuickSettingsVisible;
      }
    },
  },

  getters: {
    fontSizeClass(): string {
      if (this.fontSize <= 14) return "text-sm";
      if (this.fontSize >= 20) return "text-xl";
      return "text-base";
    },

    isEyeCareMode(): boolean {
      return this.theme === "eyecare";
    },

    isDarkMode(): boolean {
      return this.theme === "dark";
    },
  },
});
