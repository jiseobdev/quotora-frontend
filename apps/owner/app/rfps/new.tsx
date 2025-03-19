import type { Route } from "./+types/new";
import { redirect, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import RfpForm from "./form";

export async function action({ request }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();

  const selectionCriteriaNames = formData.getAll('selectionCriteriaNames');
  const selectionCriteriaWeights = formData.getAll('selectionCriteriaWeights');
  const { selectionCriteriaNames: _, selectionCriteriaWeights: __, ...body } = Object.fromEntries(formData.entries());

  const selectionCriteria = selectionCriteriaNames.map((name, index) => ({ name, weight: parseInt(selectionCriteriaWeights[index].toString(), 10) }));

  const response = await fetch(new URL('/api/v1/orderer/rfps', process.env.BACKEND_API_URL), {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        ...body,
        selectionCriteria,
      }),
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      body,
    );
  }

  return redirect('/rfps');
}

export default function New() {
  return <RfpForm />;
}