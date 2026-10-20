import { useEffect } from 'react';

/**
 * Scroll-reveal animation for elements with the 'data-reveal' attribute inside the container.
 * Optional 'data-delay' attribute sets the transition delay in milliseconds.
 *
 * Elements are visible in server-side rendered HTML. After mount, elements that are below the
 * fold get the hidden class, and the visible class is added when they scroll into view.
 * Nothing is animated if the user prefers reduced motion or IntersectionObserver is missing.
 *
 * @param {Object} containerRef React ref to the container element
 * @param {Object} classNames
 * @param {string} classNames.hiddenClassName class for the initial (hidden) state
 * @param {string} classNames.visibleClassName class for the revealed state
 */
const useReveal = (containerRef, { hiddenClassName, visibleClassName }) => {
  useEffect(() => {
    const container = containerRef?.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (!container || prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }
          const el = entry.target;
          observer.unobserve(el);
          el.style.transitionDelay = `${Number(el.dataset.delay || 0)}ms`;
          el.classList.add(visibleClassName);
        });
      },
      { threshold: 0.12 }
    );

    const elements = Array.from(container.querySelectorAll('[data-reveal]'));
    elements.forEach(el => {
      // Elements that are already visible on load are not animated
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add(hiddenClassName);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [containerRef, hiddenClassName, visibleClassName]);
};

export default useReveal;
