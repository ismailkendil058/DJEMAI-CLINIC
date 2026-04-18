import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Accessibility,
  Brain,
  Bone,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/FadeIn";

type Service = {
  id: string;
  Icon: LucideIcon;
  title: string;
  ar: string;
  desc: string;
  longDesc?: string;
};

const services: Service[] = [
  {
    id: "consultations",
    Icon: Stethoscope,
    title: "Consultations",
    ar: "الاستشارات",
    desc: "Rééducation • Orthopédie • Médecine interne & générale",
  },
  {
    id: "explorations",
    Icon: HeartPulse,
    title: "Explorations",
    ar: "الاستكشافات",
    desc: "ECG, MAPA, EMG, EEG, PEA, PEV, Analyses médicales",
  },
  {
    id: "imagerie",
    Icon: Microscope,
    title: "Imagerie Médicale",
    ar: "التصوير الطبي",
    desc: "Scanner 3D, Radio numérisée, Échographie, Echo Doppler, Ostéodensitométrie",
  },
  {
    id: "reeducation",
    Icon: Accessibility,
    title: "Rééducation Fonctionnelle",
    ar: "إعادة التأهيل الوظيفي",
    desc: "Rhumatologie, Traumatologie, Neurologie, Pathologies congénitales",
  },
  {
    id: "therapies",
    Icon: Brain,
    title: "Thérapies Spécialisées",
    ar: "علاجات متخصصة",
    desc: "Ergothérapie, Orthophonie, Psychologie, Balnéothérapie, Kiné respiratoire",
  },
  {
    id: "appareillage",
    Icon: Bone,
    title: "Appareillage",
    ar: "الأجهزة الطبية",
    desc: "Corset, Orthèse, Prothèse, Semelle & Chaussure ortho, Fauteuil roulant",
  },
];

export function Services() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl text-primary sm:text-5xl">Nos Services</h2>
            <p dir="rtl" lang="ar" className="font-arabic mt-2 text-2xl font-light text-accent">
              خدماتنا
            </p>
            <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
              Des soins complets sous un même toit
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, Icon, title, ar, desc }, i) => (
            <FadeIn key={title} delay={i * 40}>
              <Link
                to="/services/$serviceId"
                params={{ serviceId: id }}
                className="group block h-full rounded-2xl border border-light-blue bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-light-blue text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold text-primary">
                    {title}
                  </h3>
                  <span
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-sm font-light text-accent"
                  >
                    {ar}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
