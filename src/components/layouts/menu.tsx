"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BarChartBig, ChevronRight, MenuIcon, Users, X } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/custom/logo";

type ItemProps = {
  href: string;
  isActive: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const MenuItem = ({ href, isActive, children, onClick }: ItemProps) => (
  <Link {...{ href }} className={cn("w-full rounded-lg")}>
    <button
      className={cn(
        "text-base w-full flex px-3 transition-all items-center gap-3 justify-start h-12 rounded-lg font-medium tracking-wide",
        isActive
          ? "neumorphic-sm-inset text-primary"
          : "neumorphic-sm concave hover:text-primary hover:bg-transparent"
      )}
      {...{ onClick }}
    >
      {children} {isActive && <ChevronRight className="size-6 ml-auto" />}
    </button>
  </Link>
);

const MenuMobile = ({ path = "" }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onOpenChange={(open) => setOpenDrawer(open)}
        direction="left"
      >
        <DrawerTrigger asChild>
          <button className="shadow-lg rounded-full fixed top-5 left-5 concave hover:bg-slate-200/80 p-2 hover:text-primary">
            <MenuIcon className="size-8" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-w-80 w-4/5" direction="left">
          <div className="space-y-8">
            <DrawerHeader className="flex items-center justify-between gap-5 px-2 py-2">
              <Logo />
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full min-w-10 absolute right-5 bg-slate-100 hover:bg-slate-200 concave"
                >
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex flex-col gap-3">
              <MenuItem
                href="/"
                isActive={path === "/"}
                onClick={() => setOpenDrawer(false)}
              >
                <BarChartBig className="size-6" /> Dashboard
              </MenuItem>
              <MenuItem
                href="/produtores"
                isActive={path === "/produtores"}
                onClick={() => setOpenDrawer(false)}
              >
                <Users className="size-6" /> Produtores
              </MenuItem>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MenuDesktop = ({ path = "" }) => (
  <div className="w-64 space-y-6">
    <Logo />

    <div className="flex flex-col gap-3">
      <MenuItem href="/" isActive={path === "/"}>
        <BarChartBig className="size-6" /> Dashboard
      </MenuItem>
      <MenuItem href="/produtores" isActive={path === "/produtores"}>
        <Users className="size-6" /> Produtores
      </MenuItem>
    </div>
  </div>
);

export const Menu = () => {
  const path = usePathname();

  return (
    <>
      <div className="2xl:hidden fade">
        <MenuMobile {...{ path }} />
      </div>
      <div className="hidden 2xl:block fade-top">
        <MenuDesktop {...{ path }} />
      </div>
    </>
  );
};
