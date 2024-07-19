import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { BarChartBig, Users } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen p-6 flex gap-5 min-h-screen">
      <Card className="hidden 2xl:block w-64">
        <strong className="text-xl border-b px-5 py-2 w-full flex items-center gap-0.5">
          <span className="text-primary font-black">AG</span>
          <span className="text-neutral-500/60 font-semibold">admin</span>
        </strong>
        <CardContent className="flex flex-col gap-2">
          <Link href="/" className="w-full">
            <Button
              variant="secondary"
              className="bg-transparent w-full flex pl-0 hover:pl-2 transition-all items-center gap-2 justify-start h-8"
            >
              <BarChartBig className="size-5" /> Home
            </Button>
          </Link>
          <Link href="/produtores" className="w-full ">
            <Button
              variant="secondary"
              className="bg-transparent w-full pl-0 hover:pl-2 transition-all flex items-center gap-2 justify-start h-8"
            >
              <Users className="size-5" /> Produtores
            </Button>
          </Link>
        </CardContent>
      </Card>
      <main className="flex flex-col items-center w-full">{children}</main>
    </div>
  );
};
