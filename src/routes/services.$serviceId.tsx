import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Accessibility,
  Brain,
  Bone,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { Footer } from '@/components/clinic/Footer'

export const Route = createFileRoute('/services/$serviceId')({
  component: ServiceDetail,
})

const servicesData = {
  consultations: {
    title: 'Consultations',
    ar: 'الاستشارات',
    icon: Stethoscope,
    description: 'Une équipe de spécialistes à votre écoute pour un diagnostic précis et un suivi personnalisé.',
    details: [
      'Rééducation fonctionnelle',
      'Orthopédie et Traumatologie',
      'Médecine Interne',
      'Médecine Générale',
    ],
  },
  explorations: {
    title: 'Explorations',
    ar: 'الاستكشافات',
    icon: HeartPulse,
    description: 'Des examens approfondis pour évaluer votre santé cardio-vasculaire et neurologique.',
    details: [
      'ECG (Électrocardiogramme)',
      'MAPA (Mesures Ambulatoires de la Pression Artérielle)',
      'EMG (Électromyogramme)',
      'EEG (Électroencéphalogramme)',
      'PEA (Potentiels Évoqués Auditifs)',
      'PEV (Potentiels Évoqués Visuels)',
      'Analyses médicales complètes',
    ],
  },
  imagerie: {
    title: 'Imagerie Médicale',
    ar: 'التصوير الطبي',
    icon: Microscope,
    description: 'Un plateau technique de dernière génération pour une imagerie haute précision.',
    details: [
      'Scanner 3D',
      'Radio numérique',
      'Échographie générale',
      'Echo Doppler',
      'Echo Cœur',
      'Ostéodensitométrie',
    ],
  },
  reeducation: {
    title: 'Rééducation Fonctionnelle',
    ar: 'إعادة التأهيل الوظيفي',
    icon: Accessibility,
    description: 'Un accompagnement complet pour retrouver votre autonomie et votre mobilité.',
    details: [
      'Rhumatologie, Traumatologie, Neurologie',
      'Orthopédie post-opératoire',
      'Pathologies congénitales',
      'Kiné respiratoire (adultes & enfants)',
      'Balnéothérapie (Rééducation en piscine)',
      'Ergothérapie',
      'Ondes de choc',
      'Traction lombaire & cervicale',
      'Massage thérapeutique & bien-être',
    ],
  },
  therapies: {
    title: 'Thérapies Spécialisées',
    ar: 'علاجات متخصصة',
    icon: Brain,
    description: 'Une approche multidimensionnelle pour le développement et le bien-être.',
    details: [
      'Orthophonie',
      'Psychologie clinique',
      'Suivi développemental',
      'Accompagnement psychopédagogique',
    ],
  },
  appareillage: {
    title: 'Appareillage Orthopédique',
    ar: 'الأجهزة الطبية',
    icon: Bone,
    description: 'Conception et adaptation de solutions orthopédiques sur mesure.',
    details: [
      'Appareillage orthopédique complet',
      'Corset et Orthèse',
      'Prothèse',
      'Chaussure & Semelle orthopédique',
      'Aide à la marche',
      'Fauteuil roulant',
    ],
  },
}

function ServiceDetail() {
  const { serviceId } = Route.useParams()
  const service = servicesData[serviceId as keyof typeof servicesData]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Service non trouvé</h1>
          <Link to="/" className="mt-4 text-primary hover:underline inline-block">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow">
        <div className="bg-primary pt-24 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                hash="services"
              >
                <ChevronLeft className="h-5 w-5" />
                Retour aux services
              </Link>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
                    {service.title}
                  </h1>
                  <p dir="rtl" className="text-2xl font-arabic text-accent-foreground font-light text-red-100">
                    {service.ar}
                  </p>
                </div>
                <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Icon className="h-10 w-10 text-white" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-16">
          <FadeIn delay={100}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                {service.description}
              </p>

              <h2 className="text-2xl font-serif text-primary mb-8 border-b border-slate-100 pb-4">
                Détails des prestations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-lg text-slate-700">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 rounded-2xl bg-light-blue/30 border border-light-blue flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">Besoin d'un rendez-vous ?</h3>
                  <p className="text-slate-600">Contactez notre secrétariat pour planifier votre visite.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <a
                    href="tel:021851924"
                    className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
                  >
                    021 85 19 24
                  </a>
                  <a
                    href="tel:0771180581"
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
                  >
                    07 71 18 05 81
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  )
}
