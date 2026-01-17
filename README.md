# 풀어보고

식물 사진 인식 기반 맞춤형 가이드 및 기록 서비스

## 기술 스택

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Backend/Auth**: Firebase (Auth, Firestore, Storage)
- **AI**: Google Gemini API (@google/genai)
- **UI Library**: Material-UI (MUI)
- **State Management**: 
  - @tanstack/react-query
- **Routing**: react-router-dom
- **Image Processing**: browser-image-compression
- **Validation**: zod
- **Animation**: aos (Animate On Scroll)

## 폴더 구조

```
src
 ├── assets/              # 이미지, 로고 등 정적 자원
 ├── common/              # 공통 컴포넌트 및 페이지
 │   ├── components/      # 재사용 가능한 컴포넌트
 │   └── pages/           # 공통 페이지 (에러, 로딩 등)
 ├── configs/             # 설정 파일
 ├── hooks/               # Custom React Hooks
 ├── layouts/             # 레이아웃 컴포넌트
 │   ├── AppLayout.tsx
 │   └── components/
 ├── models/              # TypeScript 타입 정의
 ├── pages/               # 페이지 컴포넌트
 │   ├── MainPage/
 │   ├── MyPage/
 │   └── RecordPage/
 ├── routes/              # 라우팅 관련
 │   └── ProtectedRoute.tsx
 ├── services/            # 비즈니스 로직 서비스
 ├── utils/               # 유틸리티 함수
 ├── App.tsx              # 라우트 설정
 ├── main.tsx             # 앱 진입점
 └── theme.ts             # MUI 테마 설정
```

## 주요 기능

### 1. 식물 이미지 분석
- Google Gemini API를 활용한 식물 이미지 인식
- 식물 이름, 설명, 상태(healthy/warning/critical), 주의사항 자동 분석

### 2. 식물 기록 관리
- 식물 사진 업로드 및 기록 저장
- 원본 이미지 및 썸네일 자동 생성 및 압축
- Firebase Firestore를 통한 데이터 저장
- 무한 스크롤을 통한 기록 목록 조회

### 3. 북마크 기능
- 관심 식물 북마크 저장
- 북마크된 식물만 필터링하여 조회
- 카드 UI에 북마크 상태 표시

### 4. 인증 시스템
- Google OAuth를 통한 소셜 로그인
- Firebase Authentication 연동
- 보호된 라우트 (ProtectedRoute)

## 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 환경 변수 설정

`.env` 파일에 다음 환경 변수를 설정해야 합니다:

```env
# Firebase 설정
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Google Gemini API
VITE_GEMINI_AI_KEY=
```

## 브랜치 전략

- **main**: 배포용 최종 브랜치 (안정된 상태)
- **develop**: 개발 기본 브랜치 (기능 합치기용, Default)
- **feature/기능이름**: 각 담당자별 기능 개발 브랜치 (완성 후 develop으로 병합)

## 아키텍처 특징

### 서비스 레이어 패턴
- 비즈니스 로직을 `services/` 폴더에 분리
- API 호출, 데이터 변환, 에러 처리 등 서비스 단위로 관리

### Custom Hooks 패턴
- React Query를 활용한 서버 상태 관리
- 재사용 가능한 로직을 Hook으로 추상화

### 타입 안정성
- TypeScript를 통한 엄격한 타입 체크
- Zod를 활용한 런타임 검증

### 컴포넌트 구조
- 공통 컴포넌트는 `common/components/`에 배치
- 페이지별 컴포넌트는 각 페이지 폴더 내부에 배치
