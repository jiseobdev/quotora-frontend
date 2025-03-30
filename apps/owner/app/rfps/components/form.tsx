import { format } from "date-fns";
import { useState } from "react";
import { Form } from "react-router";

interface Props {
  rfp?: Rfp
}

export default function RfpForm({ rfp }: Props) {
  const [selectionCriteria, setSelectionCriteria] = useState<{ name: string; weight: number; }[]>(
    rfp?.selectionCriteria || [{ name: "", weight: 50 }]
  );

  const addSelectionCriteria = () => {
    setSelectionCriteria([...selectionCriteria, { name: "", weight: 50 }]);
  };

  const removeSelectionCriteria = (index: number) => {
    setSelectionCriteria(selectionCriteria.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, key: "name" | "weight", event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectionCriteria = [...selectionCriteria];

    if (key === "name") {
      selectionCriteria[index][key] = event.target?.value;
    } else if (key === "weight") {
      selectionCriteria[index][key] = parseInt(event.target?.value, 10);
    }

    setSelectionCriteria(newSelectionCriteria);
  };

  return (
    <main className="pt-24 px-6 pb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{rfp ? 'RFP 수정' : '새 RFP 작성'}</h2>
        <Form className="space-y-6" method="POST">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">프로젝트명</label>
              <input id="name" name="name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={rfp?.name} />
            </div>
            <div>
              <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700 mb-2">비용 예상액</label>
              <input id="estimatedCost" name="estimatedCost" type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" placeholder="₩" defaultValue={rfp?.estimatedCost} />
            </div>
          </div>
          <div>
            <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-2">프로젝트 개요</label>
            <textarea id="overview" name="overview" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="소송, M&amp;A, IPO, 금융, 규제당국 대응, 사내 이슈 점검 등 진행하시려는 프로젝트 개요를 써주세요" defaultValue={rfp?.overview}></textarea>
          </div>
          <div>
            <label htmlFor="desiredLegalAdvice" className="block text-sm font-medium text-gray-700 mb-2">원하는 자문의 내용</label>
            <textarea id="desiredLegalAdvice" name="desiredLegalAdvice" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="원하는 결과가 있다면 구체적으로 기재해주세요" defaultValue={rfp?.desiredLegalAdvice}></textarea>
          </div>
          <div>
            <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">특별 요구사항</label>
            <textarea id="specialRequirements" name="specialRequirements" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="본 프로젝트의 특징, 포함되었으면 하는 변호사님이나 팀의 경력 등 자유롭게 기재해주세요" defaultValue={rfp?.specialRequirements}></textarea>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="expectedSchedule" className="block text-sm font-medium text-gray-700 mb-2">예상 일정</label>
              <input id="expectedSchedule" name="expectedSchedule" type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={rfp?.expectedSchedule ? format(new Date(rfp?.expectedSchedule), 'yyyy-MM-dd') : undefined} required />
            </div>
            <div>
              <label htmlFor="submissionDeadline" className="block text-sm font-medium text-gray-700 mb-2">RFP 제출 마감일</label>
              <input id="submissionDeadline" name="submissionDeadline" type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={rfp?.submissionDeadline ? format(new Date(rfp?.submissionDeadline), 'yyyy-MM-dd') : undefined} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="selectionNotificationDate" className="block text-sm font-medium text-gray-700 mb-2">자문사 선정 통보 예정일</label>
              <input id="selectionNotificationDate" name="selectionNotificationDate" type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={rfp?.selectionNotificationDate ? format(new Date(rfp?.selectionNotificationDate), 'yyyy-MM-dd') : undefined} required />
            </div>
            <div>
              <label htmlFor="isOralPresentation" className="block text-sm font-medium text-gray-700 mb-2">구두 프리젠테이션 여부</label>
              <select id="isOralPresentation" name="isOralPresentation" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={rfp?.oralPresentation ? 'true' : 'false'} required>
                <option value="true">필요</option>
                <option value="false">불필요</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">선정기준</label>
            <div className="space-y-4">
              {selectionCriteria.map((criteria, index) => (
                <div key={index} className="flex items-center">
                  <input name="selectionCriteriaNames" type="text" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue={criteria.name} onChange={(event) => handleInputChange(index, 'name', event)} required />
                  <input type="range" className="flex-1 mx-4" min="0" max="100" defaultValue={criteria.weight} onChange={(event) => handleInputChange(index, 'weight', event)} />
                  <input name="selectionCriteriaWeights" type="number" className="w-20 px-2 py-1 border border-gray-300 rounded" min="0" max="100" defaultValue={criteria.weight} onChange={(event) => handleInputChange(index, 'weight', event)} required />%
                  <button type="button" className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeSelectionCriteria(index)}>
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="mt-4 text-[#4F46E5] hover:text-[#4338CA] flex items-center" onClick={addSelectionCriteria}>
              <i className="fa-solid fa-plus mr-2"></i>
              <span>새로운 평가요소 추가</span>
            </button>
          </div>
          <div>
            <label htmlFor="rawfirms" className="block text-sm font-medium text-gray-700 mb-2">수신 자문사의 범위</label>
            <textarea id="rawfirms" name="rawfirms" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5] h-32" placeholder="제안서를 받을 자문사의 이름이나 조건을 기재해주세요" defaultValue={rfp?.rawfirms.join(', ')}></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">취소</button>
            <button type="submit" className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]">저장</button>
          </div>
        </Form>
      </div>
    </main>
  );
}
