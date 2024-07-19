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
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function Producers() {
  const [openDrawer, setOpenDrawer] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Produtores</h1>

      <Drawer open={openDrawer} onOpenChange={(open) => setOpenDrawer(open)}>
        <DrawerTrigger asChild>
          <Button className="space-x-2">
            <Plus /> <span>Novo Produtor</span>
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
              <FormCreateProducer />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
