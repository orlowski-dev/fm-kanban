import type { ButtonHTMLAttributes, ReactElement } from "react";
import type { LinkProps } from "next/link";
import { makeClassList } from "@/lib/utils";
import { CgSpinner } from "react-icons/cg";
import "@/assets/styles/button.css";
import Link from "next/link";

export type T_Variants = "primary" | "secondary" | "destructive" | "ghost";
export type T_Sizes = "sm" | "md" | "lg";

export interface I_Props {
  variant?: T_Variants;
  size?: T_Sizes;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  loading?: boolean;
}

export interface I_ButtonProps
  extends I_Props,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export interface I_LinkButtonProps extends Omit<I_Props, "loading">, LinkProps {
  children: ReactElement | string;
}

export interface I_IconButtonProps
  extends I_Props,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactElement;
  title: string;
}

export const Button = ({
  children,
  variant,
  size,
  startIcon,
  endIcon,
  loading,
  ...other
}: I_ButtonProps) => {
  return (
    <button
      className={makeClassList([
        "btn",
        variant ?? "primary",
        size ?? "md",
        loading ? "loading" : undefined,
      ])}
      disabled={loading ?? undefined}
      {...other}
    >
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <CgSpinner className="animate-spin" />
        </span>
      ) : undefined}
      {startIcon ?? undefined}
      <span className={loading ? "opacity-0" : undefined}>{children}</span>
      {endIcon ?? undefined}
    </button>
  );
};

export const LinkButton = ({
  children,
  variant,
  size,
  startIcon,
  endIcon,
  ...other
}: I_LinkButtonProps) => {
  return (
    <Link
      className={makeClassList(["btn", variant ?? "primary", size ?? "md"])}
      {...other}
    >
      {startIcon ?? undefined}
      {children}
      {endIcon ?? undefined}
    </Link>
  );
};

export const IconButton = ({
  children,
  title,
  variant,
  size,
  startIcon,
  endIcon,
  loading,
  ...other
}: I_IconButtonProps) => {
  return (
    <button
      className={makeClassList([
        "btn iconic",
        variant ?? "primary",
        size ?? "md",
        loading ? "loading" : undefined,
      ])}
      disabled={loading ?? undefined}
      title={title}
      {...other}
    >
      <span className="absolute -z-10 opacity-0 select-none">{title}</span>
      {loading ? <CgSpinner className="animate-spin" /> : children}
    </button>
  );
};
