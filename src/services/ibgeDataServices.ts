import { IBGEStateDataType } from "@/types";
import { apiFetch } from "./apiFetch";

export const ibgeDataServices = {
  getStates: async () =>
    apiFetch.get<IBGEStateDataType[]>(
      `${process.env.NEXT_PUBLIC_API_IBGE}/localidades/estados`
    ),
};
