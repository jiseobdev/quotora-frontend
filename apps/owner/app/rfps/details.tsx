import { data, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/details";
import { getAccessToken } from "~/auth.server";
import { format } from "date-fns";
import { fetchComments, fetchRfp } from "~/lib/fetch";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const rfp = await fetchRfp(id, token);
  const comments = await fetchComments(id, token);

  return data({
    rfp,
    comments,
  });
}

export default function Details({ params: { id } }: Route.ComponentProps) {
  const { rfp, comments } = useLoaderData<typeof loader>();
  const commentsFetcher = useFetcher();

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">RFP 검토</h1>
          <p className="text-sm text-gray-500">최종 수정: {format(new Date(rfp.updatedAt), 'yyyy.MM.dd HH:mm:ss')}</p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700">
          <i className="fa-regular fa-pen-to-square mr-1"></i>
          수정
        </button>
      </div>
      <div id="rfp-details" className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">RFP 조항</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">프로젝트명</h3>
              <p className="text-gray-600">{rfp.name}</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-900">예상일정</h3>
              <p className="text-gray-600">{rfp.expectedSchedule}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">프로젝트 개요</h3>
            <p className="text-gray-600">{rfp.overview}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">원하는 법률자문의 내용</h3>
            <p className="text-gray-600">{rfp.desiredLegalAdvice}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">특별 요구사항</h3>
            <p className="text-gray-600">{rfp.specialRequirements}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">RFP 제출마감일</h3>
              <p className="text-gray-600">{format(new Date(rfp.submissionDeadline), 'yyyy.MM.dd')}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">자문사 선정 통보예정일</h3>
              <p className="text-gray-600">{format(new Date(rfp.selectionNotificationDate), 'yyyy.MM.dd')}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">구두 프레젠테이션 여부</h3>
            <p className="text-gray-600">{rfp.oralPresentation ? '필요' : '없음'}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">선정기준</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {rfp.selectionCriteria.map((item) => (
                <li key={item.name}>{item.name} ({item.weight}%)</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">RFP 수신 관련</h3>
            <p className="text-gray-600">{rfp.rawfirms.join(', ')}</p>
          </div>
        </div>
      </div>
      <div id="comments" className="mt-6 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-8 h-8 rounded-full mr-3" alt="User" />
                <span className="font-medium">{comment.user.name}</span>
              </div>
              <span className="text-sm text-gray-500">{format(new Date(comment.createdAt), 'yyyy.MM.dd HH:mm:ss')}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
            <div className="flex items-center mt-2 space-x-4">
              {/* <button className="text-sm text-gray-600 hover:text-gray-800">답글</button> */}
              {/* <button className="text-sm text-gray-600 hover:text-gray-800">수정</button> */}
              <button
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => {
                  commentsFetcher.submit({ id: comment.id }, { method: 'delete' });
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}