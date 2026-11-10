import { useEffect, useState } from "react";

export const CAROUSEL_INTERVAL_MS = 4000;

let tick = 0;
let timer = null;
const listeners = new Set();

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    tick += 1;
    listeners.forEach((fn) => fn(tick));
  }, CAROUSEL_INTERVAL_MS);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export function useCarouselTick() {
  const [value, setValue] = useState(tick);

  useEffect(() => {
    listeners.add(setValue);
    startTimer();

    setValue(tick);

    return () => {
      listeners.delete(setValue);

      if (listeners.size === 0) stopTimer();
    };
  }, []);

  return value;
}
