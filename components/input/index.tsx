import type { InputHTMLAttributes } from "react";
import "@/assets/styles/input.css";

export interface I_InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: I_InputProps) => {
  return <input className="input" {...props} />;
};

export default Input;
