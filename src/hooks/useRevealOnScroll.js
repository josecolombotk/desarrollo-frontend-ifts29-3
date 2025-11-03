import { useEffect } from 'react';

/**
 * useRevealOnScroll
 * Aplica animación de aparición a elementos que entran/salen del viewport.
 * @param {string} selector - Query selector de los elementos a observar
 * @param {object} options - { threshold, rootMargin, stagger, once, initialClass, visibleClass }
 * @param {array} deps - Dependencias externas para re-inicializar observación (ej: longitud de lista)
 */
export function useRevealOnScroll(selector, options = {}, deps = []) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    stagger = 0,
    once = false,
    initialClass = 'reveal',
    visibleClass = 'visible',
  } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
            if (once) observer.unobserve(el);
          } else {
            if (!once) el.classList.remove(visibleClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el, index) => {
      el.classList.add(initialClass);
      if (stagger) {
        el.style.transitionDelay = `${index * stagger}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  // Incluye deps para reinicializar cuando cambie la lista/render
  }, [selector, threshold, rootMargin, stagger, once, initialClass, visibleClass, ...deps]);
}