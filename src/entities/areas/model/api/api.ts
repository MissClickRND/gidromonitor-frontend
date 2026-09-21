import { apiClient } from "@/shared/api";
import { endpoints } from "@/shared/config";
import { ICreateArea } from "../types";

export const createArea = async (body: ICreateArea) => {
  const res = await apiClient.post(endpoints.CREATE_AREA, body);
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка создания измерения");
};

export const getAreas = async () => {
  const res = await apiClient.get(endpoints.GET_AREAS);
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка получения");
};

export const getAreaById = async (id: number) => {
  const res = await apiClient.get(endpoints.GET_AREA_BY_ID(id));
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка получения");
};
