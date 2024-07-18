import * as React from "react";

import { Label } from "../label";
import { Input } from "../input";

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
        <Input
          id={id || label.toLocaleLowerCase().replaceAll(" ", "-")}
          ref={ref}
          {...{ type, className, ...props }}
        />
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
