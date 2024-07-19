"use client";

import { FormCreateProducer } from "@/components/forms/form-create-producer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useProducers } from "@/store/producers";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Edit, EllipsisVertical, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableProducers } from "../components/table-producers";

const table_grid_def =
  "grid xl:grid-cols-[1fr_1fr_8rem_9rem_8rem_9rem_1fr_4rem_2rem]";

export const ProducersList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { producers } = useSelector(useProducers);

  return (
    <div className="w-full max-w-screen-2xl flex flex-col gap-5">
      <div className="flex justify-end">
        <Drawer open={openDrawer} onOpenChange={(open) => setOpenDrawer(open)}>
          <DrawerTrigger asChild>
            <Button className="space-x-2">
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
