interface User {
  id: number;
  name: string;
  position: string;
  profileImage: string;
  companyName: string;
  email: string;
  createdAt: string;
}

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

type Permission = User & {
  permission: "READ" | "EDIT";
}

interface Proposal {
  id: number;
  lawfirmName: string;
  nda: boolean;
  participate: boolean;
  files: [];
  status: string;
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

interface Notice {
  content: string;
  createdAt: string;
}

interface Review {
  id: number;
  content: string;
  reviewer: { id: number; name: string };
  createdAt: string;
}

interface Comment {
  id: number;
  targetFieldName: "NAME" | "EXPECTED_SCHEDULE" | "OVERVIEW" | "DESIRED_LEGAL_ADVICE" | "SPECIAL_REQUIREMENTS" | "SUBMISSION_DEADLINE" | "SELECTION_NOTIFICATION_DATE" | "IS_ORAL_PRESENTATION" | "SELECTION_CRITERIA" | "RAW_FIRMS";
  content: string;
  user: User;
  createdAt: string;
  replies: {
    id: number;
    content: string;
    user: User;
    createdAt: string;
  }[];
}

interface QnA {
  question: {
    id: number;
    content: string;
    user: User;
    createdAt: string;
  };
  answer: {
    id: number;
    content: string;
    user: User;
    createdAt: string;
  };
}
