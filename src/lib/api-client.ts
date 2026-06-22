import { authClient } from "@/lib/auth-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

async function getBearerToken(): Promise<string | null> {
  const authTokenClient = authClient as {
    token?: () => Promise<{ data?: { token?: string } }>;
    getToken?: () => Promise<{ data?: { token?: string } }>;
  };
  const tokenResult = authTokenClient.token
    ? await authTokenClient.token()
    : authTokenClient.getToken
      ? await authTokenClient.getToken()
      : { data: undefined };

  return tokenResult.data?.token ?? null;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  if (!backendUrl) {
    return {
      success: false,
      error: "NEXT_PUBLIC_BACKEND_URL is not configured.",
    };
  }

  try {
    const headers = new Headers(options.headers);
    const token = await getBearerToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (options.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${backendUrl}${path}`, {
      ...options,
      headers,
    });

    return (await response.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      error: "Could not reach the server. Please try again.",
    };
  }
}

export async function apiDownload(
  path: string,
  options: RequestInit = {},
): Promise<{ success: boolean; blob?: Blob; error?: string }> {
  if (!backendUrl) {
    return {
      success: false,
      error: "NEXT_PUBLIC_BACKEND_URL is not configured.",
    };
  }

  try {
    const headers = new Headers(options.headers);
    const token = await getBearerToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (options.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${backendUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      try {
        const errorPayload = (await response.json()) as ApiResponse<unknown>;
        return {
          success: false,
          error: errorPayload.error ?? "Could not download the file.",
        };
      } catch {
        return {
          success: false,
          error: "Could not download the file.",
        };
      }
    }

    return {
      success: true,
      blob: await response.blob(),
    };
  } catch {
    return {
      success: false,
      error: "Could not reach the server. Please try again.",
    };
  }
}
