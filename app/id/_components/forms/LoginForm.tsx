"use client";

import { Button } from "@/components/button";
import Input from "@/components/input";

const LoginForm = () => {
  return (
    <form className="grid gap-4 max-w-[280px] w-full mx-auto text-left">
      <Input type="text" labelText="E-mail address" />
      <Input type="password" labelText="Password" />
      <Button size="lg">Login</Button>
    </form>
  );
};

export default LoginForm;
