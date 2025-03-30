import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/file-upload";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

async function convertToFile(fileUpload: FileUpload) {
  const buffer = await streamToBuffer(fileUpload.stream());
  return new File([buffer], fileUpload.name, { type: fileUpload.type });
}

async function uploadFile(id: string | number, file: File, token?: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(new URL(`/api/v1/bidder/proposals/${id}/file-upload`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: file, response: await response.text() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  await parseFormData(request.clone(), async (fileUpload: FileUpload) => {
    if (fileUpload.fieldName === "file") {
      const file = await convertToFile(fileUpload);
      await uploadFile(id, file, token);
    }
  });

  return data({ success: true });
}
