"use client";

import { useEffect, useState } from "react";

type MenuProps = {
  onExitProject: () => void;
};

export default function Menu({
  onExitProject,
}: MenuProps) {
  const [darkText, setDarkText] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateColor = () => {
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
          rect.top <= viewportCenter &&
          rect.bottom > viewportCenter
        ) {
          currentSection = id;
          break;
        }
      }

      setDarkText(
        currentSection === "inicio" ||
          currentSection === "info" ||
          currentSection === "compartir"
      );
    };

    const handleScroll = () => {
      updateColor();
      setIsOpen(false);
    };

    updateColor();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateColor
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        updateColor
      );
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleExit = () => {
    setIsOpen(false);
    onExitProject();
  };

  return (
    <>
      {/* MENÚ HORIZONTAL */}
      <nav className="project-menu-landscape">
        <div
          className={`project-menu-landscape-links ${
            darkText
              ? "text-black"
              : "text-white"
          }`}
        >
          <a href="#inicio">
            Inicio
          </a>

          <a href="#info">
            Concepto
          </a>

          <a href="#renders">
            Renders
          </a>

          <a href="#planos">
            Planos
          </a>

          <a href="#compartir">
            Compartir
          </a>
        </div>
      </nav>

      {/* SALIR DEL PROYECTO */}
      <button
        type="button"
        onClick={handleExit}
        className={`project-exit-landscape ${
          darkText
            ? "text-black"
            : "text-white"
        }`}
      >
        Salir del proyecto
      </button>

      {/* FONDO MENÚ MOBILE */}
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={closeMenu}
        className={`project-menu-portrait project-menu-overlay ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* HAMBURGUESA */}
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) => !current
          )
        }
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? "Cerrar menú"
            : "Abrir menú"
        }
        className="project-menu-portrait project-menu-toggle"
      >
        <div className="project-menu-icon">
          <span
            className={`project-menu-line project-menu-line-top ${
              isOpen
                ? "menu-open bg-white"
                : darkText
                  ? "bg-black"
                  : "bg-white"
            }`}
          />

          <span
            className={`project-menu-line project-menu-line-middle ${
              isOpen
                ? "menu-open bg-white"
                : darkText
                  ? "bg-black"
                  : "bg-white"
            }`}
          />

          <span
            className={`project-menu-line project-menu-line-bottom ${
              isOpen
                ? "menu-open bg-white"
                : darkText
                  ? "bg-black"
                  : "bg-white"
            }`}
          />
        </div>
      </button>

      {/* MENÚ MOBILE ABIERTO */}
      <div
        className={`project-menu-portrait project-mobile-panel ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="project-mobile-links">
          <a
            href="#inicio"
            onClick={closeMenu}
          >
            Inicio
          </a>

          <a
            href="#info"
            onClick={closeMenu}
          >
            Concepto
          </a>

          <a
            href="#renders"
            onClick={closeMenu}
          >
            Renders
          </a>

          <a
            href="#planos"
            onClick={closeMenu}
          >
            Planos
          </a>

          <a
            href="#compartir"
            onClick={closeMenu}
          >
            Compartir
          </a>

          <div className="project-mobile-divider" />

          <button
            type="button"
            onClick={handleExit}
          >
            Salir del proyecto
          </button>
        </div>
      </div>

      <style jsx global>{`
        /*
          DESKTOP
        */

        .project-menu-landscape {
          position: fixed;

          left: 50%;
          top: clamp(16px, 1.4vw, 28px);

          z-index: 99999;

          width: 100%;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .project-menu-landscape-links {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(12px, 2.4vw, 48px);

          padding: 0 12px;

          white-space: nowrap;

          font-family: var(--font-wix), Arial, sans-serif;

          font-size: clamp(9px, 0.84vw, 16px);

          font-weight: 500;

          letter-spacing: clamp(
            0.08em,
            0.11vw,
            0.16em
          );

          text-transform: uppercase;

          transition: color 300ms ease;
        }

        .project-menu-landscape-links a {
          pointer-events: auto;

          color: inherit;

          text-decoration: none;

          transition: opacity 200ms ease;
        }

        .project-menu-landscape-links a:hover {
          opacity: 0.55;
        }

        .project-exit-landscape {
          position: fixed;

          right: clamp(12px, 1.45vw, 28px);
          top: clamp(12px, 1.4vw, 28px);

          z-index: 9999999;

          margin: 0;
          padding: 0;

          border: 0;

          background: transparent;

          font-family: var(--font-wix), Arial, sans-serif;

          font-size: clamp(8px, 0.84vw, 16px);

          font-weight: 500;

          line-height: 1;

          letter-spacing: clamp(
            0.04em,
            0.1vw,
            0.16em
          );

          text-transform: uppercase;

          white-space: nowrap;

          transition:
            color 300ms ease,
            opacity 200ms ease;

          cursor: pointer;
        }

        .project-exit-landscape:hover {
          opacity: 0.55;
        }

        /*
          MOBILE
        */

        .project-menu-portrait {
          display: none;
        }

        .project-menu-overlay {
          position: fixed;
          inset: 0;

          z-index: 999997;

          border: 0;

          background: rgba(0, 0, 0, 0.2);

          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);

          transition: opacity 300ms ease;
        }

        .project-menu-toggle {
          position: fixed;

          right: clamp(12px, 4vw, 20px);
          top: clamp(12px, 4vw, 20px);

          z-index: 9999999;

          width: clamp(25px, 7vw, 32px);
          height: clamp(25px, 7vw, 32px);

          align-items: center;
          justify-content: center;

          padding: 0;

          border: 0;

          background: transparent;
        }

        .project-menu-icon {
          position: relative;

          width: clamp(20px, 6vw, 28px);
          height: 16px;
        }

        .project-menu-line {
          position: absolute;

          left: 0;

          width: 100%;
          height: 1.5px;

          transition: all 300ms ease;
        }

        .project-menu-line-top {
          top: 0;
        }

        .project-menu-line-middle {
          top: 7px;
        }

        .project-menu-line-bottom {
          bottom: 0;
        }

        .project-menu-line-top.menu-open {
          top: 7px;
          transform: rotate(45deg);
        }

        .project-menu-line-middle.menu-open {
          opacity: 0;
        }

        .project-menu-line-bottom.menu-open {
          bottom: 7px;
          transform: rotate(-45deg);
        }

        .project-mobile-panel {
          position: fixed;

          right: clamp(12px, 4vw, 20px);
          top: clamp(48px, 13vw, 64px);

          z-index: 9999998;

          width: min(68vw, 260px);

          color: #ffffff;

          transition:
            opacity 300ms ease,
            transform 300ms ease;
        }

        .project-mobile-links {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          width: 100%;

          text-align: right;

          font-family: var(--font-wix), Arial, sans-serif;
        }

        .project-mobile-links a,
        .project-mobile-links button {
          margin: 0;

          padding: clamp(7px, 2.5vw, 11px) 0;

          border: 0;

          background: transparent;

          font-family: inherit;

          font-size: clamp(9px, 2.8vw, 12px);

          font-weight: 500;

          line-height: 1;

          letter-spacing: clamp(
            0.08em,
            0.25vw,
            0.13em
          );

          text-transform: uppercase;

          text-decoration: none;

          color: #ffffff;

          cursor: pointer;

          transition: opacity 200ms ease;
        }

        .project-mobile-links a:hover,
        .project-mobile-links button:hover {
          opacity: 0.55;
        }

        .project-mobile-divider {
          width: clamp(45px, 16vw, 75px);
          height: 1px;

          margin: clamp(5px, 2vw, 9px) 0;

          background: rgba(255, 255, 255, 0.3);
        }

        /*
          EL CAMBIO A MENÚ MOBILE YA NO DEPENDE
          DE SI EL TELÉFONO ESTÁ VERTICAL.
          DEPENDE DEL ANCHO REAL DE PANTALLA.
        */

        @media (max-width: 768px) {
          .project-menu-landscape,
          .project-exit-landscape {
            display: none;
          }

          .project-menu-portrait {
            display: flex;
          }
        }

        /*
          TABLETS / PANTALLAS INTERMEDIAS
        */

        @media (min-width: 769px) and (max-width: 1100px) {
          .project-menu-landscape-links {
            font-size: clamp(9px, 1.15vw, 12px);
            gap: clamp(12px, 2vw, 22px);
          }

          .project-exit-landscape {
            font-size: clamp(8px, 1.05vw, 11px);
          }
        }

        /*
          OCULTAR TODO AL EXPLORAR PLANOS
        */

        body.plan-exploring-active
          .project-menu-landscape,
        body.plan-exploring-active
          .project-exit-landscape,
        body.plan-exploring-active
          .project-menu-portrait {
          display: none !important;
        }
      `}</style>
    </>
  );
}