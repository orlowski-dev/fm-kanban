import type { TextareaHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";
import "@/assets/styles/input.css";

export interface I_TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef(function Textarea(
  { children, ...other }: I_TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea className="input" rows={4} {...other} ref={ref}>
      {children}
    </textarea>
  );
});

export default Textarea;
