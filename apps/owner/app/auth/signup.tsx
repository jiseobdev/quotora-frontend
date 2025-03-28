import { data, Form, Link, UNSAFE_ErrorResponseImpl, useActionData, useFetcher } from "react-router";
import { z } from 'zod';
import type { Route } from "./+types/signup";
import clsx from "clsx";
import { AlertDialog, AlertDialogContent } from "~/components/ui/alert-dialog";
import { useEffect, useState } from "react";

const schema = z.object({
  fullName: z.string().nonempty("이름은 필수입니다."),
  companyEmail: z.string().email("유효하지 않은 이메일 주소입니다."),
  companyName: z.string().nonempty("회사명은 필수입니다."),
  position: z.string().nonempty("직위는 필수입니다."),
  password: z.string().nonempty("비밀번호는 필수입니다.").min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  const response = await fetch(new URL('/api/v1/users/registration/orderer', process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      const result: { code: string, errors: { field: string; value: string; reason: string }[] } = await response.json();

      if (result.errors && result.errors.length > 0) {
        const errors = result.errors?.map(error => ({
          [error.field]: error.reason,
        }));

        return data({ success: false, errors: Object.fromEntries(errors.map((value) => [value.field, value.reason])) });
      }

      if (result.code === 'err_account_not_activated') {
        return data({ success: false, errors: { companyEmail: '이메일 인증이 필요합니다.' } as { [k: string]: string; } });
      } else if (result.code === 'err_account_already_sign_up') {
        return data({ success: false, errors: { companyEmail: '이미 등록된 이메일입니다.' } as { [k: string]: string; } });
      }

      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: body, response: result },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return data({ success: true, errors: undefined });
}

export async function clientAction({ request, serverAction }: Route.ClientActionArgs) {
  const formData = await request.clone().formData();
  const body = Object.fromEntries(formData.entries());

  const result = schema.safeParse(body);

  if (!result.success) {
    return data({ success: false, errors: result.error.flatten().fieldErrors });
  }

  return serverAction();
}

export default function Signin() {
  const actionData = useActionData<typeof action>();

  const [companyEmail, setCompanyEmail] = useState('')

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setOpen(true);
    }
  }, [actionData]);

  return (
    <main id="signup-page" className="flex min-h-[100vh] bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold">Streamline Your Bidding Process</h1>
            <p className="text-lg text-indigo-100">Connect with top advisors efficiently and make informed decisions for your needs</p>
            <div className="flex items-center space-x-4 pt-4">
              <i className="fa-solid fa-shield-halved text-3xl text-indigo-200"></i>
              <i className="fa-solid fa-scale-balanced text-3xl text-indigo-200"></i>
              <i className="fa-solid fa-handshake text-3xl text-indigo-200"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">계정 생성</h2>
          </div>
          <Form className="mt-8 space-y-6" method="POST">
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">이름 *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required={true}
                  className={clsx('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500', actionData?.errors?.fullName && 'border-red-500')}
                />
                {actionData?.errors?.fullName && <p className="text-sm font-medium text-red-500 mt-1">{actionData.errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700">회사 이메일 *</label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  required={true}
                  className={clsx('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500', actionData?.errors?.companyEmail && 'border-red-500')}
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
                {actionData?.errors?.companyEmail && <p className="text-sm font-medium text-red-500 mt-1">{actionData.errors.companyEmail}</p>}
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">회사명 *</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required={true}
                  className={clsx('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500', actionData?.errors?.companyName && 'border-red-500')}
                />
                {actionData?.errors?.companyName && <p className="text-sm font-medium text-red-500 mt-1">{actionData.errors.companyName}</p>}
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">직위 *</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  required={true}
                  className={clsx('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500', actionData?.errors?.position && 'border-red-500')}
                />
                {actionData?.errors?.position && <p className="text-sm font-medium text-red-500 mt-1">{actionData.errors.position}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호 *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required={true}
                  className={clsx('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500', actionData?.errors?.password && 'border-red-500')}
                />
                {actionData?.errors?.password && <p className="text-sm font-medium text-red-500 mt-1">{actionData.errors.password}</p>}
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                계정 생성하기
              </button>
            </div>
            <div className="text-center text-sm">
              <p className="text-gray-600">이미 계정이 있으신가요?
                <Link to="/signin">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1">로그인</span>
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:max-w-md max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <i className="text-6xl text-indigo-600 mb-6" data-fa-i2svg=""><svg className="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"></path></svg></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">메일함을 확인해주세요</h1>
            <p className="text-gray-600">다음 이메일로 인증 링크를 보냈습니다</p>
            <p className="text-indigo-600 font-medium my-2">{companyEmail}</p>
          </div>
          <div className="space-y-4 mt-8">
            {/* <p className="text-sm text-gray-500 text-center">
              이메일을 받지 못하셨나요? 스팸함을 확인하시거나
            </p>
            <button className="w-full py-3 px-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
              인증 메일 재발송
            </button> */}
            <p className="text-sm text-gray-500 text-center">
              이메일을 받지 못하셨나요? 스팸함을 확인해 주세요.
            </p>
            <div className="text-center">
              <Link to="/signin" className="text-sm text-gray-500 hover:text-indigo-600">
                <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-arrow-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg></i>
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
