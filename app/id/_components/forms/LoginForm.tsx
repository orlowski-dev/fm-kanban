"use client";

import type { I_SignInSearchParams } from "@/app/id/login/page";
import { useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";
import { signIn } from "next-auth/react";
import Input from "@/components/input";
import formReducer from "@/lib/reducers/form-reducer";
import Alert from "@/components/alert";

interface I_Inputs {
  email: string;
  password: string;
}

const LoginForm = ({ searchParams }: I_SignInSearchParams) => {
  const { callbackUrl, error } = searchParams;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_Inputs>({ mode: "onChange" });

  const [states, dispach] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });

  const onSubmit: SubmitHandler<I_Inputs> = (data) => {
    dispach({ name: "setLoading" });
    signIn("credentials", {
      ...data,
      email: data.email.toLowerCase(),
      callbackUrl: callbackUrl ?? "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 max-w-[280px] w-full mx-auto text-left"
    >
      {error ? (
        <Alert
          type="error"
          title="Unable to log in"
          detail={
            error === "CredentialsSignin"
              ? "Wrong email address or/and password. Try again."
              : "Something went wrong. Try again."
          }
        />
      ) : undefined}
      <FormControl
        labelText="E-mail address"
        helpText={errors.email?.message ?? undefined}
        error={Boolean(errors.email?.message)}
      >
        <Input
          type="email"
          autoComplete="on"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </FormControl>
      <FormControl
        labelText="Password"
        helpText={errors.password?.message ?? undefined}
        error={Boolean(errors.password?.message)}
      >
        <Input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password cannot be shorter than 8 characters.",
            },
            maxLength: {
              value: 24,
              message: "Password cannot be longer than 24 characters.",
            },
          })}
        />
      </FormControl>
      <Button size="lg" loading={states.btnLoading}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
