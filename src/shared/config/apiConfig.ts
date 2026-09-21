export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const endpoints = {
  CREATE_AREA: "/areas",
  GET_AREAS: "/areas",
  GET_AREA_BY_ID: (id: string) => `/areas/${id}`,

  GET_LAYERS_BY_ID: (id: string) => `/storage/analysis/${id}`,
};
