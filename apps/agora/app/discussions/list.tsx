import { Link, useLocation, useSubmit } from "react-router";
import { CATEGORY_TO_LABEL, CONTENT_ELLIPSIS, CONTENT_MAX_LENGTH } from "./constants";
import clsx from "clsx";
import { useState } from "react";
import type { Route } from "./+types/list";
import { fetchDiscussions } from "~/lib/fetch";
import { format } from 'date-fns';

export async function loader({ request }: Route.LoaderArgs) {
  const text = await request.text();
  const data = (text ? JSON.parse(text) : {}) as { sort?: string };
  const options = {
    category: new URL(request.url).searchParams.get('category') ?? undefined,
    orderBy: data.sort ?? undefined,
  };

  const discussions = await fetchDiscussions(request, options);
  return { discussions };
}

export default function List({ loaderData }: Route.ComponentProps) {
  const { discussions } = loaderData;

  const submit = useSubmit();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category') ?? '';

  const [sort, setSort] = useState('');

  return (
    <main id="content" className="py-8 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="categories" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4 overflow-x-auto">
              {Object.entries(CATEGORY_TO_LABEL).map(([value, label]) => (
                <Link
                  key={value}
                  to={value ? `?category=${value}` : '/discussions'}
                  className={clsx("px-4 py-2 rounded-full text-sm whitespace-nowrap", value === category ? 'bg-[#4F46E5] text-white' : 'bg-white text-gray-700 hover:bg-gray-50')}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <select
                name="sort"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">추천순</option>
                <option value="createdAt">등록일순</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <Link key={discussion.id} to={`./${discussion.id}`} className="grid bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{discussion.title}</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 overflow-hidden whitespace-nowrap text-ellipsis">
                {discussion.content.length > CONTENT_MAX_LENGTH ?
                  discussion.content.slice(0, CONTENT_MAX_LENGTH - CONTENT_ELLIPSIS.length) + CONTENT_ELLIPSIS :
                  discussion.content
                }
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {discussion.tags.map((tag) => (
                  <span key={tag} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-red-500">
                    <i className="fa-regular fa-heart mr-1"></i>
                    {discussion.likeCount}
                  </button>
                  <span className="flex items-center">
                    <i className="fa-regular fa-comment mr-1"></i>
                    {discussion.commentCount}
                  </span>
                  <span className="flex items-center">
                    <i className="fa-regular fa-eye mr-1"></i>
                    {discussion.viewCount}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={discussion.user.profileImage} alt={`${discussion.user.name} 프로필 이미지`} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{discussion.user.name}</span>
                  <span>{discussion.user.companyName}</span>
                  <span>{format(new Date(discussion.createdAt), 'yyyy.MM.dd')}</span>
                </div>
              </div>
            </Link>
          ))}
          {/* <div id="post-1" className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">[Q&amp;A] 외국계 기업과의 계약서 관련 문의</h3>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">미국 기업과 NDA 체결 시 준거법 선택에 대해 조언을 구합니다. 특히 분쟁 해결 조항에서 고려해야 할 사항이...</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">#계약검토</span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">#국제계약</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i>
                  156
                </button>
                <span className="flex items-center">
                  <i className="fa-regular fa-comment mr-1"></i>
                  23
                </span>
                <span className="flex items-center">
                  <i className="fa-regular fa-eye mr-1"></i>
                  856
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Author" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium">이법무</span>
                <span>테크스타트업</span>
                <span>2025.02.24</span>
              </div>
            </div>
          </div>
          <div id="post-2" className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">ESG 컴플라이언스 세미나 후기</h3>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">지난주 참석했던 ESG 컴플라이언스 세미나 내용을 공유드립니다. 특히 환경 규제 강화에 따른 기업 대응 방안에 대해...</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">#ESG</span>
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">#컴플라이언스</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i>
                  189
                </button>
                <span className="flex items-center">
                  <i className="fa-regular fa-comment mr-1"></i>
                  34
                </span>
                <span className="flex items-center">
                  <i className="fa-regular fa-eye mr-1"></i>
                  945
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Author" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium">박준성</span>
                <span>대기업</span>
                <span>2025.02.23</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
