import { removeNonDigits } from "@/utils/removeNonDigits";
import { z } from "zod";

const cpf_regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpj_regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const CreateProducerSchema = z
  .object({
    doc: z.string({ message: "Obrigatório" }),
    doc_type: z.enum(["CPF", "CNPJ"]),
    farm_name: z.string().min(3, { message: "Pelo menos 3 caracteres" }),
    producer_name: z.string().min(3, { message: "Pelo menos 3 caracteres" }),
    uf: z.string().min(2, { message: "Obrigatório" }),
    city: z.string().min(1, { message: "Obrigatório" }),
    total_area: z.string().min(1, { message: "Pelo menos 1 hectare" }),
    arable_area: z.string().min(1, { message: "Pelo menos 1 hectare" }),
    vegetation_area: z.string().min(1, { message: "Pelo menos 1 hectare" }),
  })
  .refine(
    (data) =>
      data.doc_type !== "CPF" ||
      (data.doc_type === "CPF" && cpf_regex.test(data.doc)),
    {
      message: "Mínimo 11 dígitos",
      path: ["doc"],
    }
  )
  .refine(
    (data) =>
      data.doc_type !== "CNPJ" ||
      (data.doc_type === "CNPJ" && cnpj_regex.test(data.doc)),
    {
      message: "Mínimo 14 dígitos",
      path: ["doc"],
    }
  )
  .refine(
    (data) =>
      parseInt(removeNonDigits(data.arable_area) || "0") <=
      parseInt(removeNonDigits(data.total_area) || "0"),
    {
      message: "Não pode ser maior que a área total",
      path: ["arable_area"],
    }
  )
  .refine(
    (data) =>
      parseInt(removeNonDigits(data.vegetation_area) || "0") <=
      parseInt(removeNonDigits(data.total_area) || "0"),
    {
      message: "Não pode ser maior que a área total",
      path: ["vegetation_area"],
    }
  )
  .refine(
    (data) =>
      parseInt(removeNonDigits(data.arable_area) || "0") +
        parseInt(removeNonDigits(data.vegetation_area) || "0") <=
      parseInt(removeNonDigits(data.total_area) || "0"),
    {
      message:
        "Área agricultável e área de vegetação não podem ser maiores que a área total",
      path: ["total_area"],
    }
  );

export type CreateProducerType = z.infer<typeof CreateProducerSchema>;

export const defaultValues: CreateProducerType = {
  doc: "",
  doc_type: "CPF",
  producer_name: "",
  farm_name: "",
  city: "",
  uf: "",
  total_area: "",
  arable_area: "",
  vegetation_area: "",
};
