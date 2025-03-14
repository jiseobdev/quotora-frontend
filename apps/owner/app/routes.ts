import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route('signin', './auth/signin.tsx'),
  route('signout', './auth/signout.tsx'),
  route('signup', './auth/signup.tsx'),

  layout('./layout.tsx', [
    ...prefix('projects', [
      index('./projects/list.tsx'),
      route(':id', './projects/details.tsx')
    ]),

    ...prefix('rfps', [
      index('./rfps/list.tsx'),
      route('new', './rfps/new.tsx'),
      route(':id/send', './rfps/send.tsx'),
      route(':id', './rfps/details.tsx')
    ]),
  ]),
] satisfies RouteConfig;
