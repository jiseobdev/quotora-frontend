import { data, Form, Link, replace, UNSAFE_ErrorResponseImpl, useActionData, useFetcher, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/details";
import { getAccessToken } from "~/auth.server";
import { fetchNotices, fetchProposal, fetchQnas } from "~/lib/fetch";
import { getDDay } from "~/lib/date";
import { format } from "date-fns";
import clsx from "clsx";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "~/components/ui/file-upload";
import { useEffect, useRef, useState } from "react";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { MAX_FILES } from "./constants";
import { nl2br } from "~/lib/string";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const proposal = await fetchProposal(id, token);
  const notices = await fetchNotices(proposal.rfp.id, token);
  const qnas = await fetchQnas(proposal.rfp.id, id, token);

  if (!proposal.nda) {
    return replace(`/projects/${id}/nda`);
  }

  if (!proposal.participate) {
    return replace(`/projects/${id}/rfp`);
  }

  return data({ proposal, notices, qnas });
}

// async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
//   const reader = stream.getReader();
//   const chunks: Uint8Array[] = [];
//   let done = false;

//   while (!done) {
//     const { value, done: readerDone } = await reader.read();
//     if (value) {
//       chunks.push(value);
//     }
//     done = readerDone;
//   }

//   return Buffer.concat(chunks);
// }

// async function convertToFile(fileUpload: FileUpload) {
//   const buffer = await streamToBuffer(fileUpload.stream());
//   return new File([buffer], fileUpload.name, { type: fileUpload.type });
// }

// async function uploadFile(id: string | number, file: File, token?: string) {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await fetch(new URL(`/api/v1/bidder/proposals/${id}/file-upload`, process.env.BACKEND_API_URL), {
//     method: 'POST',
//     headers: {
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     body: formData,
//   });

//   if (!response.ok) {
//     if (response.status >= 400 && response.status < 500) {
//       throw new UNSAFE_ErrorResponseImpl(
//         response.status,
//         response.statusText,
//         { request: file, response: await response.text() },
//       );
//     } else {
//       throw new Error(
//         [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
//         { cause: response }
//       );
//     }
//   }
// }

// export async function action({ request, params: { id } }: Route.ActionArgs) {
//   const token = await getAccessToken(request);

//   // await parseFormData(request.clone(), async (fileUpload: FileUpload) => {
//   //   if (fileUpload.fieldName === "file") {
//   //     const file = await convertToFile(fileUpload);
//   //     await uploadFile(id, file, token);
//   //   }
//   // });

//   return data({ success: true })
// }

export default function Details() {
  const { proposal, notices, qnas } = useLoaderData<typeof loader>();
  const { rfp } = proposal;
  const { data: qnasData, Form: QnAsForm } = useFetcher<{ success: boolean }>();
  const fetcher = useFetcher<{ success: boolean }>();

  let step = 0;
  if (proposal.status === 'COMPLETED_BIDDING') {
    step = 3;
  } else if (proposal.files.length > 0) {
    step = 2;
  } else {
    step = 1;
  }

  const [files, setFiles] = useState<File[] | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      closeModal();
      setFiles(null);
    }
  }, [fetcher]);

  const qnasFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (qnasFormRef.current) {
      qnasFormRef.current.reset();
    }
  }, [qnasData]);

  useEffect(() => {
    if (!modalOpened) {
      setFiles(null);
    }
  }, [modalOpened]);

  return (
    <main id="project-content" className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div id="project-header" className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">{rfp.name}</h2>
            <div className="mt-4 flex space-x-6">
              <div className="flex items-center text-[#4F46E5]">
                <i className="mr-2 fa-solid fa-clock"></i>
                <span>입찰 마감: {getDDay(new Date(rfp.submissionDeadline))}</span>
              </div>
              <div className="flex items-center text-[#4F46E5]">
                <i className="mr-2 fa-solid fa-calendar"></i>
                <span>확정 통보: {getDDay(new Date(rfp.selectionNotificationDate))}</span>
              </div>
            </div>
          </div>
          {notices.length > 0 && (
            <div id="notices" className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500 mb-3">공지사항</h3>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.content} className="bg-white p-4 rounded-lg shadow-sm">
                    <span>{notice.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div id="progress-bar" className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="relative flex justify-between mb-2 z-1">
                <div className="flex flex-col items-center w-1/4">
                  <div className={clsx(step >= 0 ? 'bg-[#4F46E5] text-white' : 'bg-gray-200 text-gray-400', "w-8 h-8 rounded-full flex items-center justify-center")}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className={clsx(step >= 0 && 'text-[#4F46E5]', "text-sm mt-2 ")}>NDA 동의 &amp; 응찰</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className={clsx(step >= 1 ? 'bg-[#4F46E5] text-white' : 'bg-gray-200 text-gray-400', "w-8 h-8 rounded-full flex items-center justify-center")}>
                    <i className="fa-solid fa-pen"></i>
                  </div>
                  <span className={clsx(step >= 1 && 'text-[#4F46E5]', "text-sm mt-2 ")}>제안서 작성</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className={clsx(step >= 2 ? 'bg-[#4F46E5] text-white' : 'bg-gray-200 text-gray-400', "w-8 h-8 rounded-full flex items-center justify-center")}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <span className={clsx(step >= 2 && 'text-[#4F46E5]', "text-sm mt-2 ")}>제안서 발주사 검토</span>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <div className={clsx(step >= 3 ? 'bg-[#4F46E5] text-white' : 'bg-gray-200 text-gray-400', "w-8 h-8 rounded-full flex items-center justify-center")}>
                    <i className="fa-solid fa-flag"></i>
                  </div>
                  <span className={clsx(step >= 3 && 'text-[#4F46E5]', "text-sm mt-2 ")}>선정 통보</span>
                </div>
              </div>
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0">
                <div className="bg-[#4F46E5] h-1" style={{ width: `${(step / 4 * 100) + 12.5}%` }}></div>
              </div>
            </div>
          </div>
          {proposal.files.length > 0 && (
            <div id="sent-proposal" className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">발송된 제안서</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
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
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">수신처</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="mr-2 fa-regular fa-envelope"></i>
                      <span>발주사 프로젝트 페이지</span>
                    </div>
                  </div>
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
          )}
          <div id="communication" className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium mb-4">발주사와 연락하기</h3>
            <div className="flex flex-col gap-4">
              {qnas.map((qna) => (
                <div key={qna.question.id} className="flex flex-col space-y-3">
                  <div className={clsx('p-4 rounded-lg', qna.question.user.type !== 'BIDDER' ? 'bg-gray-50 mr-6' : 'bg-blue-50 ml-6')}>
                    <div className={clsx('flex justify-between items-center mb-2', qna.question.user.type !== 'BIDDER' ? 'text-gray-600' : 'text-blue-600')}>
                      <span className="text-xs">
                        {qna.question.user.type !== 'BIDDER' ? '발주자' : '입찰자'} 질의 ({format(new Date(qna.question.createdAt), 'yyyy.MM.dd')})
                      </span>
                      <i className={clsx('fa-solid', qna.question.user.type !== 'BIDDER' ? 'fa-arrow-right' : 'fa-arrow-left')}></i>
                    </div>
                    <p className="text-sm text-gray-700">{nl2br(qna.question.content)}</p>
                  </div>
                  {qna.answer && (
                    <div className={clsx('p-4 rounded-lg', qna.answer.user.type !== 'BIDDER' ? 'bg-gray-50 mr-6' : 'bg-blue-50 ml-6')}>
                      <div className={clsx('flex justify-between items-center mb-2', qna.answer.user.type !== 'BIDDER' ? 'text-gray-600' : 'text-blue-600')}>
                        <span className="text-xs">답변 완료 ({format(new Date(qna.answer.createdAt), 'yyyy.MM.dd')})</span>
                        <i className={clsx('fa-solid', qna.answer.user.type !== 'BIDDER' ? 'fa-arrow-right' : 'fa-arrow-left')}></i>
                      </div>
                      <p className="text-sm text-gray-900">{nl2br(qna.answer.content)}</p>
                    </div>
                  )}
                  {!qna.answer && qna.question.user.type !== 'BIDDER' && (
                    <QnAsForm action="./qnas" method="POST" className="flex gap-2 ml-6">
                      <input name="rfpId" type="hidden" value={rfp.id} />
                      <input name="questionId" type="hidden" value={qna.question.id} />
                      <input name="content" type="text" className="flex-grow rounded-lg px-4 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="답변을 입력하세요" />
                      <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg">
                        <i className="fa-regular fa-paper-plane"></i>
                      </button>
                    </QnAsForm>
                  )}
                </div>
              ))}
              <QnAsForm action="./qnas" method="POST" ref={qnasFormRef} className="space-y-3">
                <input name="rfpId" type="hidden" value={rfp.id} />
                <textarea name="content" className="w-full rounded-md px-4 py-2 ounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={2} placeholder="질문을 입력하세요"></textarea>
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA]">
                    전송하기
                  </button>
                </div>
              </QnAsForm>
            </div>
          </div>
          {/* <div id="proposal" className="p-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">제안서 작성</h3>
              <p className="text-sm text-gray-600 mb-6">제안서 자동작성 기능을 사용하지 않을 경우, 파일업로드 기능을 활용하여 귀사 양식의 제안서(PDF 또는 word 형식)를 업로드 하실 수 있습니다. 자동작성 기능을 활용하시는 경우 해당페이지에서 제안서가 발송됩니다.</p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
                  <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-wand-magic-sparkles" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wand-magic-sparkles" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"></path></svg></i>
                  수임률 높이는 제안서 자동 작성하기
                </button>
                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-upload" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg></i>
                  제안서 등 파일 업로드하기
                </button>
              </div>
            </div>
          </div> */}
          {proposal.files.length <= MAX_FILES && (
            <div id="proposal" className="p-6">
              <Dialog open={modalOpened} onOpenChange={setModalOpened} >
                <DialogTrigger className="flex-1 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-200 disabled:text-gray-400" disabled={!(proposal.nda && proposal.participate)}>
                  <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-upload" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg></i>
                  제안서 등 파일 업로드하기
                </DialogTrigger>
                <DialogContent className="bg-white rounded-lg min-w-[500px] max-w-fit p-6">
                  <fetcher.Form
                    action="./file-upload"
                    method="POST"
                    onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();

                      const formData = new FormData();
                      files?.forEach((file) => formData.append('file', file));

                      fetcher.submit(formData, { method: 'POST', action: './file-upload', encType: 'multipart/form-data' });
                    }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-900">파일 첨부</h3>
                      <DialogClose type="reset" className="text-gray-400 hover:text-gray-500">
                        <i className="text-xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
                      </DialogClose>
                    </div>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={{
                        accept: {
                          'application/pdf': ['.pdf'],
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                        },
                        maxFiles: MAX_FILES - proposal.files.length,
                        maxSize: 1024 * 1024 * 10,
                        multiple: true,

                      }}
                    >
                      <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#4F46E5] transition-colors">
                        <div className="space-y-3">
                          <i className="text-4xl text-gray-400 fa-solid fa-cloud-arrow-up"></i>
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">파일을 드래그하여 업로드하세요</p>
                            <p className="text-gray-500">또는</p>
                          </div>
                          <button type="button" className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-md hover:bg-[#4F46E5] hover:text-white transition-colors">
                            파일 선택하기
                          </button>
                        </div>
                      </FileInput>
                      <FileUploaderContent className="mt-4">
                        <div className="text-xs text-gray-500 mb-2">지원 파일 형식: PDF, DOCX, XLSX (최대 10MB, {MAX_FILES - proposal.files.length}개)</div>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i} className="bg-gray-50 text-gray-500 p-3 h-13">
                              <div className="flex items-center">
                                <i className="text-[#4F46E5] text-lg mr-2 fa-regular fa-file-pdf"></i>
                                <span className="text-sm text-gray-600 max-w-[360px] overflow-hidden overflow-ellipsis">{file.name}</span>
                              </div>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                    <div className="mt-6 flex justify-end space-x-3">
                      <DialogClose type="reset" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        취소
                      </DialogClose>
                      <button type="submit" className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors disabled:bg-gray-200 disabled:text-gray-400" disabled={!files || files.length === 0 || fetcher.state !== 'idle'}>
                        전송하기
                      </button>
                    </div>
                  </fetcher.Form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}