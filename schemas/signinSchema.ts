import * as z from "zod";

export const signinSchema = z.object({
    identifier: z.string().email({message: "Please enter a valid email"}).min(1, { message: "Email is required" }),
    password: z.string().min(6, {message: "Password must be 6 characters long"})
})