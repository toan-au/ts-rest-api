"use client";

import { FieldValues, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const createUserSchema = object({
  name: string({ required_error: "Name is required" }).trim().min(1),
  password: string({ required_error: "password is required" }).min(
    6,
    "Password too short - should be 6 characters minimum",
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

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter()
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: FieldValues) {
    try {
      console.log(process.env.NEXT_PUBLIC_SERVER_ENDPOINT);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values, 
      );
      router.push("/")
    } catch (e: any) {
      setRegisterError(e);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="mr-2">
            email
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message?.toString()}</p>
        </div>
        <div>
          <label htmlFor="name" className="mr-2">
            Name
          </label>
          <input
            id="name"
            type="string"
            placeholder="Jane"
            {...register("name")}
          />
          <p className="text-red-500">{errors.name?.message?.toString()}</p>
        </div>
        <div>
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            {...register("password")}
          />
          <p className="text-red-500">{errors.password?.message?.toString()}</p>
        </div>
        <div>
          <label htmlFor="confirmation_password" className="mr-2">
            Confirm password
          </label>
          <input
            id="confirmation_password"
            type="password"
            placeholder="*********"
            {...register("passwordConfirmation")}
          />
          <p className="text-red-500">
            {errors.passwordConfirmation?.message?.toString()}
          </p>
        </div>
        <button className="px-4  py-2 bg-blue-400" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default RegisterPage;
