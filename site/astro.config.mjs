import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GitHub Pages 사용자 사이트(루트): https://weatherleague.github.io/
// 자체 도메인을 붙이는 날 site 값만 바꾸고 다시 빌드하면 된다.
export default defineConfig({
  site: 'https://weatherleague.github.io',
  // 사이트맵 = 검색엔진에 "우리 사이트에 이런 주소들이 있다"고 건네는 목록표.
  // 빌드할 때 전 페이지를 훑어 sitemap-index.xml + sitemap-0.xml 을 자동 생성한다
  // (글이 늘어도 손댈 일 없음). robots.txt 가 이 파일을 가리킨다.
  // ⚠ 초안(draft: true)은 애초에 페이지가 만들어지지 않으므로 목록에도 안 들어간다.
  // mdx = 글 안에서 그래프 같은 조각을 부를 수 있게 하는 확장 (2026-08-10).
  //   순위 변동 그래프처럼 **본문 중간**에 들어가야 하는 것은 레이아웃이 위치를 정할 수 없다.
  //   글은 계속 마크다운으로 쓰고, 조각이 필요한 글만 확장자를 .mdx 로 둔다 (.md도 그대로 동작).
  //   ⚠ astro 5 계열이라 @astrojs/mdx는 4.x를 쓴다 (최신 7.x는 astro 7 전용).
  integrations: [mdx(), sitemap()],
});
