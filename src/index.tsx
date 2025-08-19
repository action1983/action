import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main application route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>액션 보고서 작성 가이드</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  action: '#ff4444',
                  actionLight: '#ff6666',
                  actionDark: '#cc3333'
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <header class="text-center mb-12">
                <h1 class="text-4xl font-bold text-action mb-4">
                    <i class="fas fa-chart-line mr-3"></i>
                    액션 보고서 작성 가이드
                </h1>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                    효과적인 업무 보고를 위한 체계적 프레임워크<br>
                    <span class="text-sm text-gray-500">기반 이론: OKR, Agile, SMART Goals</span>
                </p>
            </header>

            <!-- Navigation -->
            <nav class="mb-8">
                <div class="flex flex-wrap justify-center gap-4">
                    <button onclick="showSection('problem')" class="nav-btn bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                        <i class="fas fa-exclamation-triangle mr-2"></i>문제 분석
                    </button>
                    <button onclick="showSection('framework')" class="nav-btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                        <i class="fas fa-cogs mr-2"></i>보고 프레임워크
                    </button>
                    <button onclick="showSection('examples')" class="nav-btn bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                        <i class="fas fa-star mr-2"></i>우수 사례
                    </button>
                    <button onclick="showSection('tool')" class="nav-btn bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                        <i class="fas fa-tools mr-2"></i>작성 도구
                    </button>
                </div>
            </nav>

            <!-- Content Sections -->
            <main id="content">
                <!-- Initial loading state -->
                <div class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">로딩 중...</p>
                </div>
            </main>
        </div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

// API route for getting report structure
app.get('/api/framework', (c) => {
  const framework = {
    structure: {
      title: "ACTION 보고 프레임워크 (A.C.T.I.O.N)",
      description: "체계적이고 실행 가능한 보고서 작성을 위한 6단계 구조",
      steps: [
        {
          letter: "A",
          name: "Accountability (책임)", 
          description: "전날/이전 기간 행동에 대한 명확한 복기와 결과 보고",
          theory: "AAR(After Action Review) 방법론",
          questions: [
            "계획했던 일을 완료했는가?",
            "어떤 결과를 얻었는가?",
            "무엇을 배웠는가?"
          ]
        },
        {
          letter: "C",
          name: "Context (맥락)",
          description: "현재 상황과 주요 변수들에 대한 정확한 인식",
          theory: "Situational Awareness Theory",
          questions: [
            "현재 상황은 어떠한가?",
            "영향을 미치는 주요 요인들은 무엇인가?",
            "제약 조건은 무엇인가?"
          ]
        },
        {
          letter: "T",
          name: "Time-bound (시간 배분)",
          description: "구체적인 시간 계획과 우선순위 설정",
          theory: "Time Boxing & Eisenhower Matrix",
          questions: [
            "각 업무에 얼마의 시간을 할당할 것인가?",
            "우선순위는 어떻게 설정할 것인가?",
            "데드라인은 언제인가?"
          ]
        },
        {
          letter: "I",
          name: "Impact (영향/결과)",
          description: "예상되는 결과와 핵심 성과 지표 정의",
          theory: "OKR (Objectives and Key Results)",
          questions: [
            "어떤 결과를 기대하는가?",
            "성공을 어떻게 측정할 것인가?",
            "누구에게 어떤 영향을 미칠 것인가?"
          ]
        },
        {
          letter: "O",
          name: "Objectives (목표)",
          description: "명확하고 측정 가능한 목표 설정",
          theory: "SMART Goals Framework",
          questions: [
            "구체적인 목표는 무엇인가?",
            "어떻게 측정할 것인가?",
            "달성 가능한가?"
          ]
        },
        {
          letter: "N",
          name: "Next Actions (다음 행동)",
          description: "구체적이고 실행 가능한 액션 플랜",
          theory: "GTD (Getting Things Done) Methodology",
          questions: [
            "다음에 취할 구체적인 행동은 무엇인가?",
            "필요한 자원은 무엇인가?",
            "누가, 언제, 어떻게 실행할 것인가?"
          ]
        }
      ]
    },
    examples: {
      good: {
        title: "우수 보고 사례 (해량님 스타일)",
        structure: "1. 작일 행동 복기 → 2. 금일 행동 전략 → 3. MUST 업무 보고",
        characteristics: [
          "구조화된 형식",
          "구체적인 액션 아이템",
          "시간 기반 계획",
          "연속성 있는 복기"
        ]
      },
      bad: {
        title: "문제가 있는 보고 사례",
        problems: [
          "모호한 표현 (\"저녁식사\", \"복기록 작성\")",
          "시간 개념 부족 (7시간을 2-3개 활동으로만 채움)",
          "추가 질문 유발 (한 번에 명확히 답하지 않음)",
          "맥락 파악 실패 (핵심 이슈를 놓침)"
        ]
      }
    }
  }
  
  return c.json(framework)
})

// API route for report validation
app.post('/api/validate', async (c) => {
  const reportData = await c.req.json()
  
  const validation = {
    score: 0,
    feedback: [],
    suggestions: []
  }
  
  // Simple validation logic
  if (reportData.accountability && reportData.accountability.length > 10) {
    validation.score += 20
  } else {
    validation.feedback.push("복기 내용이 너무 간략합니다")
    validation.suggestions.push("구체적인 결과와 학습 내용을 추가하세요")
  }
  
  if (reportData.timebound && reportData.timebound.includes('시간')) {
    validation.score += 20
  } else {
    validation.feedback.push("시간 계획이 불명확합니다")
    validation.suggestions.push("각 업무별 소요 시간을 명시하세요")
  }
  
  return c.json(validation)
})

export default app
