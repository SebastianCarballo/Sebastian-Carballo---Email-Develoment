import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function ClientBadges({ clients = ["Outlook", "Gmail", "Apple Mail", "Yahoo"] }: { clients?: string[] }) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Clientes de correo testeados">
      {clients.map((c) => (
        <Badge key={c} tone="sent" role="listitem">
          <Check size={12} strokeWidth={3} aria-hidden /> {c}
        </Badge>
      ))}
    </div>
  );
}
