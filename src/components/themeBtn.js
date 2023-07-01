"use client";

import styles from "./themeBtn.module.css";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    theme === "light" ? setChecked(false) : setChecked(true);
  }, [theme]);

  return (
    <div className="flex rounded items-center gap-2">
      <div>
        <input
          checked={checked}
          type="checkbox"
          className={styles.checkbox}
          id="checkbox"
          onChange={toggleTheme}
        />
        <label htmlFor="checkbox" className={styles.checkboxLabel}>
          <BiSolidMoon color="#f1c40f" />
          <BiSolidSun color="#f39c12" />
          <span className={styles.ball}></span>
        </label>
      </div>
    </div>
  );
}

export default ThemeBtn;
