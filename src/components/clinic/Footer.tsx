export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-14 text-center">
        <p className="font-serif text-2xl font-medium">
          Centre Médico Diagnostic et de Rééducation Djemai
        </p>
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic mt-3 text-lg font-light text-white/85"
        >
          مصحة التشخيص الطبي و إعادة التأهيل الوظيفي جمعي
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-white/20" />
        <p className="mt-6 text-xs tracking-[0.2em] text-white/70">
          © 2026 — ROUIBA, ALGER
        </p>
      </div>
    </footer>
  );
}
