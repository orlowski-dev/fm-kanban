import type { Metadata } from "next";
import { LinkButton } from "@/components/button";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import IdWrapper from "@/app/id/_components/IdWrapper";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Account created :: Kanban",
};

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return redirect("/");
  }
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
