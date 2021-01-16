import { useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";

// Animation options
const animate = {
  "fade-in-left"(el, config = {}) {
    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      ease: "Power2.easeOut",
      delay: 0.1,
      ...config,
    });
  },
  "fade-in-right"(el, config = {}) {
    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      ease: "Power2.easeOut",
      delay: 0.1,
      ...config,
    });
  },
  "fade-in-up"(el, config = {}) {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "Power2.easeOut",
      delay: 0.1,
      ...config,
    });
  },
  "fade-in-down"(el, config = {}) {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "Power2.easeOut",
      delay: 0.1,
      ...config,
    });
  },
  "stagger-up"(el, config = {}) {
    gsap.to(el.querySelectorAll(".gsap-child-animate-stagger-up"), {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "Power2.easeOut",
      stagger: 0.2,
      delay: 0.1,
      ...config,
    });
  },
};

const useAnimation = () => {
  const router = useRouter();

  useEffect(() => {
    // Initialize elements positoin for animation
    document.querySelectorAll(".gsap").forEach((el) => {
      const action = [...el.classList].includes("gsap-parent")
        ? [...el.classList]
            .find((cl) => cl.startsWith("gsap-parent-animate-"))
            ?.split("gsap-parent-animate-")[1]
        : [...el.classList].find((cl) => cl.startsWith("gsap-animate-"))?.split("gsap-animate-")[1];

      switch (action) {
        case "fade-in-left":
          gsap.set(el, { x: -75, opacity: 0 });
          break;
        case "fade-in-right":
          gsap.set(el, { x: 75, opacity: 0 });
          break;
        case "fade-in-up":
          gsap.set(el, { y: 75, opacity: 0 });
          break;
        case "fade-in-down":
          gsap.set(el, { y: -75, opacity: 0 });
          break;
        case "stagger-up":
          gsap.set(el.querySelectorAll(".gsap-child-animate-stagger-up"), {
            y: 50,
            opacity: 0,
          });

        default:
          break;
      }
    });

    // Animate on intersection
    const animationObserver = new IntersectionObserver(
      function (entries, animationObserver) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // const gsapConfig = entry.target.dataset.gsapConfig;
            // const config = gsapConfig
            //   ? gsapConfig.split(";").reduce((acc, cur) => {
            //       const [key, val] = cur.split("=");
            //       return { ...acc, [key]: val };
            //     }, {})
            //   : {};

            const action = [...entry.target.classList].includes("gsap-parent")
              ? [...entry.target.classList]
                  .find((cl) => cl.startsWith("gsap-parent-animate-"))
                  ?.split("gsap-parent-animate-")[1]
              : [...entry.target.classList]
                  .find((cl) => cl.startsWith("gsap-animate-"))
                  ?.split("gsap-animate-")[1];
            animate[action]?.(entry.target);
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "-10%",
        threshold: 0,
      }
    );
    document.querySelectorAll(".gsap").forEach((el) => {
      animationObserver.observe(el);
    });
  }, [router.asPath]);

  return null;
};

export default useAnimation;
