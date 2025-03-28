import { useState } from "react";
import type { Route } from "./+types/send";
import { getAccessToken } from "~/auth.server";
import { fetchRfp } from "~/lib/fetch";
import { data, Form, redirect, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import { format } from "date-fns";
import { nl2br } from "~/lib/string";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const rfp = await fetchRfp(id, token);

  return data({
    rfp,
  });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const rawfirmNames = formData.getAll('rawfirmNames');
  const rawfirmEmails = formData.getAll('rawfirmEmails');

  const rawfirms = rawfirmNames.map((name, index) => ({
    name,
    email: rawfirmEmails[index],
  }));

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/send`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      rawfirms,
    }),
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      { request: { rawfirms }, response: await response.json() },
    );
  }

  return redirect('/rfps');
}

export default function Send({ params: { id } }: Route.ComponentProps) {
  const { rfp } = useLoaderData<typeof loader>();

  const [rawfirms, setRawfirms] = useState<{ name: string; email: string; canFixName: boolean }[]>(
    rfp.rawfirms.map((rawfirm) => ({ name: rawfirm, email: '', canFixName: false }))
  );

  const addRawfirms = () => {
    setRawfirms([...rawfirms, { name: '', email: '', canFixName: true }]);
  };

  const removeRawfirms = (index: number) => {
    setRawfirms(rawfirms.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, key: "name" | "email", event: React.ChangeEvent<HTMLInputElement>) => {
    const newRawfirms = [...rawfirms];
    newRawfirms[index][key] = event.target?.value;
    setRawfirms(newRawfirms);
  };

  return (
    <main className="bg-gray-50 pt-24 px-6 pb-6">
      <Form method="POST" className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex gap-4">
            {rawfirms.map((rawfirm, index) => (
              <div key={index} className="flex flex-col gap-2">
                {rawfirm.canFixName ? (
                  <input name="rawfirmNames" type="text" value={rawfirm.name} className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder="추가 자문사명" onChange={(e) => handleInputChange(index, "name", e)} />
                ) : (
                  <>
                    <label className="flex-1 block w-full px-4 py-2 font-medium text-gray-700">{rawfirm.name}</label>
                    <input name="rawfirmNames" type="hidden" value={rawfirm.name} />
                  </>
                )}
                {index === rawfirms.length - 1 ? (
                  <div className="flex flex-1 gap-2">
                    <input name="rawfirmEmails" type="email" value={rawfirm.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder={rawfirm.canFixName ? '추가 자문사 이메일' : `${rawfirm.name} 이메일`} onChange={(e) => handleInputChange(index, "email", e)} />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200" onClick={addRawfirms}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                ) : (
                  <input name="rawfirmEmails" type="email" value={rawfirm.email} className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder={rawfirm.canFixName ? '추가 자문사 이메일' : `${rawfirm.name} 이메일`} onChange={(e) => handleInputChange(index, "email", e)} />
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">RFP 송부본</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">프로젝트명</p>
                  <p>{rfp.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">예상 일정</p>
                  <p>{format(new Date(rfp.expectedSchedule), 'yyyy.MM.dd')} 까지</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">프로젝트 개요</p>
                <p>{nl2br(rfp.overview)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">원하는 자문의 내용</p>
                <p>{nl2br(rfp.desiredLegalAdvice)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">특별 요구사항</p>
                <p>{nl2br(rfp.specialRequirements)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">RFP 제출마감일</p>
                  <p>{format(new Date(rfp.submissionDeadline), 'yyyy.MM.dd')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">자문사 선정 통보예정일</p>
                  <p>{format(new Date(rfp.selectionNotificationDate), 'yyyy.MM.dd')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">구두 프리젠테이션 여부</p>
                <p>{rfp.oralPresentation ? '필요' : '없음'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">선정기준</p>
                <ul className="list-disc list-inside">
                  {rfp.selectionCriteria.map((item) => (
                    <li key={item.name}>{item.name} ({item.weight}%)</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]">
              <i className="mr-2 fa-regular fa-paper-plane"></i>송부하기
            </button>
          </div>
        </div>
      </Form>
    </main>
  );
}