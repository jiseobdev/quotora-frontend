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
      route(':id/reviews', './projects/reviews.tsx'),
      route(':id/notices', './projects/notices.tsx'),
    ]),

    ...prefix('rfps', [
      index('./rfps/list.tsx'),
      route('new', './rfps/new.tsx'),
      route(':id', './rfps/details.tsx'),
      route(':id/edit', './rfps/edit.tsx'),
      route(':id/invite', './rfps/invite.tsx'),
      route(':id/comments', './rfps/comments.tsx'),
      route(':id/send', './rfps/send.tsx'),
      route(':id/finalize', './rfps/finalize.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
