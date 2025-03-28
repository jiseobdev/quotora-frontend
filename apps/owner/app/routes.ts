import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index('./index.tsx'),

  layout('./auth/layout.tsx', [
    route('signin', './auth/signin.tsx'),
    route('signout', './auth/signout.tsx'),
    route('signup', './auth/signup.tsx'),
    route('email-verification/:code', './auth/email-verification.tsx'),
    route('reset-password', './auth/reset-password.tsx'),
    route('request-reset-password', './auth/request-reset-password.tsx'),
    route('resend-verification-email', './auth/resend-verification-email.tsx'),
  ]),

  layout('./layout.tsx', [
    ...prefix('projects', [
      index('./projects/list.tsx'),
      route(':id', './projects/details.tsx'),
      route(':id/reviews', './projects/reviews.tsx'),
      route(':id/notices', './projects/notices.tsx'),
      route(':id/proposals/:proposalId/qnas', './projects/qnas.tsx'),
    ]),

    ...prefix('rfps', [
      index('./rfps/list.tsx'),
      route('new', './rfps/new.tsx'),
      route(':id', './rfps/details.tsx'),
      route(':id/edit', './rfps/edit.tsx'),
      route(':id/invite', './rfps/invite.tsx'),
      route(':id/comments', './rfps/comments.tsx'),
      route(':id/send', './rfps/send.tsx'),
      route(':id/permissions', './rfps/permissions.tsx'),
      route(':id/finalize', './rfps/finalize.tsx'),
    ]),

    ...prefix('settings', [
      index('./settings/index.tsx'),
      route('account', './settings/account.tsx'),
      route('team', './settings/team.tsx'),
    ]),

    ...prefix('api', [
      route('colleagues', './api/colleagues.tsx'),
      route('current-user', './api/current-user.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
