import { useNotifications } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateArea } from "../types";
import { createArea } from "../api/api";
import { areasQueryKey } from "./useAreas";


export const useCreateArea = () => {
  const { showError, showSuccess } = useNotifications();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: ICreateArea) => createArea(body),
    onSuccess: (area) => {
      showSuccess("Данные отправлены на обработку");
      void queryClient.invalidateQueries({ queryKey: areasQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["area", area.id] });
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
