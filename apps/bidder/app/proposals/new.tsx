export default function New() {
  return (
    <div id="proposal-editor" className="py-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">제안서 작성</h1>
            <p className="text-sm text-gray-500 mt-1">프로젝트명을 입력하세요</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
              <i className="mr-2 fa-solid fa-floppy-disk"></i>저장
            </button>
            <button className="px-4 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#4F46E5]">
              <i className="mr-2 fa-solid fa-paper-plane"></i>제출
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div id="basic-info" className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">대상 회사명</label>
                <input type="text" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트명</label>
                <input type="text" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
          <div id="team-section" className="space-y-6">
            <div id="team-profile" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">회사 프로필</h3>
                <div className="flex space-x-3">
                  <button className="text-[#4F46E5]">
                    <i className="mr-1 fa-solid fa-building"></i>회사 프로필 불러오기
                  </button>
                  <button className="text-[#4F46E5]">
                    <i className="mr-1 fa-solid fa-pen-to-square"></i>프로필 수정
                  </button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <textarea className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" rows={4} placeholder="회사의 주요 실적과 전문성을 기술해 주세요"></textarea>
              </div>
            </div>
            <div id="assigned-lawyers" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">본건 관여 변호사 리스트</h3>
                <div className="flex space-x-3">
                  <button className="text-[#4F46E5]">
                    <i className="mr-1 fa-solid fa-users"></i>변호사 목록 불러오기
                  </button>
                  <button className="text-[#4F46E5]" id="edit-lawyer-list">
                    <i className="mr-1 fa-solid fa-pen-to-square"></i>목록 수정
                  </button>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-4">
                <div id="lawyer-list" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-1/4">
                        <input type="text" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="역할" />
                      </div>
                      <div className="flex-1">
                        <input type="text" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="담당 변호사명" />
                      </div>
                      <div className="w-1/4">
                        <input type="text" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="시간당 요율" />
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button className="text-[#4F46E5] hover:text-[#4338CA] text-sm">
                  <i className="mr-1 fa-solid fa-plus"></i>역할/담당자 추가
                </button>
              </div>
            </div>
          </div>
          <div id="project-experience" className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">본건 프로젝트 관련 업무 경력</h3>
              <div className="flex space-x-2">
                <button className="text-[#4F46E5] px-3 py-1.5 text-sm rounded-md hover:bg-[#4F46E5]/5 flex items-center">
                  <i className="mr-1.5 fa-solid fa-download"></i>업무경력 불러오기
                </button>
                <button className="text-[#4F46E5] px-3 py-1.5 text-sm rounded-md hover:bg-[#4F46E5]/5 flex items-center">
                  <i className="mr-1.5 fa-solid fa-pen-to-square"></i>수정
                </button>
                <button className="text-[#4F46E5] px-3 py-1.5 text-sm rounded-md hover:bg-[#4F46E5]/5 flex items-center">
                  <i className="mr-1.5 fa-solid fa-floppy-disk"></i>새로 저장하기
                </button>
              </div>
            </div>
            <div className="relative">
              <textarea className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" rows={4} placeholder="관련 업무 경력을 기술해 주세요"></textarea>
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button className="text-gray-400 hover:text-[#4F46E5]">
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
          <div id="scope-section" className="space-y-6 bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">예상 업무 범위 및 수행계획</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <i className="mr-2 text-[#4F46E5] fa-solid fa-list-check"></i>예상 업무 범위
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">프로젝트의 주요 업무범위를 구체적으로 기술해 주세요</p>
                  </div>
                  <button className="text-white bg-[#4F46E5] px-4 py-2 rounded-md text-sm hover:bg-[#4338CA] transition-colors flex items-center">
                    <i className="mr-2 fa-solid fa-wand-magic-sparkles"></i>AI 작성
                  </button>
                </div>
                <div className="relative">
                  <textarea className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" rows={4} placeholder="• Due Diligence 수행
• 계약서 검토 및 작성
• 인수 구조 자문"></textarea>
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button className="text-gray-400 hover:text-[#4F46E5]">
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <i className="mr-2 text-[#4F46E5] fa-solid fa-calendar-days"></i>업무 수행 계획
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">단계별 업무수행계획 등 구체적 내용을 기술해 주세요</p>
                  </div>
                  <button className="text-white bg-[#4F46E5] px-4 py-2 rounded-md text-sm hover:bg-[#4338CA] transition-colors flex items-center">
                    <i className="mr-2 fa-solid fa-wand-magic-sparkles"></i>AI 작성
                  </button>
                </div>
                <div className="relative">
                  <textarea className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" rows={4} placeholder="1단계: 사전 검토 및 준비 (1주)
2단계: Due Diligence 수행 (2주)
3단계: 계약 협상 및 체결 (1주)"></textarea>
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button className="text-gray-400 hover:text-[#4F46E5]">
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <i className="mr-2 text-[#4F46E5] fa-solid fa-flag"></i>주요 마일스톤
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">프로젝트의 주요 이정표와 완료 시점을 기술해 주세요</p>
                  </div>
                  <button className="text-white bg-[#4F46E5] px-4 py-2 rounded-md text-sm hover:bg-[#4338CA] transition-colors flex items-center">
                    <i className="mr-2 fa-solid fa-wand-magic-sparkles"></i>AI 작성
                  </button>
                </div>
                <div className="relative">
                  <textarea className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" rows={4} placeholder="• 계약 체결: 2025년 3월 1일
• Due Diligence 완료: 2025년 3월 15일
• 거래 종결: 2025년 3월 31일"></textarea>
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button className="text-gray-400 hover:text-[#4F46E5]">
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="cost-section" className="space-y-4">
            <h3 className="text-lg font-medium">비용</h3>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
              기본적으로 법률비용은 시간당 요율에 업무시간을 곱하여 산정되며 VAT 10%는 별도입니다.
            </div>
            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">법률비용</label>
                <textarea className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-32" placeholder="시간당 요율에서 할인율, 캡 여부, 착수금, 성공보수 등 여러 조건을 고려하여 비용을 입력하여 주시기 바랍니다."></textarea>
              </div>
              <div id="additional-charges" className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">별도 청구 항목</label>
                  <button className="text-[#4F46E5] text-sm">
                    <i className="mr-1 fa-solid fa-plus"></i>항목 추가
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#4F46E5]" />
                      <span className="ml-2 text-sm">수수료 및 세금</span>
                    </label>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#4F46E5]" />
                      <span className="ml-2 text-sm">교통비용</span>
                    </label>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#4F46E5]" />
                      <span className="ml-2 text-sm">번역비용</span>
                    </label>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div id="prerequisites" className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">전제사항</h4>
                  <button className="text-[#4F46E5] text-sm">
                    <i className="mr-1 fa-solid fa-plus"></i>전제사항 추가
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">상기 비용은 다음을 전제로 합니다:</p>
                  <div className="space-y-2" id="prerequisites-list">
                    <div className="flex items-start group">
                      <span className="text-sm text-gray-600 mr-2">(i)</span>
                      <input type="text" className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value="본건 프로젝트와 관련하여 예기치 못한 이슈가 발생하지 않으며" />
                      <button className="text-red-500 hover:text-red-700 ml-2">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="flex items-start group">
                      <span className="text-sm text-gray-600 mr-2">(ii)</span>
                      <input type="text" className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value="위 업무범위에 기재된 범위를 벗어나지 않고" />
                      <button className="text-red-500 hover:text-red-700 ml-2">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="flex items-start group">
                      <span className="text-sm text-gray-600 mr-2">(iii)</span>
                      <input type="text" className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value="예상되는 일정을 1개월 이상 초과하지 않음" />
                      <button className="text-red-500 hover:text-red-700 ml-2">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}