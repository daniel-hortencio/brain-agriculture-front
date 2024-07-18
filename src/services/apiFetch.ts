export type ApiMethod = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";

type ApiFetch = {
  path: string;
  method: ApiMethod;
  body?: any;
  headers?: any;
  queryParams?: object;
};

export const handleQueries = (queryParams?: object) => {
  const query =
    !queryParams || Object.keys(queryParams).length === 0
      ? ``
      : `?${Object.entries(queryParams)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                value as string
              )}`
          )
          .join("&")}`;

  return query;
};

export const useFetch = async ({
  path,
  method,
  body,
  headers,
  queryParams,
}: ApiFetch) => {
  const result = await fetch(`${path}${handleQueries(queryParams)}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await result.json();

  return { isOk: result.ok, data };
};

type ResponseSuccessVoid = { isOk: true; data: undefined };
type ResponseSuccessData<T> = { isOk: true; data: T };
type ResponseError = { isOk: false; data: { message: string } };

export const apiFetch = {
  get: async <T>(
    path: string,
    filters?: any
  ): Promise<ResponseSuccessData<T> | ResponseError> => {
    try {
      const { data, isOk } = await useFetch({
        path,
        method: "GET",
        queryParams: filters,
      });
      return { isOk, data };
    } catch (err: any) {
      return { isOk: false, data: err };
    }
  },
  delete: async (
    path: string
  ): Promise<ResponseSuccessVoid | ResponseError> => {
    try {
      const { data, isOk } = await useFetch({
        path,
        method: "DELETE",
      });
      return { isOk, data };
    } catch (err: any) {
      return { isOk: false, data: err };
    }
  },
  post: async (
    path: string,
    body: Object
  ): Promise<ResponseSuccessVoid | ResponseError> => {
    try {
      const { data, isOk } = await useFetch({
        path,
        method: "POST",
        body,
      });
      return { isOk, data };
    } catch (err: any) {
      return { isOk: false, data: err };
    }
  },
  patch: async (
    path: string,
    body: Object
  ): Promise<ResponseSuccessVoid | ResponseError> => {
    try {
      const { data, isOk } = await useFetch({
        path,
        method: "PATCH",
        body,
      });
      return { isOk, data };
    } catch (err: any) {
      return { isOk: false, data: err };
    }
  },
};
