import { Link } from "react-router";

export default function List() {
  return (
    <main id="proposals-list" className="py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Proposals</h1>
          <div className="flex space-x-3">
            <Link to="./new" className="px-4 py-2 bg-[#5B21B6] text-white rounded-md hover:bg-[#4C1D95]">
              <i className="mr-2 fa-solid fa-plus"></i>Create New Proposal
            </Link>
            <button className="px-4 py-2 bg-[#6D28D9] text-white rounded-md hover:bg-[#5B21B6]">
              <i className="mr-2 fa-solid fa-users"></i>Team Share
            </button>
            <button className="px-4 py-2 bg-[#64748B] text-white rounded-md hover:bg-[#475569]">
              <i className="mr-2 fa-solid fa-pen-to-square"></i>Edit
            </button>
            <button className="px-4 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#4F46E5]">
              <i className="mr-2 fa-solid fa-check"></i>Finalize
            </button>
            <Link to="./test/send" className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
              <i className="mr-2 fa-solid fa-paper-plane"></i>Send Proposal
            </Link>
            <button className="px-4 py-2 bg-[#64748B] text-white rounded-md hover:bg-[#475569]">
              <i className="mr-2 fa-solid fa-trash"></i>Delete
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트명</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">발주자 회사명</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFP 수신일</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최종 수정일</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">스마트팩토리 구축 프로젝트</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">삼성전자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.25</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">작성전</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-[#4F46E5] hover:text-[#4338CA]">
                    <i className="mr-1 fa-solid fa-pen"></i>작성하기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">클라우드 마이그레이션</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">현대자동차</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.24</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">작성중</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-[#4F46E5] hover:text-[#4338CA]">검토하기</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">보안시스템 고도화</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LG전자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025.02.23</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">확정</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-[#4F46E5] hover:text-[#4338CA]">검토하기</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}