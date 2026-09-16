"use client";

export default function ProjectInfo() {
  return (
    <section
      id="info"
      className="project-info-section relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-black"
    >
      <div className="concept-layout">
        <div className="concept-left">
          <h2 className="concept-title">
            ST. JOSEPH
          </h2>
        </div>

        <div className="concept-right">
          <p className="concept-main-text">
            Habitar la calma, a minutos de todo.
          </p>

          <p className="concept-body-text">
            En Rincón del Indio, ST JOSEPH propone un equilibrio poco común
            entre naturaleza, privacidad y vida contemporánea en un mismo lugar.
            Una arquitectura serena, de líneas precisas y espacios generosos,
            pensada para abrirse al paisaje y capturar cada momento de luz.
          </p>

          <p className="concept-body-text">
            En una de las zonas con mayor proyección de crecimiento de Punta del
            Este, ST JOSEPH —un proyecto con la calidad de JDVA— propone otra
            manera de vivir: más silenciosa, más en relación con el paisaje, sin
            descuidar ni un detalle.
          </p>
        </div>
      </div>

      <style jsx global>{`
        /*
          ESCRITORIO
        */

        .concept-layout {
          width: 71.6%;

          display: grid;

          grid-template-columns:
            46% 54%;

          align-items: start;
        }

        .concept-left,
        .concept-right {
          min-width: 0;
        }

        .concept-title {
          margin: 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            23px,
            1.45vw,
            28px
          );

          font-weight: 700;

          line-height: 0.95;

          letter-spacing: -0.03em;

          text-transform: uppercase;

          color: #000000;
        }

        .concept-main-text {
          margin: 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            17px,
            1.04vw,
            20px
          );

          font-weight: 700;

          line-height: 1.15;

          letter-spacing: -0.02em;

          color: #000000;
        }

        .concept-body-text {
          margin: clamp(
            18px,
            1.25vw,
            24px
          )
          0 0 0;

          font-family:
            var(--font-wix),
            Arial,
            sans-serif;

          font-size: clamp(
            14px,
            0.84vw,
            16px
          );

          font-weight: 400;

          line-height: 1.45;

          letter-spacing: -0.01em;

          color: #000000;
        }

        /*
          TABLET / PANTALLA INTERMEDIA
        */

        @media (
          max-width: 1200px
        ) and (
          orientation: landscape
        ) {
          .concept-layout {
            width: 84%;

            grid-template-columns:
              46.5% 53.5%;
          }
        }

        /*
          CELULAR / TABLET VERTICAL
        */

        @media (
          orientation: portrait
        ) {
          .project-info-section {
            padding-left: 8%;
            padding-right: 8%;
          }

          .concept-layout {
            width: 100%;

            display: flex;

            flex-direction: column;
          }

          .concept-left {
            margin-bottom: clamp(
              32px,
              8vh,
              60px
            );
          }

          .concept-right {
            width: 100%;
          }

          .concept-title {
            font-size: clamp(
              17px,
              5vw,
              23px
            );
          }

          .concept-main-text {
            font-size: clamp(
              13px,
              4vw,
              17px
            );
          }

          .concept-body-text {
            margin-top: clamp(
              13px,
              4vw,
              18px
            );

            font-size: clamp(
              11px,
              3.2vw,
              14px
            );

            line-height: 1.4;
          }
        }

        /*
          CELULAR HORIZONTAL

          Acá usamos también la altura
          para evitar que un teléfono
          horizontal tome tamaños de tablet
          o escritorio.
        */

        @media (
          orientation: landscape
        ) and (
          max-height: 650px
        ) {
          .project-info-section {
            padding-left: 7%;
            padding-right: 7%;
          }

          .concept-layout {
            width: 100%;

            grid-template-columns:
              38% 62%;

            align-items: start;
          }

          .concept-title {
            font-size: clamp(
              15px,
              4.2vh,
              20px
            );
          }

          .concept-main-text {
            font-size: clamp(
              12px,
              3.5vh,
              16px
            );

            line-height: 1.12;
          }

          .concept-body-text {
            margin-top: clamp(
              9px,
              3vh,
              14px
            );

            font-size: clamp(
              9px,
              2.8vh,
              12px
            );

            line-height: 1.32;
          }
        }

        /*
          CELULARES HORIZONTALES
          MUY BAJOS
        */

        @media (
          orientation: landscape
        ) and (
          max-height: 450px
        ) {
          .project-info-section {
            padding-left: 6%;
            padding-right: 6%;
          }

          .concept-layout {
            grid-template-columns:
              34% 66%;
          }

          .concept-title {
            font-size: 14px;
          }

          .concept-main-text {
            font-size: 11px;
          }

          .concept-body-text {
            margin-top: 8px;

            font-size: 8.5px;

            line-height: 1.28;
          }
        }
      `}</style>
    </section>
  );
}