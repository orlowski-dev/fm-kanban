"use client";
import { makeClassList } from "@/lib/utils";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { HiCheck } from "react-icons/hi";
import "@/assets/styles/checkbox.css";

export interface I_CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef(function Checkbox(
  { label, defaultChecked, ...other }: I_CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [checkedState, setCheckedState] = useState(defaultChecked ?? false);
  return (
    <label
      className={makeClassList([
        "checkbox",
        checkedState ? "checked" : undefined,
      ])}
    >
      <input
        {...other}
        type="checkbox"
        ref={ref}
        defaultChecked={defaultChecked}
        onChange={(e) => setCheckedState(e.target.checked)}
      />
      <div className="checkbox__box">
        <HiCheck
          className={`transition-opacity ${
            checkedState ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <span className="checkbox__span">{label}</span>
    </label>
  );
});
export default Checkbox;
