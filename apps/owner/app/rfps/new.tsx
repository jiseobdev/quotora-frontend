export default function New() {
  return (
    <main id="main" className="pt-24 px-6 pb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">새 RFP 작성</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트명</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비용 예상액</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder="₩" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트 개요</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="소송, M&amp;A, IPO, 금융, 규제당국 대응, 사내 이슈 점검 등 진행하시려는 프로젝트 개요를 써주세요"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">원하는 법률자문의 내용</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="원하는 결과가 있다면 구체적으로 기재해주세요"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">특별 요구사항</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="본 프로젝트의 특징, 포함되었으면 하는 변호사님이나 팀의 경력 등 자유롭게 기재해주세요"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">예상 일정</label>
              <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RFP 제출 마감일</label>
              <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">자문사 선정 통보 예정일</label>
              <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">구두 프리젠테이션 여부</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]">
                <option>필요</option>
                <option>불필요</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">선정기준</label>
            <div id="criteria-container" className="space-y-4">
              <div className="flex items-center">
                <span className="w-32">비용</span>
                <input type="range" className="flex-1 mx-4" min="0" max="100" />
                <input type="number" className="w-20 px-2 py-1 border rounded" min="0" max="100" />%
                <button type="button" className="ml-2 text-red-500 hover:text-red-700">
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              <div className="flex items-center">
                <span className="w-32">전문성</span>
                <input type="range" className="flex-1 mx-4" min="0" max="100" />
                <input type="number" className="w-20 px-2 py-1 border rounded" min="0" max="100" />%
                <button type="button" className="ml-2 text-red-500 hover:text-red-700">
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              <div className="flex items-center">
                <span className="w-32">아이디어와 열의</span>
                <input type="range" className="flex-1 mx-4" min="0" max="100" />
                <input type="number" className="w-20 px-2 py-1 border rounded" min="0" max="100" />%
                <button type="button" className="ml-2 text-red-500 hover:text-red-700">
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            </div>
            <button type="button" className="mt-4 text-[#4F46E5] hover:text-[#4338CA] flex items-center">
              <i className="fa-solid fa-plus mr-2"></i>
              <span>새로운 평가요소 추가</span>
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">수신로펌의 범위</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="제안서를 받을 로펌의 이름이나 조건을 기재해주세요"></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-6 py-2 border rounded-lg hover:bg-gray-50">취소</button>
            <button type="submit" className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]">저장</button>
          </div>
        </form>
      </div>
    </main>
  );
}