import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout('./auth/layout.tsx', [
    route('signin', './auth/signin.tsx'),
    route('signout', './auth/signout.tsx'),
    route('signup', './auth/signup.tsx'),
  ]),

  layout('./layout.tsx', [
    index('./index.tsx'),

    ...prefix('projects', [
      index('./projects/list.tsx'),
      route(':id', './projects/details.tsx'),
      route(':id/rfp', './projects/rfp.tsx'),
    ]),

    ...prefix('proposals', [
      index('./proposals/list.tsx'),
      route('new', './proposals/new.tsx'),
      // route(':id', './rfps/details.tsx'),
      route(':id/send', './proposals/send.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
