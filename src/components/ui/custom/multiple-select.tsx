"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

type Props = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export const MultipleSelect = ({ options = [], value, onChange }: Props) => {
  const handleCheck = (name: string, checked: boolean) => {
    if (checked) {
      onChange([...value, name]);
    } else {
      onChange(value.filter((option) => option !== name));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border border-input transition-all hover:text-accent-foreground cursor-pointer rounded-md bg-slate-100 neumorphic-sm-inset focus:shadow-emerald-500/80 focus:bg-slate-100"
      >
        <div className="w-full h-fit min-h-10 p-1 flex flex-wrap gap-2 items-center">
          {value.length > 0 ? (
            value.map((option) => (
              <span
                key={option}
                className="w-fit h-7 text-sm rounded-full pl-2 pr-0 flex items-center gap-1 bg-slate-600/80 text-white font-medium hover:bg-slate-600 transition-all"
              >
                {option}
                <button
                  className="p-1 cursor-pointer"
                  onClick={() => handleCheck(option, false)}
                >
                  <X className="size-5" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500 ml-2">
              Escolha suas culturas...
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value.some((o) => o === option)}
            onCheckedChange={(checked) => handleCheck(option, checked)}
            className="px-2"
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
