"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchema } from "@/lib/validations";
import { createWallet } from "@/lib/actions/wallets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusCircle, CreditCard, Landmark, PiggyBank, Receipt } from "lucide-react";
import { toast } from "sonner";

export function AddWalletDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "" as string,
      type: "CASH" as any,
      balance: "0" as string,
      color: "#3b82f6" as string,
      icon: "Wallet" as string,
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      await createWallet(values);
      toast.success("Wallet created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to create wallet");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
          <PlusCircle size={18} />
          Add Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl glass backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Wallet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. My Savings" className="rounded-xl glass border-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl glass border-none">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl glass border-none">
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="BANK">Bank</SelectItem>
                        <SelectItem value="SAVINGS">Savings</SelectItem>
                        <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Balance</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" type="number" step="0.01" className="rounded-xl glass border-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <Input type="color" className="p-1 h-10 w-20 rounded-xl glass border-none" {...field} />
                      <div className="flex-1 flex items-center text-xs text-muted-foreground uppercase tracking-widest font-bold">
                        {field.value}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-xl py-6 text-lg" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Wallet
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
