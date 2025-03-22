import type { Route } from "./+types/details";

export default function Details({ params: { id } }: Route.ComponentProps) {
  return (
    <main id="project-content" className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div id="project-header" className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">데이터센터 구축 프로젝트</h2>
            <div className="mt-4 flex space-x-6">
              <div className="flex items-center text-[#4F46E5]">
                <i className="mr-2 fa-solid fa-clock"></i>
                <span>입찰 마감: D-15</span>
              </div>
              <div className="flex items-center text-[#4F46E5]">
                <i className="mr-2 fa-solid fa-calendar"></i>
                <span>확정통보: D-30</span>
              </div>
            </div>
          </div>
          <div id="notices" className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-500 mb-3">공지사항</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span>사무실 주차안내, 사무실 주소는 서울시 역삼동 아린 빌딩. 지하 3층에 세우시고 올라오시면 주차 등록해드립니다</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span>입찰마감일을 일주일 연장하였습니다</span>
              </div>
            </div>
          </div>
          <div id="progress-bar" className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="relative flex justify-between mb-2 z-1">
                <div className="flex flex-col items-center w-1/4">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm mt-2 text-[#4F46E5]">NDA 동의 &amp; 응찰</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white">
                    <i className="fa-solid fa-pen"></i>
                  </div>
                  <span className="text-sm mt-2 text-[#4F46E5]">제안서 작성</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="text-gray-400 fa-solid fa-magnifying-glass"></i>
                  </div>
                  <span className="text-sm mt-2 text-gray-400">제안서 발주사 검토</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="text-gray-400 fa-solid fa-flag"></i>
                  </div>
                  <span className="text-sm mt-2 text-gray-400">선정 통보</span>
                </div>
              </div>
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0">
                <div className="bg-[#4F46E5] h-1 w-[45%]"></div>
              </div>
            </div>
          </div>
          <div id="communication" className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium mb-4">발주사와 연락하기</h3>
            <div className="space-y-4 mb-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex-grow bg-gray-50 rounded-lg p-4">
                  <p className="text-sm">현장 방문은 언제 가능할까요?</p>
                  <span className="text-xs text-gray-500">발주사 · 2시간 전</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" className="flex-grow rounded-lg border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]" placeholder="메시지를 입력하세요..." />
              <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg">
                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-paper-plane" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path></svg></i>
              </button>
            </div>
          </div>
          <div id="proposal" className="p-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">제안서 작성</h3>
              <p className="text-sm text-gray-600 mb-6">제안서 자동작성 기능을 사용하지 않을 경우, 파일업로드 기능을 활용하여 귀사 양식의 제안서(PDF 또는 word 형식)를 업로드 하실 수 있습니다. 자동작성 기능을 활용하시는 경우 해당페이지에서 제안서가 발송됩니다.</p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
                  <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-wand-magic-sparkles" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wand-magic-sparkles" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"></path></svg></i>
                  수임률 높이는 제안서 자동 작성하기
                </button>
                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-upload" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg></i>
                  제안서 등 파일 업로드하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}