
// SEO utilities for dynamic meta tags and structured data

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const updateSEO = (data: SEOData) => {
  // Update title
  document.title = data.title;

  // Update or create meta tags
  updateMetaTag('description', data.description);
  if (data.keywords) updateMetaTag('keywords', data.keywords);

  // Open Graph tags
  updateMetaTag('og:title', data.title, 'property');
  updateMetaTag('og:description', data.description, 'property');
  updateMetaTag('og:type', data.type || 'website', 'property');
  if (data.image) updateMetaTag('og:image', data.image, 'property');
  if (data.url) updateMetaTag('og:url', data.url, 'property');

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', data.title, 'name');
  updateMetaTag('twitter:description', data.description, 'name');
  if (data.image) updateMetaTag('twitter:image', data.image, 'name');

  // Article specific tags
  if (data.author) updateMetaTag('article:author', data.author, 'property');
  if (data.publishedTime) updateMetaTag('article:published_time', data.publishedTime, 'property');
  if (data.modifiedTime) updateMetaTag('article:modified_time', data.modifiedTime, 'property');
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

export const generateStudioSEO = (instructor: any, subdomain: string): SEOData => {
  const studioName = instructor?.studio_name || subdomain;
  const description = instructor?.bio || `Join ${studioName} for online yoga classes. Book your session today.`;
  
  return {
    title: `${studioName} - Online Yoga Studio`,
    description,
    keywords: `yoga, online yoga, ${studioName}, yoga classes, meditation, wellness`,
    image: instructor?.profile_image_url,
    url: `${window.location.origin}/studio/${subdomain}`,
    type: 'profile',
    author: studioName,
  };
};

export const generateClassSEO = (classItem: any, instructor: any): SEOData => {
  return {
    title: `${classItem.title} - ${instructor.studio_name}`,
    description: classItem.description || `Join ${classItem.title} with ${instructor.studio_name}`,
    keywords: `yoga class, ${classItem.title}, ${classItem.category}, online yoga`,
    image: instructor?.profile_image_url,
    type: 'article',
    author: instructor.studio_name,
  };
};

// Structured data for SEO
export const generateStructuredData = (type: 'Organization' | 'Course' | 'Event', data: any) => {
  let structuredData: any = {};

  switch (type) {
    case 'Organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": data.studio_name,
        "description": data.bio,
        "url": `${window.location.origin}/studio/${data.subdomain}`,
        "logo": data.studio_logo_url,
        "contactPoint": {
          "@type": "ContactPoint",
          "email": data.contact_email,
          "contactType": "customer service"
        },
        "sameAs": [
          data.social_instagram,
          data.social_facebook,
          data.social_youtube
        ].filter(Boolean)
      };
      break;
    
    case 'Course':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": data.title,
        "description": data.description,
        "provider": {
          "@type": "Organization",
          "name": data.instructor_name
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "startDate": data.start_date,
          "duration": `PT${data.duration_minutes}M`,
          "courseMode": "online"
        }
      };
      break;
  }

  // Add or update structured data script
  let script = document.querySelector('#structured-data') as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(structuredData);
};
