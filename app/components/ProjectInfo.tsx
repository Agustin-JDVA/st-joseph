"use client";

export default function ProjectInfo() {
  return (
    <section
      id="info"
      className="project-info-section relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-black"
    >
      {/* CONTENIDO CENTRADO */}
      <div className="concept-layout">
        {/* TÍTULO IZQUIERDO */}
        <div className="concept-left">
          <h2 className="font-[family:var(--font-wix)] text-[23px] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black sm:text-[25px] lg:text-[28px]">
            ST. JOSEPH
          </h2>
        </div>

        {/* TEXTO DERECHO */}
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
          BLOQUE COMPLETO CENTRADO
          EN TODA LA PANTALLA
        */

        .concept-layout {
          width: 71.6%;

          display: grid;

          grid-template-columns:
            46%
            54%;

          align-items: start;
        }

        .concept-left,
        .concept-right {
          min-width: 0;
        }

        /*
          TEXTO PRINCIPAL DERECHO
        */

        .concept-main-text {
          margin: 0;

          font-family: var(--font-wix), Arial, sans-serif;

          font-size: 20px;
          font-weight: 700;

          line-height: 1.15;

          letter-spacing: -0.02em;

          color: #000000;
        }

        /*
          CUERPO DEL TEXTO
        */

        .concept-body-text {
          margin: 24px 0 0 0;

          font-family: var(--font-wix), Arial, sans-serif;

          font-size: 16px;
          font-weight: 400;

          line-height: 1.45;

          letter-spacing: -0.01em;

          color: #000000;
        }

        /*
          PANTALLAS MEDIANAS
        */

        @media (max-width: 1200px) and (orientation: landscape) {
          .concept-layout {
            width: 84%;

            grid-template-columns:
              46.5%
              53.5%;
          }
        }

        /*
          FORMATO VERTICAL
        */

        @media (orientation: portrait) {
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
            margin-bottom: 60px;
          }

          .concept-right {
            width: 100%;
          }

          .concept-main-text {
            font-size: 17px;
          }

          .concept-body-text {
            margin-top: 18px;

            font-size: 14px;
            line-height: 1.4;
          }
        }
      `}</style>
    </section>
  );
}