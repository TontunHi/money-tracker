"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const currencies = [
  { code: "USD", symbol: "$", name: "United States Dollar" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

export function CurrencySelector() {
  const [selected, setSelected] = useState(currencies[1]); // Default to THB

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-xl glass border-none gap-2 px-4 shadow-sm hover:shadow-md transition-all">
          <Globe size={16} className="text-primary" />
          {selected.code} ({selected.symbol})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 rounded-2xl glass border-none shadow-2xl" align="end">
        <div className="space-y-1">
          {currencies.map((curr) => (
            <Button
              key={curr.code}
              variant="ghost"
              className={cn(
                "w-full justify-between rounded-xl font-medium",
                selected.code === curr.code ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setSelected(curr)}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 text-center">{curr.symbol}</span>
                <span>{curr.code}</span>
              </div>
              {selected.code === curr.code && <Check size={14} />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
