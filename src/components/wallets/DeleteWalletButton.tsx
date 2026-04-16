"use client";

import { useState } from "react";
import { deleteWallet } from "@/lib/actions/wallets";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  walletId: string;
  walletName: string;
}

export function DeleteWalletButton({ walletId, walletName }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteWallet(walletId);
      toast.success(`Wallet "${walletName}" deleted`);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete wallet");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="rounded-lg text-muted-foreground hover:text-rose-500 transition-colors">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-3xl glass backdrop-blur-2xl border-white/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2 text-rose-500">
            <div className="p-2 rounded-xl bg-rose-500/10">
              <AlertTriangle size={20} />
            </div>
            <DialogTitle className="text-xl">Delete Wallet?</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to delete **{walletName}**? All associated transactions will be permanently removed. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-2">
          <Button variant="ghost" className="rounded-xl flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            className="rounded-xl flex-1 shadow-lg shadow-rose-500/20" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
