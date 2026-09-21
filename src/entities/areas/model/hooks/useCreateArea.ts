import { useNotifications } from "@/shared/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICreateArea } from "../types";
import { createArea, getAreaById } from "../api/api";


export const useCreateArea = () => {
  const { showError, showSuccess } = useNotifications();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: ICreateArea) => createArea(body),
    onSuccess: () => {
      showSuccess("Данные отправлены на обработку");
      queryClient.invalidateQueries({ queryKey: ["groundData"] });
    },
    onError: (error: Error) => {
      showError(error.message || "Ошибка добавления данных");
    },
  });

  return {
    createArea: mutation.mutate,
    createAreaAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
  };
};

export const useArea = (id?: string) =>
  useQuery({
    queryKey: ["area", id],
    queryFn: () => getAreaById(id as string),
    enabled: Boolean(id),
  });
