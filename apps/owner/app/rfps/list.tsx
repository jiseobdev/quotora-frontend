import { data, Link, useFetcher, useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/list";
import { fetchColleagues, fetchRfps } from "~/lib/fetch";
import { getAccessToken } from "~/auth.server";
import { STATUS_TO_CLASSNAME, STATUS_TO_LABEL } from "./constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import InviteModal from "./components/invite-modal";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const rfps =
    ([] as Rfp[])
      .concat(...(await Promise.all(Object.keys(STATUS_TO_LABEL).map((status) => fetchRfps(status, token)))))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const colleagues = await fetchColleagues(token);

  return data({ rfps, colleagues });
}

export default function List() {
  const { rfps = [], colleagues = [] } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedRfp = rfps.find((rfp) => rfp.id === selectedId);

  const handleCheckboxChange = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const finalize = (id: number) => {
    fetcher.submit({ id }, { method: 'post', action: `./${id}/finalize` })
    setSelectedId(null);
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      fetcher.load('.');
    }
  }, [fetcher]);

  const [emails, setEmails] = useState<string[]>([]);

  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <main id="main" className="pt-24 px-6 pb-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 flex items-center"
          disabled={selectedId === null || selectedRfp?.status !== 'WRITING'}
          onClick={() => navigate(`./${selectedId}/edit`)}
        >
          <i className="fa-solid fa-pen-to-square mr-2"></i>
          Edit
        </button>
        <button
          className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 flex items-center"
          disabled={selectedId === null || selectedRfp?.status !== 'WRITING'}
          onClick={() => {
            if (selectedId !== null) {
              finalize(selectedId)
            }
          }}
        >
          <i className="fa-solid fa-check-circle mr-2"></i>
          Finalize
        </button>
        <button
          className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 flex items-center"
          disabled={selectedId === null}
          onClick={openModal}
        >
          <i className="fa-solid fa-users mr-2"></i>
          Team Share
        </button>
        <button
          className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 flex items-center"
          disabled={selectedId === null || selectedRfp?.status !== 'WRITTEN'}
          onClick={() => navigate(`./${selectedId}/send`)}
        >
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
            {rfps.map((rfp) => (
              <tr key={rfp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded text-[#4F46E5]" checked={selectedId === rfp.id} onChange={() => handleCheckboxChange(rfp.id)} />
                </td>
                <td className="px-6 py-4">
                  <Link to={`./${rfp.id}`}>{rfp.name}</Link>
                </td>
                <td className="px-6 py-4">{format(rfp.updatedAt, 'P')}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${STATUS_TO_CLASSNAME[rfp.status]}`}>
                    {STATUS_TO_LABEL[rfp.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat(navigator.language, { style: "currency", currency: "KRW" }).format(rfp.estimatedCost)}
                </td>
                <td className="px-6 py-4">{rfp.rawfirms.join(', ')}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {rfp.status === "WRITING" && (
                      <>
                        <Link to={`./${rfp.id}/edit`} className="text-gray-400 hover:text-[#4F46E5]"><i className="fa-solid fa-pen"></i></Link>
                        <button className="text-gray-400 hover:text-[#4F46E5]" onClick={() => finalize(rfp.id)}><i className="fa-solid fa-check"></i></button>
                      </>
                    )}
                    {rfp.status === "WRITTEN" && (
                      <Link to={`./${rfp.id}/send`} className="text-gray-400 hover:text-[#4F46E5]">
                        <i className="fa-solid fa-paper-plane"></i>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link to="./new" className="inline-block px-6 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] items-center">
          <i className="fa-solid fa-plus mr-2"></i>
          Create New RFP
        </Link>
      </div>
      <InviteModal id={selectedId} open={modalOpened} values={emails} colleagues={colleagues} onOpenChange={setModalOpened} onValuesChange={setEmails} />
    </main>
  );
}