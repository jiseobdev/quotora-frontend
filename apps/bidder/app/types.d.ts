interface Rfp {
  id: number;
  name: string;
  overview: string;
  desiredLegalAdvice: string;
  specialRequirements: string;
  expectedSchedule: string;
  submissionDeadline: string;
  selectionNotificationDate: string;
  oralPresentation: boolean;
  rawfirms: string[];
  selectionCriteria: { name: string; weight: number; }[];
  estimatedCost: number;
  status: "WRITING" | "WRITTEN" | "BIDDING" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

interface Proposal {
  id: number;
  lawfirmName: string;
  nda: boolean;
  participate: boolean;
  files: ProposalFile[];
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  name: string;
  rfpId: number;
  ordererName: string;
  expectedSchedule: string;
  overview: string;
  desiredLegalAdvice: string;
  specialRequirements: string;
  oralPresentation: boolean;
  sentAt: string;
}

type ProposalStatus = 'SENT' | 'ONGOING_BIDDING' | 'COMPLETED_BIDDING';

interface ProposalFile {
  id: number;
  name: string;
  url: string;
}
