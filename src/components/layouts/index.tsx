import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "../ui/card";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen p-5 flex gap-5">
      <Card className="hidden 2xl:flex flex-col w-40">
        <Link href="/">Início</Link>
        <Link href="/produtores">Produtores</Link>
      </Card>
      <main className="flex flex-col items-center w-full">{children}</main>
    </div>
  );
};
