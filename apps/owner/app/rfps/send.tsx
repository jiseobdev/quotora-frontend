import type { Route } from "./+types/send";

export default function Send({ }: Route.ComponentProps) {
  return (
    <main className="bg-gray-50 pt-24 px-6 pb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">광장</label>
              <input type="email" value="lawfirm1@bkl.co.kr" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" readOnly={true} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">김앤장</label>
              <input type="email" value="lawfirm2@kimchang.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" readOnly={true} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">추가 이메일</label>
              <div className="flex gap-2">
                <input type="email" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder="이메일 입력" />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <i data-fa-i2svg=""><svg className="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">RFP 송부본</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">프로젝트명</p>
                  <p>기업인수자문</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">예상일정</p>
                  <p>6개월</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">프로젝트 개요</p>
                <p>중견 제조업체 인수를 위한 법률실사 및 계약서 검토</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">원하는 법률자문의 내용</p>
                <p>법률실사, 계약서 검토 및 협상 지원</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">특별 요구사항</p>
                <p>M&amp;A 경험이 풍부한 파트너급 변호사 참여 필수</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">RFP 제출마감일</p>
                  <p>2025.02.28</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">자문사 선정 통보예정일</p>
                  <p>2025.03.10</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">구두 프리젠테이션 여부</p>
                <p>필요</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">선정기준</p>
                <ul className="list-disc list-inside">
                  <li>전문성 (40%)</li>
                  <li>비용 (30%)</li>
                  <li>프로젝트 수행계획 (30%)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]">
              <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-paper-plane" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path></svg></i>송부하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}