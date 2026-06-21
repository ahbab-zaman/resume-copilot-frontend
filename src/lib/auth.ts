import "server-only";

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const authSecret =
  process.env.BETTER_AUTH_SECRET ??
  "";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const database = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
    })
  : new Pool();

export const auth = betterAuth({
  baseURL: appUrl,
  secret: authSecret,
  database,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [jwt()],
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
});
