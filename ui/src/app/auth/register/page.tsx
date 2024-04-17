"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = object({
  name: string({ required_error: "Name is required" }),
  password: string({ required_error: "password is required" }).min(
    6,
    "Password too short - should be 6 characters minimum"
  ),
  passwordConfirmation: string({
    required_error: "password confirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  }).email("Not a valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(values) {
    console.log({ values });
  }

  console.log({ errors });

  return (
    <>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2">
          <label htmlFor="email"></label>
          <input
            id="email"
            className="text-black"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message?.toString()}</p>
        </div>
        <div className="p-2">
          <label htmlFor="name"></label>
          <input
            id="name"
            className="text-black"
            placeholder="name"
            {...register("name")}
          />
          <p>{errors.name?.message?.toString()}</p>
        </div>
        <div className="p-2">
          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            className="text-black"
            placeholder="******"
            {...register("password")}
          />
          <p>{errors.password?.message?.toString()}</p>
        </div>
        <div className="p-2">
          <label htmlFor="passwordConfirmation"></label>
          <input
            id="passwordConfirmation"
            className="text-black"
            placeholder="******"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message?.toString()}</p>
        </div>
        <button className="p-2 bg-red-500" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default RegisterPage;
