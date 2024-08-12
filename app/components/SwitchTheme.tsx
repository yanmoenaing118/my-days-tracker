"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";

export default function SwitchTheme() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    console.log("theme is ", theme);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      {theme == "system" && (
        <button onClick={() => setTheme("dark")}>
          <IoSunnyOutline size={28} />
        </button>
      )}
      {theme == "dark" && (
        <button onClick={() => setTheme("light")}>
          <RxMoon size={28} />
        </button>
      )}
      {theme == "light" && (
        <button onClick={() => setTheme("dark")}>
          <IoSunnyOutline size={28} />
        </button>
      )}
    </div>
  );
}
