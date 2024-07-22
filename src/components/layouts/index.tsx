import { ReactNode } from "react";
import { Menu } from "./menu";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen max-w-[1920px] mx-auto p-6 2xl:flex 2xl:gap-16 min-h-screen">
      <div className="fade-top">
        <Menu />
      </div>
      <main className="flex flex-col items-center w-full pt-16 2xl:pt-0">
        {children}
      </main>
    </div>
  );
};
