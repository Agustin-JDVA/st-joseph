"use client";

import { useEffect, useState } from "react";

type LogoProps = {
  projectMode?: boolean;
};

export default function Logo({
  projectMode = false,
}: LogoProps) {
  const [useBlackLogo, setUseBlackLogo] = useState(true);

  useEffect(() => {
    const updateLogo = () => {
      /*
        PORTADA INICIAL:
        LOGO NEGRO
      */
      if (!projectMode) {
        setUseBlackLogo(true);
        return;
      }

      const sectionIds = [
        "inicio",
        "info",
        "renders",
        "planos",
        "compartir",
      ];

      const viewportCenter = window.innerHeight / 2;

      let currentSection = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (
          rect.top <= viewportCenter &&
          rect.bottom > viewportCenter
        ) {
          currentSection = id;
          break;
        }
      }

      /*
        COLORES DEL LOGO JDVA

        INICIO:      NEGRO
        CONCEPTO:    NEGRO
        RENDERS:     BLANCO
        PLANOS:      BLANCO
        COMPARTIR:   NEGRO
      */

      const blackSections = [
        "inicio",
        "info",
        "compartir",
      ];

      setUseBlackLogo(
        blackSections.includes(currentSection)
      );
    };

    updateLogo();

    window.addEventListener(
      "scroll",
      updateLogo,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateLogo
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateLogo
      );

      window.removeEventListener(
        "resize",
        updateLogo
      );
    };
  }, [projectMode]);

  return (
    <div
      className={
        projectMode
          ? "fixed left-3 top-3 z-[999999] sm:left-4 sm:top-4 md:left-7 md:top-[22px]"
          : "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 md:bottom-8"
      }
    >
      <a
        href="https://jdva.com.uy/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir al sitio web de JDVA"
        className="flex cursor-pointer flex-col items-start"
      >
        {/* PROYECTA */}
        <span
          className={`mb-1 font-[family:var(--font-wix)] font-medium tracking-[0.08em] transition-colors duration-300 ${
            projectMode
              ? "text-[7px] sm:text-[8px] md:text-[9px]"
              : "relative -top-1 text-[9px] sm:text-[10px] md:text-[11px]"
          } ${
            useBlackLogo
              ? "text-black"
              : "text-white"
          }`}
        >
          Proyecta
        </span>

        {/* JDVA */}
        <img
          src={
            useBlackLogo
              ? "/logo/Logo-negro.png"
              : "/logo/logo.png"
          }
          alt="JDVA"
          className={
            projectMode
              ? "h-[17px] w-auto sm:h-[21px] md:h-[26px] lg:h-[30px]"
              : "h-[23px] w-auto sm:h-[29px] md:h-[35px] lg:h-10"
          }
          draggable={false}
        />
      </a>
    </div>
  );
}