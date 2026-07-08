import { Phone, Facebook } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useContactData, iconMap } from "@/lib/contactStore";

export function Contact() {
  const { contactData } = useContactData();
  const { items, callNowNumber, facebookUrl } = contactData;

  const renderIcon = (type: string) => {
    const IconComponent = iconMap[type as keyof typeof iconMap] || Phone;
    return <IconComponent className="h-5 w-5" strokeWidth={1.8} />;
  };

  return (
    <section className="bg-light-blue py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <h2 className="font-serif text-4xl text-primary sm:text-5xl">Contactez-nous</h2>
            <p dir="rtl" lang="ar" className="font-arabic mt-2 text-2xl font-light text-accent">
              تواصلوا معنا
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contact card */}
          <FadeIn>
            <div className="h-full rounded-2xl bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
              <h3 className="font-serif text-2xl font-semibold text-primary">Coordonnées</h3>
              <div className="mt-6 space-y-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary">
                      {renderIcon(item.iconType)}
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      {item.lines.map((l) => (
                        <p key={l} className="text-[15px] text-foreground">
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${callNowNumber.replace(/\s+/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-white shadow-md shadow-accent/30 transition-all hover:scale-[1.01] hover:bg-accent/90"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.2} />
                  Appeler maintenant
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-white px-6 py-4 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Facebook className="h-4 w-4" strokeWidth={2} />
                  Suivre sur Facebook
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Map */}
          <FadeIn delay={120}>
            <div className="h-full min-h-[320px] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <iframe
                title="Centre Djemai Rouiba — Carte"
                src="https://maps.google.com/maps?q=Centre+Médico+Diagnostic+et+de+Rééducation+Djemai+Rouiba+Alger&z=15&output=embed"
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

