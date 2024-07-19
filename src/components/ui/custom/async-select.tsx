"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Skeleton } from "../skeleton";

type Option = {
  label: string;
  value: string;
};

type Props = {
  id: string;
  value?: string;
  onValueChange?(value: string): void;
  service: () => Promise<any>;
  placeholder: string;
};

export const AsyncSelect = ({
  placeholder,
  id,
  value,
  onValueChange,
  service,
}: Props) => {
  const {
    data: options = [],
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: [id],
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
    <Select {...{ value, onValueChange }}>
      <SelectTrigger>
        <SelectValue {...{ placeholder }} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((item: Option, index: number) => (
          <SelectItem
            key={`${index}_${item.value}`}
            value={item.value}
            className="px-4"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
