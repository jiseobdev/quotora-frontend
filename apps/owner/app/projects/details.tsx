import type { Route } from "./+types/details";

export default function Details({ params: { id } }: Route.ComponentProps) {
  return (
    <main className="py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">2025년 법무자문 입찰</h1>
            <div className="flex gap-4">
              <div className="text-center">
                <span className="text-sm text-gray-500">입찰마감</span>
                <p className="text-lg font-semibold text-red-600">D+1</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500">확정통보</span>
                <p className="text-lg font-semibold text-blue-600">D-14</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <input type="text" className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="일자 변경, 사무실 위치 및 주차 안내 등 공지사항 등 기재" />
              <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">공지올리기</button>
          </div>
        </div>
        <div id="bid-management" className="mt-8">
          <h2 className="text-xl font-semibold mb-6">입찰 절차 관리</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">로펌명</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NDA동의 &amp; 응찰여부</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제안서</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">선정여부</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">메시지</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4">김&amp;장</td>
                  <td className="px-4 py-4"><i className="fa-solid fa-check text-green-500"></i> / <i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">제출완료</span></td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">검토중</span></td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600">Y</button>
                      <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600">N</button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button className="px-3 py-1 text-xs bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                      <i className="fa-solid fa-message mr-1"></i>연락하기
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4">법무법인 광장</td>
                  <td className="px-4 py-4"><i className="fa-solid fa-check text-green-500"></i> / <i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">제출완료</span></td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">검토중</span></td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600">Y</button>
                      <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600">N</button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button className="px-3 py-1 text-xs bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                      <i className="fa-solid fa-message mr-1"></i>연락하기
                    </button>
                  </td>
                </tr>
                <tr className="opacity-60">
                  <td className="px-4 py-4">태평양</td>
                  <td className="px-4 py-4"><i className="fa-solid fa-check text-green-500"></i> / <i className="fa-solid fa-xmark text-red-500"></i></td>
                  <td className="px-4 py-4">-</td>
                  <td className="px-4 py-4">-</td>
                  <td className="px-4 py-4">-</td>
                  <td className="px-4 py-4">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="communication-section" className="mt-6 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">김&amp;장 커뮤니케이션</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-blue-600">입찰자 질의 (2025.01.15)</span>
                      <i className="fa-solid fa-arrow-right text-blue-600"></i>
                    </div>
                    <p className="text-sm text-gray-700">프로젝트 수행 인력 구성에 대해 추가 문의드립니다.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg ml-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">답변 완료 (2025.01.16)</span>
                      <i className="fa-solid fa-arrow-left text-gray-600"></i>
                    </div>
                    <p className="text-sm text-gray-900">프로젝트 리더는 15년 경력의 파트너 변호사가 담당하며, 실무진은 5년 이상 경력의 변호사 2인으로 구성됩니다.</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">추가 답변하기</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">법무법인 광장 커뮤니케이션</h3>
              </div>
              <div className="space-y-3">
                <textarea className="w-full rounded-md border-gray-300" rows={2} placeholder="메모 또는 코멘트를 입력하세요"></textarea>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">임시 저장</button>
                  <button className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">전송하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="proposal-review" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">제안서 검토</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">선정기준:</span>
                <span className="ml-2">전문성 50% | 비용 20% | 프로젝트 수행계획 30%</span>
              </div>
              <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">제안서 분석하기</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">전문성 평가</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>김&amp;장</span>
                      <span className="font-medium">45/50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>법무법인 광장</span>
                      <span className="font-medium">42/50</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">비용 평가</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>김&amp;장</span>
                      <span className="font-medium">18/20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>법무법인 광장</span>
                      <span className="font-medium">16/20</span>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">프로젝트 수행계획</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>김&amp;장</span>
                      <span className="font-medium">28/30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>법무법인 광장</span>
                      <span className="font-medium">27/30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium mb-4">종합 평가</h4>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">김&amp;장이 총점 91점으로 가장 높은 점수를 획득했습니다. 법률자문 비용이 1억까지는 김&amp;장이 저렴하지만 1억이 넘어가면 법무법인 광장이 더 저렴합니다. 최근 3년간 유사 프로젝트 수행 이력이 김&amp;장이 더 많아 전문성에서 우위를 보였습니다.</p>
                </div>
              </div>
              <div id="team-comments" className="border-t pt-6">
                <h4 className="text-lg font-medium mb-4">팀원 의견</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">홍길동</span>
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">수정</button>
                        <button className="text-sm text-red-600 hover:text-red-800">삭제</button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">프로젝트 수행 경험이 풍부하고 전담 인력 구성이 우수합니다.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">김철수</span>
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">수정</button>
                        <button className="text-sm text-red-600 hover:text-red-800">삭제</button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">비용 측면에서 효율적인 제안을 했다고 생각합니다.</p>
                  </div>
                  <div className="mt-4">
                    <textarea className="w-full rounded-md border-gray-300" rows={3} placeholder="의견을 입력하세요"></textarea>
                    <div className="mt-2 flex justify-end">
                      <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">의견 등록</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}