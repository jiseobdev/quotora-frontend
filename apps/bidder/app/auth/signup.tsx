import { Link } from "react-router";

export default function Signin() {
  return (
    <div id="signup-page" className="flex min-h-[100vh] bg-gray-50">
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
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">이름 *</label>
                <input type="text" required={true} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">회사 이메일 *</label>
                <input type="email" required={true} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">회사명 *</label>
                <input type="text" required={true} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">직위 *</label>
                <input type="text" required={true} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호 *</label>
                <input type="password" required={true} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
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
          </form>
        </div>
      </div>
    </div>
  );
}