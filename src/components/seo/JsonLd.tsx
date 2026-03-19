import React from 'react';

interface JsonLdProps {
  lang: string;
}

export const JsonLd: React.FC<JsonLdProps> = ({ lang }) => {
  const isCA = lang === 'ca';
  
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Nexa Digital',
    image: 'https://nexadigital.cat/logo.png',
    '@id': 'https://nexadigital.cat',
    url: 'https://nexadigital.cat',
    telephone: '+34699368895',
    email: 'nexainforma@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Reus',
      addressRegion: 'Tarragona',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.1554, // Approximate for Reus
      longitude: 1.1077,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [],
    areaServed: [
      { '@type': 'City', name: 'Reus' },
      { '@type': 'City', name: 'Tarragona' },
      { '@type': 'State', name: 'Catalunya' },
    ],
    description: isCA 
      ? "Especialistes en creació de webs i digitalització per a autònoms i pimes a Catalunya."
      : "Especialistas en creación de webs y digitalización para autónomos y pymes en Cataluña.",
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nexa Digital',
    url: 'https://nexadigital.cat',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nexadigital.cat/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};
