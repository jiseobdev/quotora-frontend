import { fetchCurrentUser } from "~/lib/fetch";
import type { Route } from "./+types/account";
import { data, Form, UNSAFE_ErrorResponseImpl, useFetcher, useLoaderData } from "react-router";
import { getAccessToken } from "~/auth.server";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const user = await fetchCurrentUser(token);
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();

  const fullName = formData.get('fullName');
  const companyName = formData.get('companyName');
  const position = formData.get('position');

  const oldPassword = formData.get('oldPassword');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');

  if (oldPassword && newPassword && confirmPassword) {
    if (newPassword !== confirmPassword) {
      return data({ success: false, errors: { confirmPassword: '새 비밀번호가 일치하지 않습니다.' } });
    }

    const body = { oldPassword, newPassword };

    const response = await fetch(new URL('/api/v1/users/password', process.env.BACKEND_API_URL), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        null,
      );
    }

    return data({ success: true });
  } else {
    const body = { fullName, companyName, position };

    const response = await fetch(new URL('/api/v1/users', process.env.BACKEND_API_URL), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        null,
      );
    }

    return data({ success: true });
  }
}

export default function Account() {
  const { user } = useLoaderData<typeof loader>();
  const [modifiedUser, setModifiedUser] = useState(user);

  const accountFetcher = useFetcher();
  const accountFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (accountFetcher.data?.success) {
      accountFormRef.current?.reset();
    }
  }, [accountFetcher.data]);

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const passwordFetcher = useFetcher();
  const passwordFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (passwordFetcher.data?.success) {
      passwordFormRef.current?.reset();
    }
  }, [passwordFetcher.data]);

  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <accountFetcher.Form method="POST" className="mb-6 border-b border-gray-200" ref={accountFormRef}>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="flex gap-2">
                  <input name="fullName" type="text" value={modifiedUser.name} onChange={(e) => setModifiedUser({ ...modifiedUser, name: e.target.value })} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <input type="email" value={user.email} className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50" disabled={true} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <div className="flex gap-2">
                  <input name="companyName" type="text" value={modifiedUser.companyName} onChange={(e) => setModifiedUser({ ...modifiedUser, companyName: e.target.value })} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <div className="flex gap-2">
                  <input name="position" type="text" value={modifiedUser.position} onChange={(e) => setModifiedUser({ ...modifiedUser, position: e.target.value })} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 py-6">
              <button type="reset" className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-200 disabled:text-gray-400"
                disabled={(modifiedUser.name === user.name && modifiedUser.companyName === user.companyName && modifiedUser.position === user.position) || accountFetcher.state !== 'idle'}
              >
                Save Changes
              </button>
            </div>
          </accountFetcher.Form>
          <passwordFetcher.Form method="POST" className="mb-6" ref={passwordFormRef}>
            <h2 className="text-lg font-semibold mb-4">Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input name="oldPassword" type="password" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input name="newPassword" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className={clsx("w-full rounded-lg border border-gray-300 px-4 py-2", passwordFetcher.data?.errors?.confirmPassword && 'border-red-500')} />
                {passwordFetcher.data?.errors?.confirmPassword && <p className="text-sm font-medium text-red-500 mt-1">{passwordFetcher.data.errors.confirmPassword}</p>}
              </div>
              <div className="flex justify-end pt-2 space-x-4">
                <button type="reset" className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-200 disabled:text-gray-400"
                  disabled={(passwords.oldPassword === '' || passwords.newPassword === '' || passwords.confirmPassword === '') || passwordFetcher.state !== 'idle'}
                >
                  Change Password
                </button>
              </div>
            </div>
          </passwordFetcher.Form>
        </div>
      </div>
    </main>
  );
}
