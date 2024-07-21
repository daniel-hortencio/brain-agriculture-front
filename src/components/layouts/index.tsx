import { ReactNode } from "react";
import { Menu } from "./menu";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen p-6 2xl:flex 2xl:gap-10 min-h-screen">
      <Menu />
      <main className="flex flex-col items-center w-full pt-12 2xl:pt-0">
        {children}
      </main>
    </div>
  );
};
