"use client";

import { Button } from "@/components/ui/button";
import { AsyncSelect } from "@/components/ui/custom/AsyncSelect";
import { InputGroup } from "@/components/ui/custom/InputGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ibgeDataServices } from "@/services/ibgeDataServices";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProducerSchema,
  CreateProducerType,
  defaultValues,
} from "./schema";
import { useEffect } from "react";
import { maskCPF } from "@/utils/maskCPF";
import { maskCNPJ } from "@/utils/maskCNPJ";
import { InputError } from "@/components/ui/custom/InputError";
import { removeNonDigits } from "@/utils/removeNonDigits";

export const FormCreateProducer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    control,
    formState: { errors },
  } = useForm<CreateProducerType>({
    resolver: zodResolver(CreateProducerSchema),
    defaultValues,
  });

  function handleChange(field: keyof CreateProducerType, value: string) {
    setValue(field, value);
    setError(field, { message: "" });
  }

  useEffect(() => {
    handleChange(
      "doc",
      getValues("doc_type") === "CPF"
        ? maskCPF(getValues("doc"))
        : maskCNPJ(getValues("doc"))
    );
  }, [getValues("doc_type")]);

  const onSubmit: SubmitHandler<CreateProducerType> = async (data) => {
    console.log({ data });
  };

  console.log({ errors });

  return (
    <form className="px-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label required>Documento</Label>
            <RadioGroup
              className="flex items-center gap-2"
              name="doc_type"
              defaultValue={getValues("doc_type")}
              onChange={(e: any) => handleChange("doc_type", e.target.value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CPF" id="CPF" />
                <Label htmlFor="CPF">CPF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CNPJ" id="CNPJ" />
                <Label htmlFor="CNPJ">CNPJ</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-1">
            <Input
              {...register("doc")}
              type="tel"
              placeholder={
                getValues("doc_type") === "CPF"
                  ? "XXX.XXX.XXX-XX"
                  : "XX.XXX.XXX/XXXX-XX"
              }
              onChange={(e) =>
                handleChange(
                  "doc",
                  getValues("doc_type") === "CPF"
                    ? maskCPF(e.target.value)
                    : maskCNPJ(e.target.value)
                )
              }
            />
            <InputError message={errors.doc?.message} />
          </div>
        </div>
        <InputGroup
          {...register("producer_name")}
          required
          label="Nome do Produtor"
          placeholder="Insira o nome da fazenda..."
          onChange={(e) => handleChange("producer_name", e.target.value)}
          error={errors.producer_name?.message}
        />
        <InputGroup
          {...register("farm_name")}
          required
          label="Nome da Fazenda"
          onChange={(e) => handleChange("farm_name", e.target.value)}
          error={errors.farm_name?.message}
          placeholder="Insira o nome da fazenda..."
        />

        <div>
          <Label required>Estado</Label>
          <AsyncSelect
            id="uf"
            value={getValues("uf")}
            placeholder="Escolha um estado..."
            onValueChange={(value) => {
              handleChange("uf", value);
              handleChange("city", "");
            }}
            service={() =>
              ibgeDataServices.getUFs().then(({ isOk, data }) => {
                return {
                  isOk,
                  data: isOk
                    ? data.map((uf) => ({
                        ...data,
                        label: uf.nome,
                        value: uf.sigla,
                      }))
                    : data,
                };
              })
            }
          />
          <InputError message={errors.uf?.message} />
        </div>

        <div>
          <Label required>Cidade</Label>
          <AsyncSelect
            id={`city_from_${getValues("uf")}`}
            value={getValues("city")}
            onValueChange={(value) => handleChange("city", value)}
            placeholder="Escolha uma cidade..."
            service={() =>
              ibgeDataServices
                .getCytiesByUF(getValues("uf"))
                .then(({ isOk, data }) => {
                  return {
                    isOk,
                    data: isOk
                      ? data.map((city) => ({
                          ...data,
                          label: city.nome,
                          value: city.nome,
                        }))
                      : data,
                  };
                })
            }
          />
          <InputError message={errors.city?.message} />
        </div>

        <InputGroup
          {...register("total_area")}
          type="tel"
          label="Área total em hectares da fazenda"
          placeholder="Insira o valor..."
          onChange={(e) =>
            handleChange("total_area", removeNonDigits(e.target.value))
          }
          error={errors.total_area?.message}
        />
        <InputGroup
          {...register("arable_area")}
          type="tel"
          label="Área agricultável em hectares"
          placeholder="Insira o valor..."
          onChange={(e) =>
            handleChange("arable_area", removeNonDigits(e.target.value))
          }
          error={errors.arable_area?.message}
        />
        <InputGroup
          {...register("vegetation_area")}
          type="tel"
          label="Área de vegetação em hectares"
          placeholder="Insira o valor..."
          onChange={(e) =>
            handleChange("vegetation_area", removeNonDigits(e.target.value))
          }
          error={errors.vegetation_area?.message}
        />
      </div>
      <Button className="w-full">Cadastrar</Button>
    </form>
  );
};
