import { randomUUID } from "crypto";
import { createCookieSessionStorage } from "react-router";

const sessionSecret = process.env.SESSION_SECRET ?? randomUUID();

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });