import { DiverForm } from "@/components/DiverForm";
import { ShopForm } from "@/components/ShopForm";
import { SITE_NAME } from "@/lib/site";
import { cleanSource } from "@/lib/validation";

type Props = { searchParams: Promise<{ src?: string | string[] }> };

export default async function Home({ searchParams }: Props) {
  // Lets a QR code or link tag where a sign-up came from, e.g. /?src=dema
  const { src } = await searchParams;
  const source = cleanSource(typeof src === "string" ? src : "");

  return (
    <main>
      <section className="bg-gradient-to-b from-cyan-950 via-cyan-900 to-cyan-700 px-4 pb-24 pt-10 text-white sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">{SITE_NAME}</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Keep diving after certification.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cyan-50 sm:text-xl">
            Find upcoming dive trips run by local shops, connect with other divers, and stay
            safe and current in the water. We&apos;re launching in 2027.
          </p>
          <ul className="mt-8 grid gap-3 text-base text-cyan-50 sm:grid-cols-3">
            <li className="rounded-lg bg-white/10 p-4">
              <span className="block font-semibold text-white">Trip Finder</span>
              Search real trips from verified dive shops.
            </li>
            <li className="rounded-lg bg-white/10 p-4">
              <span className="block font-semibold text-white">Community</span>
              Meet divers near you and plan your next dive together.
            </li>
            <li className="rounded-lg bg-white/10 p-4">
              <span className="block font-semibold text-white">The Safety Stop</span>
              Curated safety news and alerts for divers.
            </li>
          </ul>
        </div>
      </section>

      <section className="-mt-14 px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5">
          <div id="divers" className="rounded-2xl bg-white p-6 shadow-lg md:col-span-2 md:self-start">
            <h2 className="text-2xl font-bold text-slate-900">For divers</h2>
            <p className="mt-2 text-slate-600">
              Get one email when we launch. No spam, and you can unsubscribe any time.
            </p>
            <div className="mt-5">
              <DiverForm source={source} />
            </div>
          </div>

          <div id="shops" className="rounded-2xl bg-white p-6 shadow-lg md:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900">For dive shops</h2>
            <p className="mt-2 text-slate-600">
              Founding shops that join before DEMA 2027 list their trips free until
              September 1, 2027. Leave your details and we&apos;ll reach out personally.
            </p>
            <div className="mt-5">
              <ShopForm source={source} />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. We only use your details to contact you
          about the launch, and we never sell them.
        </p>
      </footer>
    </main>
  );
}
