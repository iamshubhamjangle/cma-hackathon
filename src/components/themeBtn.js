import React from "react";
import { FiMoon } from "react-icons/fi";
import { BiSun } from "react-icons/bi";
import { useTheme } from "next-themes";

function ThemeBtn() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex rounded items-center gap-2">
      <span>Theme</span>
      <div className="tooltip tooltip-bottom" data-tip="Light">
        <button
          className="btn btn-sm btn-circle"
          onClick={() => setTheme("mytheme")}
        >
          <BiSun />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Dark">
        <button
          className="btn btn-sm btn-circle"
          onClick={() => setTheme("dark")}
        >
          <FiMoon />
        </button>
      </div>
    </div>
  );
}

export default ThemeBtn;
