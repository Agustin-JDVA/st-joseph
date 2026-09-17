"use client";

import { useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const plans = [
  {
    name: "Planta Baja Tipo",
    src: "/planos/planta baja tipo.png",
  },
  {
    name: "Planta Baja",
    src: "/planos/planta baja.png",
  },
  {
    name: "Planta Azotea",
    src: "/planos/planta azotea.png",
  },
  {
    name: "Planta Subsuelo",
    src: "/planos/planta subsuelo.png",
  },
];

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
  planWrapperClass,
}: {
  src: string;
  name: string;
  isExploring: boolean;
  planWrapperClass: string;
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
      <img
        src={src}
        alt={name}
        className="plan-image"
        draggable={false}
        onLoad={handleImageLoad}
      />
    </TransformComponent>
  );
};

export default function Plans() {
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

  const currentPlan =
    plans[activePlan];

  return (
    <section
      id="planos"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <TransformWrapper
        key={`${activePlan}-${isPortrait ? "portrait" : "landscape"}-${isDesktop ? "desktop" : "touch"}`}
        initialScale={1}
        minScale={1}
        maxScale={6}
        disablePadding={true}
        limitToBounds={true}
        centerZoomedOut={false}
        centerOnInit={true}
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
          isDesktop={isDesktop}
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
          planWrapperClass={
            planWrapperClass
          }
        />
      </TransformWrapper>

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

        .plan-content {
          display: block !important;

          width: 100vw !important;
          height: auto !important;

          min-width: 100vw !important;

          margin: 0 !important;
          padding: 0 !important;
        }

        .plan-image {
          display: block !important;

          width: 100vw !important;
          height: auto !important;

          max-width: none !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

          object-fit: contain;

          user-select: none;

          -webkit-user-select: none;
          -webkit-user-drag: none;

          pointer-events: none;
        }

        /*
          MÓVILES Y PANTALLAS
          TÁCTILES CHICAS

          AHORA SÍ CAMBIAMOS
          EL TAMAÑO REAL DEL BOTÓN.
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