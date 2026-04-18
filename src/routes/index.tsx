import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/clinic/Hero";
import { Services } from "@/components/clinic/Services";

const Contact = lazy(() => import("@/components/clinic/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/clinic/Footer").then(m => ({ default: m.Footer })));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Centre Djemai — Rééducation & Diagnostic, Rouiba Alger" },
      {
        name: "description",
        content:
          "Centre médical d'excellence à Rouiba, Alger. Consultations, imagerie médicale, rééducation fonctionnelle, thérapies spécialisées et appareillage.",
      },
      { property: "og:title", content: "Centre Médico Diagnostic et de Rééducation Djemai" },
      {
        property: "og:description",
        content: "Soin · Précision · Réhabilitation — Rouiba, Alger.",
      },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&q=80&w=1400",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Suspense fallback={<div className="h-40" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
