import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const entries = await getCollection('field-notes');
  return rss({
    title: 'LongevityStack — Field Notes',
    description: 'N=1 sleep-thermoregulation experiments, one a month, raw data included.',
    site: context.site,
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.hypothesis || '',
      link: '/field-notes/' + e.id + '/',
    })),
  });
}
