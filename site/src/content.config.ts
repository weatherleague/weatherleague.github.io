import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 블로그 글 모음 (Astro 5 content layer).
 *  category 세 종류 — 목록·상세의 배지 색이 여기서 갈린다.
 *   report = 데이터 리포트(우리 채점 기록으로 쓴 글) · release = 업데이트 노트 · notice = 공지 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    /** 주소(URL)는 파일 이름이 아니라 머리말의 slug로 정한다 (운영자 확정 2026-08-08).
     *  파일 이름은 한글·날짜로 둬서 찾기 쉽게 하고, 밖으로 나가는 주소만 영문으로 만든다.
     *  이유 ① 한글 주소는 복사하면 %EB%8F%84… 로 깨져 카톡·문서 공유에 불리하다
     *       ② 주소가 제목에 묶여 있으면 나중에 제목을 다듬을 때 기존 링크가 전부 깨진다
     *          (GitHub Pages에는 옛 주소 → 새 주소 자동 전달 기능이 없다) */
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** 글 주소 — 영문 소문자·숫자·하이픈만. 예: 'heatwave-40c-forecast-check'
     *  ⚠ 필수다. 빠뜨리면 빌드가 실패한다 (한글 주소로 조용히 나가는 사고 방지).
     *  ⚠ 한 번 발행한 뒤에는 바꾸지 않는다 — 바꾸면 기존 링크가 죽는다. */
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '주소(slug)는 영문 소문자·숫자·하이픈만 쓸 수 있습니다'),
    category: z.enum(['report', 'release', 'notice']).default('report'),
    /** 목록 카드 썸네일 (선택) — public 기준 경로. 예: '/blog/heat-40.png'
     *  없으면 아래 stat 지표 칸이 대신 들어간다 (글마다 이미지를 만들 필요는 없다) */
    thumbnail: z.string().optional(),
    /** 목록 카드에 띄우는 한 줄 지표 (선택) — 예: "40.0°" */
    stat: z.string().optional(),
    statLabel: z.string().optional(),
    /** 주간 리그 순위 그래프 (선택) — 있으면 본문 위에 고정 형태로 그려진다.
     *  ⚠ 모양·색·정렬은 레이아웃이 정한다. 여기엔 **숫자만** 넣는다
     *  (주간 연재가 매번 같은 모습이어야 해서 — CTA와 같은 원칙). */
    league: z
      .object({
        caption: z.string(),
        /** 내림차순으로 넣는다. value = 0~100 적중률 % */
        rows: z.array(z.object({ name: z.string(), value: z.number() })).min(2),
      })
      .optional(),
    /** 글 끝 "데이터 기준" 블록 (선택) — 고정 문구는 레이아웃이 갖고 있고
     *  글마다 달라지는 것(기간·표본·이번 글만의 단서)만 여기서 준다. */
    source: z
      .object({
        period: z.string(),
        scope: z.string(),
        /** 이 글에만 해당하는 단서. 한 줄에 하나씩 */
        notes: z.array(z.string()).default([]),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
