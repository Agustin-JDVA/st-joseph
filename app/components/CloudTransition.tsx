"use client";

import type { CSSProperties } from "react";

type CloudSpec = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  filter: "soft" | "medium" | "dense";
  driftX: number;
  driftY: number;
  delay: number;
  startScale: number;
  peakScale: number;
  endScale: number;
};

const clouds: CloudSpec[] = [
  {
    x: 115,
    y: 155,
    scale: 0.72,
    rotation: -14,
    filter: "soft",
    driftX: 55,
    driftY: -18,
    delay: 0,
    startScale: 0.46,
    peakScale: 1.72,
    endScale: 2.35,
  },
  {
    x: 465,
    y: 95,
    scale: 0.54,
    rotation: 11,
    filter: "medium",
    driftX: -30,
    driftY: 38,
    delay: 180,
    startScale: 0.5,
    peakScale: 1.88,
    endScale: 2.5,
  },
  {
    x: 815,
    y: 225,
    scale: 0.82,
    rotation: -7,
    filter: "soft",
    driftX: 22,
    driftY: -32,
    delay: 80,
    startScale: 0.44,
    peakScale: 1.68,
    endScale: 2.3,
  },
  {
    x: 1245,
    y: 125,
    scale: 0.63,
    rotation: 17,
    filter: "medium",
    driftX: -48,
    driftY: 20,
    delay: 290,
    startScale: 0.48,
    peakScale: 1.82,
    endScale: 2.45,
  },
  {
    x: 1510,
    y: 410,
    scale: 0.8,
    rotation: -20,
    filter: "dense",
    driftX: -62,
    driftY: -12,
    delay: 120,
    startScale: 0.43,
    peakScale: 1.78,
    endScale: 2.42,
  },
  {
    x: 1030,
    y: 455,
    scale: 0.52,
    rotation: 8,
    filter: "soft",
    driftX: 38,
    driftY: 26,
    delay: 360,
    startScale: 0.52,
    peakScale: 1.95,
    endScale: 2.62,
  },
  {
    x: 610,
    y: 515,
    scale: 0.7,
    rotation: -11,
    filter: "dense",
    driftX: -26,
    driftY: -28,
    delay: 220,
    startScale: 0.45,
    peakScale: 1.8,
    endScale: 2.48,
  },
  {
    x: 210,
    y: 475,
    scale: 0.58,
    rotation: 19,
    filter: "medium",
    driftX: 46,
    driftY: 31,
    delay: 410,
    startScale: 0.5,
    peakScale: 1.92,
    endScale: 2.58,
  },
  {
    x: 355,
    y: 785,
    scale: 0.86,
    rotation: -5,
    filter: "soft",
    driftX: 34,
    driftY: -45,
    delay: 70,
    startScale: 0.43,
    peakScale: 1.7,
    endScale: 2.35,
  },
  {
    x: 770,
    y: 745,
    scale: 0.48,
    rotation: 14,
    filter: "medium",
    driftX: -18,
    driftY: -54,
    delay: 330,
    startScale: 0.54,
    peakScale: 2,
    endScale: 2.7,
  },
  {
    x: 1175,
    y: 720,
    scale: 0.74,
    rotation: -16,
    filter: "dense",
    driftX: 31,
    driftY: -36,
    delay: 160,
    startScale: 0.46,
    peakScale: 1.84,
    endScale: 2.5,
  },
  {
    x: 1450,
    y: 790,
    scale: 0.56,
    rotation: 7,
    filter: "soft",
    driftX: -42,
    driftY: -48,
    delay: 470,
    startScale: 0.5,
    peakScale: 1.93,
    endScale: 2.64,
  },
];

function OrganicCloud({
  cloud,
}: {
  cloud: CloudSpec;
}) {
  const style = {
    "--drift-x": `${cloud.driftX}px`,
    "--drift-y": `${cloud.driftY}px`,
    "--start-scale": cloud.startScale,
    "--peak-scale": cloud.peakScale,
    "--end-scale": cloud.endScale,
    animationDelay: `${cloud.delay}ms`,
  } as CSSProperties;

  const filterId =
    cloud.filter === "soft"
      ? "cloudOrganicSoft"
      : cloud.filter === "medium"
        ? "cloudOrganicMedium"
        : "cloudOrganicDense";

  const fillId =
    cloud.filter === "dense"
      ? "cloudFillDense"
      : "cloudFillSoft";

  return (
    <g
      transform={`translate(${cloud.x} ${cloud.y}) rotate(${cloud.rotation}) scale(${cloud.scale})`}
    >
      <g
        className="organic-cloud"
        style={style}
      >
        <g filter={`url(#${filterId})`}>
          {/* MASA PRINCIPAL */}
          <ellipse
            cx="0"
            cy="0"
            rx="235"
            ry="125"
            fill={`url(#${fillId})`}
          />

          {/* VOLUMEN SUPERIOR IZQUIERDO */}
          <ellipse
            cx="-105"
            cy="-55"
            rx="130"
            ry="105"
            fill={`url(#${fillId})`}
          />

          {/* VOLUMEN SUPERIOR */}
          <ellipse
            cx="15"
            cy="-82"
            rx="150"
            ry="120"
            fill={`url(#${fillId})`}
          />

          {/* VOLUMEN DERECHO */}
          <ellipse
            cx="145"
            cy="-20"
            rx="135"
            ry="95"
            fill={`url(#${fillId})`}
          />

          {/* VOLUMEN INFERIOR */}
          <ellipse
            cx="45"
            cy="70"
            rx="175"
            ry="85"
            fill={`url(#${fillId})`}
          />

          {/* PEQUEÑA IRREGULARIDAD LATERAL */}
          <ellipse
            cx="-175"
            cy="30"
            rx="95"
            ry="70"
            fill={`url(#${fillId})`}
          />
        </g>
      </g>
    </g>
  );
}

export default function CloudTransition() {
  return (
    <div
      className="cloud-transition pointer-events-none fixed inset-0 z-[99999999] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* =====================================
              NUBE LEJANA
              ===================================== */}

          <filter
            id="cloudOrganicSoft"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.011"
              numOctaves={4}
              seed={23}
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={62}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation={20}
            />
          </filter>

          {/* =====================================
              NUBE MEDIA
              ===================================== */}

          <filter
            id="cloudOrganicMedium"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.015"
              numOctaves={5}
              seed={51}
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={76}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation={15}
            />
          </filter>

          {/* =====================================
              NUBE CERCANA
              ===================================== */}

          <filter
            id="cloudOrganicDense"
            x="-130%"
            y="-130%"
            width="360%"
            height="360%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.013 0.019"
              numOctaves={5}
              seed={87}
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={88}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation={12}
            />
          </filter>

          {/* =====================================
              TRANSPARENCIA DE NUBE SUAVE
              ===================================== */}

          <radialGradient id="cloudFillSoft">
            <stop
              offset="0%"
              stopColor="white"
              stopOpacity="0.97"
            />

            <stop
              offset="34%"
              stopColor="white"
              stopOpacity="0.9"
            />

            <stop
              offset="61%"
              stopColor="white"
              stopOpacity="0.58"
            />

            <stop
              offset="82%"
              stopColor="white"
              stopOpacity="0.18"
            />

            <stop
              offset="100%"
              stopColor="white"
              stopOpacity="0"
            />
          </radialGradient>

          {/* =====================================
              TRANSPARENCIA DE NUBE DENSA
              ===================================== */}

          <radialGradient id="cloudFillDense">
            <stop
              offset="0%"
              stopColor="white"
              stopOpacity="1"
            />

            <stop
              offset="39%"
              stopColor="white"
              stopOpacity="0.96"
            />

            <stop
              offset="65%"
              stopColor="white"
              stopOpacity="0.68"
            />

            <stop
              offset="85%"
              stopColor="white"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="white"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* DISTRIBUCIÓN IRREGULAR */}
        {clouds.map((cloud, index) => (
          <OrganicCloud
            key={index}
            cloud={cloud}
          />
        ))}
      </svg>

      {/* =====================================
          NIEBLA IRREGULAR

          Ya no nace exactamente del centro.
          Son distintas masas superpuestas.
          ===================================== */}

      <div className="cloud-mist absolute inset-0" />

      {/* LUZ DEL MOMENTO DE TRANSICIÓN */}
      <div className="cloud-light absolute inset-0" />

      <style jsx global>{`
        .cloud-transition {
          animation: cloudTransitionEnd
            4300ms linear both;
        }

        /*
          Cada nube tiene tamaño,
          posición, tiempo y dirección
          diferentes.

          Todas avanzan lentamente
          hacia cámara.
        */

        .organic-cloud {
          transform-box: fill-box;
          transform-origin: center center;

          opacity: 0;

          will-change:
            transform,
            opacity;

          animation:
            organicCloudApproach
            3830ms
            linear
            both;
        }

        @keyframes organicCloudApproach {
          0% {
            opacity: 0;

            transform:
              translate3d(
                calc(
                  var(--drift-x) *
                    -0.35
                ),
                calc(
                  var(--drift-y) *
                    -0.35
                ),
                0
              )
              scale(
                var(--start-scale)
              );
          }

          15% {
            opacity: 0.05;
          }

          30% {
            opacity: 0.28;
          }

          46% {
            opacity: 0.68;
          }

          58% {
            opacity: 0.96;

            transform:
              translate3d(
                calc(
                  var(--drift-x) *
                    0.35
                ),
                calc(
                  var(--drift-y) *
                    0.35
                ),
                0
              )
              scale(
                var(--peak-scale)
              );
          }

          65% {
            opacity: 1;
          }

          74% {
            opacity: 0.92;
          }

          84% {
            opacity: 0.58;
          }

          93% {
            opacity: 0.2;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                var(--drift-x),
                var(--drift-y),
                0
              )
              scale(
                var(--end-scale)
              );
          }
        }

        /*
          NIEBLA DE FUSIÓN.

          Usamos varios centros distintos
          para que tampoco parezca una
          mancha circular centrada.
        */

        .cloud-mist {
          background:
            radial-gradient(
              ellipse at 31% 54%,
              rgba(
                255,
                255,
                255,
                0.96
              )
                0%,
              rgba(
                255,
                255,
                255,
                0.68
              )
                24%,
              rgba(
                255,
                255,
                255,
                0
              )
                61%
            ),
            radial-gradient(
              ellipse at 66% 43%,
              rgba(
                255,
                255,
                255,
                0.94
              )
                0%,
              rgba(
                255,
                255,
                255,
                0.62
              )
                27%,
              rgba(
                255,
                255,
                255,
                0
              )
                64%
            ),
            radial-gradient(
              ellipse at 53% 72%,
              rgba(
                255,
                255,
                255,
                0.86
              )
                0%,
              rgba(
                255,
                255,
                255,
                0.46
              )
                29%,
              rgba(
                255,
                255,
                255,
                0
              )
                67%
            );

          filter: blur(72px);

          animation:
            irregularCloudMist
            4300ms
            linear
            both;
        }

        @keyframes irregularCloudMist {
          0% {
            opacity: 0;
            transform:
              translate3d(
                -2%,
                2%,
                0
              )
              scale(0.65);
          }

          39% {
            opacity: 0;
          }

          49% {
            opacity: 0.12;
          }

          56% {
            opacity: 0.5;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(0.95);
          }

          62% {
            opacity: 0.94;
          }

          66% {
            opacity: 1;

            transform:
              translate3d(
                1%,
                -1%,
                0
              )
              scale(1.35);
          }

          72% {
            opacity: 0.84;
          }

          80% {
            opacity: 0.42;
          }

          90% {
            opacity: 0.08;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                3%,
                -2%,
                0
              )
              scale(1.85);
          }
        }

        /*
          BLANCO MUY SUAVE.

          Solo disimula el instante
          en el que cambia la pantalla.
        */

        .cloud-light {
          background: white;

          animation:
            cloudLight
            4300ms
            linear
            both;
        }

        @keyframes cloudLight {
          0% {
            opacity: 0;
          }

          55% {
            opacity: 0;
          }

          61% {
            opacity: 0.04;
          }

          65% {
            opacity: 0.13;
          }

          70% {
            opacity: 0.05;
          }

          76% {
            opacity: 0;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes cloudTransitionEnd {
          0% {
            opacity: 1;
          }

          96% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}