import { cn } from "@/lib/utils";

export const Divider = ({ className = "" }) => (
  <hr
    className={cn(
      "border-t-slate-300/80 border-b-slate-50 border-b-2",
      className
    )}
  />
);
