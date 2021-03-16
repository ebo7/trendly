export const particlesOptions = {
  particles: {
    number: {
      value: 40,
      // density: {
      //   enable: false,
      // },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 3,
        size_min: 0.3,
      },
    },
    move: {
      random: true,
      speed: 1,
      direction: "top",
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};
