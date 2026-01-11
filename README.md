
# 풀어보고

식물 사진 인식 기반 맞춤형 가이드 및 기록 서비스
## 기술 스택

- Framework: React (Vite)
- Backend/Auth: Firebase
- AI: Gemini API
## 폴더구조
```
src
 ┣ apis
 ┣ assets
 ┣ common
 ┣ configs
 ┣ hooks
 ┣ laylouts
 ┃ ┗ AppLayout.tsx
 ┣ models
 ┣ pages
 ┃ ┗ main
 ┃ ┃ ┗ Main.tsx
 ┣ stores
 ┣ utils
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┗ main.tsx
```
## 라이브러리

- react-router-dom@6
- zustand
- @tanstack/react-query
- axios
## 브랜치 전략
- main: 배포용 최종 브랜치 (안정된 상태)
- develop: 개발 기본 브랜치 (기능 합치기용, Default)
- feature/기능이름: 각 담당자별 기능 개발 브랜치 (완성 후 develop으로 병합)