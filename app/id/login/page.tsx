import type { Metadata } from "next";
import IdWrapper from "@/app/id/_components/IdWrapper";
import LoginForm from "@/app/id/_components/forms/LoginForm";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = {
  title: "Log in :: Kanban",
};

const LoginPage = () => {
  return (
    <IdWrapper
      title="Log in"
      subTitle="Log in to your account to get started"
      form={<LoginForm />}
      extra={
        <p>
          {"Don't have an account yet?"} <br />
          <LinkButton href="/id/register" variant="ghost">
            Create free account
          </LinkButton>
        </p>
      }
    />
  );
};

export default LoginPage;
