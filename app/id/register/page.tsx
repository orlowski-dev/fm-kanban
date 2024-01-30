import type { Metadata } from "next";
import IdWrapper from "@/app/id/_components/IdWrapper";
import RegisterForm from "@/app/id/_components/forms/RegisterForm";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = {
  title: "Create free account :: Kanban",
};

const RegisterPage = () => {
  return (
    <IdWrapper
      title="Create an account"
      subTitle="Create a free account to get started"
      form={<RegisterForm />}
      extra={
        <p>
          {"Already have an account?"} <br />
          <LinkButton href="/id/login" variant="ghost">
            Go to log in page
          </LinkButton>
        </p>
      }
    />
  );
};

export default RegisterPage;
