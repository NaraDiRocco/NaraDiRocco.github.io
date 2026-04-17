import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'MECOL ESTUDIO — Novedades Jurídicas',
    description: 'Análisis legislativos, jurisprudencia y artículos de opinión del equipo de MECOL ESTUDIO.',
    site: context.site ?? 'https://mecolestudio.com.ar',
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/novedades/${post.id}`,
    })),
    customData: '<language>es-ar</language>',
  });
}
