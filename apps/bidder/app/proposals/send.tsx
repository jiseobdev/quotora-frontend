import type { Route } from "./+types/send";

export default function Send({ params: { id } }: Route.ComponentProps) {
  return (
    <div id="send-proposal-content" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">프로젝트 정보</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">프로젝트명</label>
                  <p className="mt-1 text-sm text-gray-900">스마트팩토리 구축 프로젝트</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">발주자 회사명</label>
                  <p className="mt-1 text-sm text-gray-900">삼성전자</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">입찰 마감일</label>
                  <p className="mt-1 text-sm text-gray-900">2025.03.15</p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">제안서 송부 방식</h2>
              <div className="space-y-4">
                <div id="link-send" className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center mb-4">
                    <input type="radio" name="send-type" id="link" className="mr-2" />
                    <label htmlFor="link" className="font-medium">본건 프로젝트 링크로 송부</label>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center space-x-2">
                      <input type="text" value="https://quotora.com/proposals/smart-factory-2025" className="flex-1 rounded-md border-gray-300" readOnly={true} />
                      <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md">
                        <i className="mr-2 fa-solid fa-copy"></i>복사
                      </button>
                    </div>
                  </div>
                </div>
                <div id="email-send" className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <input type="radio" name="send-type" id="email" className="mr-2" />
                    <label htmlFor="email" className="font-medium">이메일로 송부</label>
                  </div>
                  <div className="ml-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="email" placeholder="수신자 이메일 입력" className="flex-1 rounded-md border-gray-300" />
                      <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md">
                        <i className="mr-2 fa-solid fa-plus"></i>추가
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm">john.doe@samsung.com</span>
                        <button className="ml-2 text-gray-500 hover:text-gray-700">
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm">jane.smith@samsung.com</span>
                        <button className="ml-2 text-gray-500 hover:text-gray-700">
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="proposal-preview" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">최종 제안서 미리보기</h2>
              <div className="border border-gray-200 rounded-lg p-4">
                <iframe src="about:blank" className="w-full h-[500px] border border-gray-200 rounded"></iframe>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                취소
              </button>
              <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                <i className="mr-2 fa-solid fa-paper-plane"></i>송부하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
