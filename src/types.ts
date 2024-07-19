export type IBGE_UF_Data_Type = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export type IBGE_City_Data_Type = {
  id: number;
  nome: string;
};
