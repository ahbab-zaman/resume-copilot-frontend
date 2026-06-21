import { Pool } from "pg";
import { getMigrations } from "better-auth/db/migration";
import { jwt } from "better-auth/plugins";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run better-auth migrations.");
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const authSecret = process.env.BETTER_AUTH_SECRET ?? "";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const database = new Pool({
  connectionString: databaseUrl,
});

const authOptions = {
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
};

try {
  const migrations = await getMigrations(authOptions);
  const pending =
    migrations.toBeCreated.length + migrations.toBeAdded.length;

  if (pending === 0) {
    console.log("better-auth schema is already up to date.");
  } else {
    console.log(
      `Applying ${pending} better-auth migration${pending === 1 ? "" : "s"}...`,
    );
    await migrations.runMigrations();
    console.log("better-auth schema migration completed.");
  }
} finally {
  await database.end();
}
