"use client";

import {
  useEffect,
  useState,
} from "react";

type LogoProps = {
  projectMode?: boolean;
};

export default function Logo({
  projectMode = false,
}: LogoProps) {
  const [
    useBlackLogo,
    setUseBlackLogo,
  ] = useState(true);

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

      const viewportCenter =
        window.innerHeight / 2;

      let currentSection = "";

      for (const id of sectionIds) {
        const section =
          document.getElementById(id);

        if (!section) continue;

        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <=
            viewportCenter &&
          rect.bottom >
            viewportCenter
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
        blackSections.includes(
          currentSection
        )
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
          : "intro-jdva-wrapper fixed left-1/2 z-50 -translate-x-1/2"
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
          className={`font-[family:var(--font-wix)] font-medium tracking-[0.08em] transition-colors duration-300 ${
            projectMode
              ? "mb-1 text-[7px] sm:text-[8px] md:text-[9px]"
              : "intro-jdva-proyecta"
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
              : "intro-jdva-image w-auto"
          }
          draggable={false}
        />
      </a>

      <style jsx global>{`
        /*
          JDVA EN PORTADA
        */

        .intro-jdva-wrapper {
          bottom: clamp(
            16px,
            3vw,
            32px
          );
        }

        .intro-jdva-proyecta {
          position: relative;

          top: -4px;

          margin-bottom: 4px;

          font-size: clamp(
            7px,
            0.58vw,
            11px
          );
        }

        .intro-jdva-image {
          height: clamp(
            18px,
            2.1vw,
            40px
          );
        }

        /*
          CELULAR HORIZONTAL
        */

        @media (
          orientation: landscape
        ) and (max-height: 650px) {
          .intro-jdva-wrapper {
            bottom: clamp(
              10px,
              3vh,
              18px
            );
          }

          .intro-jdva-proyecta {
            top: -2px;

            margin-bottom: 2px;

            font-size: clamp(
              6px,
              1.6vh,
              8px
            );
          }

          .intro-jdva-image {
            height: clamp(
              15px,
              5vh,
              21px
            );
          }
        }

        /*
          CELULAR HORIZONTAL
          MUY BAJO
        */

        @media (
          orientation: landscape
        ) and (max-height: 450px) {
          .intro-jdva-wrapper {
            bottom: 9px;
          }

          .intro-jdva-proyecta {
            font-size: 6px;
          }

          .intro-jdva-image {
            height: 15px;
          }
        }
      `}</style>
    </div>
  );
}