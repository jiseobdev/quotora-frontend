import { data, UNSAFE_ErrorResponseImpl, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/details";
import { getAccessToken } from "~/auth.server";
import { differenceInCalendarDays } from "date-fns";

interface Rfp {
  id: number;
  name: string;
  overview: string;
  desiredLegalAdvice: string;
  specialRequirements: string;
  expectedSchedule: string;
  submissionDeadline: string;
  selectionNotificationDate: string;
  oralPresentation: boolean;
  rawfirms: string[];
  selectionCriteria: { name: string; weight: number; }[];
  estimatedCost: number;
  status: "WRITING" | "WRITTEN" | "BIDDING" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

interface Proposal {
  id: number;
  lawfirmName: string;
  nda: boolean;
  participate: boolean;
  files: [];
  status: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  rfpId: number;
  ordererName: string;
  expectedSchedule: string;
  overview: string;
  desiredLegalAdvice: string;
  specialRequirements: string;
  oralPresentation: boolean;
  sentAt: string;
}

interface Review {
  id: number;
  content: string;
  reviewer: { name: string };
  createdAt: string;
}

function getDDay(targetDate: Date): string {
  const today = new Date();
  const diff = differenceInCalendarDays(targetDate, today);

  if (diff > 0) {
    return `D-${diff}`;
  } else if (diff === 0) {
    return 'D-Day';
  } else {
    return `D+${Math.abs(diff)}`;
  }
}

async function fetchRfp(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Rfp = await response.json();

  return result;
}

async function fetchProposals(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/proposals`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Proposal[] = await response.json();

  return result;
}

async function fetchReviews(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/reviews`, process.env.BACKEND_API_URL), {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Review[] = await response.json();

  return result;
}

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const rfp = await fetchRfp(id, token);
  const proposals = await fetchProposals(id, token);
  const reviews = await fetchReviews(id, token);

  return data({
    rfp,
    proposals,
    reviews,
  });
}

export default function Details({ params: { id } }: Route.ComponentProps) {
  const loaderData = useLoaderData<typeof loader>();
  const { data: reviewsData, Form: ReviewsForm } = useFetcher<{ reviews: Review[] }>();

  const { rfp, proposals } = loaderData;
  const reviews = reviewsData?.reviews ?? loaderData.reviews;

  const proposalsByRawfirms = Object.fromEntries(
    rfp.rawfirms.map((firmName) => ([firmName, proposals.find((proposal) => proposal.lawfirmName === firmName)]))
  );

  return (
    <main className="py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{rfp.name}</h1>
            <div className="flex gap-4">
              <div className="text-center">
                <span className="text-sm text-gray-500">입찰마감</span>
                <p className="text-lg font-semibold text-red-600">{getDDay(new Date(rfp.submissionDeadline))}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500">확정통보</span>
                <p className="text-lg font-semibold text-blue-600">{getDDay(new Date(rfp.selectionNotificationDate))}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <input type="text" className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="일자 변경, 사무실 위치 및 주차 안내 등 공지사항 등 기재" />
            <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">공지올리기</button>
          </div>
        </div>
        <div id="bid-management" className="mt-8">
          <h2 className="text-xl font-semibold mb-6">입찰 절차 관리</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">로펌명</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NDA동의 &amp; 응찰여부</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제안서</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">선정여부</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">메시지</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rfp.rawfirms.map((firm) => (
                  <tr key={firm}>
                    <td className="px-4 py-4">{firm}</td>
                    <td className="px-4 py-4">
                      {proposalsByRawfirms[firm]?.nda ? (<i className="fa-solid fa-check text-green-500"></i>) : (<i className="fa-solid fa-xmark text-red-500"></i>)}
                      /
                      {proposalsByRawfirms[firm]?.participate ? (<i className="fa-solid fa-check text-green-500"></i>) : (<i className="fa-solid fa-xmark text-red-500"></i>)}
                    </td>
                    {proposalsByRawfirms[firm]?.nda && proposalsByRawfirms[firm]?.participate ?
                      (<>
                        <td className="px-4 py-4">
                          {(proposalsByRawfirms[firm]?.files.length ?? 0) > 0 ? (<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">제출완료</span>) : (<span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">미제출</span>)}
                        </td>
                        <td className="px-4 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{proposalsByRawfirms[firm]?.status}</span></td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600">Y</button>
                            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600">N</button>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button className="px-3 py-1 text-xs bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                            <i className="fa-solid fa-message mr-1"></i>연락하기
                          </button>
                        </td>
                      </>) :
                      (<>
                        <td className="px-4 py-4">-</td>
                        <td className="px-4 py-4">-</td>
                        <td className="px-4 py-4">-</td>
                        <td className="px-4 py-4">-</td>
                      </>)
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="communication-section" className="mt-6 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">김&amp;장 커뮤니케이션</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-blue-600">입찰자 질의 (2025.01.15)</span>
                      <i className="fa-solid fa-arrow-right text-blue-600"></i>
                    </div>
                    <p className="text-sm text-gray-700">프로젝트 수행 인력 구성에 대해 추가 문의드립니다.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg ml-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">답변 완료 (2025.01.16)</span>
                      <i className="fa-solid fa-arrow-left text-gray-600"></i>
                    </div>
                    <p className="text-sm text-gray-900">프로젝트 리더는 15년 경력의 파트너 변호사가 담당하며, 실무진은 5년 이상 경력의 변호사 2인으로 구성됩니다.</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">추가 답변하기</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">법무법인 광장 커뮤니케이션</h3>
              </div>
              <div className="space-y-3">
                <textarea className="w-full rounded-md border-gray-300" rows={2} placeholder="메모 또는 코멘트를 입력하세요"></textarea>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">임시 저장</button>
                  <button className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">전송하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="proposal-review" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">제안서 검토</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">선정기준:</span>
                <span className="ml-2">{rfp.selectionCriteria.map((criteria) => `${criteria.name} ${criteria.weight}%`).join(' | ')}</span>
              </div>
              <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">제안서 분석하기</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* <div className="grid grid-cols-3 gap-4">
                {rfp.selectionCriteria.map((criteria) => (
                  <div key={criteria.name} className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-2">{criteria.name}</h4>
                    <div className="space-y-2">
                      {proposals.filter((proposal) => proposal.nda && proposal.participate).map((proposal) => (
                        <div key={proposal.lawfirmName} className="flex justify-between items-center">
                          <span>{proposal.lawfirmName}</span>
                          <span className="font-medium">0/50</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium mb-4">종합 평가</h4>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">김&amp;장이 총점 91점으로 가장 높은 점수를 획득했습니다. 법률자문 비용이 1억까지는 김&amp;장이 저렴하지만 1억이 넘어가면 법무법인 광장이 더 저렴합니다. 최근 3년간 유사 프로젝트 수행 이력이 김&amp;장이 더 많아 전문성에서 우위를 보였습니다.</p>
                </div>
              </div> */}
              <div id="team-comments">
                <h4 className="text-lg font-medium mb-4">팀원 의견</h4>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{review.reviewer.name}</span>
                        <div className="flex gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800">수정</button>
                          <button className="text-sm text-red-600 hover:text-red-800">삭제</button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.content}</p>
                    </div>
                  ))}
                  <ReviewsForm className="mt-4" method="POST" action="./reviews">
                    <textarea className="w-full rounded-md border-gray-300" rows={3} placeholder="의견을 입력하세요"></textarea>
                    <div className="mt-2 flex justify-end">
                      <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">의견 등록</button>
                    </div>
                  </ReviewsForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}