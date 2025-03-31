import { data, Link, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/details";
import { fetchDiscussion, fetchDiscussionComments, patchDiscussionViewContent } from "~/lib/fetch";
import { CATEGORY_TO_LABEL } from "./constants";
import { format } from "date-fns";
import { nl2br } from "~/lib/string";
import { commitSession, getSession } from "~/session";
import { useState } from "react";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const discussion = await fetchDiscussion(request, id);
  const comments = await fetchDiscussionComments(request, id);

  const session = await getSession(request.headers.get('Cookie'));
  const viewedDiscussions = session.get('viewedDiscussions') || [];

  if (!viewedDiscussions.includes(id)) {
    await patchDiscussionViewContent(request, id);
    session.set('viewedDiscussions', [...viewedDiscussions, id]);
  }

  return data({ discussion, comments }, { headers: { 'Set-Cookie': await commitSession(session) } });
}

export default function Details() {
  const { discussion, comments } = useLoaderData<typeof loader>();

  const commentsFetcher = useFetcher();

  const [sort, setSort] = useState('createdAt');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div id="post-header" className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/discussions" className="text-[#4F46E5] hover:underline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            목록으로
          </Link>
          <span className="text-gray-400">|</span>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {CATEGORY_TO_LABEL[discussion.category as keyof typeof CATEGORY_TO_LABEL]}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-4">{discussion.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img src={discussion.user.profileImage} alt={`작성자 ${discussion.user.name} 프로필 이미지`} className="w-10 h-10 rounded-full" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{discussion.user.name}</span>
                <span className="text-gray-500">{discussion.user.companyName}</span>
              </div>
              <div className="text-sm text-gray-500">{format(new Date(discussion.createdAt), 'yyyy.MM.dd')}</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-share-nodes text-xl"></i>
          </button>
        </div>
      </div>

      <div id="post-content" className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="prose max-w-none">
          <p className="text-gray-800 mb-4">
            {nl2br(discussion.content)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {discussion.tags.map((tag) => (
            <span key={tag} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">#{tag}</span>
          ))}
        </div>
      </div>

      <div id="post-actions" className="flex items-center justify-between py-4 border-t border-b mb-8">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
            <i className="fa-regular fa-heart text-xl"></i>
            <span>{discussion.likeCount}</span>
          </button>
          {/* <button className="flex items-center space-x-2 text-gray-500">
            <i className="fa-regular fa-bookmark text-xl"></i>
            <span>저장</span>
          </button> */}
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-gray-500">
            <i className="fa-regular fa-eye mr-2"></i>
            {discussion.viewCount}
          </span>
        </div>
      </div>

      <div id="comments" className="space-y-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">답변 {discussion.commentCount}개</h2>
          <select
            name="sort"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="createdAt">최신순</option>
            <option value="">추천순</option>
          </select>
        </div>

        <commentsFetcher.Form method="POST" action="./comments">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="User" className="w-8 h-8 rounded-full" />
              <button className="text-gray-600 hover:text-[#4F46E5] text-sm flex items-center space-x-1">
                <i className="fa-solid fa-user-secret text-lg"></i>
                <span>익명으로 작성</span>
              </button>
            </div>
          </div>
          <textarea name="content" className="w-full h-32 p-4 border rounded-lg resize-none mb-4" placeholder="답변을 작성해주세요"></textarea>
          <div className="flex justify-end space-x-3">
            <button type="reset" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
              취소
            </button>
            <button type="submit" className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA]">
              답변 등록
            </button>
          </div>
        </commentsFetcher.Form>

        {!(comments.length > 0) && (
          <div id="comment-list" className="border-t divide-y divide-gray-100">
            {comments.map((comment) => (
              <div key={comment.id} className="py-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img src={comment.user.profileImage} alt={`${comment.user.name} 프로필 이미지`} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.user.name}</span>
                        {/* <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">EXPERT</span> */}
                      </div>
                      <div className="text-sm text-gray-500">{comment.user.companyName} • {format(new Date(comment.createdAt), 'yyyy.MM.dd')}</div>
                    </div>
                  </div>
                  {/* <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center">
                    <i className="fa-solid fa-check mr-1"></i>
                    BEST
                  </span> */}
                </div>
                <p className="text-gray-800 mb-4">
                  {nl2br(comment.content)}
                </p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-red-500">
                    <i className="fa-regular fa-heart mr-1"></i>
                    {comment.likeCount}
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">답글달기</button>
                </div>
              </div>
            ))}

            <div id="comment-1" className="py-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Commenter" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">김변호사</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">EXPERT</span>
                    </div>
                    <div className="text-sm text-gray-500">Kim &amp; Partners • 2025.02.24</div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center">
                  <i className="fa-solid fa-check mr-1"></i>
                  BEST
                </span>
              </div>
              <div className="text-gray-800 mb-4">
                안녕하세요. 국제계약 전문 변호사입니다. 말씀하신 조항들에 대해 다음과 같이 답변 드립니다. 일반적으로 미국 기업들은 자신들의 본사가 위치한 주법을 준거법으로 하는 것을 선호합니다. 특히 실리콘밸리에 위치한 기업들의 경우 캘리포니아 주법을 선호하는 경향이 있습니다.
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i>
                  45
                </button>
                <button className="text-gray-500 hover:text-gray-700">답글달기</button>
              </div>
            </div>

            <div id="comment-2" className="py-6">
              <div className="flex items-start space-x-3 mb-4">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Commenter" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">박준성</span>
                  </div>
                  <div className="text-sm text-gray-500">대기업 • 2025.02.24</div>
                </div>
              </div>
              <div className="text-gray-800 mb-4">
                저희 회사도 비슷한 경험이 있었는데요. ICC 중재의 경우 비용이 상당히 높은 편이라 규모가 작은 분쟁의 경우에는 부담이 될 수 있습니다. 저희는 분쟁 금액에 따라 다른 분쟁해결 방식을 선택할 수 있도록 협상했었습니다.
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i>
                  23
                </button>
                <button className="text-gray-500 hover:text-gray-700">답글달기</button>
              </div>
            </div>

            <div id="comment-3" className="py-6">
              <div className="flex items-start space-x-3 mb-4">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="Commenter" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">최이사</span>
                  </div>
                  <div className="text-sm text-gray-500">법무법인 • 2025.02.24</div>
                </div>
              </div>
              <div className="text-gray-800 mb-4">
                ICC 중재는 국제적으로 가장 신뢰받는 중재기관 중 하나입니다. 다만, 중재지 선정에 있어서는 신중한 검토가 필요할 것 같네요.
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i>
                  18
                </button>
                <button className="text-gray-500 hover:text-gray-700">답글달기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
