import 'server-only';

// Type definitions for our dictionaries
type DictionaryType = typeof import('./dictionaries/ca.json');

const dictionaries = {
  ca: () => import('./dictionaries/ca.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'ca' | 'es'): Promise<DictionaryType> => {
  if (!dictionaries[locale]) {
    return dictionaries.ca();
  }
  return dictionaries[locale]();
}
