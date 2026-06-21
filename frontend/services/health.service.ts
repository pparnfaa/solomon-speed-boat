import { apiFetch } from "@/services/api-client";

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/health");
}
