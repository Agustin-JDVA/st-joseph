"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type HeroProps = {
  introMode?: boolean;
  isEntering?: boolean;
  onEnter?: () => void;
};

type VideoWithFrameCallback =
  HTMLVideoElement & {
    requestVideoFrameCallback?: (
      callback: () => void
    ) => number;
  };

export default function Hero({
  introMode = false,
  isEntering = false,
  onEnter,
}: HeroProps) {
  const [
    firstVideoFrameReady,
    setFirstVideoFrameReady,
  ] = useState(false);

  const frameCallbackRequested =
    useRef(false);

  /*
    CUANDO VOLVEMOS A LA PORTADA,
    REINICIAMOS EL ESTADO DEL VIDEO.
  */
  useEffect(() => {
    if (!introMode) return;

    setFirstVideoFrameReady(false);

    frameCallbackRequested.current =
      false;
  }, [introMode]);

  /*
    NO USAMOS SIMPLEMENTE "PLAYING".

    ESPERAMOS A QUE EL NAVEGADOR
    HAYA RENDERIZADO EL PRIMER FRAME
    REAL DEL VIDEO.
  */
  const handleVideoPlaying = (
    event: React.SyntheticEvent<
      HTMLVideoElement
    >
  ) => {
    if (
      frameCallbackRequested.current
    ) {
      return;
    }

    frameCallbackRequested.current =
      true;

    const video =
      event.currentTarget as VideoWithFrameCallback;

    if (
      typeof video.requestVideoFrameCallback ===
      "function"
    ) {
      video.requestVideoFrameCallback(
        () => {
          setFirstVideoFrameReady(
            true
          );
        }
      );

      return;
    }

    /*
      FALLBACK PARA NAVEGADORES
      QUE NO SOPORTAN
      requestVideoFrameCallback.
    */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstVideoFrameReady(true);
      });
    });
  };

  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {introMode ? (
        <>
          <img
            src="/renders/render-01.jpg"
            alt="St. JOSEPH"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div
            className={`intro-project-logo absolute left-1/2 z-10 -translate-x-1/2 transition-all duration-[750ms] ease-out ${
              isEntering
                ? "-translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <img
              src="/logo/st-joseph.png"
              alt="St. JOSEPH"
              className="intro-project-logo-image h-auto object-contain"
              draggable={false}
            />
          </div>

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
              className="intro-enter-button flex items-center justify-center rounded-full bg-white font-[family:var(--font-wix)] font-medium uppercase text-black shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:pointer-events-none"
            >
              Ingresar al proyecto
            </button>
          </div>
        </>
      ) : (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/renders/render-01.jpg"
            onPlaying={
              handleVideoPlaying
            }
          >
            <source
              src="/video/inicio.mp4"
              type="video/mp4"
            />
          </video>

          {/*
            EL HERO CAMBIA DE PORTADA
            A VIDEO APROXIMADAMENTE
            AL 50% DE LA TRANSICIÓN
            DE NUBES.

            DESDE ESE MISMO INSTANTE
            EL LOADER YA ESTÁ ACTIVO.

            NO HAY NINGÚN DELAY EXTRA.
          */}

          {!firstVideoFrameReady && (
            <div className="mobile-video-loader">
              <div className="mobile-video-loader-darkness" />

              <div className="mobile-video-loader-ring" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center sm:bottom-12 md:bottom-14">
            <a
              href="#info"
              className="interior-scroll-enter pointer-events-auto flex flex-col items-center text-white"
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
          </div>
        </>
      )}

      <style jsx global>{`
        .intro-project-logo {
          top: clamp(
            24px,
            3vw,
            64px
          );
        }

        .intro-project-logo-image {
          width: clamp(
            150px,
            21vw,
            400px
          );
        }

        .intro-enter-button {
          width: clamp(
            190px,
            16vw,
            280px
          );

          height: clamp(
            44px,
            4.2vw,
            64px
          );

          padding-left: 18px;
          padding-right: 18px;

          font-size: clamp(
            9px,
            0.74vw,
            14px
          );

          line-height: 1;

          letter-spacing: clamp(
            0.12em,
            0.15vw,
            0.18em
          );
        }

        /*
          LOADER

          OCULTO POR DEFECTO
          PARA ESCRITORIO.
        */

        .mobile-video-loader {
          display: none;

          position: absolute;
          inset: 0;

          z-index: 30;

          align-items: center;
          justify-content: center;

          pointer-events: none;
        }

        /*
          CAPA OSCURA DURANTE
          LA CARGA DEL VIDEO
        */

        .mobile-video-loader-darkness {
          position: absolute;
          inset: 0;

          background:
            rgba(
              0,
              0,
              0,
              0.42
            );
        }

        /*
          CÍRCULO DE CARGA
        */

        .mobile-video-loader-ring {
          position: relative;
          z-index: 2;

          width: 30px;
          height: 30px;

          border-radius: 9999px;

          border: 2px solid
            rgba(
              255,
              255,
              255,
              0.28
            );

          border-top-color:
            #ffffff;

          animation:
            mobileVideoLoading
            0.75s linear infinite;

          filter:
            drop-shadow(
              0 2px 5px
                rgba(
                  0,
                  0,
                  0,
                  0.5
                )
            );
        }

        @keyframes mobileVideoLoading {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        /*
          SOLO DISPOSITIVOS MÓVILES
        */

        @media (
          hover: none
        ) and (
          pointer: coarse
        ) and (
          max-width: 1024px
        ) {
          .mobile-video-loader {
            display: flex;
          }
        }

        /*
          CELULAR HORIZONTAL
        */

        @media (
          orientation: landscape
        ) and (max-height: 650px) {
          .intro-project-logo {
            top: clamp(
              16px,
              4vh,
              26px
            );
          }

          .intro-project-logo-image {
            width: clamp(
              135px,
              22vh,
              185px
            );
          }

          .intro-enter-button {
            width: clamp(
              180px,
              32vh,
              215px
            );

            height: clamp(
              40px,
              8vh,
              48px
            );

            font-size: clamp(
              8px,
              1.7vh,
              10px
            );

            letter-spacing:
              0.13em;
          }
        }

        /*
          CELULAR HORIZONTAL
          MUY BAJO
        */

        @media (
          orientation: landscape
        ) and (max-height: 450px) {
          .intro-project-logo {
            top: 14px;
          }

          .intro-project-logo-image {
            width: clamp(
              125px,
              34vh,
              155px
            );
          }

          .intro-enter-button {
            width: 180px;
            height: 40px;

            font-size: 8px;
          }

          .mobile-video-loader-ring {
            width: 24px;
            height: 24px;
          }
        }

        .interior-scroll-enter {
          animation:
            interiorContentEnter
              1300ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              )
              both,
            scrollInvitationFade
              2.4s
              ease-in-out
              1300ms
              infinite;
        }

        .scroll-arrow {
          animation:
            scrollInvitationMove
              1.7s
              ease-in-out
              infinite;

          filter:
            drop-shadow(
              0 2px 4px
                rgba(
                  0,
                  0,
                  0,
                  0.45
                )
            );
        }

        @keyframes interiorContentEnter {
          0% {
            opacity: 0;

            transform:
              translateY(
                14px
              );
          }

          35% {
            opacity: 0;
          }

          100% {
            opacity: 1;

            transform:
              translateY(
                0
              );
          }
        }

        @keyframes scrollInvitationMove {
          0% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(
                12px
              );
          }

          100% {
            transform:
              translateY(0);
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