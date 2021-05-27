const getters = {
  session: (state: any) => state.user.session,
  userName: (state: any) => state.user.userName,
  userId: (state: any) => state.user.userId,
  avatar: (state: any) => state.user.avatar,
  role: (state: any) => state.user.roleName,
  permissions: (state: any) => state.user.permissions,
  sysRouters: (state: any) => state.menu.sysRouters,
  currentRouters: (state: any) => state.menu.currentRouters,
  dict: (state: any) => state.common.dict,
  dictGroup: (state: any) => state.common.dictGroup
};
export default getters;
