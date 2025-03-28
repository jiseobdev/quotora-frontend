import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent } from "~/components/ui/dialog";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "~/components/ui/multi-select";

const schema = z.string().email();

interface Props {
  id: number | null;
  open: boolean;
  values: string[];
  onOpenChange: (open: boolean) => void;
  onValuesChange: (values: string[]) => void;
}

export default function InviteModal({ id, open, values, onOpenChange, onValuesChange }: Props) {
  const fetcher = useFetcher<{ success: boolean }>();

  const userFetcher = useFetcher<{ user: User }>();
  const { user = null } = userFetcher.data ?? {};
  const loadUser = () => userFetcher.load('/api/current-user');

  const colleaguesFetcher = useFetcher<{ colleagues: User[] }>();
  const { colleagues = [] } = colleaguesFetcher.data ?? {};
  const loadColleagues = () => colleaguesFetcher.load('/api/colleagues');

  const permissionsFetcher = useFetcher<{ permissions: Permission[] }>();
  const { permissions = [] } = permissionsFetcher.data ?? {};
  const loadPermissions = () => permissionsFetcher.load(`/rfps/${id}/permissions`);

  const colleaguesWithoutPermission =
    colleagues.filter((colleague) => !permissions.find((permission) => permission.id === colleague.id));
  const grantedUsers = permissions.filter((grantedUser) => grantedUser.id !== user?.id);

  const loadAll = () => {
    loadUser();
    loadColleagues();
    loadPermissions();
  };

  const [permission, setPermission] = useState<string | null>(null);
  const handleChangePermission = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermission(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!permission) return;

    await fetcher.submit({ emails: values, permission }, { action: `/rfps/${id}/invite`, method: "POST" });
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      loadAll();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      onValuesChange([]);
      setPermission(null);
    }
  }, [open]);

  useEffect(() => {
    if (fetcher.data?.success) {
      loadAll();
    }
  }, [fetcher.data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-xl shadow-2xl w-[480px] p-6">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">팀과 공유하기</h2>
            <DialogClose type="reset" className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-xmark text-xl"></i>
            </DialogClose>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="flex gap-2">
                <MultiSelector
                  key={values.join(',')}
                  values={values}
                  onValuesChange={onValuesChange}
                  loop
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput
                      placeholder="이메일 주소 입력"
                      onKeyDown={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        if (e.key === "Enter" && schema.safeParse(value).success) {
                          onValuesChange([...values, value]);
                        }
                      }}
                    />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {colleaguesWithoutPermission.map((colleague) => (
                        <MultiSelectorItem key={colleague.id} value={colleague.email}>
                          <div className="w-full flex items-center gap-3 p-2">
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
                {/* {email.length > 0 && (
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap">
                    추가
                  </button>
                )} */}
              </div>
            </div>
            {(grantedUsers.length === 0 || values.length > 0) ? (
              <>
                <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">권한 설정</p>
                  <div className="space-y-3">
                    <label
                      className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer border border-gray-200 hover:border-blue-200">
                      <input type="radio" name="permission" value="EDIT" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={permission === 'EDIT'} onChange={handleChangePermission} />
                      <div>
                        <span className="text-sm font-medium">편집</span>
                        <p className="text-xs text-gray-500 mt-1">프로젝트 내용을 수정하고 편집할 수 있습니다</p>
                      </div>
                    </label>
                    <label
                      className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer border border-gray-200 hover:border-blue-200">
                      <input type="radio" name="permission" value="READ" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={permission === 'READ'} onChange={handleChangePermission} />
                      <div>
                        <span className="text-sm font-medium">검토 및 댓글</span>
                        <p className="text-xs text-gray-500 mt-1">프로젝트를 보고 댓글만 작성할 수 있습니다</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
                    disabled={values.length === 0 || !permission}
                    onClick={handleSubmit}
                  >
                    초대장 보내기
                  </button>
                  <DialogClose type="reset" className="px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    취소
                  </DialogClose>
                </div>
              </>
            ) : (
              <>
                <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">접근 권한이 있는 팀원</p>
                  <div className="space-y-2">
                    {grantedUsers.map((grantedUser) => (
                      <div key={grantedUser.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <img src={grantedUser.profileImage} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">{grantedUser.name}</p>
                            <p className="text-xs text-gray-500">{grantedUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            name="permission"
                            value={grantedUser.permission}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded border-none focus:ring-0"
                            onChange={(e) => fetcher.submit({ id, accountId: grantedUser.id, permission: e.target.value }, { method: 'PUT', action: `/rfps/${id}/permissions` })}
                          >
                            <option value="EDIT">편집</option>
                            <option value="READ">검토 및 댓글</option>
                          </select>
                          <button
                            className="w-4 text-gray-400 hover:text-red-500"
                            onClick={() => fetcher.submit({ id, accountId: grantedUser.id }, { method: 'DELETE', action: `/rfps/${id}/permissions` })}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <DialogClose type="reset" className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    완료
                  </DialogClose>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}