import { data, Form, isRouteErrorResponse, Link, UNSAFE_ErrorResponseImpl, useActionData } from "react-router";
import type { Route } from "./+types/reset-password";
import { useEffect } from "react";

export async function action({ request }: Route.ActionArgs) {
  try {
    const token = new URL(request.url).searchParams.get('token');

    const formData = await request.formData();
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      throw new UNSAFE_ErrorResponseImpl(400, '새 비밀번호가 일치하지 않습니다.', null);
    }

    const body = { token, newPassword };

    const response = await fetch(new URL(`/api/v1/users/reset-password`, process.env.BACKEND_API_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: body, response: await response.text() },
      );
    }

    return data({ success: true, message: undefined });
  } catch (error: unknown) {
    if (isRouteErrorResponse(error)) {
      const errorData: { code: string, message: string, errors: [] | null } = error.data;

      let message = '';
      if (errorData.code === 'err_account_login_failed') {
        message = '이메일 또는 비밀번호를 다시 확인해 주세요.';
      } else if (errorData.code === 'err_account_not_activated') {
        message = '이메일 인증이 필요합니다. 메일함을 확인해 주세요.';
      }

      return data({ success: false, ...errorData, message: message || errorData.message });
    }

    throw error;
  }
}

export default function ResetPassword() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success) {
      alert('비밀번호가 변경되었습니다');

      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
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
            <h2 className="text-3xl font-bold text-gray-900">비밀번호 재설정</h2>
          </div>
          <Form className="mt-8 space-y-6" method="POST">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">새 비밀번호</label>
                <div className="mt-1">
                  <input name="newPassword" type="password" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                <div className="mt-1">
                  <input name="confirmPassword" type="password" required={true} className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#4F46E5] focus:border-[#4F46E5]" placeholder="••••••••" />
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
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4F46E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]">
              비밀번호 변경하기
            </button>
            <Link to="/signin" className="border-0 text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-left h-(--text-xs)"></i>
              로그인으로 돌아가기
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
