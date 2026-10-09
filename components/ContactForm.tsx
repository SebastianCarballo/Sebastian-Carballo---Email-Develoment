"use client";
import { useState } from "react";
import { notFound } from "next/navigation";

export default function ContactForm({ dict }: { dict: { name: string; email: string; message: string; send: string; sent: string } }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-6 space-y-3 rounded-xl border bg-white p-5"
    >
      <label className="block text-sm font-semibold">
        {dict.name}
        <input required className="mt-1 w-full rounded border px-3 py-2" placeholder="Ada" />
      </label>
      <label className="block text-sm font-semibold">
        {dict.email}
        <input required type="email" className="mt-1 w-full rounded border px-3 py-2" placeholder="ada@inbox.com" />
      </label>
      <label className="block text-sm font-semibold">
        {dict.message}
        <textarea required rows={4} className="mt-1 w-full rounded border px-3 py-2" placeholder="Newsletter mensual, 3 envíos..." />
      </label>
      <button className="rounded-full bg-cta px-6 py-2.5 font-semibold text-white">{dict.send}</button>
      {sent && <p className="text-sm text-green-700">{dict.sent}</p>}
    </form>
  );
}
