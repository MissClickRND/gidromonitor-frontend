import { apiClient } from "@/shared/api";
import { endpoints } from "@/shared/config";
import type { IAreaResponse, ICreateArea } from "../types";

export const createArea = async (body: ICreateArea): Promise<IAreaResponse> => {
  const res = await apiClient.post<IAreaResponse>(endpoints.CREATE_AREA, body);
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка создания измерения");

  return res.data;
};

export const getAreas = async (): Promise<IAreaResponse[]> => {
  const res = await apiClient.get<IAreaResponse[]>(endpoints.GET_AREAS);
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка получения");

  return res.data;
};

export const getAreaById = async (id: string): Promise<IAreaResponse> => {
  const res = await apiClient.get<IAreaResponse>(endpoints.GET_AREA_BY_ID(id));
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка получения");

  return res.data;
};
