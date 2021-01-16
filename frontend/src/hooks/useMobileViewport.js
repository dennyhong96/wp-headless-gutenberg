import { useEffect } from "react";

import throttle from "@/utils/throttle";

const useMobileViewport = () => {
  useEffect(() => {
    const resizeViewport = throttle(function () {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${viewportHeight / 100}px`);
    }, 100);
    resizeViewport();

    window.addEventListener("resize", resizeViewport);

    return () => window.removeEventListener("resize", resizeViewport);
  }, []);

  return null;
};

export default useMobileViewport;
