import type { Route } from "./+types/details";

export default function Details({ params: { id } }: Route.ComponentProps) {
  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">RFP 검토</h1>
          <p className="text-sm text-gray-500">최종 수정: 2025.01.17 14:30</p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700">
          <i className="fa-regular fa-pen-to-square mr-1"></i>
          수정
        </button>
      </div>
      <div id="rfp-details" className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">RFP 조항</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">프로젝트명</h3>
              <p className="text-gray-600">기업외수자문</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-900">예상일정</h3>
              <p className="text-gray-600">6개월</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">프로젝트 개요</h3>
            <p className="text-gray-600">중견 제조업체 인수를 위한 법률실사 및 계약서 검토</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">원하는 법률자문의 내용</h3>
            <p className="text-gray-600">법률실사, 계약서 검토 및 협상 지원</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">특별 요구사항</h3>
            <p className="text-gray-600">M&A 경험이 풍부한 파트너급 변호사 참여 필수</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">RFP 제출마감일</h3>
              <p className="text-gray-600">2025.02.28</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">자문사 선정 통보예정일</h3>
              <p className="text-gray-600">2025.03.10</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">구두 프레젠테이션 여부</h3>
            <p className="text-gray-600">필요</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">선정기준</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>전문성 (40%)</li>
              <li>비용 (30%)</li>
              <li>프로젝트 수행계획 (30%)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">RFP 수신 관련</h3>
            <p className="text-gray-600">김변박, BTL, 강장</p>
          </div>
        </div>
      </div>
      <div id="comments" className="mt-6 space-y-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-8 h-8 rounded-full mr-3" alt="User" />
              <span className="font-medium">이법무</span>
            </div>
            <span className="text-sm text-gray-500">2025.01.15 15:20</span>
          </div>
          <p className="text-gray-700">개인정보보호 관련하여 GDPR 준수 여부도 검토가 필요할 것 같습니다.</p>
          <div className="flex items-center mt-2 space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-800">답글</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">수정</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">삭제</button>
          </div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-8 h-8 rounded-full mr-3" alt="User" />
              <span className="font-medium">이법무</span>
            </div>
            <span className="text-sm text-gray-500">2025.01.15 15:22</span>
          </div>
          <p className="text-gray-700">유럽회사이니 해외로펌 둘 구대 추가배보면 어떨까요?</p>
          <div className="flex items-center mt-2 space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-800">답글</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">수정</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}