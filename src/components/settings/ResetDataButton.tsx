"use client";

import { useState } from "react";
import { resetSystemData } from "@/lib/actions/system";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export function ResetDataButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleReset() {
    setLoading(true);
    try {
      await resetSystemData();
      toast.success("System reset successful");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to reset system");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl glass border-none h-10 px-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
          Factory Reset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl glass backdrop-blur-2xl border-white/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2 text-rose-500">
            <div className="p-2 rounded-xl bg-rose-500/10">
              <AlertTriangle size={20} />
            </div>
            <DialogTitle className="text-xl">Destructive Action</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground pt-2">
            This will permanently delete ALL wallets, transactions, and custom categories. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-2">
          <Button variant="ghost" className="rounded-xl flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            className="rounded-xl flex-1 shadow-lg shadow-rose-500/20" 
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
            Reset Everything
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
