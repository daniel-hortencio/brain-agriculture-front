"use client";

import { Button } from "@/components/ui/button";
import { AsyncSelect } from "@/components/ui/custom/async-select";
import { InputGroup } from "@/components/ui/custom/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ibgeDataServices } from "@/services/ibgeDataServices";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProducerSchema,
  CreateProducerType,
  defaultValues,
} from "./schema";
import { useEffect, useState } from "react";
import { maskCPF } from "@/utils/maskCPF";
import { maskCNPJ } from "@/utils/maskCNPJ";
import { InputError } from "@/components/ui/custom/input-error";
import { removeNonDigits } from "@/utils/removeNonDigits";
import { MultipleSelect } from "@/components/ui/custom/multiple-select";
import { ProducerType } from "@/types";
import { useDispatch } from "react-redux";
import { createProducer, updateProducer } from "@/modules/producers/store";

type Props = {
  onSuccess: () => void;
  editValues?: ProducerType;
};

export const FormProducer = ({ onSuccess, editValues }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<CreateProducerType>({
    resolver: zodResolver(CreateProducerSchema),
    defaultValues: editValues
      ? {
          ...editValues,
          arable_area: editValues.arable_area.toString(),
          total_area: editValues.total_area.toString(),
          vegetation_area: editValues.vegetation_area.toString(),
        }
      : defaultValues,
  });

  function handleChange(
    field: keyof CreateProducerType,
    value: string | string[]
  ) {
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

  const onSubmit: SubmitHandler<CreateProducerType> = async (dto) => {
    setLoading(true);

    const formated_dto: Omit<ProducerType, "id"> = {
      ...dto,
      doc_type: dto.doc_type,
      total_area: parseInt(removeNonDigits(dto.total_area) || "0"),
      arable_area: parseInt(removeNonDigits(dto.arable_area) || "0"),
      vegetation_area: parseInt(removeNonDigits(dto.vegetation_area) || "0"),
    };

    await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            editValues
              ? dispatch(updateProducer({ id: editValues.id, ...formated_dto }))
              : dispatch(createProducer(formated_dto))
          ),
        1500
      )
    );

    onSuccess();

    setLoading(false);
  };

  return (
    <form className="px-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div className="grid md:grid-cols-2 gap-2 md:gap-5">
          <div>
            <InputGroup
              {...register("name")}
              required
              label="Nome do Produtor"
              placeholder="Insira o nome da fazenda..."
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name?.message}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 space-y-1">
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
              <InputGroup
                label=""
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
                error={errors.doc?.message}
              />
            </div>
          </div>
        </div>
        <InputGroup
          {...register("farm_name")}
          required
          label="Nome da Fazenda"
          onChange={(e) => handleChange("farm_name", e.target.value)}
          error={errors.farm_name?.message}
          placeholder="Insira o nome da fazenda..."
        />

        <div className="grid md:grid-cols-2 gap-2 md:gap-5">
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
        </div>

        <div className="grid md:grid-cols-2 gap-2 md:gap-5">
          <InputGroup
            {...register("total_area")}
            type="tel"
            label="Área total da fazenda em hectares"
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
        <div className="space-y-1">
          <Label>Culturas Plantadas</Label>
          <MultipleSelect
            options={["Soja", "Milho", "Algodão", "Café", "Cana de Açucar"]}
            value={getValues("planting_crops")}
            onChange={(crops) => handleChange("planting_crops", crops)}
          />
          <InputError message={errors.planting_crops?.message} />
        </div>
      </div>
      <Button className="w-full" type="submit" loading={loading}>
        Cadastrar
      </Button>
    </form>
  );
};
