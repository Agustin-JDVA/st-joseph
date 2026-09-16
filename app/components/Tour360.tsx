"use client";

import { useEffect, useState } from "react";

export default function Tour360() {
  const [isExploring, setIsExploring] = useState(false);

  useEffect(() => {
    if (!isExploring) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isExploring]);

  const buttonStyle = `
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

  return (
    <section
      id="tours"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* TOUR 360 CASA LUCIA Y ENANO */}
      <iframe
        src="https://kuula.co/share/collection/7TW1x?logo=1&info=1&fs=1&vr=0&thumbs=1"
        className={`absolute inset-0 h-full w-full border-0 ${
          isExploring
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        allowFullScreen
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        title="Tour 360° Casa Lucia y Enano"
      />

      {/* BOTÓN EXPLORAR */}
      {!isExploring && (
        <div className="pointer-events-none absolute inset-0 z-[9999] flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsExploring(true)}
            className={`pointer-events-auto ${buttonStyle}`}
          >
            Explorar 360°
          </button>
        </div>
      )}

      {/* BOTÓN SALIR */}
      {isExploring && (
        <button
          type="button"
          onClick={() => setIsExploring(false)}
          className={`
            pointer-events-auto
            fixed
            left-1/2
            top-[calc(env(safe-area-inset-top)+24px)]
            z-[999999]
            -translate-x-1/2
            ${buttonStyle}
          `}
        >
          Salir del 360°
        </button>
      )}
    </section>
  );
}