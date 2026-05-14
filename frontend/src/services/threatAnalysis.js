import { apiRequest } from "./apiClient";

export function analyzeThreat(prompt) {
  return apiRequest("/analyze", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}

export function getBackendHealth() {
  return apiRequest("/health", {
    method: "GET",
  });
}
