import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
      end: `bottom bottom-=${sections[0].offsetHeight}`,
      // markers: true,
    });

    sections.forEach((section, index) => {
      const isLastSection = index === sections.length - 1;
      const isFirstSection = index === 0;

      const figuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          // markers: true,
          scrub: true,
          pin: true,
          pinSpacing: false,
          onEnter: () => updateColors(section),
          onEnterBack: () => updateColors(section),
        },
      });

      if (isFirstSection) {
        figuresTl
          .to(fig1, { rotate: 45, xPercent: 100 }, 0)
          .to(fig3, { rotate: -45, xPercent: -100 }, 0)
          .to(fig2, { opacity: 0, duration: 0.1 }, "-=0.1")
          .set(fig3, { opacity: 0 });
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

      // animate section inside blocks
      const textElems = section.querySelectorAll(
        ".js-figure-effect-text > div",
      );
      const showElems = () => {
        gsap.set(textElems, { opacity: 1 });
      };
      const textDuration = 0.5;

      gsap.set(textElems, { opacity: 0 });
      if (isFirstSection) {
        showElems();
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        // markers: true,
        onEnter: () => {
          if (isFirstSection) return;

          showElems();
          gsap.fromTo(
            textElems,
            { yPercent: 100 },
            { yPercent: 0, duration: textDuration },
          );
        },
        onLeave: () => {
          if (isLastSection) return;
          gsap.to(textElems, {
            yPercent: -100,
            duration: textDuration,
          });
        },
        onEnterBack: () => {
          if (isLastSection) return;
          gsap.fromTo(
            textElems,
            { yPercent: -100 },
            { yPercent: 0, duration: textDuration },
          );
        },
        onLeaveBack: () => {
          if (isFirstSection) return;
          gsap.to(textElems, {
            yPercent: 100,
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
