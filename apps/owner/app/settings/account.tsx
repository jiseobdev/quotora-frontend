export default function Account() {
  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="flex gap-2">
                  <input type="text" value="John Smith" className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <input type="email" value="john.smith@company.com" className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50" disabled={true} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <div className="flex gap-2">
                  <input type="text" value="Acme Corporation" className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <div className="flex gap-2">
                  <input type="text" value="Senior Manager" className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  {/* <button className="px-4 py-2 text-sm text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB]">Edit</button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input type="password" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
              </div>
              <div className="pt-2">
                <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-200 disabled:text-gray-400" disabled={true}>Change Password</button>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-200 disabled:text-gray-400" disabled={true}>Save Changes</button>
          </div>
        </div>
      </div>
    </main>
  );
}
