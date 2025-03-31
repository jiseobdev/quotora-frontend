export enum Category {
  ALL = "",
  QNA = "QNA",
  CASE_SHARING = "CASE_SHARING",
  CAREER = "CAREER",
  WORK_TIPS = "WORK_TIPS",
}

export const CATEGORY_TO_LABEL = {
  [Category.ALL]: "전체",
  [Category.QNA]: "Q&A",
  [Category.CASE_SHARING]: "사례공유",
  [Category.CAREER]: "커리어",
  [Category.WORK_TIPS]: "업무 팁",
};

export const CONTENT_MAX_LENGTH = 100;

export const CONTENT_ELLIPSIS = '...';
