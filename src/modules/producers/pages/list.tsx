"use client";

import { FormProducer } from "@/modules/producers/components/form-producer";
import { removeProducer, useProducers } from "@/modules/producers/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableProducers } from "../components/table-producers";
import { ButtonDrawerFormProducer } from "../components/button-drawer-form-producer";
import { ProducerType } from "@/types";

export const ProducersList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [producerToEdit, setProducerToEdit] = useState<
    ProducerType | undefined
  >(undefined);
  const { producers } = useSelector(useProducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (producerToEdit) {
      setOpenDrawer(true);
    }
  }, [producerToEdit]);

  useEffect(() => {
    if (!openDrawer) {
      setProducerToEdit(undefined);
    }
  }, [openDrawer]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold fade-left">Produtores</h1>
        <div className="fade-right">
          <ButtonDrawerFormProducer
            open={openDrawer}
            onOpenChange={(open) => setOpenDrawer(open)}
          >
            <FormProducer
              editValues={producerToEdit}
              onSuccess={() => {
                setOpenDrawer(false);
              }}
            />
          </ButtonDrawerFormProducer>
        </div>
      </div>
      {producers.length === 0 ? (
        <h2>Você não tem produtores cadastrados</h2>
      ) : (
        <div className="fade-bottom">
          <TableProducers
            data={producers}
            onDelete={(id) => dispatch(removeProducer({ id }))}
            onEdit={(producer) => setProducerToEdit(producer)}
          />
        </div>
      )}
    </div>
  );
};
