import type { TextareaHTMLAttributes } from "react";
import "@/assets/styles/input.css";

export interface I_TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ children, ...other }: I_TextareaProps) => (
  <textarea className="input" rows={4} {...other}>
    {children}
  </textarea>
);

export default Textarea;
