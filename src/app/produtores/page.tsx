import { FormCreateProducer } from "@/components/forms/form-create-producer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, X } from "lucide-react";

export default function Producers() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Produtores</h1>

      <Drawer open>
        <DrawerTrigger asChild>
          <Button className="space-x-2">
            <Plus /> <span>Novo Produtor</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-4/5 max-w-lg">
          <div className="space-y-5">
            <div className="text-right">
              <DrawerClose asChild>
                <Button variant="outline" size="icon">
                  <X />
                </Button>
              </DrawerClose>
            </div>
            <DrawerHeader>
              <DrawerTitle>Adicionar Novo Produtor</DrawerTitle>
              <DrawerDescription>Lorem Ipsum</DrawerDescription>
            </DrawerHeader>

            <div>
              <FormCreateProducer />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
