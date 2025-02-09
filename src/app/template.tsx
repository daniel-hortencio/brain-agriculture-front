"use client";

import { Provider } from "react-redux";
import { ReactQueryClientProvider } from "@/components/providers/react-query-client-provider";
import { store } from "@/modules/producers/store";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ReactQueryClientProvider>{children} </ReactQueryClientProvider>
    </Provider>
  );
}
