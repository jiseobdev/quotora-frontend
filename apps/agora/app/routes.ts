import { type RouteConfig, index, layout, prefix } from "@react-router/dev/routes";

export default [
  layout('./layout.tsx', [
    index("./index.tsx"),

    ...prefix('/discussions', [
      index('./discussions/list.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
