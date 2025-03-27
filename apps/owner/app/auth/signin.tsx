import { data, Form, isRouteErrorResponse, Link, redirect, UNSAFE_ErrorResponseImpl, useActionData, useFetcher } from 'react-router';
import type { Route } from './+types/signin';
import { accessTokenCookie, authenticator } from '~/auth.server';
import { AlertDialog, AlertDialogCancel, AlertDialogContent } from '~/components/ui/alert-dialog';
import { useEffect, useState } from 'react';

export async function action({ request }: Route.ActionArgs) {
  try {
    const { token, isActive } = await authenticator.authenticate('form', request);

    if (!token) {
      throw new UNSAFE_ErrorResponseImpl(401, 'Unauthorized', null);
    }

    if (!isActive) {
      throw new UNSAFE_ErrorResponseImpl(400, '이메일 인증이 필요합니다. 메일함을 확인해 주세요.', { code: 'err_account_not_activated', token });
    }

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/projects";

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await accessTokenCookie.serialize(token),
      },
    });
  } catch (error: unknown) {
    if (isRouteErrorResponse(error) && error.status === 400) {
      const errorData: { code: string; message: string; token?: string; errors: [] | null } = error.data;

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

  const [companyEmail, setCompanyEmail] = useState('');

  const [resetModalOpened, setResetModalOpened] = useState(false);
  const openResetModal = () => setResetModalOpened(true);

  const [email, setEmail] = useState('');

  const resetPasswordFetcher = useFetcher<{ success: boolean }>();
  const handleSubmitResetPassword = async (e: React.FormEvent) => {
    await resetPasswordFetcher.submit({ email }, { method: 'POST', action: '/request-reset-password' });
    setResetModalOpened(false);
    setEmail('');

    alert('비밀번호 재설정 안내를 이메일로 전송했습니다.');
  };

  const [resendModalOpened, setResendModalOpened] = useState(false);
  const resendVerificationFetcher = useFetcher<{ success: boolean }>();
  const handleSubmitResendVerification = async (e: React.FormEvent) => {
    await resendVerificationFetcher.submit(
      { token: actionData?.token ?? null },
      { action: '/resend-verification-email', method: 'POST' }
    );
    setResendModalOpened(false);

    alert('인증 링크를 재발송했습니다.');
  };

  useEffect(() => {
    if (actionData?.code === 'err_account_not_activated') {
      setResendModalOpened(true);
    }
  }, [actionData]);

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
                  <input name="email" type="email" required={true} value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="name@company.com" />
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
              <button type="button" className="text-sm font-medium text-[#4F46E5] hover:text-[#4F46E5]/80 cursor-pointer" onClick={openResetModal}>비밀번호 찾기</button>
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
      <AlertDialog open={resetModalOpened} onOpenChange={setResetModalOpened}>
        <AlertDialogContent>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-[#4F46E5] text-3xl font-semibold mb-4">Quotora</h2>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">비밀번호를 잊으셨나요?</h1>
              <p className="text-gray-600">회사 이메일 주소를 입력하시면<br />비밀번호 재설정 코드를 보내드립니다.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  회사 이메일
                </label>
                <div className="relative">
                  <i className="h-(--text-base) fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                  <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" placeholder="name@company.com" required={true} />
                </div>
              </div>
              <button type="button" onClick={handleSubmitResetPassword} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-colors">
                재설정 코드 받기
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <AlertDialogCancel className="border-0 text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
                <i className="fa-solid fa-arrow-left h-(--text-xs)"></i>
                로그인으로 돌아가기
              </AlertDialogCancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={resendModalOpened} onOpenChange={setResendModalOpened}>
        <AlertDialogContent className="sm:max-w-md max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <i className="text-6xl text-indigo-600 mb-6" data-fa-i2svg=""><svg className="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"></path></svg></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">메일함을 확인해주세요</h1>
            <p className="text-gray-600">다음 이메일로 인증 링크를 보냈습니다</p>
            <p className="text-indigo-600 font-medium my-2">{companyEmail}</p>
          </div>
          <div className="space-y-4 mt-8">
            <p className="text-sm text-gray-500 text-center">
              이메일을 받지 못하셨나요? 스팸함을 확인하시거나
            </p>
            <button onClick={handleSubmitResendVerification} className="w-full py-3 px-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
              인증 메일 재발송
            </button>
            <div className="text-center">
              <AlertDialogCancel className="text-sm text-gray-500 hover:text-indigo-600">
                <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-arrow-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg></i>
                로그인으로 돌아가기
              </AlertDialogCancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
