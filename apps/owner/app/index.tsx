import { NavLink, redirect } from "react-router";

// export async function loader() {
//   return redirect('/projects');
// }

export default function Index() {
  return (
    <div id="welcome-page" className="bg-white">
      <header id="header" className="fixed w-full bg-white border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <NavLink to="/" className="text-2xl font-bold text-[#4F46E5] cursor-pointer">Quotora</NavLink>
              <nav className="hidden md:flex space-x-8">
                <span className="text-[#303A52] hover:text-[#4F46E5] cursor-pointer">About</span>
                <span className="text-[#303A52] hover:text-[#4F46E5] cursor-pointer">Contact</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink to="/signin" className="text-[#303A52] hover:text-[#4F46E5] cursor-pointer">로그인</NavLink>
              <NavLink to="/signup" className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA] cursor-pointer">회원가입</NavLink>
            </div>
          </div>
        </div>
      </header>
      <section id="hero" className="pt-24 md:h-[700px] bg-[#E5E7EB]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-[#303A52] mb-6">더 빠르고 편한<br />견적 요청 및 입찰 관리 솔루션</h1>
              <p className="text-xl text-[#6C757D] mb-8">RFP 작성부터 입찰 절차까지 자동화된 프로세스로<br />더 효율적인 업무 환경을 제공합니다.</p>
              <div className="flex space-x-4">
                <NavLink to="/signup" className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg hover:bg-[#4338CA] break-keep cursor-pointer">무료로 시작하기</NavLink>
                <span className="border border-[#4F46E5] text-[#4F46E5] px-8 py-3 rounded-lg hover:bg-[#D6D2F2] break-keep cursor-pointer">서비스 알아보기</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#303A52]">Project Dashboard</h3>
                  <div className="flex items-center space-x-3">
                    <i className="text-[#6C757D] fa-regular fa-bell"></i>
                    <i className="text-[#6C757D] fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F8F9FA] p-4 rounded-lg">
                    <p className="text-sm text-[#6C757D]">진행중인 프로젝트</p>
                    <p className="text-2xl font-bold text-[#303A52]">12</p>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-lg">
                    <p className="text-sm text-[#6C757D]">완료된 입찰</p>
                    <p className="text-2xl font-bold text-[#303A52]">48</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                    <span className="text-[#303A52]">특허 소송 자문</span>
                    <span className="text-[#4F46E5]">진행중</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                    <span className="text-[#303A52]">계약서 검토</span>
                    <span className="text-[#4F46E5]">입찰중</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                    <span className="text-[#303A52]">법률 자문</span>
                    <span className="text-[#4F46E5]">검토중</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="benefits" className="bg-[#F9FAFB] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#303A52] mb-12">서비스 특징</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-comments"></i>
              <h3 className="text-xl font-bold text-[#303A52] mb-3">안전하고 편한 의사소통</h3>
              <p className="text-[#6C757D]">입찰단계 NDA 부터 저희가 다 챙겨드려요. 협업 시스템으로 담당자가 연차를 가더라도 편안하게</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-bolt"></i>
              <h3 className="text-xl font-bold text-[#303A52] mb-3">자동화와 빠른 처리</h3>
              <p className="text-[#6C757D]">RFP 작성시간과 제안서 검토 등에 소요되는 시간을 80% 줄여보세요</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <i className="text-4xl text-[#4F46E5] mb-4 fa-solid fa-chart-line"></i>
              <h3 className="text-xl font-bold text-[#303A52] mb-3">데이터 기반 의사결정</h3>
              <p className="text-[#6C757D]">실시간 분석과 리포팅으로 더 나은 의사결정을 지원합니다.</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="clients" className="py-20 bg-[#FCFCFD]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#303A52] mb-4">신뢰할 수 있는 파트너</h2>
          <p className="text-center text-[#6C757D] mb-12">효율성을 추구하는 최고의 팀들이 Quotora와 함께합니다</p>
          <div className="grid grid-cols-5 gap-6 items-center justify-items-center">
            <div className="bg-white p-6 rounded-xl shadow-sm w-[200px] hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-[#303A52] text-center">비바리퍼블리카</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm w-[200px] hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-[#303A52] text-center">KB</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm w-[200px] hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-[#303A52] text-center">당근</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm w-[200px] hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-[#303A52] text-center">한샘</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm w-[200px] hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-[#303A52] text-center">IMM</h3>
            </div>
          </div>
        </div>
      </section> */}
      <footer id="footer" className="bg-[#303A52] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quotora</h3>
              <p className="text-[#D6D2F2] break-keep">더 스마트한 법무팀을 위한 솔루션</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">About</span></li>
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">Contact</span></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-bold mb-4">고객지원</h4>
              <ul className="space-y-2">
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">고객센터</span></li>
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">이용가이드</span></li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-bold mb-4">법적고지</h4>
              <ul className="space-y-2">
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">이용약관</span></li>
                <li><span className="text-[#D6D2F2] hover:text-white cursor-pointer">개인정보처리방침</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D6D2F2]/20 pt-8 text-center text-[#D6D2F2]">
            <p>© {new Date().getFullYear()} Quotora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
