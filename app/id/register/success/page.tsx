import type { Metadata } from "next";
import IdWrapper from "@/app/id/_components/IdWrapper";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = {
  title: "Account created :: Kanban",
};

const RegisterPage = () => {
  return (
    <IdWrapper
      title="Success"
      subTitle="Your account has been created. Now you can log in."
      extra={
        <p>
          <LinkButton href="/id/login" variant="ghost">
            Go to log in page
          </LinkButton>
        </p>
      }
    />
  );
};

export default RegisterPage;
