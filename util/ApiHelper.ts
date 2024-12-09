export type HeaderType = HeadersInit | undefined;

class ApiHelper {
  private headers: HeaderType = {
    "Content-Type": "application/json",
  };

  async get(
    url: string,
    headers: HeaderType = undefined,
    fetchOptions: RequestInit = {}
  ) {
    return this.handler(
      "GET",
      url,
      null,
      headers ?? this.headers,
      fetchOptions
    );
  }

  async post(
    url: string,
    data: Record<string, unknown> | FormData | null,
    headers: HeaderType = undefined,
    fetchOptions: RequestInit = {}
  ) {
    return this.handler(
      "POST",
      url,
      data,
      headers ?? this.headers,
      fetchOptions
    );
  }

  async put(
    url: string,
    data: Record<string, unknown> | FormData,
    headers: HeaderType = undefined,
    fetchOptions: RequestInit = {}
  ) {
    return this.handler(
      "PUT",
      url,
      data,
      headers ?? this.headers,
      fetchOptions
    );
  }

  async delete(
    url: string,
    data?: Record<string, unknown>,
    headers: HeaderType = undefined,
    fetchOptions: RequestInit = {}
  ) {
    return this.handler("DELETE", url, data ?? null, headers, fetchOptions);
  }

  private async handler(
    method: string,
    url: string,
    data: Record<string, unknown> | FormData | null,
    headers: HeaderType,
    fetchOptions: RequestInit
  ) {
    const isFormData = data instanceof FormData;
    const response = await fetch(url, {
      method: method,
      headers: isFormData ? undefined : headers,
      body: data ? (isFormData ? data : JSON.stringify(data)) : null,
      ...fetchOptions,
    });
    const ret = await response.json();
    if (response.status >= 200 && response.status < 300) return ret;
    throw new Error(ret?.error || `unknown error, ${response?.status}`);
  }
}

export const API = new ApiHelper();
