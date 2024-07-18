import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen">
      <nav className="bg-red-500">
        <Link href="/">Início</Link>
        <Link href="/produtores">Produtores</Link>
      </nav>
      {children}
    </div>
  );
};
