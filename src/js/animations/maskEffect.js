import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { EffectFade } from "swiper/modules";
import { createSplitTextAnamition } from "./textEffects";

gsap.registerPlugin(ScrollTrigger);

const PAUSE_DURATION = 2; // PAUSE_DURATION + backward animation duration = 3s
const PROGRESS_SLIDER_TRIGGER_MOBILE = 0.15; // from 0 to 1
const PROGRESS_SLIDER_TRIGGER_DESK = 0.35; // from 0 to 1
const isMobile = window.innerWidth < 1054;

export const initMaskEffect = (selector) => {
  if (!selector) return;
  const elements = document.querySelectorAll(selector);

  let progressSliderTrigger = isMobile
    ? PROGRESS_SLIDER_TRIGGER_MOBILE
    : PROGRESS_SLIDER_TRIGGER_DESK;

  elements.forEach((el) => {
    let isSwiperActive = false;
    let autoplayTimeout = null;

    const swiper = new Swiper(el.querySelector(".swiper"), {
      modules: [EffectFade],
      effect: "fade",
      rewind: true,
      speed: 750,
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: true,
    });

    gsap.to(el, {
      maskSize: "300vh",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: isMobile ? "+=1000vh" : "+=2000vh",
        pin: true,
        scrub: 0.5,
        // markers: true,
        onUpdate: ({ progress }) => {
          if (!isSwiperActive && progress >= progressSliderTrigger) {
            isSwiperActive = true;
            startAutoplay(swiper);
          } else if (progress < progressSliderTrigger && isSwiperActive) {
            isSwiperActive = false;
            stopAutoplay();
          }
        },
      },
    });

    function startAutoplay(swiper) {
      const currentSlide = swiper.slides[swiper.activeIndex];
      animateSlide(currentSlide).then(() => {
        if (!swiper.el || !isSwiperActive) return;

        swiper.slideNext();

        autoplayTimeout = setTimeout(() => {
          startAutoplay(swiper);
        }, 0);
      });
    }

    function stopAutoplay() {
      clearTimeout(autoplayTimeout);
    }
  });
};

function animateSlide(slide) {
  return new Promise((resolve) => {
    const textElems = slide.querySelectorAll(".js-mask-effect-text");

    const tl = gsap.timeline({
      onComplete: () => resolve(),
    });

    textElems.forEach((el) => {
      gsap.set(el, {
        y: 0,
        opacity: 1,
      });

      createSplitTextAnamition(el, {});
    });

    // Pause between slides
    tl.to({}, { duration: PAUSE_DURATION });

    tl.to(textElems, {
      y: 10,
      opacity: 0,
    });
  });
}
