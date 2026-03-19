import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexadigital.cat'
  const languages = ['ca', 'es']
  
  const staticRoutes = [
    '',
    '/serveis',
    '/casos-d-exit',
    '/avis-legal',
    '/politica-cookies',
    '/politica-privacitat',
    '/webs-corporatives-reus',
    '/webs-corporatives-tarragona',
    '/botigues-online-reus',
    '/botigues-online-tarragona',
  ]

  const serviceSlugs = [
    'webs-corporatives',
    'tiendas-online', // Wait, I should check the exact slugs in dictionaries
    'botigues-online',
    'landing-pages',
    'manteniment-web'
  ]

  const routes: MetadataRoute.Sitemap = []

  languages.forEach((lang) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
    
    // Static slugs for services (hardcoded here for simplicity, or we could import them)
    const slugs = [
      'webs-corporatives',
      'botigues-online',
      'landing-pages',
      'manteniment-web'
    ]
    
    slugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${lang}/serveis/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  return routes
}
