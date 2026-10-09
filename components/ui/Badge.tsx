import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium",
  {
    variants: {
      tone: {
        inbox: "border border-inbox/30 bg-inbox/10 text-inbox",
        sent: "border border-sent/30 bg-sent/10 text-sent",
        cta: "border border-cta/30 bg-cta/10 text-cta",
        muted: "border border-white/10 bg-white/5 text-slate-400",
        light: "bg-slate-100 text-slate-600",
        success: "bg-sent/15 text-green-700",
      },
    },
    defaultVariants: { tone: "muted" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export default function Badge({ tone, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {children}
    </span>
  );
}

export { badgeVariants };
