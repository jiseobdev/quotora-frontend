import { data, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/list";
import { fetchDashboard, fetchProposals } from '~/lib/fetch';
import { getAccessToken } from "~/auth.server";
import { STATUS_TO_LABEL } from "./constants";
import { format } from 'date-fns';

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const dashboard = await fetchDashboard(token);
  const proposals = {
    SENT: await fetchProposals('SENT', token),
    ONGOING_BIDDING: await fetchProposals('ONGOING_BIDDING', token),
    COMPLETED_BIDDING: await fetchProposals('COMPLETED_BIDDING', token),
  };

  return data({ dashboard, proposals });
}

export default function List() {
  const { dashboard, proposals } = useLoaderData<typeof loader>();

  return (
    <main className="py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Project 현황 대시보드</h1>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="text-[#4F46E5] text-3xl fa-solid fa-file-invoice"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">제안서 요청</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{dashboard.totalRequestProposals ?? 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="text-[#4F46E5] text-3xl fa-solid fa-gavel"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">입찰 중</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{dashboard.totalProposalProgress ?? 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="text-[#4F46E5] text-3xl fa-solid fa-flag-checkered"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">입찰 종료</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{dashboard.totalProposalCompleted ?? 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Object.entries(proposals).map(([status, proposalList]) => proposalList.length > 0 && (
          <div key={status} className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">{STATUS_TO_LABEL[status as ProposalStatus]}</h2>
            <div className="mt-4 grid gap-5">
              {proposalList.map((proposal) => (
                <div key={proposal.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-[#4F46E5]">{proposal.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">발주사: {proposal.ordererName}</p>
                      <div className="mt-2 grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">RFP 수신일</p>
                          <p className="text-sm font-medium">{format(new Date(proposal.createdAt), 'yyyy.MM.dd')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">응찰일</p>
                          <p className="text-sm font-medium">{format(new Date(proposal.sentAt), 'yyyy.MM.dd')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">입찰마감일</p>
                          <p className="text-sm font-medium">2025.03.01</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">낙찰통보 예정일</p>
                          <p className="text-sm font-medium">2025.03.15</p>
                        </div>
                      </div>
                    </div>
                    {!proposal.participate ? (
                      <Link to={`/projects/${proposal.id}/${proposal.nda ? 'rfp' : 'nda'}`} className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors">
                        RFP 내용 확인하기
                      </Link>
                    ) : (
                      <Link to={`/projects/${proposal.id}`} className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors">
                        프로젝트 바로가기
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}