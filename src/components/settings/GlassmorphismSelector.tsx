"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GlassmorphismSelector() {
  const [level, setLevel] = useState("high");

  return (
    <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl w-fit border border-white/5 shadow-inner">
      <Button
        variant={level === "low" ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "rounded-xl h-9 px-4 transition-all duration-300",
          level === "low" ? "shadow-sm bg-white dark:bg-white/10" : ""
        )}
        onClick={() => setLevel("low")}
      >
        <span className="text-xs font-semibold">Low</span>
      </Button>
      <Button
        variant={level === "high" ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "rounded-xl h-9 px-4 transition-all duration-300",
          level === "high" ? "shadow-sm bg-white dark:bg-white/10" : ""
        )}
        onClick={() => setLevel("high")}
      >
        <span className="text-xs font-semibold">High</span>
      </Button>
    </div>
  );
}
