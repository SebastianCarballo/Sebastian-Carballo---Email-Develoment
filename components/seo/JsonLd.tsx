export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // JSON-LD estructurado: no ejecutable, <script> nativo según guía Next.js
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
