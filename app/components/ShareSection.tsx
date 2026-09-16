"use client";

import { useState } from "react";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "St. JOSEPH",
      text: "Presentación del proyecto St. JOSEPH — JDVA",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Si el usuario cancela, no hacemos nada.
    }
  };

  return (
    <section
      id="compartir"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <div className="share-top">
        <div className="share-left-top">
          <h2 className="share-project-title">
            ST. JOSEPH
          </h2>

          <p className="share-project-subtitle">
            Compartí, descargá o continuá explorando el trabajo de JDVA.
          </p>
        </div>

        <div className="share-right-top">
          <h3 className="share-project-heading">
            Compartí la presentación del proyecto o descargá una copia en
            formato PDF.
          </h3>

          <div className="project-actions">
            <button
              type="button"
              onClick={handleShare}
              className="project-action"
            >
              <span className="project-action-text">
                {copied
                  ? "ENLACE COPIADO"
                  : "COMPARTÍ LA PRESENTACIÓN"}
              </span>

              <span className="project-action-arrow">
                ↗
              </span>
            </button>

            <a
              href="/pdf/st-joseph.pdf"
              download
              className="project-action"
            >
              <span className="project-action-text">
                DESCARGA LA PRESENTACIÓN EN PDF
              </span>

              <span className="project-action-arrow">
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="share-left-bottom">
          <h2 className="share-jdva-title">
            JDVA
          </h2>

          <p className="share-jdva-subtitle">
            ¡Conocenos!
          </p>
        </div>

        <div className="share-right-bottom">
          <div className="jdva-actions">
            <a
              href="https://jdva.com.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="jdva-action"
            >
              <span>SITIO WEB</span>

              <span className="jdva-action-arrow">
                ↗
              </span>
            </a>

            <a
              href="https://www.instagram.com/JDVA.UY/"
              target="_blank"
              rel="noopener noreferrer"
              className="jdva-action"
            >
              <span>REDES SOCIALES</span>

              <span className="jdva-action-arrow">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/company/jdva-arquitectos/"
              target="_blank"
              rel="noopener noreferrer"
              className="jdva-action"
            >
              <span>LINKEDIN</span>

              <span className="jdva-action-arrow">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="share-video">
        <video
          className="share-video-element"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/video/inicio.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <style jsx global>{`
        .share-top {
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 50vh;

          background: #ffffff;
        }

        .share-left-top,
        .share-right-top,
        .share-left-bottom,
        .share-right-bottom {
          transform: translateY(-32px);
        }

        .share-left-top {
          position: absolute;

          left: 14.2%;
          top: 31%;
        }

        .share-right-top {
          position: absolute;

          left: 47%;
          top: 31%;

          width: 38.5%;
        }

        .share-project-title {
          margin: 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            20px,
            1.45vw,
            28px
          );

          font-weight: 700;
          line-height: 0.95;

          letter-spacing: -0.03em;

          text-transform: uppercase;

          color: #000000;
        }

        .share-project-subtitle {
          margin: 3px 0 0 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            10px,
            0.65vw,
            12px
          );

          font-weight: 400;
          line-height: 1.2;

          letter-spacing: -0.01em;

          color: #000000;
        }

        .share-project-heading {
          margin: 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            16px,
            1.05vw,
            20px
          );

          font-weight: 700;
          line-height: 1.15;

          letter-spacing: -0.02em;

          color: #000000;
        }

        .project-actions {
          display: flex;
          flex-direction: column;

          width: 100%;

          gap: 0;

          margin-top: 10px;
        }

        .project-action {
          appearance: none !important;
          -webkit-appearance: none !important;

          display: flex !important;

          align-items: center !important;
          justify-content: space-between !important;

          width: 100% !important;

          margin: 0 !important;

          padding:
            clamp(
              6px,
              0.5vw,
              8px
            )
            0 !important;

          border: 0 !important;

          border-bottom:
            1px solid
            rgba(
              0,
              0,
              0,
              0.55
            ) !important;

          border-radius: 0 !important;

          background: transparent !important;

          color: #000000 !important;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif !important;

          text-decoration: none !important;

          text-align: left !important;

          cursor: pointer;

          transition: opacity 200ms ease;
        }

        .project-action:hover {
          opacity: 0.5;
        }

        .project-action-text {
          display: block !important;

          margin: 0 !important;
          padding: 0 !important;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif !important;

          font-size:
            clamp(
              11px,
              0.84vw,
              16px
            ) !important;

          font-weight: 400 !important;

          font-style: normal !important;

          line-height: 1 !important;

          letter-spacing:
            -0.01em !important;

          text-transform:
            uppercase !important;

          color: #000000 !important;

          white-space: nowrap !important;
        }

        .project-action-arrow {
          flex: 0 0 auto;

          margin-left:
            clamp(
              10px,
              1.25vw,
              24px
            );

          font-family:
            Arial,
            sans-serif !important;

          font-size:
            clamp(
              11px,
              0.84vw,
              16px
            ) !important;

          font-weight: 400 !important;

          line-height: 1 !important;

          color: #000000 !important;
        }

        .share-left-bottom {
          position: absolute;

          left: 14.2%;
          top: 67%;
        }

        .share-jdva-title {
          margin: 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            18px,
            1.2vw,
            23px
          );

          font-weight: 700;

          line-height: 1;

          letter-spacing: -0.025em;

          text-transform: uppercase;

          color: #000000;
        }

        .share-jdva-subtitle {
          margin: 4px 0 0 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            10px,
            0.65vw,
            12px
          );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.01em;

          color: #000000;
        }

        .share-right-bottom {
          position: absolute;

          left: 47%;
          top: 67%;

          width: 38.5%;
        }

        .jdva-actions {
          display: flex;

          width: 100%;

          flex-direction: column;

          gap: 7px;
        }

        .jdva-action {
          display: flex;

          align-items: center;
          justify-content: space-between;

          width: 100%;

          padding:
            clamp(
              4px,
              0.3vw,
              5px
            )
            0;

          border-bottom:
            1px solid
            rgba(
              0,
              0,
              0,
              0.55
            );

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            9px,
            0.65vw,
            12px
          );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.01em;

          text-transform: uppercase;

          text-decoration: none;

          color: #000000;

          transition: opacity 200ms ease;
        }

        .jdva-action:hover {
          opacity: 0.5;
        }

        .jdva-action-arrow {
          margin-left:
            clamp(
              10px,
              1.25vw,
              24px
            );

          font-family:
            Arial,
            sans-serif;

          font-size: clamp(
            11px,
            0.78vw,
            15px
          );

          font-weight: 400;

          line-height: 1;
        }

        .share-video {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 100%;
          height: 50vh;

          display: flex;

          align-items: center;
          justify-content: center;

          overflow: hidden;

          background: #000000;
        }

        .share-video-element {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          object-position: center center;
        }

        /*
          PANTALLAS INTERMEDIAS
        */

        @media (
          max-width: 1200px
        ) and (
          orientation: landscape
        ) {
          .share-left-top {
            left: 8%;
          }

          .share-right-top {
            left: 47%;
            width: 46%;
          }

          .share-left-bottom {
            left: 8%;
            top: 66%;
          }

          .share-right-bottom {
            left: 47%;
            top: 75%;

            width: 46%;
          }
        }

        /*
          CELULAR / PANTALLA ANGOSTA
        */

        @media (max-width: 768px) {
          .share-left-top,
          .share-right-top,
          .share-left-bottom,
          .share-right-bottom {
            transform: none;
          }

          .share-left-top {
            left: 7%;
            top: 7%;

            width: 86%;
          }

          .share-right-top {
            left: 7%;
            top: 26%;

            width: 86%;
          }

          /*
            ACERCAMOS LOS BOTONES
            AL TEXTO SUPERIOR.
          */

          .project-actions {
            margin-top: 2px;
          }

          /*
            TODO EL CONTENIDO INFERIOR
            SUBE.
          */

          .share-left-bottom {
            left: 7%;
            top: 61%;

            width: 86%;
          }

          /*
            LOS LINKS QUEDAN MÁS ABAJO
            RESPECTO DE JDVA, PERO EL
            CONJUNTO GENERAL SUBE.
          */

          .share-right-bottom {
            left: 7%;
            top: 76%;

            width: 86%;
          }

          .share-project-title {
            font-size:
              clamp(
                15px,
                4.2vw,
                18px
              );
          }

          .share-project-subtitle {
            width: 100%;

            max-width: 300px;

            font-size:
              clamp(
                7px,
                2.15vw,
                9px
              );

            line-height: 1.25;
          }

          .share-project-heading {
            font-size:
              clamp(
                10px,
                3vw,
                13px
              );

            line-height: 1.2;
          }

          .project-action {
            padding:
              clamp(
                4px,
                1.5vw,
                6px
              )
              0 !important;
          }

          .project-action-text {
            font-size:
              clamp(
                8px,
                2.55vw,
                11px
              ) !important;

            letter-spacing:
              -0.01em !important;
          }

          .project-action-arrow {
            margin-left: 10px;

            font-size:
              clamp(
                9px,
                2.8vw,
                12px
              ) !important;
          }

          .share-jdva-title {
            font-size:
              clamp(
                14px,
                4vw,
                17px
              );
          }

          .share-jdva-subtitle {
            font-size:
              clamp(
                7px,
                2.15vw,
                9px
              );
          }

          .jdva-actions {
            gap:
              clamp(
                3px,
                1vw,
                5px
              );
          }

          .jdva-action {
            padding:
              clamp(
                3px,
                1vw,
                4px
              )
              0;

            font-size:
              clamp(
                7px,
                2.3vw,
                10px
              );
          }

          .jdva-action-arrow {
            margin-left: 10px;

            font-size:
              clamp(
                9px,
                2.8vw,
                12px
              );
          }
        }

        /*
          CELULAR MUY CHICO
        */

        @media (max-width: 390px) {
          .share-left-top {
            top: 6%;
          }

          .share-right-top {
            top: 24%;
          }

          .project-actions {
            margin-top: 1px;
          }

          .share-left-bottom {
            top: 60%;
          }

          .share-right-bottom {
            top: 76%;
          }

          .share-project-title {
            font-size: 15px;
          }

          .share-project-heading {
            font-size: 10px;
          }

          .project-action-text {
            font-size: 8px !important;
          }

          .jdva-action {
            font-size: 7px;
          }
        }

        /*
          CELULAR HORIZONTAL
        */

        @media (
          orientation: landscape
        ) and (
          max-height: 650px
        ) {
          .share-left-top,
          .share-right-top,
          .share-left-bottom,
          .share-right-bottom {
            transform: none;
          }

          /*
            COMPARTÍ / DESCARGA SUBEN
            CONTRA EL TEXTO PRINCIPAL.
          */

          .project-actions {
            margin-top: 2px;
          }

          /*
            JDVA SUBE CON EL CONJUNTO.
          */

          .share-left-bottom {
            top: 64%;
          }

          /*
            SITIO WEB / REDES / LINKEDIN
            QUEDAN UN POCO MÁS ABAJO
            RESPECTO A JDVA.
          */

          .share-right-bottom {
            top: 73%;
          }

          .share-project-title {
            font-size:
              clamp(
                13px,
                4vh,
                18px
              );
          }

          .share-project-subtitle {
            font-size:
              clamp(
                7px,
                2vh,
                9px
              );
          }

          .share-project-heading {
            font-size:
              clamp(
                9px,
                3vh,
                12px
              );
          }

          .project-action-text {
            font-size:
              clamp(
                7px,
                2.4vh,
                10px
              ) !important;
          }

          .share-jdva-title {
            font-size:
              clamp(
                12px,
                3.8vh,
                16px
              );
          }

          .share-jdva-subtitle {
            font-size:
              clamp(
                7px,
                2vh,
                9px
              );
          }

          .jdva-action {
            font-size:
              clamp(
                7px,
                2.1vh,
                9px
              );
          }
        }
      `}</style>
    </section>
  );
}