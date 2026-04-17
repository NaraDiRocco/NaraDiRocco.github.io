/**
 * Formatea una fecha en español argentino
 */
export function formatDate(date: Date, locale = 'es-AR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formatea una fecha de forma corta (ej: "15 ene 2026")
 */
export function formatDateShort(date: Date, locale = 'es-AR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Convierte un string a slug URL-friendly
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Trunca un texto a N caracteres sin cortar palabras
 */
export function truncate(str: string, length = 150): string {
  if (str.length <= length) return str;
  return str.slice(0, str.lastIndexOf(' ', length)) + '...';
}

/**
 * Combina clases CSS condicionalmente (utilidad para Tailwind)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
