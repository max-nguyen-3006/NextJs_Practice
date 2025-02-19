import z from "zod";
export const REQUIRED_MSG = "Required fields must be filled in.";
export const STRING_MSG = "Please input string only";
export const MIN_VALUE_MSG = "The minimum value is 2";
export const MAX_LENGTH_MSG = "Input is exceed 32 characters";
const STRING_OBJECT_ERROR = {
  required_error: REQUIRED_MSG,
  invalid_type_error: STRING_MSG,
};

function addIssueAndNever(
  ctx: z.RefinementCtx,
  message: string,
  path: string[],
  isFatal = false
) {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message,
    path,
    fatal: isFatal,
  });
  return z.NEVER;
}

const name = z.object({
  name: z
    .string(STRING_OBJECT_ERROR)
    .trim()
    .min(2, MIN_VALUE_MSG)
    .max(32, MAX_LENGTH_MSG)
    .transform((value) => (!value ? undefined : value))
    .pipe(z.string(STRING_OBJECT_ERROR)),
});
const email = z.object({
  email: z
    .string(STRING_OBJECT_ERROR)
    .trim()
    .email("Invalid email format")
    .transform((value) => (!value ? undefined : value))
    .pipe(z.string(STRING_OBJECT_ERROR)),
});
const passwordAndConfirmPassword = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .transform((value) => (!value ? undefined : value))
      .pipe(z.string(STRING_OBJECT_ERROR)),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      addIssueAndNever(
        ctx,
        "Passwords do not match",
        ["confirmPassword"],
        true
      );
    }
  });
export const registerSchemas = name.and(email).and(passwordAndConfirmPassword);

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
export type RegisterBodyTypeSchemas = z.TypeOf<typeof registerSchemas>;
export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const loginSchemas = z.object({
  email: z
    .string(STRING_OBJECT_ERROR)
    .email("Invalid email format")
    .transform((value) => (!value ? undefined : value))
    .pipe(z.string(STRING_OBJECT_ERROR)),
  password: z.string().min(6).max(100),
});

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export type LoginBodyTypeSchemas = z.TypeOf<typeof loginSchemas>;
export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
