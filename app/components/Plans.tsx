
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const plans = [
  {
    name: "Planta N1",
    src: "/planos/planta n1.jpg",
  },
  {
    name: "Planta Baja",
    src: "/planos/planta baja.jpg",
  },
  {
    name: "Planta N2 y N3",
    src: "/planos/planta n2 y n3.jpg",
  },
  {
    name: "Planta Azotea",
    src: "/planos/planta azotea.jpg",
  },
];

type ImageSize = {
  src: string;
  width: number;
  height: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type PlanLayout = {
  width: number;
  height: number;
};

const sharedButtonStyle = `
  plan-main-button
  flex h-14 w-[215px] items-center justify-center rounded-full bg-white
  font-[family:var(--font-wix)] text-[11px] font-medium uppercase
  tracking-[0.17em] text-black shadow-xl transition-all duration-200
  hover:scale-[1.02] active:scale-95
`;

const PlanControls = ({
  isExploring,
  isDesktop,
  onExit,
}: {
  isExploring: boolean;
  isDesktop: boolean;
  onExit: () => void;
}) => {
  const {
    zoomIn,
    zoomOut,
    resetTransform,
  } = useControls();

  if (!isExploring) return null;

  const handleExit = () => {
    resetTransform(300);
    onExit();
  };

  return (
    <>
      {isDesktop && (
        <div className="pointer-events-auto absolute right-5 top-1/2 z-[9998] flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              zoomIn(0.45, 250)
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Acercar plano"
          >
            +
          </button>

          <button
            type="button"
            onClick={() =>
              zoomOut(0.45, 250)
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Alejar plano"
          >
            −
          </button>

          <button
            type="button"
            onClick={() =>
              resetTransform(300)
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white font-sans text-[24px] font-normal leading-none text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Centrar plano"
            title="Centrar plano"
          >
            ◎
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleExit}
        className={`pointer-events-auto fixed bottom-[calc(env(safe-area-inset-bottom)+24px)] left-1/2 z-[999999] -translate-x-1/2 ${sharedButtonStyle}`}
      >
        Salir del plano
      </button>
    </>
  );
};

const PlanImage = ({
  src,
  name,
  isExploring,
  isPortrait,
  planWrapperClass,
  layout,
}: {
  src: string;
  name: string;
  isExploring: boolean;
  isPortrait: boolean;
  planWrapperClass: string;
  layout: PlanLayout;
}) => {
  const { resetTransform } =
    useControls();

  useEffect(() => {
    if (isExploring) return;

    const section =
      document.getElementById(
        "planos"
      );

    if (!section) return;

    const centerPlan = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resetTransform(0);
        });
      });
    };

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            entry.isIntersecting &&
            entry.intersectionRatio >=
              0.25 &&
            !isExploring
          ) {
            centerPlan();
          }
        },
        {
          threshold: [
            0.25,
            0.5,
            0.75,
          ],
        }
      );

    observer.observe(section);

    const handleResize = () => {
      if (!isExploring) {
        centerPlan();
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    isExploring,
    resetTransform,
  ]);

  const handleImageLoad = () => {
    if (isExploring) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resetTransform(0);
      });
    });
  };

  return (
    <TransformComponent
      wrapperClass={
        planWrapperClass
      }
      contentClass="plan-content"
    >
      {/*
        ESCENARIO DEL PLANO.

        SUS DIMENSIONES YA FUERON
        CALCULADAS PARA CUBRIR
        TODA LA PANTALLA.

        LA LIBRERÍA UTILIZA ESTE
        TAMAÑO PARA CALCULAR
        LOS LÍMITES DE MOVIMIENTO.
      */}

      <div
        className="plan-stage"
        style={{
          width: layout.width,
          height: layout.height,
        }}
      >
        {isPortrait ? (
          <img
            src={src}
            alt={name}
            className="plan-image plan-image-portrait"
            style={{
              width: layout.height,
              height: layout.width,
            }}
            draggable={false}
            onLoad={handleImageLoad}
          />
        ) : (
          <img
            src={src}
            alt={name}
            className="plan-image"
            style={{
              width: layout.width,
              height: layout.height,
            }}
            draggable={false}
            onLoad={handleImageLoad}
          />
        )}
      </div>
    </TransformComponent>
  );
};

export default function Plans() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const [
    activePlan,
    setActivePlan,
  ] = useState(0);

  const [
    isPortrait,
    setIsPortrait,
  ] = useState(false);

  const [
    isDesktop,
    setIsDesktop,
  ] = useState(false);

  const [
    isExploring,
    setIsExploring,
  ] = useState(false);

  const [
    viewportSize,
    setViewportSize,
  ] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });

  const [
    imageSize,
    setImageSize,
  ] = useState<ImageSize | null>(
    null
  );

  const currentPlan =
    plans[activePlan];

  /*
    DETECTAMOS LA ORIENTACIÓN
    DEL DISPOSITIVO.
  */

  useEffect(() => {
    const orientationQuery =
      window.matchMedia(
        "(orientation: portrait)"
      );

    const desktopQuery =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      );

    const updateOrientation =
      () => {
        setIsPortrait(
          orientationQuery.matches
        );
      };

    const updateDesktop = () => {
      setIsDesktop(
        desktopQuery.matches
      );

      setIsExploring(false);
    };

    updateOrientation();
    updateDesktop();

    orientationQuery.addEventListener(
      "change",
      updateOrientation
    );

    desktopQuery.addEventListener(
      "change",
      updateDesktop
    );

    return () => {
      orientationQuery.removeEventListener(
        "change",
        updateOrientation
      );

      desktopQuery.removeEventListener(
        "change",
        updateDesktop
      );
    };
  }, []);

  /*
    MEDIMOS EL ESPACIO REAL
    DISPONIBLE PARA EL PLANO.

    ESTO ES IMPORTANTE PARA
    PANTALLAS CUADRADAS,
    VERTICALES, HORIZONTALES
    Y CAMBIOS DE TAMAÑO.
  */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const updateViewportSize = () => {
      const width =
        section.clientWidth;

      const height =
        section.clientHeight;

      setViewportSize((previous) => {
        if (
          previous.width === width &&
          previous.height === height
        ) {
          return previous;
        }

        return {
          width,
          height,
        };
      });
    };

    updateViewportSize();

    const observer =
      new ResizeObserver(() => {
        updateViewportSize();
      });

    observer.observe(section);

    window.addEventListener(
      "resize",
      updateViewportSize
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateViewportSize
      );
    };
  }, []);

  /*
    LEEMOS LAS DIMENSIONES
    ORIGINALES DE CADA JPG.

    NO ASUMIMOS QUE TODAS LAS
    PLANTAS TIENEN LA MISMA
    PROPORCIÓN.
  */

  useEffect(() => {
    let cancelled = false;

    const image =
      new window.Image();

    const handleLoad = () => {
      if (cancelled) return;

      if (
        image.naturalWidth <= 0 ||
        image.naturalHeight <= 0
      ) {
        return;
      }

      setImageSize({
        src: currentPlan.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onload = handleLoad;

    image.src =
      currentPlan.src;

    if (
      image.complete &&
      image.naturalWidth > 0
    ) {
      handleLoad();
    }

    return () => {
      cancelled = true;
      image.onload = null;
    };
  }, [currentPlan.src]);

  /*
    CÁLCULO DE COBERTURA.

    EL PLANO DEBE CUBRIR
    SIMULTÁNEAMENTE:

    - TODO EL ANCHO.
    - TODO EL ALTO.

    UTILIZAMOS LA ESCALA
    MAYOR DE LAS DOS.

    DE ESTA MANERA NO QUEDAN
    FRANJAS BLANCAS CUANDO
    LA PANTALLA ES MÁS CUADRADA.

    EN VERTICAL INTERCAMBIAMOS
    ANCHO Y ALTO PORQUE EL JPG
    SE GIRA 90 GRADOS.
  */

  const calculatePlanLayout =
    (): PlanLayout | null => {
      if (
        !imageSize ||
        imageSize.src !==
          currentPlan.src ||
        viewportSize.width <= 0 ||
        viewportSize.height <= 0
      ) {
        return null;
      }

      const naturalWidth =
        isPortrait
          ? imageSize.height
          : imageSize.width;

      const naturalHeight =
        isPortrait
          ? imageSize.width
          : imageSize.height;

      const horizontalScale =
        viewportSize.width /
        naturalWidth;

      const verticalScale =
        viewportSize.height /
        naturalHeight;

      /*
        COVER:

        ELEGIMOS SIEMPRE
        LA ESCALA MAYOR.
      */

      const coverScale =
        Math.max(
          horizontalScale,
          verticalScale
        );

      /*
        PEQUEÑO MARGEN TÉCNICO
        PARA EVITAR LÍNEAS BLANCAS
        POR REDONDEO DE PÍXELES.
      */

      const safeScale =
        coverScale * 1.002;

      return {
        width: Math.ceil(
          naturalWidth * safeScale
        ),

        height: Math.ceil(
          naturalHeight * safeScale
        ),
      };
    };

  const planLayout =
    calculatePlanLayout();

  /*
    BLOQUEAMOS EL SCROLL
    DURANTE LA EXPLORACIÓN.
  */

  useEffect(() => {
    if (!isExploring) {
      document.body.classList.remove(
        "plan-exploring-active"
      );

      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.body.classList.add(
      "plan-exploring-active"
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.classList.remove(
        "plan-exploring-active"
      );
    };
  }, [isExploring]);

  const handleChangePlan = (
    index: number
  ) => {
    setIsExploring(false);

    setActivePlan(index);
  };

  const planWrapperClass =
    isExploring
      ? "plan-wrapper plan-exploring"
      : "plan-wrapper";

  /*
    POSICIÓN INICIAL:

    CENTRAMOS EL PLANO YA
    ESCALADO SOBRE LA PANTALLA.

    LAS PARTES QUE SOBRESALEN
    QUEDAN DISPONIBLES PARA
    EXPLORARLAS.
  */

  const initialPositionX =
    planLayout
      ? (viewportSize.width -
          planLayout.width) / 2
      : 0;

  const initialPositionY =
    planLayout
      ? (viewportSize.height -
          planLayout.height) / 2
      : 0;

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/*
        MIENTRAS SE CALCULAN
        LAS DIMENSIONES DEL JPG,
        MOSTRAMOS UNA VISTA
        PROVISIONAL CON COVER.
      */}

      {!planLayout && (
        <div className="plan-loading-preview">
          <img
            src={currentPlan.src}
            alt={currentPlan.name}
            className={
              isPortrait
                ? "plan-loading-image plan-loading-image-portrait"
                : "plan-loading-image"
            }
            draggable={false}
          />
        </div>
      )}

      {planLayout && (
        <TransformWrapper
          key={`${activePlan}-${isPortrait ? "portrait" : "landscape"}-${isDesktop ? "desktop" : "touch"}-${planLayout.width}-${planLayout.height}`}
          initialScale={1}
          minScale={1}
          maxScale={6}

          /*
            POSICIÓN INICIAL
            REALMENTE CENTRADA.
          */
          initialPositionX={
            initialPositionX
          }
          initialPositionY={
            initialPositionY
          }
          centerOnInit={false}

          /*
            NO PERMITIMOS QUE
            LOS BORDES DEL PLANO
            ENTREN MÁS ALLÁ DE
            LA PANTALLA.
          */
          disablePadding={true}
          limitToBounds={true}
          centerZoomedOut={false}

          velocityAnimation={{
            disabled: true,
          }}

          wheel={{
            disabled:
              !isDesktop ||
              !isExploring,
            step: 0.2,
          }}

          doubleClick={{
            disabled:
              !isExploring,
            mode: "reset",
            animationTime: 300,
          }}

          panning={{
            disabled:
              !isExploring,
            velocityDisabled: true,
          }}

          pinch={{
            disabled:
              !isExploring,
            allowPanning: true,
          }}
        >
          <PlanControls
            isExploring={
              isExploring
            }
            isDesktop={
              isDesktop
            }
            onExit={() =>
              setIsExploring(false)
            }
          />

          <PlanImage
            src={currentPlan.src}
            name={currentPlan.name}
            isExploring={
              isExploring
            }
            isPortrait={
              isPortrait
            }
            planWrapperClass={
              planWrapperClass
            }
            layout={planLayout}
          />
        </TransformWrapper>
      )}

      {!isExploring && (
        <div className="pointer-events-none absolute inset-0 z-[9997] flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              setIsExploring(true)
            }
            className={`pointer-events-auto ${sharedButtonStyle}`}
          >
            Explorar plano
          </button>
        </div>
      )}

      {!isExploring && (
        <div className="plan-selector-wrapper pointer-events-none absolute bottom-8 left-1/2 z-[9998] flex -translate-x-1/2 items-center gap-3 sm:bottom-10">
          {plans.map(
            (plan, index) => (
              <button
                key={plan.src}
                type="button"
                onClick={() =>
                  handleChangePlan(
                    index
                  )
                }
                className={`plan-selector-button pointer-events-auto whitespace-nowrap rounded-full font-[family:var(--font-wix)] font-medium uppercase shadow-lg transition-all duration-300 ${
                  activePlan ===
                  index
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                <span className="plan-selector-text">
                  {plan.name}
                </span>
              </button>
            )
          )}
        </div>
      )}

      <style jsx global>{`
        /*
          DESKTOP
        */

        .plan-selector-button {
          min-width: 145px;

          padding:
            12px 28px;
        }

        .plan-selector-text {
          font-size: 9px !important;

          line-height: 1 !important;

          letter-spacing:
            0.1em !important;
        }

        /*
          ÁREA VISIBLE DEL PLANO
        */

        .plan-wrapper {
          width: 100% !important;
          height: 100% !important;

          overflow: hidden !important;

          touch-action: pan-y;
        }

        .plan-wrapper.plan-exploring {
          cursor: grab !important;

          touch-action: none !important;

          overscroll-behavior: none;
        }

        .plan-wrapper.plan-exploring:active {
          cursor: grabbing !important;
        }

        /*
          EL CONTENEDOR YA NO
          ESTÁ FIJADO A 100VW.

          DEJAMOS QUE TOME EL
          TAMAÑO REAL CALCULADO
          DEL ESCENARIO INTERIOR.

          ESTO ES FUNDAMENTAL PARA
          NO PERDER LOS LÍMITES
          CORRECTOS DE EXPLORACIÓN.
        */

        .plan-content {
          display: block !important;

          width: max-content !important;
          height: max-content !important;

          margin: 0 !important;
          padding: 0 !important;
        }

        /*
          ESCENARIO QUE CUBRE
          TODA LA PANTALLA.
        */

        .plan-stage {
          position: relative;

          display: block;

          flex: none;

          margin: 0 !important;
          padding: 0 !important;

          overflow: hidden;
        }

        /*
          IMAGEN ORIGINAL
        */

        .plan-image {
          display: block !important;

          max-width: none !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

          object-fit: fill;

          user-select: none;

          -webkit-user-select: none;
          -webkit-user-drag: none;

          pointer-events: none;
        }

        /*
          ROTACIÓN EN VERTICAL

          LA IMAGEN ORIGINAL
          INTERCAMBIA SUS MEDIDAS
          CON LAS DEL ESCENARIO.

          DESPUÉS GIRA -90 GRADOS
          Y OCUPA TODA SU SUPERFICIE.
        */

        .plan-image.plan-image-portrait {
          position: absolute !important;

          left: 0 !important;
          top: 100% !important;

          transform-origin:
            top left !important;

          transform:
            rotate(-90deg) !important;
        }

        /*
          VISTA PROVISIONAL
          DURANTE LA CARGA.
        */

        .plan-loading-preview {
          position: absolute;
          inset: 0;

          overflow: hidden;

          background: white;
        }

        .plan-loading-image {
          position: absolute;

          width: 100%;
          height: 100%;

          object-fit: cover;

          user-select: none;

          -webkit-user-drag: none;
        }

        .plan-loading-image-portrait {
          width: 100vh;
          height: 100vw;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%)
            rotate(-90deg);
        }

        /*
          MÓVILES Y PANTALLAS
          TÁCTILES CHICAS

          CONSERVAMOS LOS
          AJUSTES ANTERIORES.
        */

        @media (
          hover: none
        ) and (
          pointer: coarse
        ) and (
          max-width: 1024px
        ) {
          .plan-main-button {
            width: 160px !important;
            height: 39px !important;

            font-size: 8.5px !important;

            letter-spacing:
              0.12em !important;
          }

          .plan-selector-wrapper {
            bottom: 18px !important;

            gap: 4px !important;
          }

          .plan-selector-button {
            min-width: 0 !important;
            width: auto !important;

            height: 28px !important;

            padding:
              0 8px !important;

            display: flex !important;

            align-items: center !important;
            justify-content: center !important;
          }

          .plan-selector-text {
            font-size: 7.5px !important;

            line-height: 1 !important;

            letter-spacing:
              0.08em !important;
          }
        }

        /*
          CELULAR MUY ANGOSTO
        */

        @media (
          hover: none
        ) and (
          pointer: coarse
        ) and (
          max-width: 390px
        ) {
          .plan-selector-wrapper {
            gap: 3px !important;
          }

          .plan-selector-button {
            min-width: 0 !important;
            width: auto !important;

            height: 26px !important;

            padding:
              0 6px !important;
          }

          .plan-selector-text {
            font-size: 7.5px !important;
          }
        }

        /*
          CELULAR HORIZONTAL
        */

        @media (
          orientation: landscape
        ) and (max-height: 500px) {
          .plan-main-button {
            width: 155px !important;
            height: 37px !important;

            font-size: 8px !important;

            letter-spacing:
              0.12em !important;
          }

          .plan-selector-wrapper {
            bottom: 10px !important;

            gap: 4px !important;
          }

          .plan-selector-button {
            min-width: 0 !important;
            width: auto !important;

            height: 26px !important;

            padding:
              0 7px !important;

            display: flex !important;

            align-items: center !important;
            justify-content: center !important;
          }

          .plan-selector-text {
            font-size: 7px !important;

            line-height: 1 !important;

            letter-spacing:
              0.07em !important;
          }
        }
      `}</style>
    </section>
  );
}
