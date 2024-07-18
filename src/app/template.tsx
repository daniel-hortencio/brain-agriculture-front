"use client";

import { ReactQueryClientProvider } from "@/components/providers/react-query-client-provider";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryClientProvider>{children} </ReactQueryClientProvider>;
}
