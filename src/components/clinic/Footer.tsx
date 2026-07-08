import { Settings } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function Footer() {
  const router = useRouter();

  const handleAdminAccess = () => {
    const password = window.prompt("Mot de passe administrateur :");
    if (password === "0000") {
      router.navigate({ to: "/admin" });
    } else if (password !== null) {
      window.alert("Mot de passe incorrect.");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-14 text-center">
        <p className="font-serif text-2xl font-medium">
          Centre Médico Diagnostic et de Rééducation Djemai
        </p>
        <p dir="rtl" lang="ar" className="font-arabic mt-3 text-lg font-light text-white/85">
          مصحة التشخيص الطبي و إعادة التأهيل الوظيفي جمعي
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-white/20" />
        <p className="mt-6 text-xs tracking-[0.2em] text-white/70">© 2026 — ROUIBA, ALGER</p>
        <button
          onClick={handleAdminAccess}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-white/40 transition-all hover:bg-white/10 hover:text-white/70"
          title="Administration"
        >
          <Settings className="h-3 w-3" />
          Admin
        </button>
      </div>
    </footer>
  );
}

