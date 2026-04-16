"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, Mail, User, Image as ImageIcon } from "lucide-react";

interface ProfileFormProps {
  profile: {
    name: string;
    email?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email || "",
    avatarUrl: profile.avatarUrl || "",
    bio: profile.bio || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="w-20 h-20 border-2 border-primary/20 p-1 bg-white/20">
          <AvatarImage src={formData.avatarUrl} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
            {formData.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Your Identity</h3>
          <p className="text-sm text-muted-foreground">This is how you'll appear across the app.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User size={14} className="text-primary" />
            Display Name
          </Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Guest User"
            className="rounded-xl glass border-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail size={14} className="text-primary" />
            Email Address
          </Label>
          <Input 
            id="email" 
            type="email"
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="alex@example.com"
            className="rounded-xl glass border-none"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="avatar" className="flex items-center gap-2">
            <ImageIcon size={14} className="text-primary" />
            Avatar URL
          </Label>
          <Input 
            id="avatar" 
            value={formData.avatarUrl} 
            onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="rounded-xl glass border-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={loading}
          className="rounded-xl px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </div>
    </form>
  );
}
