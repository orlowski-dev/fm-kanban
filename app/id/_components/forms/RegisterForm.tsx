"use client";

import { Button } from "@/components/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useReducer } from "react";
import { redirect } from "next/navigation";
import Input from "@/components/input";
import formReducer from "@/lib/reducers/form-reducer";
import createUserAction from "@/lib/server-actions/create-user-action";
import Alert from "@/components/alert";

interface I_Inputs {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
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

  const onSubmit: SubmitHandler<I_Inputs> = async (data) => {
    dispach({ name: "setLoading" });
    const result: I_ServerActionResponse = await createUserAction(data);

    if (result.status !== 201) {
      dispach({
        name: "setError",
        payload: { formErrorMessage: result.detail },
      });
      return;
    }

    dispach({ name: "setSuccess" });
  };

  if (states.formState === "success") {
    return redirect("/id/register/success");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 max-w-[280px] w-full mx-auto text-left"
    >
      {states.formState === "error" ? (
        <Alert
          icon
          type="error"
          title="Unable to create a new user"
          detail={states.formErrorMessage ?? "Unknown error. Try again."}
        />
      ) : undefined}
      <Input
        labelText="Full name"
        helpText={errors.name?.message ?? undefined}
        error={Boolean(errors.name?.message ?? undefined)}
        {...register("name", {
          required: "This field is required",
          pattern: {
            value:
              /^[^0-9!@#$%^&*()_+={}[\]:;<>,.?/~`\\|-]+ [^0-9!@#$%^&*()_+={}[\]:;<>,.?/~`\\|-]{2,30}$/,
            message: "Enter a valid full name",
          },
        })}
      />
      <Input
        labelText="E-mail address"
        helpText={errors.email?.message ?? undefined}
        error={Boolean(errors.email?.message ?? undefined)}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email address",
          },
        })}
      />
      <Input
        type="password"
        labelText="Password"
        helpText={errors.password?.message ?? undefined}
        error={Boolean(errors.password?.message ?? undefined)}
        {...register("password", {
          required: "This field is required",
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{4,24}$/,
            message: "Enter a valid password",
          },
        })}
      />
      <Button size="lg" loading={states.btnLoading}>
        Create
      </Button>
    </form>
  );
};

export default RegisterForm;
