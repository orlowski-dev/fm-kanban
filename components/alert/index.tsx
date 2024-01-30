import {
  HiExclamationCircle,
  HiCheckCircle,
  HiInformationCircle,
} from "react-icons/hi";
import "@/assets/styles/alert.css";
import { makeClassList } from "@/lib/utils";

export type T_AlertType = "error" | "success" | "info";

export interface I_AlertProps {
  title: string;
  detail: string;
  type: T_AlertType;
  icon?: boolean;
}

const Icon = ({ type }: { type: T_AlertType }) => {
  switch (type) {
    case "error":
      return <HiExclamationCircle />;
    case "success":
      return <HiCheckCircle />;
    case "info":
      return <HiInformationCircle />;
    default:
      throw new Error("Unknown icon type.");
  }
};

const Alert = ({ title, detail, type, icon }: I_AlertProps) => {
  return (
    <section role="alert" className={makeClassList(["alert", type])}>
      <header className="alert__header">
        {icon ? <Icon type={type} /> : undefined} <span>{title}</span>
      </header>
      <p className="alert__detail">{detail}</p>
    </section>
  );
};

export default Alert;
