import { Link, NavLink } from "react-router";

export default function Index() {
  return (
    <div id="welcome-page" className="bg-white">
      <header id="header" className="fixed w-full bg-white border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <NavLink to="/" className="text-2xl font-bold text-[#4F46E5] cursor-pointer">Quotora</NavLink>
              <nav className="hidden md:flex space-x-8">
                <span className="text-gray-900 hover:text-[#4F46E5] cursor-pointer">서비스 소개</span>
                <span className="text-gray-900 hover:text-[#4F46E5] cursor-pointer">요금제</span>
                <a href="mailto:support@quotora.xyz" className="text-gray-900 hover:text-[#4F46E5] cursor-pointer">고객지원</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink to="/signin" className="text-gray-900 hover:text-[#4F46E5] cursor-pointer">로그인</NavLink>
              <NavLink to="/signup" className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA] cursor-pointer">무료로 시작하기</NavLink>
            </div>
          </div>
        </div>
      </header>
      <section id="hero" className="pt-24 h-[550px]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">자문사를 위한<br />스마트 제안관리 플랫폼</h1>
              <p className="text-xl text-gray-700 mb-8">제안서 작성 자동화부터 입찰 관리까지,<br />더 효율적인 비즈니스 성장을 지원합니다.</p>
              <div className="flex space-x-4">
                <Link to="/signup" className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg hover:bg-[#4338CA] break-keep cursor-pointer">무료로 시작하기</Link>
                <span className="border border-[#4F46E5] text-[#4F46E5] px-8 py-3 rounded-lg hover:bg-[#D6D2F2] break-keep cursor-pointer">더 알아보기</span>
              </div>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0">
                <img className="rounded-2xl shadow-2xl w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ba5ec32ef4-1ddc647023b97190ae5b.png" alt="professional dashboard interface" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="bg-[#F8F9FA] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">핵심 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-bolt"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">제안서 자동화</h3>
              <p className="text-gray-700">AI 기반 템플릿으로 제안서 작성 시간을 90% 단축하고 업무 효율을 높이세요.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-chart-pie"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">데이터 기반 낙찰률 향상</h3>
              <p className="text-gray-700">실시간 데이터 분석으로 성공적인 제안 전략을 수립하세요.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-shield-halved"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">안전한 문서 관리</h3>
              <p className="text-gray-700">엄격한 보안 시스템으로 제안서와 기밀 정보를 안전하게 보호합니다.</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="trusted-by" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">신뢰할 수 있는 파트너</h2>
          <p className="text-center text-gray-700 mb-12">글로벌 로펌들이 Quotora와 함께 성장하고 있습니다</p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-lg font-bold text-gray-900">Simpson Thacher &amp; Bartlett LLP</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-lg font-bold text-gray-900">Peter &amp; Kim</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-lg font-bold text-gray-900">Shin &amp; Kim</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-lg font-bold text-gray-900">Yulchon</h3>
            </div>
          </div>
        </div>
      </section> */}
      <section id="cta" className="bg-[#4F46E5] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl text-white mb-8">14일 무료 체험으로 Quotora의 모든 기능을 경험해보세요</p>
          <Link to="/signup" className="bg-white text-[#4F46E5] px-8 py-3 rounded-lg hover:bg-gray-100 break-keep cursor-pointer">무료로 시작하기</Link>
        </div>
      </section>
      <footer id="footer" className="bg-[#303A52] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quotora</h3>
              <p className="text-gray-300">자문사를 위한 스마트 제안관리 플랫폼</p>
              <p className="text-gray-300 break-keep">
                고객 문의 <a href="mailto:support@quotora.xyz" className="text-gray-300">support@quotora.xyz</a>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">서비스</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300 hover:text-white cursor-pointer">기능 소개</span></li>
                <li><span className="text-gray-300 hover:text-white cursor-pointer">요금제</span></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-bold mb-4">고객지원</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300 hover:text-white cursor-pointer">고객센터</span></li>
                <li><span className="text-gray-300 hover:text-white cursor-pointer">이용가이드</span></li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-bold mb-4">법적고지</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300 hover:text-white cursor-pointer">이용약관</span></li>
                <li><span className="text-gray-300 hover:text-white cursor-pointer">개인정보처리방침</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Quotora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
