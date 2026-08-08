import { getCollection, type CollectionEntry } from 'astro:content';

/** 목록 한 페이지에 보여줄 글 수 */
export const PAGE_SIZE = 9;

/** 발행글을 최신순으로 (초안 draft: true는 제외) */
export async function publishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
