"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  profile: {
    name: string;
    email?: string | null;
    avatarUrl?: string | null;
  };
  compact?: boolean;
}

export function ProfileSidebar({ profile, compact }: ProfileSidebarProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-2xl transition-all duration-300",
      !compact && "hover:bg-primary/5 group"
    )}>
      <Avatar className={cn(
        "border-2 border-primary/10 transition-transform duration-300 group-hover:scale-105",
        compact ? "w-8 h-8" : "w-10 h-10"
      )}>
        <AvatarImage src={profile.avatarUrl || ""} />
        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
          {profile.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {!compact && (
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold truncate tracking-tight">{profile.name}</span>
          {profile.email && (
            <span className="text-[10px] text-muted-foreground truncate font-medium">
              {profile.email}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
