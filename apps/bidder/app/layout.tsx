import clsx from "clsx";
import { NavLink, Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { accessTokenCookie } from "./auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookieHeader);

  if (!accessToken) {
    return redirect('/signin');
  }
}

export default function Layout() {
  return (
    <div className="flex h-full bg-gray-50">
      <div id="sidebar" className="hidden md:flex md:w-64 md:flex-col fixed h-full">
        <div className="flex flex-col flex-grow bg-white pt-5 border-r border-gray-200">
          <NavLink to="/" className="flex items-center flex-shrink-0 px-4">
            <span className="text-[#4F46E5] text-2xl font-bold">Quotora</span>
          </NavLink>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <NavLink to="/projects" className={({ isActive }) => clsx("group flex items-center px-2 py-3 text-sm font-medium rounded-md", isActive ? 'bg-[#D6D2F2] text-[#4F46E5]' : 'text-[#303A52] hover:bg-gray-50')}>
                <i className="fa-solid fa-folder-open w-8 text-center"></i>
                <span>Project</span>
              </NavLink>
              <a href="#" className="hover:bg-gray-50 group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed">
                <i className="fa-solid fa-file-lines w-8 text-center"></i>
                <span>Proposals</span>
              </a>
              <a href="#" className="hover:bg-gray-50 group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed">
                <i className="fa-solid fa-users w-8 text-center"></i>
                <span>Client</span>
              </a>
              <a href="#" className="hover:bg-gray-50 group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed">
                <i className="fa-solid fa-book w-8 text-center"></i>
                <span>Library</span>
              </a>
              <a href="#" className="hover:bg-gray-50 group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed">
                <i className="fa-solid fa-gear w-8 text-center"></i>
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div id="main-content" className="flex-1 md:ml-64">
        <div id="header" className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 flex items-center">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">검색</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    </div>
                    <input id="search" className="block w-full rounded-md border-0 bg-[#F9FAFB] py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#4F46E5]" placeholder="검색" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-[#4F46E5] hover:text-[#4F46E5]">
                  <i className="fa-solid fa-headset text-xl mr-2"></i>
                  <span>Support</span>
                </button>
                {/* <button className="flex items-center text-[#4F46E5] hover:text-[#4F46E5]">
                  <i className="fa-solid fa-message text-xl mr-2"></i>
                  <span>Message</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}