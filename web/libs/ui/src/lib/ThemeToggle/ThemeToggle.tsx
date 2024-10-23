import { clsx } from "clsx";
import styles from "./ThemeToggle.module.scss";
import MultiStateToggle from "../MultiStateToggle/MultiStateToggle";
import { useEffect, useMemo, useState } from "react";
import { ReactComponent as Sun } from "./icons/sun.svg";
import { ReactComponent as Moon } from "./icons/moon.svg";

const THEME_OPTIONS = ["Auto", "Light", "Dark"];
const PREFERRED_COLOR_SCHEME_KEY = "preferred-color-scheme";
export interface ThemeToggleOption {
  label?: string;
  icon?: string;
}
const ThemeOption = ({ label, icon }: ThemeToggleOption) => {
  return (
    <div className={clsx(styles.themeOption)}>
      <div className={clsx(styles.themeOption__icon)}>{icon === "Dark" ? <Moon /> : <Sun />}</div>
      <div className={clsx(styles.themeOption__label)}>{label}</div>
    </div>
  );
};
export const ThemeToggle = () => {
  const presetTheme = window.localStorage.getItem(PREFERRED_COLOR_SCHEME_KEY) ?? THEME_OPTIONS[0];
  const [theme, setTheme] = useState(presetTheme);
  const systemMode = useMemo(
    () => (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light"),
    [],
  );
  const [appliedTheme, setAppliedTheme] = useState(presetTheme === "Auto" ? systemMode : presetTheme);

  useEffect(() => {
    if (!appliedTheme) return;
    document.documentElement.setAttribute("data-color-scheme", appliedTheme.toLowerCase());
  }, [appliedTheme]);

  const themeChanged = (theme: string) => {
    const length = THEME_OPTIONS.length;
    const index = (THEME_OPTIONS.indexOf(theme) + 1) % length;
    const nextTheme = THEME_OPTIONS[index];

    window.localStorage.setItem(PREFERRED_COLOR_SCHEME_KEY, nextTheme);
    setTheme(nextTheme);
    setAppliedTheme(nextTheme === "Auto" ? systemMode : nextTheme);
  };

  return (
    <div className={clsx(styles.themeToggle)}>
      <MultiStateToggle
        options={THEME_OPTIONS?.map((option) => ({
          value: option,
          label: <ThemeOption key={option} label={option} icon={option === "Auto" ? appliedTheme : option} />,
        }))}
        selectedOption={theme}
        onChange={themeChanged}
      />
    </div>
  );
};

export default ThemeToggle;