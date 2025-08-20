// Report Guide Application JavaScript
class ReportGuideApp {
    constructor() {
        this.currentSection = null;
        this.frameworkData = null;
        this.init();
    }

    async init() {
        console.log('Loading framework data...');
        await this.loadFramework();
        console.log('Framework data loaded, showing initial section...');
        this.showSection('framework'); // 기본적으로 프레임워크 섹션 표시
        console.log('Setting up event listeners...');
        this.setupEventListeners();
        console.log('App initialization complete');
    }

    async loadFramework() {
        try {
            // GitHub Pages용 정적 데이터
            this.frameworkData = {
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
            };
        } catch (error) {
            console.error('Failed to load framework data:', error);
            this.showError('데이터 로딩에 실패했습니다.');
        }
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.nav-btn').forEach(b => {
                    b.classList.remove('ring-2', 'ring-white', 'ring-opacity-50');
                });
                // Add active class to clicked button
                btn.classList.add('ring-2', 'ring-white', 'ring-opacity-50');
            });
        });
    }

    showSection(sectionName) {
        this.currentSection = sectionName;
        const content = document.getElementById('content');
        
        switch (sectionName) {
            case 'problem':
                content.innerHTML = this.renderProblemAnalysis();
                break;
            case 'framework':
                content.innerHTML = this.renderFramework();
                break;
            case 'examples':
                content.innerHTML = this.renderExamples();
                break;
            case 'tool':
                content.innerHTML = this.renderReportTool();
                break;
            default:
                content.innerHTML = this.renderFramework();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderProblemAnalysis() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-red-600 mb-8 text-center">
                    <i class="fas fa-exclamation-triangle mr-3"></i>
                    문제가 있는 보고서 분석
                </h2>

                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <!-- 나쁜 보고 예시 -->
                    <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                        <h3 class="text-xl font-bold text-red-700 mb-4">❌ 문제가 있는 보고</h3>
                        <div class="bg-white p-4 rounded border text-sm font-mono">
                            <p class="text-gray-600 mb-2">"16:00 퇴근하였습니다."</p>
                            <p class="text-gray-600 mb-2">"퇴근 후 계획은 아래와 같습니다."</p>
                            <p class="text-gray-600 mb-2">- 팀장님과 저녁 식사</p>
                            <p class="text-gray-600">- bmw 복기록 작성</p>
                        </div>
                    </div>

                    <!-- 좋은 보고 예시 -->
                    <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h3 class="text-xl font-bold text-green-700 mb-4">✅ 우수한 보고</h3>
                        <div class="bg-white p-4 rounded border text-sm font-mono">
                            <p class="text-gray-600 mb-2">"16:00-18:00 팀장님과 신제품 론칭 회의"</p>
                            <p class="text-gray-600 mb-2">"18:00-19:30 고객 견적 요청 3건 처리"</p>
                            <p class="text-gray-600 mb-2">"19:30-21:00 파이썬 자동화 강의 2-3강 수강"</p>
                            <p class="text-gray-600">- 내일 천안 장비 실사 자료 준비 완료</p>
                        </div>
                    </div>
                </div>

                <!-- 문제점 분석 -->
                <div class="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">🔍 주요 문제점들</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                <div>
                                    <h4 class="font-bold text-red-600">모호한 표현</h4>
                                    <p class="text-gray-600 text-sm">"저녁식사", "복기록 작성" - 구체적 시간/내용 없음</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                <div>
                                    <h4 class="font-bold text-red-600">시간 개념 부족</h4>
                                    <p class="text-gray-600 text-sm">7시간을 2-3개 활동으로만 채움</p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                <div>
                                    <h4 class="font-bold text-red-600">질문 유발</h4>
                                    <p class="text-gray-600 text-sm">한 번에 명확히 답하지 않아 추가 질문 계속 발생</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                                <div>
                                    <h4 class="font-bold text-red-600">맥락 파악 실패</h4>
                                    <p class="text-gray-600 text-sm">핵심 이슈를 놓치고 엉뚱한 부분에 집중</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 개선 원칙 -->
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
                    <h3 class="text-2xl font-bold mb-6">💡 개선 원칙</h3>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <i class="fas fa-clock text-3xl mb-3"></i>
                            <h4 class="font-bold mb-2">시간 기반</h4>
                            <p class="text-sm opacity-90">구체적인 시간 배분과 스케줄링</p>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-bullseye text-3xl mb-3"></i>
                            <h4 class="font-bold mb-2">구체성</h4>
                            <p class="text-sm opacity-90">명확하고 측정 가능한 목표</p>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-link text-3xl mb-3"></i>
                            <h4 class="font-bold mb-2">연결성</h4>
                            <p class="text-sm opacity-90">전날 복기와 당일 계획의 연결</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFramework() {
        if (!this.frameworkData) {
            return '<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-gray-400"></i></div>';
        }

        const { structure } = this.frameworkData;
        
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-blue-600 mb-4 text-center">
                    <i class="fas fa-cogs mr-3"></i>
                    ${structure.title}
                </h2>
                <p class="text-gray-600 text-center mb-12 text-lg">${structure.description}</p>

                <!-- Framework Steps -->
                <div class="space-y-8">
                    ${structure.steps.map((step, index) => `
                        <div class="bg-white rounded-xl shadow-lg p-8 border-l-4 border-${this.getStepColor(index)}">
                            <div class="flex items-start space-x-6">
                                <div class="w-16 h-16 bg-${this.getStepColor(index)} text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    ${step.letter}
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-gray-800 mb-2">${step.name}</h3>
                                    <p class="text-gray-600 mb-4 text-lg">${step.description}</p>
                                    <div class="bg-gray-50 p-4 rounded-lg mb-4">
                                        <h4 class="font-bold text-gray-700 mb-2">
                                            <i class="fas fa-graduation-cap mr-2"></i>이론적 근거: ${step.theory}
                                        </h4>
                                    </div>
                                    <div class="space-y-2">
                                        <h4 class="font-bold text-gray-700">
                                            <i class="fas fa-question-circle mr-2"></i>핵심 질문들:
                                        </h4>
                                        <ul class="space-y-2">
                                            ${step.questions.map(question => `
                                                <li class="flex items-start space-x-2">
                                                    <i class="fas fa-chevron-right text-${this.getStepColor(index)} mt-1 text-sm"></i>
                                                    <span class="text-gray-700">${question}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Quick Reference Card -->
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-xl mt-12">
                    <h3 class="text-2xl font-bold mb-6 text-center">📋 빠른 참조 카드</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${structure.steps.map(step => `
                            <div class="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                                <div class="text-2xl font-bold mb-2">${step.letter}</div>
                                <div class="text-sm font-medium">${step.name.split(' ')[0]}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderExamples() {
        if (!this.frameworkData) {
            return '<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-gray-400"></i></div>';
        }

        const { examples } = this.frameworkData;
        
        return `
            <div class="max-w-5xl mx-auto">
                <h2 class="text-3xl font-bold text-green-600 mb-8 text-center">
                    <i class="fas fa-star mr-3"></i>
                    우수 보고서 사례 분석
                </h2>

                <!-- 해량님 사례 -->
                <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h3 class="text-2xl font-bold text-green-600 mb-6">${examples.good.title}</h3>
                    
                    <div class="bg-green-50 p-6 rounded-lg mb-6">
                        <h4 class="font-bold text-green-700 mb-3">📋 구조적 특징</h4>
                        <p class="text-gray-700 mb-4">${examples.good.structure}</p>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${examples.good.characteristics.map(char => `
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-check text-green-500"></i>
                                    <span class="text-gray-700">${char}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 실제 보고서 예시 -->
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h4 class="font-bold text-gray-700 mb-4">📄 실제 보고서 예시</h4>
                        <div class="bg-white p-6 rounded border-l-4 border-green-500 font-mono text-sm">
                            <div class="mb-4">
                                <h5 class="font-bold text-green-600 mb-2">1. 작일 행동에 대한 복기</h5>
                                <p class="text-gray-600 mb-2">[250817 (일) 대장님 말씀]</p>
                                <p class="text-gray-700 mb-3">"나만 이기며 사는 남자가 되야한다..."</p>
                                <p class="text-gray-600">[행동 후 복기]</p>
                                <p class="text-gray-700">감정 빼고, 저만 이긴다는 생각으로 행동했습니다...</p>
                            </div>
                            <div class="mb-4">
                                <h5 class="font-bold text-blue-600 mb-2">2. 금일 행동 전략</h5>
                                <p class="text-gray-700">오늘 또한 저만 이긴다는 생각으로 행동하겠습니다...</p>
                            </div>
                            <div>
                                <h5 class="font-bold text-purple-600 mb-2">3. 금일 MUST 보고</h5>
                                <p class="text-gray-700">📌Day-1 (반복 업무)</p>
                                <p class="text-gray-700">📌Day-2 (행동이커머스)</p>
                                <p class="text-gray-700">📌Day-3 (SNS)...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ACTION 프레임워크 적용 분석 -->
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h3 class="text-2xl font-bold text-blue-600 mb-6">🔍 ACTION 프레임워크 적용 분석</h3>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                            <h4 class="font-bold text-red-600 mb-2">A - Accountability</h4>
                            <p class="text-sm text-gray-600">전날 행동 복기를 구체적으로 작성하고 학습 내용을 명시</p>
                        </div>
                        <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 class="font-bold text-orange-600 mb-2">C - Context</h4>
                            <p class="text-sm text-gray-600">대장님 말씀을 인용하며 현재 상황에 맞는 전략 수립</p>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                            <h4 class="font-bold text-yellow-600 mb-2">T - Time-bound</h4>
                            <p class="text-sm text-gray-600">Day별로 구분하여 체계적인 시간 배분 계획 수립</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-bold text-green-600 mb-2">I - Impact</h4>
                            <p class="text-sm text-gray-600">각 업무의 예상 결과와 성과 지표를 명확히 제시</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 class="font-bold text-blue-600 mb-2">O - Objectives</h4>
                            <p class="text-sm text-gray-600">SMART한 목표 설정으로 측정 가능한 성과 관리</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 class="font-bold text-purple-600 mb-2">N - Next Actions</h4>
                            <p class="text-sm text-gray-600">구체적이고 실행 가능한 다음 단계 액션 플랜</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderReportTool() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-8 text-center">
                    <i class="fas fa-tools mr-3"></i>
                    보고서 작성 도구
                </h2>

                <div class="bg-white rounded-xl shadow-lg p-8">
                    <div class="mb-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">📝 ACTION 보고서 템플릿</h3>
                        <p class="text-gray-600 mb-6">아래 양식에 따라 작성하고 검증 버튼을 눌러 피드백을 받으세요.</p>
                    </div>

                    <form id="reportForm" class="space-y-6">
                        <!-- A - Accountability -->
                        <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                            <label class="block text-lg font-bold text-red-600 mb-3">
                                A - Accountability (책임/복기)
                            </label>
                            <textarea 
                                id="accountability" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                rows="4" 
                                placeholder="전날/이전 기간의 행동에 대한 복기를 구체적으로 작성하세요.&#10;- 계획했던 일을 완료했는가?&#10;- 어떤 결과를 얻었는가?&#10;- 무엇을 배웠는가?"
                            ></textarea>
                        </div>

                        <!-- C - Context -->
                        <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                            <label class="block text-lg font-bold text-orange-600 mb-3">
                                C - Context (맥락/상황)
                            </label>
                            <textarea 
                                id="context" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                rows="3" 
                                placeholder="현재 상황과 주요 변수들을 설명하세요.&#10;- 현재 상황은 어떠한가?&#10;- 영향을 미치는 주요 요인들은?&#10;- 제약 조건은 무엇인가?"
                            ></textarea>
                        </div>

                        <!-- T - Time-bound -->
                        <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                            <label class="block text-lg font-bold text-yellow-600 mb-3">
                                T - Time-bound (시간 배분)
                            </label>
                            <textarea 
                                id="timebound" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" 
                                rows="4" 
                                placeholder="구체적인 시간 계획을 작성하세요.&#10;09:00-11:00 업무A (소요시간 2시간)&#10;11:00-12:00 업무B (소요시간 1시간)&#10;...우선순위와 데드라인도 포함하세요."
                            ></textarea>
                        </div>

                        <!-- I - Impact -->
                        <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                            <label class="block text-lg font-bold text-green-600 mb-3">
                                I - Impact (영향/결과)
                            </label>
                            <textarea 
                                id="impact" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                rows="3" 
                                placeholder="예상되는 결과와 영향을 설명하세요.&#10;- 어떤 결과를 기대하는가?&#10;- 성공을 어떻게 측정할 것인가?&#10;- 누구에게 어떤 영향을 미칠 것인가?"
                            ></textarea>
                        </div>

                        <!-- O - Objectives -->
                        <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                            <label class="block text-lg font-bold text-blue-600 mb-3">
                                O - Objectives (목표)
                            </label>
                            <textarea 
                                id="objectives" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                rows="3" 
                                placeholder="SMART한 목표를 설정하세요.&#10;- 구체적이고 측정 가능한 목표는?&#10;- 달성 가능하고 관련성 있는가?&#10;- 시간 제한이 있는가?"
                            ></textarea>
                        </div>

                        <!-- N - Next Actions -->
                        <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                            <label class="block text-lg font-bold text-purple-600 mb-3">
                                N - Next Actions (다음 행동)
                            </label>
                            <textarea 
                                id="nextactions" 
                                class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
                                rows="4" 
                                placeholder="구체적이고 실행 가능한 액션 플랜을 작성하세요.&#10;- 다음에 취할 구체적인 행동은?&#10;- 필요한 자원은 무엇인가?&#10;- 누가, 언제, 어떻게 실행할 것인가?"
                            ></textarea>
                        </div>

                        <!-- 버튼들 -->
                        <div class="flex flex-wrap gap-4 justify-center pt-6">
                            <button 
                                type="button" 
                                onclick="app.validateReport()" 
                                class="bg-action hover:bg-actionDark text-white px-8 py-3 rounded-lg font-bold transition-colors"
                            >
                                <i class="fas fa-check-circle mr-2"></i>보고서 검증하기
                            </button>
                            <button 
                                type="button" 
                                onclick="app.generateTemplate()" 
                                class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                            >
                                <i class="fas fa-file-alt mr-2"></i>템플릿 생성
                            </button>
                            <button 
                                type="button" 
                                onclick="app.clearForm()" 
                                class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                            >
                                <i class="fas fa-trash mr-2"></i>초기화
                            </button>
                        </div>
                    </form>

                    <!-- 검증 결과 -->
                    <div id="validationResult" class="mt-8 hidden">
                        <!-- 여기에 검증 결과가 표시됩니다 -->
                    </div>
                </div>
            </div>
        `;
    }

    async validateReport() {
        const formData = {
            accountability: document.getElementById('accountability').value,
            context: document.getElementById('context').value,
            timebound: document.getElementById('timebound').value,
            impact: document.getElementById('impact').value,
            objectives: document.getElementById('objectives').value,
            nextactions: document.getElementById('nextactions').value
        };

        try {
            // GitHub Pages용 정적 검증 로직
            const validation = {
                score: 0,
                feedback: [],
                suggestions: []
            };
            
            // 간단한 검증 로직
            if (formData.accountability && formData.accountability.length > 10) {
                validation.score += 20;
            } else {
                validation.feedback.push("복기 내용이 너무 간략합니다");
                validation.suggestions.push("구체적인 결과와 학습 내용을 추가하세요");
            }
            
            if (formData.timebound && formData.timebound.includes('시간')) {
                validation.score += 20;
            } else {
                validation.feedback.push("시간 계획이 불명확합니다");
                validation.suggestions.push("각 업무별 소요 시간을 명시하세요");
            }
            
            if (formData.context && formData.context.length > 5) {
                validation.score += 15;
            } else {
                validation.feedback.push("상황 설명이 부족합니다");
                validation.suggestions.push("현재 상황과 제약 조건을 구체적으로 작성하세요");
            }
            
            if (formData.impact && formData.impact.length > 5) {
                validation.score += 15;
            } else {
                validation.feedback.push("예상 결과가 명확하지 않습니다");
                validation.suggestions.push("구체적인 성과 지표를 포함하세요");
            }
            
            if (formData.objectives && formData.objectives.length > 5) {
                validation.score += 15;
            } else {
                validation.feedback.push("목표가 구체적이지 않습니다");
                validation.suggestions.push("SMART 기준에 맞는 목표를 설정하세요");
            }
            
            if (formData.nextactions && formData.nextactions.length > 10) {
                validation.score += 15;
            } else {
                validation.feedback.push("다음 행동이 불분명합니다");
                validation.suggestions.push("구체적이고 실행 가능한 액션 플랜을 작성하세요");
            }
            
            // 보너스 점수
            const totalLength = Object.values(formData).join('').length;
            if (totalLength > 500) {
                validation.score += 10;
                validation.feedback.push("충분한 내용으로 작성되었습니다");
            }
            
            this.showValidationResult(validation);
        } catch (error) {
            console.error('Validation failed:', error);
            this.showError('검증에 실패했습니다. 다시 시도해주세요.');
        }
    }

    showValidationResult(validation) {
        const resultDiv = document.getElementById('validationResult');
        const scoreColor = validation.score >= 80 ? 'green' : validation.score >= 60 ? 'yellow' : 'red';
        
        resultDiv.innerHTML = `
            <div class="bg-white border-2 border-${scoreColor}-300 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-${scoreColor}-600 mb-4">
                    <i class="fas fa-chart-bar mr-2"></i>검증 결과
                </h3>
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-gray-700 font-medium">점수</span>
                        <span class="text-2xl font-bold text-${scoreColor}-600">${validation.score}/100</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-${scoreColor}-500 h-3 rounded-full transition-all duration-500" style="width: ${validation.score}%"></div>
                    </div>
                </div>
                
                ${validation.feedback.length > 0 ? `
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-700 mb-3">📋 피드백</h4>
                        <ul class="space-y-2">
                            ${validation.feedback.map(feedback => `
                                <li class="flex items-start space-x-2">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
                                    <span class="text-gray-700">${feedback}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${validation.suggestions.length > 0 ? `
                    <div>
                        <h4 class="font-bold text-gray-700 mb-3">💡 개선 제안</h4>
                        <ul class="space-y-2">
                            ${validation.suggestions.map(suggestion => `
                                <li class="flex items-start space-x-2">
                                    <i class="fas fa-lightbulb text-blue-500 mt-1"></i>
                                    <span class="text-gray-700">${suggestion}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    generateTemplate() {
        const template = `
=== ACTION 보고서 템플릿 ===

📋 보고일자: ${new Date().toLocaleDateString('ko-KR')}

A - Accountability (책임/복기)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[전날/이전 기간 행동 복기]
- 계획 대비 실행률: ___%
- 주요 성과: 
- 학습 내용: 
- 개선점: 

C - Context (맥락/상황)  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[현재 상황 분석]
- 주요 변수: 
- 제약 조건: 
- 기회 요소: 

T - Time-bound (시간 배분)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[일일 스케줄]
09:00-10:00 | 업무명 (예상 소요시간)
10:00-11:00 | 업무명 (예상 소요시간)
11:00-12:00 | 업무명 (예상 소요시간)
...

[우선순위]
1순위: (데드라인: )
2순위: (데드라인: )
3순위: (데드라인: )

I - Impact (영향/결과)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[예상 결과]
- 목표 달성률: ___%
- 핵심 성과지표(KPI): 
- 이해관계자 영향: 

O - Objectives (목표)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SMART 목표]
- Specific (구체적): 
- Measurable (측정가능): 
- Achievable (달성가능): 
- Relevant (관련성): 
- Time-bound (시한성): 

N - Next Actions (다음 행동)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[구체적 액션 플랜]
1. 행동: / 담당: / 시간: / 자원:
2. 행동: / 담당: / 시간: / 자원:
3. 행동: / 담당: / 시간: / 자원:

[다음 보고 일정]
- 중간 점검: 
- 최종 보고: 
        `.trim();

        // 템플릿을 텍스트 영역에 붙여넣기 위한 모달 표시
        this.showTemplateModal(template);
    }

    showTemplateModal(template) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-4xl max-h-96 overflow-hidden m-4">
                <h3 class="text-2xl font-bold mb-4">📋 생성된 템플릿</h3>
                <textarea class="w-full h-64 p-4 border rounded font-mono text-sm" readonly>${template}</textarea>
                <div class="flex justify-end space-x-4 mt-4">
                    <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                        닫기
                    </button>
                    <button onclick="navigator.clipboard.writeText('${template.replace(/'/g, "\\'")}'); alert('클립보드에 복사되었습니다!');" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        복사하기
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    clearForm() {
        if (confirm('모든 내용을 초기화하시겠습니까?')) {
            document.getElementById('reportForm').reset();
            document.getElementById('validationResult').classList.add('hidden');
        }
    }

    getStepColor(index) {
        const colors = ['red-500', 'orange-500', 'yellow-500', 'green-500', 'blue-500', 'purple-500'];
        return colors[index] || 'gray-500';
    }

    showError(message) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <p class="text-red-600 text-lg">${message}</p>
            </div>
        `;
    }
}

// Global functions for navigation
window.showSection = (section) => {
    console.log(`Showing section: ${section}`);
    if (window.app) {
        window.app.showSection(section);
    } else {
        console.error('App not initialized yet');
        // 앱이 아직 초기화되지 않은 경우 잠시 후 재시도
        setTimeout(() => {
            if (window.app) {
                window.app.showSection(section);
            } else {
                console.error('App still not initialized after timeout');
            }
        }, 100);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    try {
        window.app = new ReportGuideApp();
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
});

// Fallback initialization
window.addEventListener('load', () => {
    if (!window.app) {
        console.log('Fallback initialization...');
        try {
            window.app = new ReportGuideApp();
            console.log('App initialized via fallback');
        } catch (error) {
            console.error('Fallback initialization failed:', error);
        }
    }
});