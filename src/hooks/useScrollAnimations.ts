
import { useEffect, useRef } from 'react';

export const useScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );
    
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-parallax') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Update CSS custom property for other parallax effects
      document.documentElement.style.setProperty('--scroll-y', `${scrolled * 0.5}px`);
    };

    // Sticky navigation
    const handleStickyNav = () => {
      const stickyNav = document.querySelector('.sticky-nav');
      if (stickyNav) {
        if (window.scrollY > 100) {
          stickyNav.classList.add('visible');
        } else {
          stickyNav.classList.remove('visible');
        }
      }
    };

    // Scroll progress indicator
    const updateScrollProgress = () => {
      const scrollProgress = document.querySelector('.scroll-progress') as HTMLElement;
      if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      }
    };

    const handleScrollEffects = () => {
      handleScroll();
      handleStickyNav();
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScrollEffects, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollEffects);
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    observerRef
  };
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};
