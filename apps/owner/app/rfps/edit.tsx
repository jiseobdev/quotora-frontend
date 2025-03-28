import type { Route } from "./+types/edit";
import { getAccessToken } from "~/auth.server";
import { fetchRfp } from "~/lib/fetch";
import { data, redirect, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import RfpForm from "./components/form";

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

  const selectionCriteriaNames = formData.getAll('selectionCriteriaNames');
  const selectionCriteriaWeights = formData.getAll('selectionCriteriaWeights');
  const { selectionCriteriaNames: _, selectionCriteriaWeights: __, rawfirms, ...restBody } = Object.fromEntries(formData.entries());

  const selectionCriteria = selectionCriteriaNames.map((name, index) => ({ name, weight: parseInt(selectionCriteriaWeights[index].toString(), 10) }));

  const body = {
    ...restBody,
    expectedSchedule: new Date(restBody.expectedSchedule.toString()).toISOString(),
    submissionDeadline: new Date(restBody.submissionDeadline.toString()).toISOString(),
    selectionNotificationDate: new Date(restBody.selectionNotificationDate.toString()).toISOString(),
    selectionCriteria,
    rawfirms: rawfirms.toString().split(',').map((firm) => firm.trim()),
  };

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}`, process.env.BACKEND_API_URL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: body, response: await response.json() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return redirect(`/rfps/${id}`);
}

export default function Edit() {
  const { rfp } = useLoaderData<typeof loader>();

  return <RfpForm rfp={rfp} />;
}
