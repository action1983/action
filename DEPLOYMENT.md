# 배포 및 지속 개발 가이드

## 🚀 즉시 배포 (Production)

### 1. GitHub 설정 (필수)
```bash
# 1단계: GitHub 환경 설정
# 사이드바 #github 탭에서 GitHub 인증 완료 후:
# - GitHub App 권한 설정
# - OAuth 토큰 생성
# - 리포지토리 권한 부여
```

### 2. Cloudflare 설정 (필수)
```bash
# 1단계: Cloudflare API 키 설정
# 사이드바 Deploy 탭에서 Cloudflare API Token 생성 및 설정

# 2단계: 프로젝트 생성 (터미널에서)
npx wrangler pages project create action-report-guide \
  --production-branch main \
  --compatibility-date 2024-01-01

# 3단계: 배포
npm run build
npx wrangler pages deploy dist --project-name action-report-guide
```

### 3. 자동 배포 설정
GitHub Actions를 통한 자동 배포 설정:

`.github/workflows/deploy.yml` 파일 생성:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: action-report-guide
          directory: dist
          wranglerVersion: '3'
        if: github.ref == 'refs/heads/main'
```

## 💻 로컬 개발 환경 설정

### 1. 프로젝트 복제
```bash
git clone https://github.com/{username}/action-report-guide.git
cd action-report-guide
npm install
```

### 2. 개발 서버 실행
```bash
# 로컬 개발 (Vite 개발 서버)
npm run dev

# Cloudflare Pages 로컬 테스트
npm run build
npx wrangler pages dev dist --port 3000
```

### 3. 개발 워크플로우
```bash
# 1. 새 기능 브랜치 생성
git checkout -b feature/new-feature

# 2. 개발 및 테스트
npm run dev

# 3. 빌드 테스트
npm run build
npm run preview

# 4. 커밋 및 푸시
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/new-feature

# 5. Pull Request 생성 (GitHub에서)
# 6. 리뷰 후 main 브랜치에 merge
# 7. 자동 배포 실행
```

## 🔧 지속적 개발을 위한 도구

### 1. 필수 설치 도구
```bash
# Node.js 18+ (LTS 버전)
# Git
# VS Code (권장 에디터)
# Wrangler CLI
npm install -g wrangler
```

### 2. VS Code 추천 확장
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens
- Thunder Client (API 테스트)

### 3. 개발 명령어
```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run deploy       # Cloudflare Pages 배포
npm run clean-port   # 포트 3000 정리
npm run test         # 서비스 테스트
```

## 📊 향후 개선 로드맵

### Phase 1: 기능 확장 (1-2주)
- [ ] AI 기반 보고서 피드백 시스템 (ChatGPT API 연동)
- [ ] 더 정교한 검증 로직 (점수 알고리즘 개선)
- [ ] 다양한 업무 유형별 템플릿 (영업, 마케팅, 개발 등)
- [ ] 모바일 반응형 최적화

### Phase 2: 데이터 관리 (2-3주)
- [ ] Cloudflare D1 데이터베이스 연동
- [ ] 사용자별 보고서 저장 기능
- [ ] 보고서 이력 관리 및 통계
- [ ] 팀별 보고서 공유 기능

### Phase 3: 고도화 (1개월)
- [ ] 실시간 협업 기능
- [ ] 보고서 품질 트렌드 분석
- [ ] 슬랙/디스코드 봇 연동
- [ ] API 문서화 및 외부 연동

### Phase 4: 확장 (장기)
- [ ] 다국어 지원
- [ ] 음성 입력 지원
- [ ] 자동 일정 연동 (Google Calendar, Outlook)
- [ ] 기업용 화이트라벨 솔루션

## 🛠 코드 구조 및 수정 가이드

### 핵심 파일 구조
```
webapp/
├── src/
│   └── index.tsx           # 백엔드 API 로직 (Hono)
├── public/
│   └── static/
│       └── app.js          # 프론트엔드 로직
├── package.json            # 의존성 및 스크립트
├── wrangler.jsonc          # Cloudflare 설정
└── ecosystem.config.cjs    # PM2 설정 (개발용)
```

### 주요 수정 포인트

#### 1. 새로운 API 엔드포인트 추가
`src/index.tsx`에서:
```typescript
app.get('/api/new-endpoint', (c) => {
  // 새로운 API 로직
  return c.json({ data: 'response' })
})
```

#### 2. 프론트엔드 기능 추가
`public/static/app.js`에서:
```javascript
// ReportGuideApp 클래스에 새 메서드 추가
renderNewSection() {
  return `<div>새로운 섹션 내용</div>`
}
```

#### 3. 스타일링 수정
- Tailwind CSS 사용 (CDN 방식)
- `app.js`의 HTML 템플릿에서 클래스 수정
- 필요시 `public/static/styles.css` 추가

#### 4. 데이터베이스 연동 (향후)
`wrangler.jsonc`에 D1 설정 추가:
```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "action-reports",
      "database_id": "your-database-id"
    }
  ]
}
```

## 📋 체크리스트

### 배포 전 확인사항
- [ ] GitHub 리포지토리 생성 및 코드 푸시
- [ ] Cloudflare API 키 설정
- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] 모든 네비게이션 기능 테스트
- [ ] 모바일에서 접근성 확인

### 개발 환경 체크리스트
- [ ] Node.js 18+ 설치
- [ ] Git 설정 완료
- [ ] Wrangler CLI 설치
- [ ] VS Code 확장 프로그램 설치
- [ ] 로컬 개발 서버 정상 동작 확인

### 지속 개발을 위한 체크리스트
- [ ] GitHub Actions 설정
- [ ] 브랜치 보호 규칙 설정
- [ ] 코드 리뷰 프로세스 정의
- [ ] 이슈 템플릿 작성
- [ ] 릴리즈 노트 작성 방식 정의

## 🆘 문제 해결

### 자주 발생하는 문제들

1. **배포 실패**
   ```bash
   # Wrangler 버전 확인
   npx wrangler --version
   
   # 캐시 클리어 후 재시도
   rm -rf node_modules/.cache
   npm run build
   ```

2. **로컬 개발 서버 문제**
   ```bash
   # 포트 충돌 해결
   npm run clean-port
   
   # 의존성 재설치
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **정적 파일 서빙 문제**
   - `public/static/` 디렉토리 구조 확인
   - `wrangler.jsonc`의 `pages_build_output_dir` 설정 확인

## 💡 개발 팁

1. **빠른 테스트**: `npm run test`로 서비스 상태 확인
2. **로그 확인**: 브라우저 개발자 도구 콘솔 활용
3. **API 테스트**: Thunder Client나 Postman 사용
4. **성능 측정**: Lighthouse로 웹 성능 분석
5. **접근성**: axe-core 확장으로 접근성 검사

---

**백업 파일**: https://page.gensparksite.com/project_backups/tooluse_WQP6S1QySDOfNze822oK0g.tar.gz
**프로젝트명**: action-report-guide
**배포 URL**: https://action-report-guide.pages.dev (설정 후)