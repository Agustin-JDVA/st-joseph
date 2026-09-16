"use client";

import { useEffect, useState } from "react";

export default function RotateDeviceOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const orientationQuery = window.matchMedia(
      "(orientation: portrait)"
    );

    const touchQuery = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    );

    const updateState = () => {
      const isPortrait = orientationQuery.matches;
      const isTouchDevice = touchQuery.matches;

      setShowOverlay(
        isPortrait && isTouchDevice
      );
    };

    updateState();

    orientationQuery.addEventListener(
      "change",
      updateState
    );

    touchQuery.addEventListener(
      "change",
      updateState
    );

    window.addEventListener(
      "resize",
      updateState
    );

    window.addEventListener(
      "orientationchange",
      updateState
    );

    return () => {
      orientationQuery.removeEventListener(
        "change",
        updateState
      );

      touchQuery.removeEventListener(
        "change",
        updateState
      );

      window.removeEventListener(
        "resize",
        updateState
      );

      window.removeEventListener(
        "orientationchange",
        updateState
      );
    };
  }, []);

  useEffect(() => {
    if (!showOverlay) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[999999999] flex items-center justify-center bg-black px-8 text-white">
      <div className="flex flex-col items-center text-center">
        {/* DISPOSITIVO */}
        <div className="rotate-device-animation relative mb-12">
          <div className="relative h-[92px] w-[52px] rounded-[11px] border-[2px] border-white">
            {/* PARLANTE */}
            <div className="absolute left-1/2 top-[7px] h-[2px] w-[14px] -translate-x-1/2 rounded-full bg-white/70" />

            {/* BOTÓN INFERIOR */}
            <div className="absolute bottom-[6px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white/70" />
          </div>
        </div>

        {/* TEXTO */}
        <h2 className="font-[family:var(--font-wix)] text-[18px] font-semibold uppercase tracking-[0.12em] sm:text-[20px]">
          Girá tu dispositivo
        </h2>

        <p className="mt-4 max-w-[310px] font-[family:var(--font-wix)] text-[12px] font-normal leading-[1.6] tracking-[0.02em] text-white/70 sm:text-[13px]">
          Para disfrutar la experiencia completa del proyecto,
          te recomendamos navegar en posición horizontal.
        </p>

        {/* FLECHA */}
        <div className="rotation-arrow mt-10">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36 18C33.8 11.9 28.1 8 21.5 8C13 8 6 15 6 23.5C6 32 13 39 21.5 39C27.7 39 33.1 35.3 35.6 30"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M30 17.5L36.5 18.5L37.5 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .rotate-device-animation {
          transform-origin: center center;
          animation: rotateDevice 2.8s
            cubic-bezier(0.65, 0, 0.35, 1)
            infinite;
        }

        .rotation-arrow {
          opacity: 0.65;
          animation: arrowPulse 2.8s
            ease-in-out infinite;
        }

        @keyframes rotateDevice {
          0% {
            transform: rotate(0deg);
          }

          20% {
            transform: rotate(0deg);
          }

          55% {
            transform: rotate(90deg);
          }

          80% {
            transform: rotate(90deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes arrowPulse {
          0% {
            opacity: 0.35;
            transform: scale(0.95);
          }

          50% {
            opacity: 0.9;
            transform: scale(1);
          }

          100% {
            opacity: 0.35;
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}