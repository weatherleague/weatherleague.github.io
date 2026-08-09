import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 사용자 사이트(루트): https://weatherleague.github.io/
// 자체 도메인을 붙이는 날 site 값만 바꾸고 다시 빌드하면 된다.
export default defineConfig({
  site: 'https://weatherleague.github.io',
  // 사이트맵 = 검색엔진에 "우리 사이트에 이런 주소들이 있다"고 건네는 목록표.
  // 빌드할 때 전 페이지를 훑어 sitemap-index.xml + sitemap-0.xml 을 자동 생성한다
  // (글이 늘어도 손댈 일 없음). robots.txt 가 이 파일을 가리킨다.
  // ⚠ 초안(draft: true)은 애초에 페이지가 만들어지지 않으므로 목록에도 안 들어간다.
  integrations: [sitemap()],
});
