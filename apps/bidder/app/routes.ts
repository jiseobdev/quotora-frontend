import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index('./index.tsx'),

  layout('./auth/layout.tsx', [
    route('signin', './auth/signin.tsx'),
    route('signout', './auth/signout.tsx'),
    route('signup', './auth/signup.tsx'),
  ]),

  layout('./layout.tsx', [
    ...prefix('projects', [
      index('./projects/list.tsx'),
      route(':id', './projects/details.tsx'),
      route(':id/nda', './projects/nda.tsx'),
      route(':id/rfp', './projects/rfp.tsx'),
      route(':id/qnas', './projects/qnas.tsx'),
    ]),

    ...prefix('proposals', [
      index('./proposals/list.tsx'),
      route('new', './proposals/new.tsx'),
      // route(':id', './rfps/details.tsx'),
      route(':id/send', './proposals/send.tsx'),
    ]),

    ...prefix('settings', [
      index('./settings/index.tsx'),
      route('account', './settings/account.tsx'),
      route('team', './settings/team.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
