import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const createSplitTextAnamition = (el, animationOptions, onReady) => {
  SplitText.create(el, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      const animation = gsap.from(self.lines, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        ...animationOptions,
      });

      onReady?.(animation);
      return animation;
    },
  });
};

// =============================================
// Up Mask Effect
// =============================================
export const initInlineUpTextEffects = (selector) => {
  if (!selector) return;
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    createSplitTextAnamition(el, {
      scrollTrigger: {
        trigger: el,
        // markers: true,
        once: true,
      },
    });
  });
};

// =============================================
// inline text effect
// =============================================
export const initInlineTextEffects = (selector) => {
  if (!selector) return;
  const elements = document.querySelectorAll(selector);

  const MASK_CLASS = "-text-mask";

  elements.forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      autoSplit: true,
      onSplit(self) {
        const masks = self.lines.map((line) => {
          const mask = document.createElement("span");
          mask.classList.add(MASK_CLASS);
          line.appendChild(mask);
          return mask;
        });

        return gsap.to(masks, {
          scaleX: 0,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom center",
            // markers: true,
            scrub: 1,
          },
        });
      },
    });
  });
};
