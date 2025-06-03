
// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 tracking ID

// Initialize Google Analytics
export const initGA = () => {
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific event trackers for the yoga platform
export const trackClassBooking = (classId: string, className: string, instructorName: string) => {
  trackEvent('book_class', 'engagement', `${className} - ${instructorName}`, 1);
};

export const trackTeacherSignup = (studioName: string) => {
  trackEvent('teacher_signup', 'conversion', studioName, 1);
};

export const trackStudioVisit = (subdomain: string) => {
  trackEvent('studio_visit', 'engagement', subdomain, 1);
};

export const trackContactForm = (studioName: string) => {
  trackEvent('contact_form', 'engagement', studioName, 1);
};
