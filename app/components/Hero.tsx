type HeroProps = {
  introMode?: boolean;
  isEntering?: boolean;
  onEnter?: () => void;
};

export default function Hero({
  introMode = false,
  isEntering = false,
  onEnter,
}: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* =========================================
          PORTADA
          ========================================= */}

      {introMode ? (
        <>
          {/* IMAGEN DE PORTADA - SIN ZOOM */}
          <img
            src="/renders/render-01.jpg"
            alt="St. JOSEPH"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* NOMBRE DEL PROYECTO */}
          <div
            className={`absolute left-1/2 top-10 z-10 -translate-x-1/2 transition-all duration-[750ms] ease-out sm:top-12 md:top-14 lg:top-16 ${
              isEntering
                ? "-translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="whitespace-nowrap font-[family:var(--font-wix)] text-3xl font-extrabold leading-none tracking-[0.04em] text-black sm:text-5xl sm:tracking-[0.05em] md:text-6xl lg:text-7xl lg:tracking-[0.06em]">
              St. JOSEPH
            </h1>
          </div>

          {/* BOTÓN INGRESAR */}
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center px-6 transition-all duration-[750ms] ease-out ${
              isEntering
                ? "translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={onEnter}
              disabled={isEntering}
              className="flex h-14 w-[250px] items-center justify-center rounded-full bg-white font-[family:var(--font-wix)] text-xs font-medium uppercase tracking-[0.18em] text-black shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:pointer-events-none sm:h-16 sm:w-[280px] sm:text-sm"
            >
              Ingresar al proyecto
            </button>
          </div>
        </>
      ) : (
        <>
          {/* =========================================
              VIDEO DE INICIO
              ========================================= */}

          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/renders/render-01.jpg"
          >
            <source
              src="/video/inicio.mp4"
              type="video/mp4"
            />
          </video>

          {/* DESLIZA PARA RECORRER */}
          <a
            href="#info"
            className="interior-scroll-enter absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white sm:bottom-12 md:bottom-14"
            aria-label="Ir al concepto"
          >
            <span className="whitespace-nowrap font-[family:var(--font-wix)] text-[10px] font-medium uppercase tracking-[0.24em] text-white drop-shadow-md sm:text-[11px] md:text-[13px]">
              Desliza para recorrer
            </span>

            <div className="scroll-arrow mt-4 flex flex-col items-center">
              <div className="mb-1 h-1.5 w-1.5 rounded-full bg-white" />

              <div className="h-10 w-px bg-white/90 md:h-12" />

              <div className="-mt-[6px] h-3 w-3 rotate-45 border-b-2 border-r-2 border-white" />
            </div>
          </a>
        </>
      )}

      <style jsx global>{`
        /*
          ENTRADA DEL TEXTO
          "DESLIZA PARA RECORRER"
        */

        .interior-scroll-enter {
          animation:
            interiorContentEnter 1300ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              )
              both,
            scrollInvitationFade 2.4s
              ease-in-out 1300ms infinite;
        }

        .scroll-arrow {
          animation:
            scrollInvitationMove 1.7s
              ease-in-out infinite;

          filter: drop-shadow(
            0 2px 4px rgba(0, 0, 0, 0.45)
          );
        }

        @keyframes interiorContentEnter {
          0% {
            opacity: 0;
            transform: translate(-50%, 14px);
          }

          35% {
            opacity: 0;
          }

          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes scrollInvitationMove {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(12px);
          }

          100% {
            transform: translateY(0);
          }
        }

        @keyframes scrollInvitationFade {
          0% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0.72;
          }
        }
      `}</style>
    </section>
  );
}