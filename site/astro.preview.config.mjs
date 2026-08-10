import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/** 미리보기(dev) 빌드 전용 설정 — `npm run build:preview`
 *
 *  왜 있나 (운영자 요청 2026-08-10): 초안은 본 사이트에 안 나오는데, 그러면 운영자가
 *  발행 전에 실물을 볼 방법이 없다. 그래서 **초안까지 포함한 사본**을 같은 사이트의
 *  /preview/ 아래에 따로 올린다. 주소 하나만 열면 언제든 확인할 수 있다.
 *
 *  본 빌드와 갈리는 지점은 세 가지뿐이다:
 *   ① base = /preview     — 이 값이 "미리보기 빌드"의 유일한 신호다.
 *                           초안 포함 여부(lib/posts.ts)·noindex(Base.astro)가 이걸 보고 갈린다.
 *                           별도 환경변수를 두지 않은 이유 = 윈도우/리눅스에서 설정법이 갈려
 *                           또 하나의 "한쪽만 고치는" 짝이 생기기 때문(불변 원칙 13).
 *   ② outDir = dist-preview — 본 빌드 산출물(dist)을 덮지 않는다.
 *   ③ 사이트맵 없음        — 미리보기는 검색에 절대 노출되면 안 된다.
 *                           robots.txt의 Disallow + 각 페이지 noindex와 3중으로 막는다.
 */
export default defineConfig({
  site: 'https://weatherleague.kr',
  base: '/preview',
  outDir: './dist-preview',
  // ⚠ mdx는 본 빌드와 **반드시 같이** 들고 있어야 한다 — 빠지면 .mdx 글이
  //   미리보기에서만 안 나온다(확인하려고 만든 사본이 확인을 못 하는 상태가 된다).
  integrations: [mdx()],
});
