import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEO = ({
  title = 'i8o8i | Anubhav Chaurasia - Backend Developer, AI/ML Engineer & Cybersecurity Expert',
  description = 'i8o8i (Anubhav Chaurasia) - Expert Backend Developer & AI/ML Engineer specializing in AI-powered distributed systems, quantum-resistant cryptography, blockchain, and production-scale applications. Creator of AgriSense Guardian serving 12,000+ farmers.',
  keywords = 'i8o8i, I8O8I, Anubhav Chaurasia, Backend Developer, Full Stack Developer, AI Engineer, Machine Learning Engineer, Python Developer, Django Developer, FastAPI, React Developer, TypeScript, AI, Machine Learning, Deep Learning, Blockchain Developer, Cryptography Expert, Quantum-Resistant Cryptography, Cybersecurity, Web3, Distributed Systems, Cloud Computing, DevOps, Software Engineer, Portfolio',
  image = 'https://i8o8i.vercel.app/Images/Favicon.jpg',
  url = 'https://i8o8i.vercel.app',
  type = 'website',
  author = 'Anubhav Chaurasia, i8o8i, I8O8I',
}: SEOProps) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Update Or Create Meta Tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Standard Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph Meta Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'i8o8i - Anubhav Chaurasia Portfolio', true);

    // Twitter Card Meta Tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:card', 'summary_large_image');

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  }, [title, description, keywords, image, url, type, author]);

  return null;
};

export default SEO;
