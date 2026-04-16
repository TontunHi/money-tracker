import { getCategories, deleteCategory } from "@/lib/actions/categories";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export default async function CategoriesPage() {
  const categories = await getCategories();

  const incomeCategories = categories.filter((c) => c.type === "INCOME");
  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage your income and expense categories.</p>
        </div>
        <AddCategoryDialog />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Income Categories */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-6 rounded-full bg-emerald-500" />
            <h3 className="text-xl font-bold">Income</h3>
            <span className="text-xs text-muted-foreground bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono">
              {incomeCategories.length} items
            </span>
          </div>
          <div className="grid gap-3">
            {incomeCategories.map((cat) => (
              <CategoryItem key={cat.id} category={cat} />
            ))}
            {incomeCategories.length === 0 && (
              <EmptyState type="income" />
            )}
          </div>
        </div>

        {/* Expense Categories */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-6 rounded-full bg-rose-500" />
            <h3 className="text-xl font-bold">Expenses</h3>
            <span className="text-xs text-muted-foreground bg-rose-500/10 px-2 py-0.5 rounded-full font-mono">
              {expenseCategories.length} items
            </span>
          </div>
          <div className="grid gap-3">
            {expenseCategories.map((cat) => (
              <CategoryItem key={cat.id} category={cat} />
            ))}
            {expenseCategories.length === 0 && (
              <EmptyState type="expense" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ category }: { category: any }) {
  // Dynamic icon resolution
  const IconComponent = (Icons as any)[category.icon] || Tag;

  return (
    <Card className="border-none glass group hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110" 
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            <IconComponent size={20} />
          </div>
          <div>
            <div className="font-semibold text-sm">{category.name}</div>
            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
              {category.icon}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <form action={async () => {
              "use server";
              await deleteCategory(category.id);
            }}>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10">
                <Trash2 size={16} />
              </Button>
            </form>
            <ChevronRight size={14} className="text-muted-foreground/30" />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="py-12 text-center glass rounded-2xl border-dashed border-2 border-muted-foreground/10">
      <Tag className="mx-auto h-8 w-8 text-muted-foreground/20 mb-2" />
      <p className="text-sm text-muted-foreground">No {type} categories yet.</p>
    </div>
  );
}
