"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { apiFetch } from "@/services/apiFetch";
import { Skeleton } from "../skeleton";
import { ibgeDataServices } from "@/services/ibgeDataServices";

type Option = {
  label: string;
  value: string;
};

type Props = {
  service: () => Promise<any>;
};

export const AsyncSelect = ({ service }: Props) => {
  const {
    data: options = [],
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: [`user`],
    queryFn: async () => {
      const { isOk, data } = await service();

      if (!isOk) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  const loading = isFetching || isRefetching;

  if (loading) {
    return <Skeleton className="w-full h-10" />;
  }
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Escolha..." />
      </SelectTrigger>
      <SelectContent>
        {options?.map((state: Option) => (
          <SelectItem key={state.value} value={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
