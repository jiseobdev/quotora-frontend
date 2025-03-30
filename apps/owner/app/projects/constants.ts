export const STATUS_TO_LABEL = {
  "WRITING": '작성 중',
  "WRITTEN": '작성 완료',
  "BIDDING": '입찰 중',
  "CLOSED": '입찰 종료'
};

export const STATUS_TO_CLASSNAME = {
  "WRITING": 'text-yellow-700 bg-yellow-100',
  "WRITTEN": 'text-green-700 bg-green-100',
  "BIDDING": 'text-[#4F46E5] bg-[#D6D2F2]',
  "CLOSED": 'text-grey-700 bg-grey-100'
};

export const PROPOSAL_STATUS_TO_LABEL = {
  SENT: '발송됨',
  PENDING: '입찰 대기',
  WRITING: '제안서 작성중',
  REVIEWING: '검토',
  SELECTED: '선정 통보',
  REJECTED: '입찰 거부',
};

export const SELECT_QNA_CONTENT = '안녕하세요.\
저희 회사의 로펌 입찰에 대해 검토한 결과, 이번에는 함께 진행할 수 없음을 알려드립니다. 관심 가져주시고 시간을 내어주셔서 감사합니다.\
추후 다른 기회가 있을 때 다시 연락드리겠습니다.\
감사합니다.\
[발주자 회사 명] 드림';

export const UNSELECT_QNA_CONTENT = '안녕하세요.\
저희 회사의 로펌 입찰에 대해 검토한 결과, [로펌명]님을 선정하게 되었음을 기쁜 마음으로 알려드립니다. 함께 진행할 수 있게 되어 매우 기대됩니다.\
계약 조건을 반영한 자문 계약서를 보내주시면 초안을 검토한 후 다시 연락드리겠습니다.\
감사합니다.\
[발주자 회사명] 드림';
