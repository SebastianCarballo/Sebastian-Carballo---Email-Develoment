import { Suspense } from "react";
import { connection } from "next/server";
import Studio from "./Studio";

// Next 16 + cacheComponents: el Studio usa datos runtime (cookies,
// localStorage, live). Este marcador lo excluye del prerender estático.
async function DynamicMarker() {
  await connection();
  return null;
}

export default function StudioPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <Studio />
    </>
  );
}
