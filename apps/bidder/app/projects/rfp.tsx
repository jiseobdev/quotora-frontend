import type { Route } from "./+types/rfp";

export default function Rfp({ params: { id } }: Route.ComponentProps) {
  return (
    <main className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-[#4F46E5]">데이터센터 구축 프로젝트</h3>
              <div className="mt-4 flex space-x-8">
                <div className="flex items-center">
                  <i className="text-[#4F46E5] mr-2 fa-solid fa-clock"></i>
                  <span className="text-sm">입찰 마감: D-15</span>
                </div>
                <div className="flex items-center">
                  <i className="text-[#4F46E5] mr-2 fa-solid fa-calendar"></i>
                  <span className="text-sm">확정통보: D-30</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">프로젝트명</h4>
                    <p className="text-sm text-gray-600">데이터센터 구축 프로젝트</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">예상 소요기간</h4>
                    <p className="text-sm text-gray-600">6개월</p>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">프로젝트 개요</h4>
                <p className="text-sm text-gray-600">신규 데이터센터 건립에 따른 법률 자문 및 인허가 관련 법률 검토</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">원하는 법률자문의 내용</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>데이터센터 건립 관련 인허가 검토</li>
                  <li>부지 매입 관련 법률 검토</li>
                  <li>환경영향평가 관련 법률 자문</li>
                  <li>건축 관련 규제 검토</li>
                </ul>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">특별 요구사항</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>데이터센터 건립 경험 보유 변호사 필수</li>
                  <li>주 2회 이상 현장 방문 가능</li>
                  <li>월간 보고서 제출 필요</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">구두 프리젠테이션</h4>
                <p className="text-sm text-gray-600">필요 (입찰 마감일로부터 1주일 이내)</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                거절하기
              </button>
              <button className="px-6 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors">
                입찰 참가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}