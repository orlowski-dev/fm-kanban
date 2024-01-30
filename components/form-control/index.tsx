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
