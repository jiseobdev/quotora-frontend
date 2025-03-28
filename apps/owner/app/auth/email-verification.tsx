import { data, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/email-verification";

export async function loader({ params: { code } }: Route.ActionArgs) {
  const response = await fetch(new URL(`/api/v1/users/verify/${code}`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      const error: { code: string; message: string } = await response.json();

      let message = '';
      if (error.code === 'err_account_verification_code_not_found') {
        message = '유효하지 않은 인증 코드입니다.';
      } else if (error.code === 'err_account_verification_code_expired') {
        message = '인증 코드가 만료되었습니다.';
      }

      return data({ success: false, message: message || error.message });
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return data({ success: true, message: null });
}

export default function EmailVerification() {
  const { success, message } = useLoaderData<typeof loader>();

  return (
    <main className="flex min-h-[100vh] bg-gray-50">
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
      <div id="content" className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-md text-center space-y-8">
          <div id="icon" className="flex justify-center">
            {success ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-check text-4xl text-green-600"></i>
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-xmark text-4xl text-red-600"></i>
              </div>
            )}
          </div>
          <div id="message" className="space-y-4">
            {success ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900">가입이 완료되었습니다!</h2>
                <p className="text-gray-600">이제 서비스를 이용하실 수 있습니다.<br />더 나은 비즈니스 의사결정을 시작해보세요.</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900">에러가 발생했습니다</h2>
                <p className="text-gray-600">{message}</p>
              </>
            )}
            {/* <div className="bg-green-50 rounded-lg p-4 mt-4">
              <p className="text-green-800 font-medium">example@company.com</p>
            </div> */}
          </div>
          <div id="actions" className="space-y-4">
            <Link to="/signin" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>서비스 시작하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
