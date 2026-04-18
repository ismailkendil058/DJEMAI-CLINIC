import { useState, useEffect } from "react";
import { HeartPulse } from "lucide-react";

export function WelcomeAnimation() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Lock scroll to prevent jumping
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800);

        const unmountTimer = setTimeout(() => {
            setShouldRender(false);
            document.body.style.overflow = "";
        }, 2400);

        return () => {
            clearTimeout(timer);
            clearTimeout(unmountTimer);
            document.body.style.overflow = "";
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAF8] transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${isVisible ? "opacity-100" : "opacity-0 invisible scale-110"
                }`}
        >
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(var(--primary) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
            />

            <div className="relative flex flex-col items-center">
                {/* Decorative Glowing Orbs */}
                <div
                    className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-[scale-in_2s_ease-out_forwards]"
                    style={{ opacity: 0 }}
                />
                <div
                    className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-[scale-in_2.5s_ease-out_forwards]"
                    style={{ opacity: 0, animationDelay: '0.4s' }}
                />

                {/* Main Icon with stylized ring */}
                <div
                    className="relative mb-10 flex items-center justify-center animate-[scale-in_1s_ease-out_forwards]"
                    style={{ animationDelay: '0.1s', opacity: 0 }}
                >
                    <div className="absolute w-20 h-20 border-[0.5px] border-primary/20 rounded-full animate-ping duration-[3s]" />
                    <div className="absolute w-16 h-16 border-[0.5px] border-primary/40 rounded-full" />
                    <div className="relative bg-[#FAFAF8] p-4 rounded-full">
                        <HeartPulse size={48} strokeWidth={1} className="text-primary" />
                    </div>
                </div>

                {/* Textual Content */}
                <div className="flex flex-col items-center text-center px-6 max-w-2xl">
                    <div className="overflow-hidden mb-2">
                        <h1
                            className="font-serif text-[42px] leading-tight sm:text-[56px] text-foreground font-medium tracking-tight animate-[fade-in-up_1s_ease-out_forwards]"
                            style={{ animationDelay: '0.3s', opacity: 0 }}
                        >
                            Clinic Djemai
                        </h1>
                    </div>

                    {/* Arabic Description */}
                    <div className="overflow-hidden mb-1">
                        <p
                            dir="rtl"
                            lang="ar"
                            className="font-arabic text-lg sm:text-xl text-primary font-medium animate-[fade-in-up_1s_ease-out_forwards]"
                            style={{ animationDelay: '0.45s', opacity: 0 }}
                        >
                            مصحة التشخيص الطبي و إعادة التأهيل الوظيفي
                        </p>
                    </div>

                    {/* French Slogan */}
                    <div className="overflow-hidden mb-6">
                        <p
                            className="text-xs sm:text-sm font-medium tracking-[0.2em] text-foreground/60 animate-[fade-in-up_1s_ease-out_forwards]"
                            style={{ animationDelay: '0.6s', opacity: 0 }}
                        >
                            Soin · Précision · Réhabilitation
                        </p>
                    </div>

                    <div className="flex items-center gap-4 animate-[fade-in_0.8s_ease-out_forwards]" style={{ animationDelay: '0.8s', opacity: 0 }}>
                        <div className="h-[0.5px] w-8 bg-primary/30" />
                        <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-accent font-semibold">
                            Carte Visite Digitale
                        </p>
                        <div className="h-[0.5px] w-8 bg-primary/30" />
                    </div>

                    <div
                        className="mt-10 opacity-40 font-sans text-[9px] tracking-[0.3em] text-muted-foreground animate-[fade-in_1s_ease-out_forwards]"
                        style={{ animationDelay: '1s', opacity: 0 }}
                    >
                        ROUIBA • ALGER
                    </div>
                </div>

                {/* Elegant Progress Line */}
                <div className="absolute bottom-[-140px] w-48 h-[1px] bg-primary/5 overflow-hidden">
                    <div
                        className="h-full bg-primary/40 animate-[line-width_1.8s_cubic-bezier(0.65,0,0.35,1)_forwards]"
                        style={{ width: 0, animationDelay: '0.1s' }}
                    />
                </div>
            </div>
        </div>
    );
}
