"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <FiSun />;
  }

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} />;
  } else {
    return <FiMoon onClick={() => setTheme("dark")} />;
  }
}
