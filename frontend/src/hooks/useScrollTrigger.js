import { useEffect, useState } from "react";
import throttle from "@/utils/throttle";

const useScrollTrigger = ({
  triggerDistanceY = 100,
  triggerTimeout = 50,
  initialIsTriggered = false,
}) => {
  const [isTriggered, setIsTriggered] = useState(initialIsTriggered);

  useEffect(() => {
    const checkIsScrolled = throttle(function () {
      if (window.scrollY > triggerDistanceY) return setIsTriggered(true);
      setIsTriggered(false);
    }, triggerTimeout);

    checkIsScrolled();
    window.addEventListener("scroll", checkIsScrolled);

    return () => window.removeEventListener("scroll", checkIsScrolled);
  }, []);

  return {
    isTriggered,
    setIsTriggered,
  };
};

export default useScrollTrigger;
