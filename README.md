# weatherleague.github.io — 웨더리그 웹 (랜딩 · 블로그 · 예보 순위)

- **소스는 `site/`** (Astro). 루트에 있는 HTML·에셋은 옛 수동 배포 시절의 산출물 커밋분이며,
  **2026-08-13부터 배포에 쓰이지 않는다** (되돌리기 안전판으로만 당분간 유지).
- **배포는 자동이다**: `site/**`를 main에 푸시하면 `.github/workflows/deploy-site.yml`이
  본 빌드 + 미리보기 빌드 → **배포 전 검증 게이트 12항목** → GitHub Pages에 직접 배포한다.
  로컬에서 빌드·복사·산출물 커밋을 할 필요가 없다.
- **미리보기(`/preview/`)** = 초안·미공개 페이지 포함 사본. 검색 3중 차단(noindex ·
  robots Disallow · 사이트맵 미생성)이 소스에 내장돼 있고, 워크플로 게이트가 매 배포마다 검사한다.
- **되돌리기**: 저장소 Settings → Pages → Source를 "Deploy from a branch"(main, /)로 —
  루트 산출물 커밋분이 그대로 다시 서빙된다.
- 정책 문서는 별도 저장소(`weatherleague-policy`), 예보 순위 지도·데이터 자산 생성기는
  비공개 저장소의 `pipeline/build_league_map_assets.py`.
