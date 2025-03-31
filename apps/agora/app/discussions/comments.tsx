import type { Route } from "./+types/comments";
import { postDiscussionComment } from "~/lib/fetch";
import { data } from "react-router";

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const formData = await request.formData();

  const content = formData.get('content') as string;
  const isAnonymous = formData.get('isAnonymous') === 'true';
  const parentId = formData.get('parentId') ? Number(formData.get('parentId')) : undefined;

  await postDiscussionComment(request, id, {
    content,
    isAnonymous,
    parentId,
  });

  return data({ success: true });
}
