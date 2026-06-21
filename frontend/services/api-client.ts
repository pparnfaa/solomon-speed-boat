const UPSTREAM_API_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5100"
).replace(/\/$/, "");

// เรียกผ่าน Next.js proxy (same-origin) เพื่อหลีกเลี่ยง CORS
const API_BASE_URL = "/api";

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getApiBaseUrl(): string {
  return UPSTREAM_API_URL;
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let body: unknown;

    try {
      body = await response.json();
    } catch {
      body = undefined;
    }

    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
        ? (body as { error: string }).error
        : `Request failed (${response.status})`;

    throw new ApiError(message, response.status, body);
  }

  return response.json() as Promise<T>;
}
