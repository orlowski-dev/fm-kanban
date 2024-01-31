import type { ReactElement } from "react";
import { cloneElement, useId } from "react";
import { makeClassList } from "@/lib/utils";
import "@/assets/styles/form-control.css";

export interface I_LabelProps {
  id: string;
  text: string;
}
export interface I_HelpTextProps {
  text: string;
}

export const Label = ({ id, text }: I_LabelProps) => {
  return (
    <label htmlFor={id} className="form-control__label">
      {text}
    </label>
  );
};

export const HelpText = ({ text }: I_HelpTextProps) => (
  <span className="form-control__help_text">{text}</span>
);

interface I_FormControlProps {
  children: ReactElement;
  labelText?: string;
  helpText?: string;
  error?: boolean;
}

export const FormControl = ({
  children,
  labelText,
  helpText,
  error,
}: I_FormControlProps) => {
  const id = useId();
  const clonedElement = cloneElement(children, { id });
  return (
    <div
      className={makeClassList(["form-control", error ? "error" : undefined])}
    >
      {labelText ? <Label id={id} text={labelText} /> : undefined}
      {clonedElement}
      {helpText ? <HelpText text={helpText} /> : undefined}
    </div>
  );
};
