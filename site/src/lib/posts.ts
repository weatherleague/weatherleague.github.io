import { getCollection, type CollectionEntry } from 'astro:content';

/** 목록 한 페이지에 보여줄 글 수 */
export const PAGE_SIZE = 9;

/** 지금 만드는 것이 **미리보기 빌드**인가 (astro.preview.config.mjs — base가 /preview).
 *
 *  미리보기에서는 초안(draft: true)도 보여준다. 발행 전 실물 확인용이다.
 *  본 빌드에서는 base가 '/'라 항상 false → 초안이 새어 나갈 경로가 없다.
 *  ⚠ 초안 노출 여부를 판단하는 곳은 **여기 한 곳**이다 — 글 목록도 글 상세도 이 값을 쓴다.
 *    (두 곳에서 따로 판단하면 한쪽만 고쳐지는 사고가 난다 — 불변 원칙 13) */
export const SHOW_DRAFTS = import.meta.env.BASE_URL.replace(/\/$/, '') === '/preview';

/** 발행글을 최신순으로 (초안 draft: true는 제외 — 미리보기 빌드에서만 포함) */
export async function publishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => SHOW_DRAFTS || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
