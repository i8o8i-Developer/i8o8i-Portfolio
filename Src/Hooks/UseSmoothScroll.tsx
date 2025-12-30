import { useCallback } from "react";

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
}

const easeOutQuad = (t: number): number => {
  return t * (2 - t);
};

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { offset = 80, duration = 200 } = options;

  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const startPosition = window.pageYOffset;
      const targetPosition = element.getBoundingClientRect().top + startPosition - offset;
      const distance = targetPosition - startPosition;
      
      if (Math.abs(distance) < 5) {
        window.scrollTo({ top: targetPosition, behavior: 'instant' });
        history.pushState(null, "", `#${elementId}`);
        return;
      }

      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);

        const currentPosition = startPosition + distance * easeProgress;
        window.scrollTo({ top: currentPosition, behavior: 'instant' });

        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo({ top: targetPosition, behavior: 'instant' });
          history.pushState(null, "", `#${elementId}`);
        }
      };

      requestAnimationFrame(animation);
    },
    [offset, duration]
  );

  const scrollToTop = useCallback(() => {
    const startPosition = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);

      const currentPosition = startPosition * (1 - easeProgress);
      window.scrollTo({ top: currentPosition, behavior: 'instant' });

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        history.pushState(null, "", window.location.pathname);
      }
    };

    requestAnimationFrame(animation);
  }, [duration]);

  return { scrollToElement, scrollToTop };
};