import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

const useScrollHandler = (
  chatContainerRef,
  isScrollingUp,
  setIsScrollingUp,
  setOffset
) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const container = chatContainerRef.current;
      if (!container) return;
      if (container.scrollTop <= 0 && !isScrollingUp) {
        setIsScrollingUp(true);
        setOffset((prevOffset) => prevOffset + 1);
      } else if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        setIsScrollingUp(false);
      }
    }, 200);

    const container = chatContainerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollingUp, chatContainerRef, setOffset, setIsScrollingUp]);
};

export default useScrollHandler;
