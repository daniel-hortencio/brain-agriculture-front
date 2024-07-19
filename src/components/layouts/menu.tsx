"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BarChartBig, MenuIcon, Users, X } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const MenuMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onOpenChange={(open) => setOpenDrawer(open)}
        direction="left"
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shadow-lg rounded-full fixed top-5 left-5"
          >
            <MenuIcon className="size-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-80 w-4/5" direction="left">
          <div className="space-y-5">
            <DrawerHeader className="flex items-center justify-between gap-5 px-2 py-2">
              <DrawerTitle className="text-xl w-full flex items-center gap-0.5">
                <span className="text-primary font-black">AG</span>
                <span className="text-neutral-500/60 font-semibold">admin</span>
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full min-w-10 absolute right-5"
                >
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex flex-col gap-2">
              <Link href="/" className="w-full">
                <Button
                  variant="secondary"
                  className="bg-transparent text-base w-full flex pl-2 hover:pl-4 transition-all items-center gap-3 justify-start"
                >
                  <BarChartBig className="size-6" /> Home
                </Button>
              </Link>
              <Link href="/produtores" className="w-full ">
                <Button
                  variant="secondary"
                  className="bg-transparent text-base w-full pl-2 hover:pl-4 transition-all flex items-center gap-3 justify-start"
                >
                  <Users className="size-6" /> Produtores
                </Button>
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MenuDesktop = () => (
  <Card className="w-64">
    <strong className="text-xl border-b px-6 py-2 w-full flex items-center gap-0.5">
      <span className="text-primary font-black">AG</span>
      <span className="text-neutral-500/60 font-semibold">admin</span>
    </strong>
    <CardContent className="flex flex-col gap-2 px-4">
      <Link href="/" className="w-full">
        <Button
          variant="secondary"
          className="bg-transparent w-full flex pl-2 hover:pl-4 transition-all items-center gap-2 justify-start h-8"
        >
          <BarChartBig className="size-5" /> Home
        </Button>
      </Link>
      <Link href="/produtores" className="w-full ">
        <Button
          variant="secondary"
          className="bg-transparent w-full pl-2 hover:pl-4 transition-all flex items-center gap-2 justify-start h-8"
        >
          <Users className="size-5" /> Produtores
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export const Menu = () => {
  return (
    <>
      <div className="2xl:hidden">
        <MenuMobile />
      </div>
      <div className="hidden 2xl:block">
        <MenuDesktop />
      </div>
    </>
  );
};
