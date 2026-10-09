import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

// Encabezado de sección consistente: kicker mono + título + subtítulo.
export default function SectionHeading({
  kicker,
  kickerClassName,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  kicker?: string;
  kickerClassName?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={cn(align === "center" && "text-center")}>
        {kicker && <p className={cn("font-mono text-xs", kickerClassName ?? (dark ? "text-inbox" : "text-cta"))}>{kicker}</p>}
        <h2 className={cn("mt-1 text-3xl font-extrabold tracking-tight md:text-4xl", dark ? "text-white" : "text-ink")}>{title}</h2>
        {subtitle && <p className={cn("mt-1", dark ? "text-slate-400" : "text-slate-600")}>{subtitle}</p>}
      </div>
    </Reveal>
  );
}
