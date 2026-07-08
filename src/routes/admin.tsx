import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Smartphone,
  Printer,
  Mail,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  RotateCcw,
  ChevronLeft,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  useContactData,
  defaultContactData,
  ContactData,
  ContactItem,
  IconType,
  iconMap,
} from "@/lib/contactStore";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Centre Djemai – Admin" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
    ],
  }),
});

function AdminPage() {
  const { contactData, updateContactData } = useContactData();
  const [formState, setFormState] = useState<ContactData>(defaultContactData);

  // Register service worker only on /admin
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failed silently — non-critical
      });
    }
  }, []);

  // Sync with store data when it loads/changes
  useEffect(() => {
    setFormState(JSON.parse(JSON.stringify(contactData))); // deep copy
  }, [contactData]);

  const handleSave = () => {
    // Basic validation
    if (!formState.callNowNumber.trim()) {
      toast.error("Le numéro de téléphone 'Appeler maintenant' ne peut pas être vide.");
      return;
    }
    if (!formState.facebookUrl.trim()) {
      toast.error("Le lien Facebook ne peut pas être vide.");
      return;
    }

    // Clean up empty lines or empty items
    const cleanedItems = formState.items
      .map((item) => ({
        ...item,
        lines: item.lines.map((l) => l.trim()).filter((l) => l !== ""),
      }))
      .filter((item) => item.lines.length > 0);

    const dataToSave = {
      ...formState,
      items: cleanedItems,
    };

    updateContactData(dataToSave);
    setFormState(dataToSave); // sync cleaned state
    toast.success("Coordonnées enregistrées avec succès !");
  };

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser les coordonnées aux valeurs d'origine ?")) {
      updateContactData(defaultContactData);
      setFormState(JSON.parse(JSON.stringify(defaultContactData)));
      toast.success("Coordonnées réinitialisées aux valeurs par défaut.");
    }
  };

  // Add a new section
  const addSection = () => {
    const newItem: ContactItem = {
      id: Date.now().toString(),
      iconType: "Phone",
      lines: [""],
    };
    setFormState({
      ...formState,
      items: [...formState.items, newItem],
    });
  };

  // Remove a section
  const removeSection = (id: string) => {
    setFormState({
      ...formState,
      items: formState.items.filter((item) => item.id !== id),
    });
  };

  // Move section up/down
  const moveSection = (index: number, direction: "up" | "down") => {
    const newItems = [...formState.items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      setFormState({
        ...formState,
        items: newItems,
      });
    }
  };

  // Update section icon
  const updateIconType = (id: string, iconType: IconType) => {
    setFormState({
      ...formState,
      items: formState.items.map((item) =>
        item.id === id ? { ...item, iconType } : item
      ),
    });
  };

  // Update line text
  const updateLineText = (itemId: string, lineIndex: number, text: string) => {
    setFormState({
      ...formState,
      items: formState.items.map((item) => {
        if (item.id !== itemId) return item;
        const newLines = [...item.lines];
        newLines[lineIndex] = text;
        return { ...item, lines: newLines };
      }),
    });
  };

  // Add line to section
  const addLineToSection = (itemId: string) => {
    setFormState({
      ...formState,
      items: formState.items.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, lines: [...item.lines, ""] };
      }),
    });
  };

  // Remove line from section
  const removeLineFromSection = (itemId: string, lineIndex: number) => {
    setFormState({
      ...formState,
      items: formState.items.map((item) => {
        if (item.id !== itemId) return item;
        const newLines = item.lines.filter((_, i) => i !== lineIndex);
        return { ...item, lines: newLines.length === 0 ? [""] : newLines };
      }),
    });
  };

  // Helper to render icon for dynamic key
  const renderIcon = (type: IconType, className = "h-5 w-5") => {
    const IconComponent = iconMap[type] || Phone;
    return <IconComponent className={className} strokeWidth={1.8} />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Banner / Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">Administration</h1>
              <p className="text-xs text-slate-500">Gérer les Coordonnées du Centre</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/25 transition-all hover:scale-[1.05] hover:bg-accent/90 cursor-pointer"
              title="Sauvegarder"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Edit Form Section */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Quick Actions Buttons Configuration */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-primary mb-4">Liens d'actions rapides</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Numéro Appeler maintenant
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-accent focus:bg-white focus:outline-none"
                      placeholder="Ex: 0771180581"
                      value={formState.callNowNumber}
                      onChange={(e) => setFormState({ ...formState, callNowNumber: e.target.value })}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">Le numéro de téléphone pour le bouton d'appel rapide.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Lien Facebook
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Facebook className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-accent focus:bg-white focus:outline-none"
                      placeholder="Ex: https://facebook.com/page"
                      value={formState.facebookUrl}
                      onChange={(e) => setFormState({ ...formState, facebookUrl: e.target.value })}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">Le lien complet vers votre page Facebook.</p>
                </div>
              </div>
            </div>

            {/* Coordinates / Items Configuration */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-primary">Liste des coordonnées</h2>
                  <p className="text-xs text-slate-400">Ajoutez, modifiez ou réorganisez vos coordonnées.</p>
                </div>
                <button
                  onClick={addSection}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary/20"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Ajouter</span>
                </button>
              </div>

              {formState.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <MapPin className="h-10 w-10 text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-500">Aucune coordonnée</p>
                  <p className="text-xs text-slate-400 mt-0.5">Cliquez sur Ajouter pour créer une ligne.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formState.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative rounded-xl border border-slate-200 p-4 transition-all hover:border-slate-300 hover:shadow-sm"
                    >
                      {/* Control panel for ordering & deletion */}
                      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="flex h-7 w-7 items-center justify-center rounded bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-slate-50"
                          title="Monter"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => moveSection(index, "down")}
                          disabled={index === formState.items.length - 1}
                          className="flex h-7 w-7 items-center justify-center rounded bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-slate-50"
                          title="Descendre"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => removeSection(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded bg-red-50 text-red-500 hover:bg-red-100"
                          title="Supprimer la section"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Header & Icon Select */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-primary">
                          {renderIcon(item.iconType)}
                        </div>
                        <div className="w-40">
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Icône</label>
                          <select
                            value={item.iconType}
                            onChange={(e) => updateIconType(item.id, e.target.value as IconType)}
                            className="block w-full rounded border border-slate-200 bg-white py-1 px-1.5 text-xs focus:outline-none"
                          >
                            <option value="MapPin">Adresse (MapPin)</option>
                            <option value="Phone">Téléphone (Phone)</option>
                            <option value="Smartphone">Mobile (Smartphone)</option>
                            <option value="Printer">Fax (Printer)</option>
                            <option value="Mail">E-mail (Mail)</option>
                          </select>
                        </div>
                      </div>

                      {/* Lines Form */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase text-slate-400">Contenu (Lignes de texte)</label>
                        {item.lines.map((line, lineIndex) => (
                          <div key={lineIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={line}
                              onChange={(e) => updateLineText(item.id, lineIndex, e.target.value)}
                              className="block w-full rounded-lg border border-slate-200 py-1.5 px-3 text-sm focus:border-accent focus:outline-none"
                              placeholder="Entrez le texte de la coordonnée"
                            />
                            {item.lines.length > 1 && (
                              <button
                                onClick={() => removeLineFromSection(item.id, lineIndex)}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                                title="Supprimer la ligne"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addLineToSection(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline mt-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Ajouter une ligne de texte</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

          {/* Real-time Preview Section */}
          <section className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="font-serif text-lg font-bold text-primary">Aperçu en temps réel</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Actif
                </span>
              </div>

              {/* Preview card structured exactly as on landing page */}
              <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-100 sm:p-10">
                <h3 className="font-serif text-2xl font-semibold text-primary">Coordonnées</h3>
                <div className="mt-6 space-y-5">
                  {formState.items.map((item) => {
                    const cleanedLines = item.lines.filter(l => l.trim() !== "");
                    if (cleanedLines.length === 0) return null;
                    return (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary">
                          {renderIcon(item.iconType, "h-5 w-5")}
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5">
                          {cleanedLines.map((line, idx) => (
                            <p key={idx} className="text-[15px] text-foreground break-all">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href={`tel:${formState.callNowNumber.replace(/\s+/g, "")}`}
                    onClick={(e) => e.preventDefault()}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-white shadow-md shadow-accent/30 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2.2} />
                    Appeler maintenant ({formState.callNowNumber || "vide"})
                  </a>
                  <a
                    href={formState.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-white px-6 py-4 text-sm font-medium text-primary transition-all hover:border-primary cursor-pointer"
                  >
                    <Facebook className="h-4 w-4" strokeWidth={2} />
                    Suivre sur Facebook
                  </a>
                </div>
              </div>

              {/* Extra instructions removed */}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
