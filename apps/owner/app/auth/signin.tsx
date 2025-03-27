import { data, Form, isRouteErrorResponse, Link, redirect, UNSAFE_ErrorResponseImpl, useActionData } from 'react-router';
import type { Route } from './+types/signin';
import { accessTokenCookie, authenticator } from '~/auth.server';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '~/components/ui/alert-dialog';

export async function action({ request }: Route.ActionArgs) {
  try {
    const accessToken = await authenticator.authenticate('form', request);

    if (!accessToken) {
      throw new UNSAFE_ErrorResponseImpl(401, 'Unauthorized', null);
    }

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/projects";

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await accessTokenCookie.serialize(accessToken),
      },
    });
  } catch (error: unknown) {
    if (isRouteErrorResponse(error) && error.status === 400) {
      const errorData: { code: string, message: string, errors: [] | null } = error.data;

      let message = '';
      if (errorData.code === 'err_account_login_failed') {
        message = '이메일 또는 비밀번호를 다시 확인해 주세요.';
      } else if (errorData.code === 'err_account_not_activated') {
        message = '이메일 인증이 필요합니다. 메일함을 확인해 주세요.';
      }

      return data({ ...errorData, message: message || errorData.message });
    }

    throw error;
  }
}

export default function Signin() {
  const actionData = useActionData<typeof action>();

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
          <Form className="mt-8 space-y-6" method="POST">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">회사 이메일</label>
                <div className="mt-1">
                  <input name="email" type="email" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="name@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                <div className="mt-1">
                  <input name="password" type="password" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="••••••••" />
                </div>
              </div>
            </div>
            {actionData?.message && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-red-500">
                  {actionData?.message}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#4F46E5] border-gray-300 rounded focus:ring-[#4F46E5]" />
                <label className="ml-2 block text-sm text-gray-700">로그인 상태 유지</label>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="text-sm font-medium text-[#4F46E5] hover:text-[#4F46E5]/80 cursor-pointer">비밀번호 찾기</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-[#4F46E5] text-3xl font-semibold mb-4">Quotora</h2>
                      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">비밀번호를 잊으셨나요?</h1>
                      <p className="text-gray-600">회사 이메일 주소를 입력하시면<br />비밀번호 재설정 코드를 보내드립니다.</p>
                    </div>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                          회사 이메일
                        </label>
                        <div className="relative">
                          <i className="h-(--text-base) fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                          <input type="email" id="email" name="email" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" placeholder="name@company.com" required={true} />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-colors">
                        재설정 코드 받기
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center">
                      <AlertDialogCancel className="border-0 text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
                        <i className="fa-solid fa-arrow-left h-(--text-xs)"></i>
                        로그인으로 돌아가기
                      </AlertDialogCancel>
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
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
          </Form>
        </div>
      </div>
    </div>
  );
}
