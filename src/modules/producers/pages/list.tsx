"use client";

import { FormCreateProducer } from "@/components/forms/form-create-producer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useProducers } from "@/store/producers";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableProducers } from "../components/table-producers";

export const ProducersList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { producers } = useSelector(useProducers);

  console.log({ producers });

  return (
    <div className="w-full max-w-screen-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtores</h1>
        <Drawer open={openDrawer} onOpenChange={(open) => setOpenDrawer(open)}>
          <DrawerTrigger asChild>
            <Button className="space-x-2" size="sm">
              <Plus /> <span>Adicionar Produtor</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-2xl">
            <div className="space-y-2">
              <DrawerHeader className="flex items-center justify-between gap-5">
                <DrawerTitle>Adicionar Novo Produtor</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="outline" size="icon">
                    <X />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <FormCreateProducer
                  onSuccess={() => {
                    setOpenDrawer(false);
                  }}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {producers.length === 0 ? (
        <h2>Você não tem produtores cadastrados</h2>
      ) : (
        <TableProducers
          data={producers}
          onDelete={(id) => alert(id)}
          onEdit={(producer) => alert(JSON.stringify(producer))}
        />
      )}
    </div>
  );
};
