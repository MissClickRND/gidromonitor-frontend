const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const getResponseData = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const getErrorMessage = (data: unknown, fallback: string) => {
  if (typeof data === "object" && data !== null && "message" in data) {
    const message = data.message;

    if (typeof message === "string") return message;
  }

  return fallback;
};

const sendRequest = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const data = await getResponseData(response);

    throw new ApiError(
      getErrorMessage(data, `Request failed with status ${response.status}`),
      response.status,
      data,
    );
  }

  if (response.status === 204) return undefined as T;

  return (await getResponseData(response)) as T;
};

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    return await sendRequest<T>(path, options);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401 || path === "/auth/refresh") {
      throw error;
    }

    await sendRequest<void>("/auth/refresh", { method: "POST" });
    return sendRequest<T>(path, options);
  }
};

export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Не удалось выполнить запрос";
};
