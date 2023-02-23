import { gsap } from "gsap";

const tl = gsap.timeline({
  defaults: {
    duration: 1.0,
    ease: "expo.inOut",
  },
});

tl.to(".slide-1", { width: 0 }).to("#introduction", { height: 0 });
