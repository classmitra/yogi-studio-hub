
import { useEffect, useRef } from 'react';

export const useScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered delay for elements
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
      '.fade-in-minimal, .slide-up-minimal, .stagger-in'
    );
    
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Enhanced parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      const mediumRate = scrolled * -0.5;
      const fastRate = scrolled * -0.8;

      // Update CSS custom properties for parallax effects
      document.documentElement.style.setProperty('--scroll-y-slow', `${rate}px`);
      document.documentElement.style.setProperty('--scroll-y-medium', `${mediumRate}px`);
      document.documentElement.style.setProperty('--scroll-y-fast', `${fastRate}px`);

      // Section background transitions
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const sectionType = section.getAttribute('data-section');
          document.body.className = document.body.className.replace(/section-\w+/g, '');
          document.body.classList.add(`section-${sectionType}`);
        }
      });
    };

    // Sticky navigation with fade
    const handleStickyNav = () => {
      const stickyNav = document.querySelector('.sticky-nav-minimal');
      if (stickyNav) {
        if (window.scrollY > 200) {
          stickyNav.classList.add('visible');
        } else {
          stickyNav.classList.remove('visible');
        }
      }
    };

    // Scroll progress indicator
    const updateScrollProgress = () => {
      const scrollProgress = document.querySelector('.scroll-progress-minimal') as HTMLElement;
      if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight);
        scrollProgress.style.transform = `scaleX(${scrollPercent})`;
      }
    };

    // Horizontal scroll handling
    const handleHorizontalScroll = () => {
      const horizontalSections = document.querySelectorAll('.horizontal-scroll');
      horizontalSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Add scroll snap behavior
          section.scrollBehavior = 'smooth';
        }
      });
    };

    const handleAllScrollEffects = () => {
      handleScroll();
      handleStickyNav();
      updateScrollProgress();
      handleHorizontalScroll();
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleAllScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Add scroll progress indicator to page
    if (!document.querySelector('.scroll-progress-minimal')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-minimal';
      document.body.appendChild(progressBar);
    }

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      observerRef.current?.disconnect();
      
      // Clean up progress bar
      const existingBar = document.querySelector('.scroll-progress-minimal');
      if (existingBar) {
        existingBar.remove();
      }
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

// Hook for staggered animations
export const useStaggeredAnimation = (delay = 100) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    Array.from(children).forEach((child, index) => {
      (child as HTMLElement).style.animationDelay = `${index * delay}ms`;
    });
  }, [delay]);

  return ref;
};
