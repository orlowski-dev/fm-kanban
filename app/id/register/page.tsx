import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { LinkButton } from "@/components/button";
import { redirect } from "next/navigation";
import IdWrapper from "@/app/id/_components/IdWrapper";
import RegisterForm from "@/app/id/_components/forms/RegisterForm";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Create free account :: Kanban",
};

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
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
