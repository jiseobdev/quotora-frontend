import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout('./layout.tsx', [
    index("./index.tsx"),
  ]),
] satisfies RouteConfig;
