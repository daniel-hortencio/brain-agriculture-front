import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "../label";

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, label, id, type, ...props }, ref) => {
    return (
      <div className="w-full">
        <Label htmlFor={id || label.toLocaleLowerCase().replaceAll(" ", "-")}>
          {label}
        </Label>
        <input
          id={id || label.toLocaleLowerCase().replaceAll(" ", "-")}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
