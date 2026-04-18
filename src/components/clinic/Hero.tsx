import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";

const slides = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&q=80&w=1600",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&q=80&w=1600",
  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&q=80&w=1600",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&q=80&w=1600",
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/90 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Rouiba • Alger
        </span>

        <h1 className="font-serif text-[44px] leading-[1.05] sm:text-[52px] md:text-[64px]">
          Centre Djemai
        </h1>

        <p
          dir="rtl"
          lang="ar"
          className="font-arabic mt-4 max-w-md text-lg font-light text-white/90 sm:text-xl"
        >
          مصحة التشخيص الطبي و إعادة التأهيل الوظيفي
        </p>

        <p className="mt-3 max-w-md text-sm font-light tracking-wide text-white/80">
          Soin · Précision · Réhabilitation
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="tel:0771180581"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-all hover:scale-[1.02] hover:bg-accent/90"
          >
            <Phone className="h-4 w-4" strokeWidth={2.2} />
            Appeler • <span className="font-arabic translate-y-[1px]">إتصل</span>
          </a>
          <a
            href="https://goo.gl/maps/4SE8qzZ6uzBudB159"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white hover:text-primary"
          >
            <MapPin className="h-4 w-4" strokeWidth={2.2} />
            Nous trouver • <span className="font-arabic translate-y-[1px]">موقعنا</span>
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-1.5 rounded-full bg-white/50 transition-all hover:bg-white/80"
            style={{
              width: i === active ? 28 : 10,
              backgroundColor: i === active ? "#fff" : undefined,
            }}
          />
        ))}
      </div>
    </section>
  );
}
