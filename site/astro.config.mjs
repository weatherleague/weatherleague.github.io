import { defineConfig } from 'astro/config';

// GitHub Pages 사용자 사이트(루트): https://weatherleague.github.io/
// 자체 도메인을 붙이는 날 site 값만 바꾸고 다시 빌드하면 된다.
export default defineConfig({
  site: 'https://weatherleague.github.io',
});
