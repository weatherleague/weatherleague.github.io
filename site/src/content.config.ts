import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 블로그 글 모음 (Astro 5 content layer).
 *  category 세 종류 — 목록·상세의 배지 색이 여기서 갈린다.
 *   report = 데이터 리포트(우리 채점 기록으로 쓴 글) · release = 업데이트 노트 · notice = 공지 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['report', 'release', 'notice']).default('report'),
    /** 목록 카드 썸네일 (선택) — public 기준 경로. 예: '/blog/heat-40.png'
     *  없으면 아래 stat 지표 칸이 대신 들어간다 (글마다 이미지를 만들 필요는 없다) */
    thumbnail: z.string().optional(),
    /** 목록 카드에 띄우는 한 줄 지표 (선택) — 예: "40.0°" */
    stat: z.string().optional(),
    statLabel: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
