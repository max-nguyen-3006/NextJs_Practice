"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  LoginBodyTypeSchemas,
  loginSchemas,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";
export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { setSessionToken } = useAppContext();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // 1. Define your form.
  const form = useForm<LoginBodyTypeSchemas>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyTypeSchemas) {
    try {
      const result = await fetch(
        `${envConfig?.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      toast({
        className: "login-toast-success",
        title: "Success",
        description: result.payload.message,
      });
      const resultFromNextServer = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resultFromNextServer.json();

      console.log(data.data.token);

      setSessionToken(data?.data?.token);
    } catch (error) {
      const errors = error.payload.errors as {
        message: string;
        field: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          title: "Error",
          description: error.payload.message,
          variant: "destructive",
        });
      }
    }
  }
  return (
    <>
      {isClient && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input data-cy="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage className="error-email-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="password"
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage data-cy="error-password-message" />
                </FormItem>
              )}
            />

            <Button data-cy="login-btn" type="submit" className="!mt-8 w-full">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
