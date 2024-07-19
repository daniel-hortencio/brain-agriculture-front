import { IBGE_UF_Data_Type, IBGE_City_Data_Type } from "@/types";
import { apiFetch } from "./apiFetch";

export const ibgeDataServices = {
  getUFs: async () =>
    apiFetch.get<IBGE_UF_Data_Type[]>(
      `${process.env.NEXT_PUBLIC_API_IBGE}/localidades/estados?orderBy=nome`
    ),
  getCytiesByUF: async (UF: string) =>
    apiFetch.get<IBGE_City_Data_Type[]>(
      `${process.env.NEXT_PUBLIC_API_IBGE}/localidades/estados/${UF}/distritos?orderBy=nome`
    ),
};
