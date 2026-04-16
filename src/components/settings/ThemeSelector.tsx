"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl w-fit border border-white/5">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-xl h-9 px-3 gap-2 shadow-sm"
        onClick={() => setTheme("light")}
      >
        <Sun size={16} className={theme === "light" ? "text-amber-500" : ""} />
        <span className="text-xs font-semibold">Light</span>
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-xl h-9 px-3 gap-2 shadow-sm"
        onClick={() => setTheme("dark")}
      >
        <Moon size={16} className={theme === "dark" ? "text-indigo-400" : ""} />
        <span className="text-xs font-semibold">Dark</span>
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-xl h-9 px-3 gap-2 shadow-sm"
        onClick={() => setTheme("system")}
      >
        <Monitor size={16} className={theme === "system" ? "text-primary" : ""} />
        <span className="text-xs font-semibold">System</span>
      </Button>
    </div>
  );
}
