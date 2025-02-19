"use client";
import React from "react";
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
  // RegisterBody,
  // RegisterBodyType,
  RegisterBodyTypeSchemas,
  registerSchemas,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<RegisterBodyTypeSchemas>({
    resolver: zodResolver(registerSchemas),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyTypeSchemas) {
    console.log(values);
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
    try {
      const result = await fetch(
        `${envConfig?.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        {
          body: JSON.stringify(values),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if(res.status === 200){
            toast({
              className: "register-toast-success",
              title: "Success",
              description: "You have successfully registered",
            });
            router.push("/login");
          }
          else
          {
            toast({
              variant: "destructive",
              className: "register-toast-failed",
              title: "Error",
              description:"You have failed to register",
            });
          }
          console.log(res);
          
        })
        
    } catch (error) {
      console.log(error);



    }
   
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage className="error-password-message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ConfirmPassword</FormLabel>
              <FormControl>
                <Input
                  placeholder="confirmPassword"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button id="register-button" type="submit" className="!mt-8 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
