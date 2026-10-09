export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const hasSanityEnv = Boolean(projectId);

export function assertSanityEnv() {
  if (!hasSanityEnv) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Usa mock local (lib/data.ts) o crea .env.local desde .env.local.example"
    );
  }
}
