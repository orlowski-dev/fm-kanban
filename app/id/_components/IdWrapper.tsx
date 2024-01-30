import type { ReactElement, ReactNode } from "react";
import Image from "next/image";

export interface I_IdWrapperProps {
  title: string;
  subTitle: string;
  form?: ReactElement;
  extra?: ReactNode;
}

const IdWrapper = ({ title, subTitle, form, extra }: I_IdWrapperProps) => {
  return (
    <main className="p-6">
      <section className="max-w-md mx-auto mt-6 px-6 py-8 rounded-md bg-white dark:bg-dark-grey transition-colors grid gap-6 text-center">
        <div className="mx-auto dark:hidden -translate-x-3">
          <Image
            src="/brand/logo-black.svg"
            alt="logo black"
            width={125}
            height={20}
            priority
          />
        </div>
        <div className="mx-auto hidden dark:block -translate-x-3">
          <Image
            src="/brand/logo-white.svg"
            alt="logo white"
            width={125}
            height={20}
            priority
          />
        </div>
        <div>
          <h1 className="text-hxl">{title}</h1>
          <p className="text-body">{subTitle}</p>
        </div>
        {form}
        {extra}
      </section>
    </main>
  );
};

export default IdWrapper;
