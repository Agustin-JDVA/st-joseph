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
          <h2 className="share-project-title font-[family:var(--font-wix)] text-[23px] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black sm:text-[25px] lg:text-[28px]">
            ST. JOSEPH
          </h2>

          <p className="share-project-subtitle mt-[3px] font-[family:var(--font-wix)] text-[10px] font-normal leading-[1.2] tracking-[-0.01em] text-black sm:text-[11px] lg:text-[12px]">
            Compartí, descargá o continuá explorando el trabajo de JDVA.
          </p>
        </div>

        <div className="share-right-top">
          <h3 className="share-project-heading font-[family:var(--font-wix)] text-[16px] font-bold leading-[1.15] tracking-[-0.02em] text-black sm:text-[17px] lg:text-[20px]">
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
          <h2 className="share-jdva-title font-[family:var(--font-wix)] text-[19px] font-bold uppercase leading-none tracking-[-0.025em] text-black sm:text-[21px] lg:text-[23px]">
            JDVA
          </h2>

          <p className="share-jdva-subtitle mt-[4px] font-[family:var(--font-wix)] text-[10px] font-normal leading-none tracking-[-0.01em] text-black sm:text-[11px] lg:text-[12px]">
            ¡Conocenos!
          </p>
        </div>

        <div className="share-right-bottom">
          <div className="flex w-full flex-col gap-[7px]">
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

        .project-actions {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0px;
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
          padding: 8px 0 !important;
          border: 0 !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.55) !important;
          border-radius: 0 !important;
          background: transparent !important;
          color: #000000 !important;
          font-family: var(--font-wix), Arial, sans-serif !important;
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
          font-family: var(--font-wix), Arial, sans-serif !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          font-style: normal !important;
          line-height: 1 !important;
          letter-spacing: -0.01em !important;
          text-transform: uppercase !important;
          color: #000000 !important;
          white-space: nowrap !important;
        }

        .project-action-arrow {
          flex: 0 0 auto;
          margin-left: 24px;
          font-family: Arial, sans-serif !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 1 !important;
          color: #000000 !important;
        }

        .share-left-bottom {
          position: absolute;
          left: 14.2%;
          top: 67%;
        }

        .share-right-bottom {
          position: absolute;
          left: 47%;
          top: 67%;
          width: 38.5%;
        }

        .jdva-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 5px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.55);
          font-family: var(--font-wix), Arial, sans-serif;
          font-size: 12px;
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
          margin-left: 24px;
          font-family: Arial, sans-serif;
          font-size: 15px;
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

        @media (max-width: 1200px) and (orientation: landscape) {
          .share-left-top,
          .share-left-bottom {
            left: 8%;
          }

          .share-right-top,
          .share-right-bottom {
            left: 47%;
            width: 46%;
          }
        }

        /*
          CELULAR / VERTICAL

          SOLO ADAPTAMOS TIPOGRAFÍAS.
          ESCRITORIO QUEDA IGUAL.
        */

        @media (orientation: portrait) {
          .share-left-top,
          .share-right-top,
          .share-left-bottom,
          .share-right-bottom {
            transform: translateY(-15px);
          }

          .share-left-top {
            left: 8%;
            top: 10%;
          }

          .share-right-top {
            left: 8%;
            top: 27%;
            width: 84%;
          }

          .share-project-title {
            font-size: 18px !important;
          }

          .share-project-subtitle {
            font-size: 9px !important;
            line-height: 1.25 !important;
          }

          .share-project-heading {
            font-size: 13px !important;
            line-height: 1.2 !important;
          }

          .project-actions {
            gap: 0px;
            margin-top: 10px;
          }

          .project-action {
            padding: 7px 0 !important;
          }

          .project-action-text {
            font-size: 12px !important;
            letter-spacing: -0.01em !important;
          }

          .project-action-arrow {
            font-size: 13px !important;
            margin-left: 14px;
          }

          .share-left-bottom {
            left: 8%;
            top: 61%;
          }

          .share-jdva-title {
            font-size: 17px !important;
          }

          .share-jdva-subtitle {
            font-size: 9px !important;
          }

          .share-right-bottom {
            left: 8%;
            top: 72%;
            width: 84%;
          }

          .jdva-action {
            font-size: 10px;
            padding: 4px 0;
          }

          .jdva-action-arrow {
            font-size: 12px;
            margin-left: 14px;
          }
        }
      `}</style>
    </section>
  );
}