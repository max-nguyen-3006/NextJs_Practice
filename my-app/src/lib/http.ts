type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

class HttpError extends Error {
  status: number;
  payload: any;
  constructor(status: number, payload: any) {
    super(payload.message);
    this.status = status;
    this.payload = payload;
  }
}
class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("SessionToken can only be set in the browser");
    }
    this.token = token;
  }
}
export const clientSessionToken = new SessionToken();

const request = async <Response>(
  method: "GET" | "POST" | "DELETE" | "PUT",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization:
      clientSessionToken.value && `Bearer ${clientSessionToken.value}`,
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  console.log("Http nek");
  console.log(baseUrl);

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    throw new HttpError(data.status, data.payload);
  }
  if (["/auth/login"].includes(url)) {
    clientSessionToken.value = payload.data.token;
  } else if (["/auth/logout"].includes(url)) {
    clientSessionToken.value = "";
  }
  return data;
};
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};
export default http;
