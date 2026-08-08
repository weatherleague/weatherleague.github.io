/** 블로그 카테고리 배지 라벨 — 목록·상세가 같은 값을 쓴다 (문구 복제 방지) */
export const CATEGORY = {
  report: '데이터 리포트',
  release: '업데이트 노트',
  notice: '공지',
} as const;

export type CategoryKey = keyof typeof CATEGORY;
