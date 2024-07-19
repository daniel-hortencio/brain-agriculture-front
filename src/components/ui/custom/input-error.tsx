import { cn } from "@/lib/utils";

export const InputError = ({ message }: { message?: string }) => (
  <span
    className={cn(
      "text-red-600 text-sm font-medium h-fit transition-all overflow-hidden block",
      message ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
    )}
  >
    {message}
  </span>
);
