import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useId } from "react";
import "@/assets/styles/input.css";

export const Input = forwardRef(function Input(
  { ...other }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input className="input" {...other} ref={ref} />;
});

export default Input;
