import type { Metadata } from "next";
import { LinkButton } from "@/components/button";
import IdWrapper from "@/app/id/_components/IdWrapper";
import LoginForm from "@/app/id/_components/forms/LoginForm";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export interface I_SignInSearchParams {
  searchParams: { callbackUrl: string; error?: string };
}

export const metadata: Metadata = {
  title: "Log in :: Kanban",
};

const LoginPage = async (props: I_SignInSearchParams) => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return redirect("/");
  }
  return (
    <IdWrapper
      title="Log in"
      subTitle="Log in to your account to get started"
      form={<LoginForm searchParams={props.searchParams} />}
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
