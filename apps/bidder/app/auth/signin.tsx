import { data, Link, redirect } from 'react-router';
import type { Route } from './+types/signin';
import { accessTokenCookie, authenticator } from '~/auth.server';

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookieHeader);

  if (accessToken) {
    return redirect('/', {
      headers: {
        'Set-Cookie': await accessTokenCookie.serialize(accessToken),
      },
    });
  }
}

export async function action({ request }: Route.ActionArgs) {
  const accessToken = await authenticator.authenticate('form', request);

  if (!accessToken) {
    return data({ error: 'Unauthorized' }, { status: 401 });
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await accessTokenCookie.serialize(accessToken),
    },
  });
}

export default function Signin() {
  return (
    <div id="auth-container" className="flex min-h-[100vh]">
      <div className="hidden lg:flex lg:w-1/2 bg-[#4F46E5] relative items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Quotora</h1>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">오늘도 반갑습니다</h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">회사 이메일</label>
                <div className="mt-1">
                  <input type="email" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="name@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                <div className="mt-1">
                  <input type="password" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="••••••••" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#4F46E5] border-gray-300 rounded focus:ring-[#4F46E5]" />
                <label className="ml-2 block text-sm text-gray-700">로그인 상태 유지</label>
              </div>
              <span className="text-sm font-medium text-[#4F46E5] hover:text-[#4F46E5]/80 cursor-pointer">비밀번호 찾기</span>
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4F46E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]">
              로그인
            </button>
            <p className="text-center text-sm text-gray-600">
              아직 회원이 아니신가요?
              <Link to="/signup">
                <span className="text-[#4F46E5] hover:text-[#4F46E5]/80 cursor-pointer ml-1">회원가입</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
