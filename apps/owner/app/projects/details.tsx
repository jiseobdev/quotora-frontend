import { data, Link, UNSAFE_ErrorResponseImpl, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/details";
import { getAccessToken } from "~/auth.server";
import { differenceInCalendarDays, format } from "date-fns";
import { fetchCurrentUser, fetchQnas, fetchRfp } from "~/lib/fetch";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { PROPOSAL_STATUS_TO_LABEL } from "./constants";
import { nl2br } from "~/lib/string";

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

async function fetchProposals(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/proposals`, process.env.BACKEND_API_URL), {
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

  const result: Proposal[] = await response.json();

  return result;
}

async function fetchNotices(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/notices`, process.env.BACKEND_API_URL), {
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

  const result: Notice[] = await response.json();

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

  const result: Review[] = await response.json();

  return result;
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = Buffer.from(payloadBase64, 'base64url').toString('utf-8');

    return JSON.parse(payload);
  } catch (error) {
    return {};
  }
}

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const user = await fetchCurrentUser(token);
  const rfp = await fetchRfp(id, token);
  const proposals = await fetchProposals(id, token);
  const notices = await fetchNotices(id, token);
  const reviews = await fetchReviews(id, token);

  const qnaLists = await Promise.all(proposals.map((proposal) => fetchQnas(id, proposal.id.toString(), token)));
  const qnas = Object.fromEntries(proposals.map((proposal, index) => [proposal.id.toString(), qnaLists[index]]));

  return data({
    user,
    rfp,
    proposals,
    notices,
    reviews,
    qnas,
  });
}

export default function Details({ params: { id } }: Route.ComponentProps) {
  const loaderData = useLoaderData<typeof loader>();
  const { data: reviewsData, Form: ReviewsForm } = useFetcher<{ reviews: Review[] }>();
  const { data: noticesData, Form: NoticesForm } = useFetcher<{ notices: Notice[] }>();
  const { data: selectsData, submit: selectsSubmit } = useFetcher<{ success: boolean }>();
  const { data: qnasData, Form: QnAsForm, submit: submitQnAs } = useFetcher<{ success: boolean; proposalId: string | number; }>();

  const { user, rfp, proposals, qnas } = loaderData;
  const notices = noticesData?.notices ?? loaderData.notices;
  const reviews = reviewsData?.reviews ?? loaderData.reviews;

  const participatedProposals = proposals.filter((proposal) => proposal.nda && proposal.participate);

  const selectProposal = async (proposalId: number) => {
    const selectedProposal = participatedProposals.filter((proposal) => proposal.id === proposalId)[0];

    await selectsSubmit(null, { action: `./proposals/${proposalId}/select`, method: 'POST' });
    await submitQnAs({
      content: `안녕하세요.\
저희 회사의 [${rfp.name}] 입찰에 대해 검토한 결과, [${selectedProposal.lawfirmName}]님을 선정하게 되었음을 기쁜 마음으로 알려드립니다. 함께 진행할 수 있게 되어 매우 기대됩니다.\
계약 조건을 반영한 자문 계약서를 보내주시면 초안을 검토한 후 다시 연락드리겠습니다.\
감사합니다.\
[${user.companyName}] 드림`
    }, { action: `./proposals/${proposalId}/qnas`, method: 'POST' });

    //     const restProposals = participatedProposals.filter((proposal) => proposal.id !== proposalId);

    //     for (const proposal of restProposals) {
    //       await selectsSubmit(null, { action: `./proposals/${proposal.id}/unselect`, method: 'POST' });
    //       await submitQnAs({
    //         content: `안녕하세요.\
    // 저희 회사의 [${rfp.name}] 입찰에 대해 검토한 결과, 이번에는 함께 진행할 수 없음을 알려드립니다. 관심 가져주시고 시간을 내어주셔서 감사합니다.\
    // 추후 다른 기회가 있을 때 다시 연락드리겠습니다.\
    // 감사합니다.\
    // [${user.companyName}] 드림`
    //       }, { action: `./proposals/${proposalId}/qnas`, method: 'POST' });
    //     }
  };
  const unselectProposal = async (proposalId: number) => {
    const unselectedProposal = participatedProposals.filter((proposal) => proposal.id === proposalId)[0];

    await selectsSubmit(null, { action: `./proposals/${unselectedProposal.id}/unselect`, method: 'POST' });
    await submitQnAs({
      content: `안녕하세요.\
저희 회사의 [${rfp.name}] 입찰에 대해 검토한 결과, 이번에는 함께 진행할 수 없음을 알려드립니다. 관심 가져주시고 시간을 내어주셔서 감사합니다.\
추후 다른 기회가 있을 때 다시 연락드리겠습니다.\
감사합니다.\
[${user.companyName}}] 드림`
    }, { action: `./proposals/${proposalId}/qnas`, method: 'POST' });
  };

  const noticesFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (noticesFormRef.current) {
      noticesFormRef.current.reset();
    }
  }, [noticesData]);

  const reviewsFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (reviewsFormRef.current) {
      reviewsFormRef.current.reset();
    }
  }, [reviewsData]);

  const qnaFormRefs = useRef<Record<string, HTMLFormElement | null>>({});

  useEffect(() => {
    if (qnasData?.proposalId && qnaFormRefs.current[qnasData.proposalId.toString()]) {
      qnaFormRefs.current[qnasData.proposalId.toString()]?.reset();
    }
  }, [qnasData]);

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
          <NoticesForm action="./notices" method="POST" ref={noticesFormRef} className="mt-6 flex flex-col gap-4">
            {notices.length > 0 && (
              <div className="-mx-6 p-6 border-y border-gray-200 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-500 mb-3">공지사항</h3>
                <div className="space-y-3">
                  {notices.map((notice, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <span>{notice.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <input type="text" name="content" className="flex-1 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="일자 변경, 사무실 위치 및 주차 안내 등 공지사항 등 기재" />
            <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">공지 올리기</button>
          </NoticesForm>
        </div>
        <div id="bid-management" className="mt-8">
          <h2 className="text-xl font-semibold mb-6">입찰 절차 관리</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">자문사명</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">NDA동의 &amp; 응찰여부</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">제안서</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">선정여부</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">메시지</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td className="px-4 py-4">
                      {(proposal.nda && proposal.participate) ? (
                        <Link to={{ hash: `#${proposal.id}` }}>{proposal.lawfirmName}</Link>
                      ) : (
                        proposal.lawfirmName
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {proposal.nda ? (<i className="fa-solid fa-check text-green-500"></i>) : (<i className="fa-solid fa-xmark text-red-500"></i>)}
                      &nbsp;/&nbsp;
                      {proposal.participate ? (<i className="fa-solid fa-check text-green-500"></i>) : (<i className="fa-solid fa-xmark text-red-500"></i>)}
                    </td>
                    {proposal.nda && proposal.participate ?
                      (<>
                        <td className="px-4 py-4 text-center">
                          {(proposal.files.length ?? 0) > 0 ? (<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">제출완료</span>) : (<span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">미제출</span>)}
                        </td>
                        <td className="px-4 py-4 text-center"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{PROPOSAL_STATUS_TO_LABEL[proposal.status]}</span></td>
                        <td className="px-4 py-4 text-center">
                          {proposal.status === 'REVIEWING' ? (
                            <div className="flex justify-center gap-2">
                              <button
                                type="button"
                                className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600"
                                onClick={() => selectProposal(proposal.id)}
                              >
                                Y
                              </button>
                              <button
                                type="button"
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
                                onClick={() => unselectProposal(proposal.id)}
                              >
                                N
                              </button>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button className="px-3 py-1 text-xs bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400" disabled>
                            <i className="fa-solid fa-message mr-1"></i>연락하기
                          </button>
                        </td>
                      </>) :
                      (<>
                        <td className="px-4 py-4 text-center">-</td>
                        <td className="px-4 py-4 text-center">-</td>
                        <td className="px-4 py-4 text-center">-</td>
                        <td className="px-4 py-4 text-center">-</td>
                      </>)
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="communication-section" className="mt-6 space-y-4">
            {participatedProposals.map((proposal) => (
              <div key={proposal.id} id={proposal.id.toString()} className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">{proposal.lawfirmName} 제안서</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center mb-4">
                        <i className="text-[#4F46E5] mr-2 fa-regular fa-paper-plane"></i>
                        <span className="text-sm">발송일: {format(new Date(proposal.updatedAt), 'yyyy.MM.dd HH:mm:ss')}</span>
                      </div>
                      {/* <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg">
                      <i className="mr-2 fa-solid fa-eye"></i>제안서 보기
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg">
                      <i className="mr-2 fa-solid fa-download"></i>PDF 다운로드
                    </button>
                  </div> */}
                    </div>
                    <div className="space-y-4">
                      {/* <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">추가 발송 메일</h4>
                    <input type="email" className="w-full rounded-lg border-gray-300 text-sm" placeholder="추가 수신인 이메일 입력" />
                  </div> */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium mb-2">추가 파일</h4>
                        <div className="flex flex-col gap-2">
                          {proposal.files.map((file) => (
                            <Link key={file.id} to={file.url} target="_blank" className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className={`text-[#4F46E5] mr-2 fa-regular ${'pdf,docx,xlsx'.includes(file.name.split('.').at(-1) ?? 'undefined') ? `fa-file-${file.name.split('.').at(-1)}` : 'fa-file'}`}></i>
                                <span className="text-sm">{file.name}</span>
                              </div>
                              <Link to={file.url} target="_blank" className="text-[#4F46E5]">
                                <i className="fa-solid fa-download"></i>
                              </Link>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <h3 className="text-lg font-medium mb-6">{proposal.lawfirmName}와 연락하기</h3>
                  {qnas[proposal.id].map((qna) => (
                    <div key={qna.question.id} className="flex flex-col space-y-3">
                      <div className={clsx('p-4 rounded-lg', qna.question.user.companyName === proposal.ordererName ? 'bg-blue-50 ml-6' : 'bg-gray-50 mr-6')}>
                        <div className={clsx('flex justify-between items-center mb-2', qna.question.user.companyName === proposal.ordererName ? 'text-blue-600' : 'text-gray-600')}>
                          <span className="text-xs">
                            {qna.question.user.companyName === proposal.ordererName ? '발주자' : '입찰자'} 질의 ({format(new Date(qna.question.createdAt), 'yyyy.MM.dd')})
                          </span>
                          <i className={clsx('fa-solid', qna.question.user.companyName === proposal.ordererName ? 'fa-arrow-right' : 'fa-arrow-left')}></i>
                        </div>
                        <p className="text-sm text-gray-700">{nl2br(qna.question.content)}</p>
                      </div>
                      {qna.answer && (
                        <div className={clsx('p-4 rounded-lg', qna.answer.user.companyName === proposal.ordererName ? 'bg-blue-50 ml-6' : 'bg-gray-50 mr-6')}>
                          <div className={clsx('flex justify-between items-center mb-2', qna.answer.user.companyName === proposal.ordererName ? 'text-blue-600' : 'text-gray-600')}>
                            <span className="text-xs">답변 완료 ({format(new Date(qna.answer.createdAt), 'yyyy.MM.dd')})</span>
                            <i className={clsx('fa-solid', qna.answer.user.companyName === proposal.ordererName ? 'fa-arrow-right' : 'fa-arrow-left')}></i>
                          </div>
                          <p className="text-sm text-gray-900">{nl2br(qna.answer.content)}</p>
                        </div>
                      )}
                      {!qna.answer && qna.question.user.type === 'BIDDER' && (
                        <QnAsForm action={`./proposals/${proposal.id}/qnas`} method="POST" className="flex gap-2 ml-6">
                          <input name="questionId" type="hidden" value={qna.question.id} />
                          <input name="content" type="text" className="flex-grow rounded-lg px-4 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="답변을 입력하세요" />
                          <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg">
                            <i className="fa-regular fa-paper-plane"></i>
                          </button>
                        </QnAsForm>
                      )}
                    </div>
                  ))}
                  <QnAsForm action={`./proposals/${proposal.id}/qnas`} method="POST" ref={(el) => { qnaFormRefs.current[proposal.id.toString()] = el; }} className="space-y-3">
                    <textarea name="content" className="w-full rounded-md px-4 py-2 ounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={2} placeholder="질문을 입력하세요"></textarea>
                    <div className="flex justify-end">
                      <button type="submit" className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                        전송하기
                      </button>
                    </div>
                  </QnAsForm>
                </div>
              </div>
            ))}
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
              {/* <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">제안서 분석하기</button> */}
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
                        {/* <div className="flex gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800">수정</button>
                          {user.id === review.reviewer.id && (
                            <button
                              className="text-sm text-red-600 hover:text-red-800"
                              onClick={() => submitReview({ id: review.id }, { action: './reviews', method: 'DELETE' })}
                            >
                              삭제
                            </button>
                          )}
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-700">{review.content}</p>
                    </div>
                  ))}
                  <ReviewsForm ref={reviewsFormRef} className="mt-4" method="POST" action="./reviews">
                    <textarea name="content" className="w-full rounded-md px-4 py-2 ounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={3} placeholder="의견을 입력하세요"></textarea>
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
