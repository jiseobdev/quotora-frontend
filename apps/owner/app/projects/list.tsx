import { Link } from "react-router";

export default function List() {
  return (
    <main className="py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Project 현황 대시보드</h1>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-pen-to-square text-[#4F46E5] text-3xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">RFP 작성중</dt>
                    <dd className="text-3xl font-semibold text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-gavel text-[#4F46E5] text-3xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">입찰 중</dt>
                    <dd className="text-3xl font-semibold text-gray-900">5</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-check-circle text-[#4F46E5] text-3xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">입찰 종료</dt>
                    <dd className="text-3xl font-semibold text-gray-900">8</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">진행중인 프로젝트</h2>
          <div className="mt-4 grid gap-5">
            <Link to="./test">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-[#4F46E5]">2025년 법무자문 입찰</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">입찰마감일</p>
                        <p className="text-sm font-medium">2025.02.28</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">낙찰 통보예정일</p>
                        <p className="text-sm font-medium">2025.03.15</p>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-[#D6D2F2] text-[#4F46E5]">입찰 중</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">제안서 수신 로펌</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">김&amp;장</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">법무법인 광장</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">태평양</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">화우</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="./test">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-[#4F46E5]">해외 특허소송 대리인 선정</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">입찰마감일</p>
                        <p className="text-sm font-medium">2025.03.10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">낙찰 통보예정일</p>
                        <p className="text-sm font-medium">2025.03.25</p>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-[#D6D2F2] text-[#4F46E5]">입찰 중</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">제안서 수신 로펌</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">율촌</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">세종</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">화우</span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">태평양</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}