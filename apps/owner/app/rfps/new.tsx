import type { Route } from "./+types/new";
import { redirect, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import RfpForm from "./components/form";

export async function action({ request }: Route.ActionArgs) {
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

  const response = await fetch(new URL('/api/v1/orderer/rfps', process.env.BACKEND_API_URL), {
    method: 'POST',
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
        { request: body, response: await response.text() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return redirect('/rfps');
}

export default function New() {
  return <RfpForm />;
}