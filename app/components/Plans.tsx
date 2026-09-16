"use client";

import { useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const plans = [
  {
    name: "Planta Baja",
    src: "/planos/planta baja.jpg",
  },
  {
    name: "Planta Alta",
    src: "/planos/planta alta.jpg",
  },
];

const sharedButtonStyle = `
  flex
  h-14
  w-[215px]
  items-center
  justify-center
  rounded-full
  bg-white
  font-[family:var(--font-wix)]
  text-[11px]
  font-medium
  uppercase
  tracking-[0.17em]
  text-black
  shadow-xl
  transition-all
  duration-200
  hover:scale-[1.02]
  active:scale-95
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
      {/* CONTROLES DE ZOOM EN ESCRITORIO */}
      {isDesktop && (
        <div className="pointer-events-auto absolute right-5 top-1/2 z-[9998] flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              zoomIn(0.4, 250)
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Acercar plano"
          >
            +
          </button>

          <button
            type="button"
            onClick={() =>
              zoomOut(0.4, 250)
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Alejar plano"
          >
            −
          </button>
        </div>
      )}

      {/* SALIR DEL PLANO - ABAJO */}
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
      document.getElementById("planos");

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

    const updateOrientation = () => {
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
    CUANDO EXPLORAMOS:
    - bloqueamos el scroll de la página
    - avisamos al menú superior para que desaparezca
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

  const currentPlan =
    plans[activePlan];

  return (
    <section
      id="planos"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <TransformWrapper
        key={`${activePlan}-${
          isPortrait
            ? "portrait"
            : "landscape"
        }-${
          isDesktop
            ? "desktop"
            : "touch"
        }`}
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit={true}

        /*
          EL PLANO NO PUEDE SALIR
          DE LOS LÍMITES DEL VISOR
        */
        limitToBounds={true}

        /*
          AL VOLVER A ESCALA 1
          EL PLANO SE CENTRA
        */
        centerZoomedOut={true}

        velocityAnimation={{
          disabled: true,
        }}

        wheel={{
          disabled:
            !isDesktop ||
            !isExploring,
          step: 0.15,
        }}

        doubleClick={{
          disabled:
            !isDesktop ||
            !isExploring,
          mode: "reset",
          animationTime: 400,
        }}

        panning={{
          disabled: !isExploring,
          velocityDisabled: true,
        }}

        pinch={{
          disabled: !isExploring,
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

      {/* BOTÓN EXPLORAR */}
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

      {/* SELECTOR DE PLANTAS */}
      {!isExploring && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-[9998] flex -translate-x-1/2 items-center gap-3 sm:bottom-10">
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
                className={`pointer-events-auto min-w-[150px] whitespace-nowrap rounded-full px-9 py-3 font-[family:var(--font-wix)] text-[10px] font-medium uppercase tracking-[0.14em] shadow-lg transition-all duration-300 sm:min-w-[170px] sm:px-10 sm:text-[11px] ${
                  activePlan ===
                  index
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {plan.name}
              </button>
            )
          )}
        </div>
      )}

      <style jsx global>{`
        .plan-wrapper {
          width: 100% !important;
          height: 100% !important;

          overflow: hidden !important;

          touch-action: pan-y;
        }

        .plan-wrapper.plan-exploring {
          cursor: grab !important;

          touch-action: none !important;
        }

        .plan-wrapper.plan-exploring:active {
          cursor: grabbing !important;
        }

        .plan-content {
          display: flex !important;

          align-items: center;
          justify-content: center;
        }

        /*
          HORIZONTAL
        */

        @media (orientation: landscape) {
          .plan-content {
            width: 100vw !important;
            height: 100vh !important;
          }

          .plan-image {
            width: 100vw;
            height: auto;

            max-width: none;

            user-select: none;
            -webkit-user-select: none;
            -webkit-user-drag: none;
          }
        }

        /*
          VERTICAL
        */

        @media (orientation: portrait) {
          .plan-content {
            width: max-content !important;
            height: 100vh !important;
          }

          .plan-image {
            width: auto;
            height: 100vh;

            max-width: none;
            max-height: none;

            user-select: none;
            -webkit-user-select: none;
            -webkit-user-drag: none;
          }
        }
      `}</style>
    </section>
  );
}