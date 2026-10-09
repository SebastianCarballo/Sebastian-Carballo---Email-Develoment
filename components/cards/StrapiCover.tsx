import Image from "next/image";

// Cover real venida de Strapi (Media Library). Si no hay, la tarjeta usa
// el CardCover SVG local como fallback.
export function postCoverUrl(p: object): string | undefined {
  return "coverUrl" in p ? ((p.coverUrl as string | undefined) ?? undefined) : undefined;
}

export default function StrapiCover({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-t-2xl">
      <Image
        src={src}
        alt={alt}
        width={640}
        height={320}
        className="block aspect-[2/1] w-full object-cover"
      />
      <figcaption className="absolute bottom-2 left-2 rounded-full border border-inbox/40 bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-semibold text-inbox backdrop-blur">
        {caption}
      </figcaption>
    </figure>
  );
}
