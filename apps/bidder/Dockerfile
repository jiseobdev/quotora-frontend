FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc /app/
COPY apps/bidder /app/apps/bidder
WORKDIR /app
RUN corepack enable

FROM base AS production-dependencies-env
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod
RUN pnpm --filter bidder --prod deploy pruned

FROM base AS development-dependencies-env
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter bidder deploy pruned

FROM node:22-alpine AS build-env
COPY --from=development-dependencies-env /app/pruned /app
WORKDIR /app
RUN corepack enable
RUN pnpm run build

FROM node:22-alpine
COPY --from=production-dependencies-env /app/pruned/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY --from=build-env /app/public /app/public
COPY --from=build-env /app/package.json /app
WORKDIR /app
USER node
ENV PORT=3001
EXPOSE 3001
CMD ["npm", "run", "start"]
