import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="bg-yellow-100">
      <nav>
        <Link href="/">Início</Link>
        <Link href="/produtores">Produtores</Link>
      </nav>
      {children}
    </div>
  );
};
