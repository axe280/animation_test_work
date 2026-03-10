import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createSplitTextAnamition } from "./textEffects";

gsap.registerPlugin(ScrollTrigger);

export const initMorfingFigures = () => {
  const moduleWrapper = document.querySelectorAll(".js-figures-pin");

  moduleWrapper.forEach((el) => {
    const figuresWrapper = el.querySelector(".js-figures");

    const fig1 = figuresWrapper.querySelector(".js-figure-1");
    const fig2 = figuresWrapper.querySelector(".js-figure-2");
    const fig3 = figuresWrapper.querySelector(".js-figure-3");

    const sections = el.querySelectorAll(".js-figures-section");

    ScrollTrigger.create({
      trigger: el,
      pin: figuresWrapper,
      end: "bottom bottom",
      // markers: true,
    });

    sections.forEach((section, index) => {
      const textElems = section.querySelectorAll(
        ".js-figure-effect-text > div",
      );

      const figuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          // markers: true,
          scrub: true,
          pin: index !== sections.length - 1,
          pinSpacing: false,
          onEnter: () => updateColors(section),
          onEnterBack: () => updateColors(section),
        },
      });

      if (index === 0) {
        figuresTl
          .to(fig1, { rotate: 45, xPercent: 100 }, 0)
          .to(fig3, { rotate: -45, xPercent: -100 }, 0)
          .to(fig2, { opacity: 0, duration: 0.1 }, "-=0.1")
          .set(fig3, { opacity: 0 });

        gsap.set(textElems, { y: 0, opacity: 1 });
      } else if (index === 1) {
        figuresTl
          .to({}, { duration: 0.2 })
          .set(fig1, { opacity: 0 })
          .set(fig3, { opacity: 1 })
          .to(fig3, {
            scaleX: 0.25,
            scaleY: 1.55,
            skewY: 45,
            rotate: 45,
            skewX: 7,
            y: -15,
          });
      }

      ScrollTrigger.refresh();

      const textDuration = 0.5;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        // markers: true,
        onEnter: () => {
          if (index === 0) return;

          gsap.fromTo(
            textElems,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: textDuration },
          );
        },
        onLeave: () => {
          gsap.to(textElems, {
            y: -100,
            opacity: 0,
            duration: textDuration,
          });
        },
        onEnterBack: () => {
          gsap.fromTo(
            textElems,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: textDuration },
          );
        },
        onLeaveBack: () => {
          if (index === 0) return;
          gsap.to(textElems, {
            y: 100,
            opacity: 0,
            duration: textDuration,
          });
        },
      });
    });
  });
};

function updateColors(section) {
  const { bg, textColor, figureBgColor } = section.dataset;
  bg && document.documentElement.style.setProperty("--figures-bg-color", bg);
  textColor &&
    document.documentElement.style.setProperty(
      "--figures-text-color",
      textColor,
    );
  figureBgColor &&
    document.documentElement.style.setProperty(
      "--figures-icon-color",
      figureBgColor,
    );
}
