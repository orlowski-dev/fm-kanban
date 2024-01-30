import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useId } from "react";
import "@/assets/styles/input.css";
import { makeClassList } from "@/lib/utils";
import { HelpText, Label } from "../form-control";

export interface I_InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  helpText?: string;
  error?: boolean;
}

export const Input = forwardRef(function Input2(
  { labelText, helpText, error, ...other }: I_InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  return (
    <div
      className={makeClassList(["form-control", error ? "error" : undefined])}
    >
      {labelText ? <Label id={id} text={labelText} /> : undefined}
      <input className="input" {...other} ref={ref} id={id} />
      {helpText ? <HelpText text={helpText} /> : undefined}
    </div>
  );
});

export default Input;
