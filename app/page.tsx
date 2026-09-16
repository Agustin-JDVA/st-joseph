"use client";

import { useState } from "react";

import Hero from "./components/Hero";
import RenderGallery from "./components/RenderGallery";
import Plans from "./components/Plans";
import ProjectInfo from "./components/ProjectInfo";
import ShareSection from "./components/ShareSection";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import AutoSectionSnap from "./components/AutoSectionSnap";
import RotateDeviceOverlay from "./components/RotateDeviceOverlay";
import CloudTransition from "./components/CloudTransition";

export default function Home() {
  const [hasEntered, setHasEntered] =
    useState(false);

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(false);

  const handleEnterProject = () => {
    if (isTransitioning) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setIsTransitioning(true);

    /*
      EL INTERIOR APARECE 2 SEGUNDOS
      ANTES DE TERMINAR LA TRANSICIÓN.
    */
    window.setTimeout(() => {
      setHasEntered(true);
    }, 2300);

    /*
      FIN DE LA TRANSICIÓN.
    */
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 4300);
  };

  const handleExitProject = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setIsTransitioning(false);
    setHasEntered(false);
  };

  return (
    <>
      <RotateDeviceOverlay />

      {/* LOGO EN PORTADA */}
      {!hasEntered && (
        <div
          className={`transition-opacity duration-700 ${
            isTransitioning
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <Logo />
        </div>
      )}

      {/* INTERFAZ INTERIOR */}
      {hasEntered && (
        <>
          <AutoSectionSnap />

          <Menu
            onExitProject={
              handleExitProject
            }
          />

          <Logo projectMode />
        </>
      )}

      {/* INICIO */}
      <Hero
        introMode={!hasEntered}
        isEntering={isTransitioning}
        onEnter={handleEnterProject}
      />

      {/* CONTENIDO */}
      {hasEntered && (
        <>
          <ProjectInfo />

          <RenderGallery />

          <Plans />

          <ShareSection />
        </>
      )}

      {/* NUBES */}
      {isTransitioning && (
        <CloudTransition />
      )}
    </>
  );
}