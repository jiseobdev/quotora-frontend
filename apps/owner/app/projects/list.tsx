import { format } from 'date-fns';
import { data, Link, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import type { Route } from "./+types/list";
import { getAccessToken } from "~/auth.server";
import { STATUS_TO_CLASSNAME, STATUS_TO_LABEL } from './constants';
import { fetchRfps } from '~/lib/fetch';

async function fetchDashboard(token?: string) {
  const response = await fetch(new URL('/api/v1/orderer/rfps/dashboard', process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        null,
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  const result: { totalDraftRfps: number, totalBiddingRfps: number, totalClosedBiddingRfps: number } = await response.json();

  return result;
};

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const dashboard = await fetchDashboard(token);
  const rfps =
    ([] as Rfp[])
      .concat(...(await Promise.all(Object.keys(STATUS_TO_LABEL).map((status) => fetchRfps(status, token)))))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return data({
    dashboard,
    rfps,
  });
}

export default function List() {
  const { dashboard, rfps = [] } = useLoaderData<typeof loader>();
  const { totalDraftRfps = 0, totalBiddingRfps = 0, totalClosedBiddingRfps = 0 } = dashboard;

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
                    <dd className="text-3xl font-semibold text-gray-900">{totalDraftRfps}</dd>
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
                    <dd className="text-3xl font-semibold text-gray-900">{totalBiddingRfps}</dd>
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
                    <dd className="text-3xl font-semibold text-gray-900">{totalClosedBiddingRfps}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">진행중인 프로젝트</h2>
          <div className="mt-4 grid gap-5">
            {rfps.map((rfp) => (
              <Link key={rfp.id} to={`./${rfp.id}`}>
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-[#4F46E5]">{rfp.name}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">입찰마감일</p>
                          <p className="text-sm font-medium">{format(new Date(rfp.submissionDeadline), 'P')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">낙찰 통보예정일</p>
                          <p className="text-sm font-medium">{format(new Date(rfp.selectionNotificationDate), 'P')}</p>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${STATUS_TO_CLASSNAME[rfp.status]}`}>{STATUS_TO_LABEL[rfp.status]}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">제안서 수신 자문사</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {rfp.rawfirms.map((firm) => (
                        <span key={firm} className="px-2 py-1 text-sm bg-gray-100 rounded">{firm}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}