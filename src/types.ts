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

export type ProducerType = {
  id: string;
  doc: string;
  doc_type: "CPF" | "CNPJ";
  farm_name: string;
  name: string;
  uf: string;
  city: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  planting_crops: string[];
};
