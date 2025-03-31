import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  route('signout', './auth/signout.tsx'),

  layout('./layout.tsx', [
    index("./index.tsx"),

    ...prefix('/discussions', [
      index('./discussions/list.tsx'),
      route(':id', './discussions/details.tsx'),
      route(':id/comments', './discussions/comments.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
