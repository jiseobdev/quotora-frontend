import type { Route } from "./+types/rfp";
import { getAccessToken } from "~/auth.server";
import { fetchProposal } from "~/lib/fetch";
import { data, Form, replace, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { getDDay } from "~/lib/date";
import { nl2br } from "~/lib/string";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const proposal = await fetchProposal(id, token);

  return data({ proposal });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const reason = formData.getAll('reason').join('');

  const response = await fetch(new URL(`/api/v1/bidder/proposals/${id}/${request.method === "POST" ? 'participate' : 'reject'}`, process.env.BACKEND_API_URL), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: reason ? JSON.stringify({ reason }) : null
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: { id, reason, method: request.method }, response: await response.json() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return replace(request.method === 'POST' ? `/projects/${id}` : '/projects');
}

export default function Rfp() {
  const { proposal } = useLoaderData<typeof loader>();
  const { rfp } = proposal;

  return (
    <main className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-[#4F46E5]">{proposal.name}</h3>
              <div className="mt-4 flex space-x-8">
                <div className="flex items-center">
                  <i className="text-[#4F46E5] mr-2 fa-solid fa-clock"></i>
                  <span className="text-sm">입찰 마감: {getDDay(new Date(rfp.submissionDeadline))}</span>
                </div>
                <div className="flex items-center">
                  <i className="text-[#4F46E5] mr-2 fa-solid fa-calendar"></i>
                  <span className="text-sm">확정 통보: {getDDay(new Date(rfp.selectionNotificationDate))}</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">프로젝트명</h4>
                    <p className="text-sm text-gray-600">{rfp.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">예상 소요기간</h4>
                    <p className="text-sm text-gray-600">{rfp.expectedSchedule}</p>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">프로젝트 개요</h4>
                <p className="text-sm text-gray-600">{nl2br(rfp.overview)}</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">원하는 자문의 내용</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  {rfp.desiredLegalAdvice.split('\n').map((legalAdvice, index) => (
                    <li key={index}>{legalAdvice}</li>
                  ))}
                </ul>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-700 mb-2">특별 요구사항</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  {rfp.specialRequirements.split('\n').map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">구두 프리젠테이션</h4>
                <p className="text-sm text-gray-600">{rfp.oralPresentation ? '필요' : '없ㅇ ㅁ'}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    거절하기
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div id="survey-modal" className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <Form method="DELETE" className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          {proposal.ordererName}가 {proposal.lawfirmName}님의 제안서를 기다리고 있습니다.
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          정말 제안서를 제출하지 않으실건가요? 이유를 알려주실 수 있을까요?
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input type="radio" id="conflict" name="reason" className="h-4 w-4 text-[#4F46E5] border-gray-300 focus:ring-[#4F46E5]" value="기존고객과 이해상충 이슈가 있습니다." />
                          <label htmlFor="conflict" className="ml-3 text-sm text-gray-700">기존고객과 이해상충 이슈가 있습니다.</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="other" name="reason" className="h-4 w-4 text-[#4F46E5] border-gray-300 focus:ring-[#4F46E5]" value="" />
                          <label htmlFor="other" className="ml-3 text-sm text-gray-700">기타 사유</label>
                        </div>
                        <div className="mt-3">
                          <textarea name="reason" className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F46E5] focus:ring-[#4F46E5] text-sm" rows={3} placeholder="기타 사유를 입력해주세요"></textarea>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <AlertDialogCancel>
                          <button type="reset" className="px-4 py-2 text-sm font-medium text-[#4F46E5] bg-[#F5F3FF] rounded-md hover:bg-[#EDE9FE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]">
                            입찰 참가하기
                          </button>
                        </AlertDialogCancel>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-md hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]">
                          참가하지 않기
                        </button>
                      </div>
                    </Form>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
              <Form method="POST">
                <button type="submit" className="px-6 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors">
                  입찰 참가하기
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}