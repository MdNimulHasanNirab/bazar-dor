import Image from "next/image";
import Link from "next/link";
import ProductSections from "@/components/ProductSections";

export default function HomePage() {
  return (
    <>
      <section className="container-main py-7 sm:py-10">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-[#effaf2] via-white to-[#e0f4e6]">
          <div className="grid min-h-[290px] items-center gap-5 p-6 sm:p-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-bold text-[var(--green)]">
                বাংলাদেশের বাজারদর
              </span>

              <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                প্রতিদিনের বাজারদর,
                <span className="block text-[var(--green)]">
                  এখন এক নজরে
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
                চাল, ডাল, সবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন।
                বাজার করার আগে সঠিক ধারণা রাখুন।
              </p>

              <Link href="#সব-পণ্য" className="btn-primary mt-6">
                সব পণ্যের দাম দেখুন <span>→</span>
              </Link>
            </div>

            <div className="relative mx-auto flex h-48 w-full max-w-xs items-center justify-center sm:h-60">
              <div className="absolute h-44 w-44 rounded-full bg-green-100 sm:h-56 sm:w-56" />

              <Image
                src="/images/hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                width={360}
                height={300}
                priority
                className="relative z-10 h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <ProductSections />
    </>
  );
}