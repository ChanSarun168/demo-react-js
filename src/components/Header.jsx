import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-end items-center bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-4 py-2 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="text-xl text-gray-700 dark:text-white hover:text-blue-500 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <FaUserCircle className="text-2xl text-gray-700 dark:text-white" />
      </div>
    </header>
  );
};

export default Header;
