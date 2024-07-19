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
import { ReactNode } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export const ButtonDrawerFormProducer = ({
  open,
  onOpenChange,
  children,
}: Props) => (
  <Drawer {...{ open, onOpenChange }} direction="right">
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
          {children}
        </div>
      </div>
    </DrawerContent>
  </Drawer>
);
