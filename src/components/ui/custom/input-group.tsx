import * as React from "react";

import { Label } from "../label";
import { Input } from "../input";
import { InputError } from "./input-error";

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  "data-testid"?: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error = "", required, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        <Label htmlFor={props.id} {...{ required }}>
          {label}
        </Label>
        <Input {...{ ref, ...props }} />

        <InputError message={error} />
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
