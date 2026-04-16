import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun, Globe, CircleDollarSign, Mail, ShieldCheck } from "lucide-react";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { ResetDataButton } from "@/components/settings/ResetDataButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CurrencySelector } from "@/components/settings/CurrencySelector";
import { GlassmorphismSelector } from "@/components/settings/GlassmorphismSelector";
import { getProfile } from "@/lib/actions/profile";
import { ProfileForm } from "@/components/settings/ProfileForm";

export default async function SettingsPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your application preferences and security.</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Profile Card */}
        <Card className="border-none glass-card overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Personal Profile</CardTitle>
                <CardDescription>Configure your display identity across the application.</CardDescription>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">Local Session</span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ProfileForm profile={profile} />
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="border-none glass-card overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Sun size={20} />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how MoneyTracker looks on your device.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-4 border-t border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Color Theme</Label>
                <p className="text-sm text-muted-foreground">Switch between light, dark, and system modes.</p>
              </div>
              <ThemeSelector />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Glassmorphism Intensity</Label>
                <p className="text-sm text-muted-foreground">Adjust the transparency effects across cards and dialogs.</p>
              </div>
              <GlassmorphismSelector />
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card className="border-none glass-card overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <CircleDollarSign size={20} />
              </div>
              <div>
                <CardTitle>Financial Preferences</CardTitle>
                <CardDescription>Configure your currency and tracking rules.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Primary Currency</Label>
                <p className="text-sm text-muted-foreground">The symbol used for your total balance.</p>
              </div>
              <CurrencySelector />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Automatic Categorization</Label>
                <p className="text-sm text-muted-foreground">Intelligently suggest categories for new entries.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System & Operations */}
        <Card className="border-none glass-card overflow-hidden border-rose-500/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                <ShieldCheck size={20} />
              </div>
              <div>
                <CardTitle>System & Operations</CardTitle>
                <CardDescription>Critical operations and data management.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-rose-500">Safe Reset</Label>
                <p className="text-sm text-muted-foreground">Wipe all your local data and restore defaults.</p>
              </div>
              <ResetDataButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
