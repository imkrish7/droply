import * as z from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password should be 6 character long" }),
    passwordConfirmation: z.string().min(6, { message: "Please confirm required" })
})
    .refine((data) => {
    return data.password === data.passwordConfirmation
}, {message: "Password do not match", path: ["passwordConfirmation"]})