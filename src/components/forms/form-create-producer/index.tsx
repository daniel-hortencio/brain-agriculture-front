"use client";

import { Button } from "@/components/ui/button";
import { AsyncSelect } from "@/components/ui/custom/AsyncSelectState";
import { InputGroup } from "@/components/ui/custom/InputGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ibgeDataServices } from "@/services/ibgeDataServices";

export const FormCreateProducer = () => {
  return (
    <form className="px-4 space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Documento</Label>
            <RadioGroup
              className="flex items-center gap-2"
              name="doc_type"
              /* defaultValue={getValues("doc_type")}
            onChange={(e: any) => handleChange("doc_type", e.target.value)} */
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
          <Input
            placeholder="XXX.XXX.XXX-XX"
            /* placeholder={
              getValues("doc_type") === "CPF"
                ? "XXX.XXX.XXX-XX"
                : "XX.XXX.XXX/XXXX-XX"
            } */
          />
        </div>
        <InputGroup
          label="Nome da Fazenda"
          placeholder="Insira o nome da fazenda..."
        />
        <div className="grid grid-cols-[7rem_1fr] gap-4">
          <div>
            <Label>Estado</Label>
            <AsyncSelect
              service={() =>
                ibgeDataServices.getStates().then(({ isOk, data }) => {
                  return {
                    isOk,
                    data: isOk
                      ? data.map((state) => ({
                          ...data,
                          label: state.nome,
                          value: state.sigla,
                        }))
                      : data,
                  };
                })
              }
            />
          </div>
          <InputGroup label="Cidade" />
        </div>

        <InputGroup
          label="Área total em hectares da fazenda"
          placeholder="Insira o valor..."
        />
        <InputGroup
          label="Área agricultável em hectares"
          placeholder="Insira o valor..."
        />
        <InputGroup
          label="Área de vegetação em hectares"
          placeholder="Insira o valor..."
        />
      </div>
      <Button className="w-full">Cadastrar</Button>
    </form>
  );
};
