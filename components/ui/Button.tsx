import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inbox active:scale-[.98]",
  {
    variants: {
      variant: {
        cta: "btn-shine bg-cta text-white hover:brightness-110",
        inbox: "glow-inbox bg-inbox text-ink hover:brightness-110",
        outlineLight: "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/15",
        outlineDark: "border border-ink/15 bg-white text-ink hover:bg-ink hover:text-white",
        dark: "bg-ink text-white hover:bg-ink-soft",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-ink",
      },
      size: {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
      },
    },
    defaultVariants: { variant: "cta", size: "md" },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
