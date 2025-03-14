import { Link } from "react-router";

export default function List() {
  return (
    <main id="main" className="pt-24 px-6 pb-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] flex items-center">
          <i className="fa-solid fa-pen-to-square mr-2"></i>
          Edit
        </button>
        <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] flex items-center">
          <i className="fa-solid fa-check-circle mr-2"></i>
          Finalize
        </button>
        <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] flex items-center">
          <i className="fa-solid fa-users mr-2"></i>
          Team Share
        </button>
        <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] flex items-center">
          <i className="fa-solid fa-paper-plane mr-2"></i>
          Send RFP
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-6 py-3 text-xs font-medium text-gray-500">순서</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">프로젝트명</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">최종수정일</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">상태</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">비용예상액</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">수신로펌 범위</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <input type="checkbox" className="rounded text-[#4F46E5]" />
              </td>
              <td className="px-6 py-4">
                <Link to="./test">특허 소송 대응</Link>
              </td>
              <td className="px-6 py-4">2025.02.15</td>
              <td className="px-6 py-4"><span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full text-sm">초안</span></td>
              <td className="px-6 py-4">₩50,000,000</td>
              <td className="px-6 py-4">특허전문, 규모 상위 4개사</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-pen"></i></button>
                  <button className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-check"></i></button>
                  <Link to="./test/send" className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-paper-plane"></i></Link>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <input type="checkbox" className="rounded text-[#4F46E5]" />
              </td>
              <td className="px-6 py-4">
                <Link to="./test">
                  기업 인수 자문
                </Link>
              </td>
              <td className="px-6 py-4">2025.02.14</td>
              <td className="px-6 py-4"><span className="px-2 py-1 text-green-700 bg-green-100 rounded-full text-sm">확정</span></td>
              <td className="px-6 py-4">₩100,000,000</td>
              <td className="px-6 py-4">김&amp;장, 광장, 화우</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-pen"></i></button>
                  <button className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-check"></i></button>
                  <Link to="./test/send" className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-paper-plane"></i></Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link to="./new" className="inline-block px-6 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] flex items-center">
          <i className="fa-solid fa-plus mr-2"></i>
          Create New RFP
        </Link>
      </div>
    </main>
  );
}