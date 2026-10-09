import { ChevronRight } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function Faq({ items, heading = "Preguntas frecuentes" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-10 rounded-2xl border bg-white p-6">
      <h2 id="faq-heading" className="text-xl font-extrabold">{heading}</h2>
      <div className="mt-4 divide-y">
        {items.map((item) => (
          <details key={item.q} className="group py-3">
            <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden hover:text-cta [&::-webkit-details-marker]:hidden">
              <ChevronRight size={15} strokeWidth={3} aria-hidden className="mr-1 inline-block text-inbox transition group-open:rotate-90" />
              {item.q}
            </summary>
            <p className="mt-2 pl-5 leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
