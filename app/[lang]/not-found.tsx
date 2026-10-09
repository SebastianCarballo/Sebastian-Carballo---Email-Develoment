import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-cta">404 — not found</p>
      <h1 className="mt-2 text-4xl font-extrabold">Esta página salió del inbox / This page left the inbox</h1>
      <p className="mt-2 text-slate-600">El enlace puede estar roto o el contenido se movió.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/es" className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white">
          Inicio
        </Link>
        <Link href="/en" className="rounded-full border px-6 py-2.5 text-sm font-semibold">
          Home
        </Link>
      </div>
    </section>
  );
}
