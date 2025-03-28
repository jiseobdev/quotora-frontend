import { data, Form, Link, replace, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import type { Route } from "./+types/nda";
import { getAccessToken } from "~/auth.server";
import { fetchProposal } from "~/lib/fetch";
import { format } from "date-fns";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const proposal = await fetchProposal(id, token);

  return data({ proposal });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const response = await fetch(new URL(`/api/v1/bidder/proposals/${id}/nda`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ ndaSigned: true })
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: { id }, response: await response.text() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return replace(`/projects/${id}/rfp`);
}

export default function Nda() {
  const { proposal } = useLoaderData<typeof loader>();
  const { rfp } = proposal;

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#4F46E5]">{proposal.name}</h3>
            <p className="mt-1 text-sm text-gray-600">발주사: {proposal.ordererName}</p>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">RFP 수신일</p>
                <p className="text-sm font-medium">{format(new Date(proposal.createdAt), 'yyyy.MM.dd')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">입찰마감일</p>
                <p className="text-sm font-medium">{format(new Date(rfp.submissionDeadline), 'yyyy.MM.dd')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">낙찰통보 예정일</p>
                <p className="text-sm font-medium">{format(new Date(rfp.selectionNotificationDate), 'yyyy.MM.dd')}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2">비밀유지 서약서 (Non-Disclosure Agreement)</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>본인은 [데이터센터 구축 프로젝트](이하 "입찰")과 관련하여 제공받는 모든 정보(이하 "비밀정보")가 <strong>삼성전자(이하 "발주자")</strong>의 기밀 정보임을 인정하며, 이에 대한 비밀 유지 의무를 다음과 같이 서약합니다.</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>본인은 본 입찰과 관련하여 제공되는 모든 비밀정보를 철저히 보호하고, 발주자의 사전 서면 동의 없이 제3자에게 공개하지 않습니다.</li>
                <li>본인은 비밀정보를 본 입찰의 검토 및 응찰 목적 이외의 용도로 사용하지 않습니다.</li>
                <li>본인은 소속된 조직의 임직원 및 관련 담당자들에게도 본 비밀유지 의무를 준수하도록 안내하며, 이를 위반할 경우 이에 대한 책임을 집니다.</li>
                <li>본인은 본 NDA 위반 시 발주자가 법적 조치를 취할 수 있으며, 이에 따른 책임을 부담할 수 있음을 인정합니다.</li>
                <li>본인은 본 NDA에 동의하지 않을 시에 발주자가 발송한 RFP를 확인할 수 없음을 이해합니다.</li>
              </ol>
            </div>
          </div>
          <Form method="POST" className="flex justify-end space-x-4">
            <Link to="/projects" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              동의하지 않음
            </Link>
            <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors">
              동의함
            </button>
          </Form>
        </div>
      </div>
    </main>
  );
}
