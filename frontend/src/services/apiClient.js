const runtimeApiBaseUrl =
  typeof window !== "undefined" && window.__AEGISNEXUS_API_BASE_URL__
    ? String(window.__AEGISNEXUS_API_BASE_URL__)
    : "";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  runtimeApiBaseUrl ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(
      typeof payload === "object" && payload?.message
        ? payload.message
        : `Request failed with status ${response.status}`,
      {
        status: response.status,
        details: payload,
      },
    );
  }

  return payload;
}

export async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 12000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      signal: options.signal || controller.signal,
    });

    return await parseResponse(response);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new ApiError("Backend request timed out.", { status: 504 });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "Unable to reach the AegisNexus backend. Verify the FastAPI service is running.",
      { status: 0, details: error },
    );
  } finally {
    clearTimeout(timeout);
  }
}

export { API_BASE_URL };
