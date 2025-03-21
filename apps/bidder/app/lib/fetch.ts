import { UNSAFE_ErrorResponseImpl } from "react-router";

export async function fetchDashboard(token?: string) {
  const response = await fetch(new URL('/api/v1/bidder/proposals/dashboard', process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: { totalRequestProposals: number, totalProposalProgress: number, totalProposalCompleted: number } = await response.json();

  return result;
}

export async function fetchProposals(status: ProposalStatus, token?: string) {
  const response = await fetch(new URL(`/api/v1/bidder/proposals?status=${status}`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Proposal[] = await response.json();

  return result;
}

export async function fetchProposal(id: string | number, token?: string) {
  const response = await fetch(new URL(`/api/v1/bidder/proposals/${id}`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Proposal = await response.json();

  return result;
}

export async function fetchRfp(id: string | number, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Rfp = await response.json();

  return result;
}

export async function fetchNotices(id: string | number, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/notices`, process.env.BACKEND_API_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: Notice[] = await response.json();

  return result;
}

export async function fetchQnas(id: string | number, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/qnas`, process.env.BACKEND_API_URL), {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  const result: QnA[] = await response.json();

  return result;
}
