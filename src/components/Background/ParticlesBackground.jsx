import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback((container) => {
    // Particles loaded successfully
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent", // Let the CSS body color show through
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#22c55e", // Tailwind green-500 - subtle dark green
      },
      links: {
        color: "#22c55e",
        distance: 150,
        enable: true,
        opacity: 0.2, // Very faint lines
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.5, // VERY SLOW movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60, // Low density (sparse)
      },
      opacity: {
        value: 0.3, // Semi-transparent dots
        animation: {
          enable: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 1,
          max: 3,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      style={{ 
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;

