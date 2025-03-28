import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/team";
import { data, Form, UNSAFE_ErrorResponseImpl, useLoaderData, useSubmit } from "react-router";
import { fetchColleagues, fetchTeam } from "~/lib/fetch";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent } from "~/components/ui/dialog";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "~/components/ui/multi-select";
import { DialogTrigger } from "@radix-ui/react-dialog";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const colleagues = await fetchColleagues(token);
  const team = await fetchTeam(token);

  return data({ colleagues, team });
}

export async function action({ request }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const memberIds = formData.getAll("memberIds").map((id) => parseInt(id.toString(), 10));
  const body = { memberIds };

  const response = await fetch(new URL(`/api/v1/teams/members`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: body, response: await response.json() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return data({ success: true });
}

export default function Team() {
  const { colleagues, team } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [open, setOpen] = useState(false);
  const [memberIds, setMemberIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit({ memberIds }, { method: "POST" });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setMemberIds([]);
    }
  }, [open]);

  return (
    <main className="pt-20 px-6 min-h-[calc(100vh-var(--spacing)*16)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 mb-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 flex items-center">
              <i className="fa-solid fa-plus mr-2"></i>
              Add Team Member
            </DialogTrigger>
            <DialogContent className="bg-white rounded-xl shadow-2xl w-[480px] p-6">
              <Form method="POST" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">팀 멤버 추가하기</h2>
                  <DialogClose type="reset" className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </DialogClose>
                </div>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="flex gap-2">
                      <MultiSelector
                        values={memberIds}
                        onValuesChange={setMemberIds}
                        loop
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="이메일 주소 입력" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                            {colleagues.map((colleague) => (
                              <MultiSelectorItem key={colleague.id} value={colleague.id.toString()}>
                                <div className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                  <img
                                    src={colleague.profileImage}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <p className="text-sm font-medium">{colleague.name}</p>
                                    <p className="text-xs text-gray-500">{colleague.email}</p>
                                  </div>
                                </div>
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse gap-3">
                    <button type="submit" className="px-4 py-2.5 bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90 whitespace-nowrap disabled:disabled:bg-gray-200 disabled:text-gray-400" disabled={memberIds.length === 0}>
                      My Team 추가
                    </button>
                    <DialogClose type="reset" className="px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                      취소
                    </DialogClose>
                  </div>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
          <button className="px-4 py-2 text-[#4F46E5] border border-[#4F46E5] rounded-lg hover:bg-[#F9FAFB] flex items-center disabled:bg-gray-200 disabled:border-none disabled:text-gray-400" disabled>
            <i className="fa-solid fa-pen mr-2"></i>
            Edit Team
          </button>
        </div>
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
