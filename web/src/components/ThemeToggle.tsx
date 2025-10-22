import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">("");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "☀️" : "🌙";

  return (
    <div className="theme-toggle">
      <button
        type="button"
        className="icon-btn"
        onClick={() => setTheme(next)}
        aria-label={`Switch to ${next} theme`}
        title={`Switch to ${next} theme`}
      >
        {icon}
      </button>
    </div>
  );
};

export default ThemeToggle;
