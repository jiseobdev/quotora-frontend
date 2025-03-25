import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/team";
import { data, useLoaderData } from "react-router";
import { fetchTeam } from "~/lib/fetch";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const team = await fetchTeam(token);

  return data({ team });
}

export default function Team() {
  const { team } = useLoaderData<typeof loader>();

  return (
    <main className="pt-20 px-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Position</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Company Email</th>
                  {/* <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {team.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.position}</td>
                    <td className="py-3 px-4">{user.email}</td>
                  </tr>
                ))}
                {/* <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Sarah Kim</td>
                  <td className="py-3 px-4">Legal Director</td>
                  <td className="py-3 px-4">sarah.kim@company.com</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-gray-500 hover:text-[#4F46E5]">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
