"use client"

import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { signinSchema } from "@/schemas/signinSchema"
import Link from "next/link"
import { AlertCircle, Eye, EyeOff} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {  FormDescription } from "./ui/form"

export default function SigninForm() {

    const router = useRouter()
    const { signIn, isLoaded, setActive } = useSignIn();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
      
        if (!isLoaded) return;
        setIsSubmitting(true)
        setAuthError(null)

      try {
          console.log(signIn)
            if (signIn !== undefined) {
                const result = await signIn.create({
                    identifier: data.identifier,
                    password: data.password
                })
                console.log(result)
                if (result.status === "complete") {
                    await setActive({ session: result.createdSessionId });
                    router.push("/dashboard")
                } else {
                    setAuthError("Sign in error")
                }
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setAuthError(error.errors?.[0].message || "An error occured while signin")
        } finally {
            setIsSubmitting(false)

        }
        
    }
    
    return <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
      <CardHeader className="flex flex-col gap-1 items-center pb-2">
        <h1 className="text-2xl font-bold text-default-900">Welcome Back</h1>
        <p className="text-default-500 text-center">
          Sign in to access your secure cloud storage
        </p>
      </CardHeader>

      <CardContent className="py-6">
        {authError && (
          <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-default-900"
            >
              Email
            </label>
            <div>

            <Input
              id="identifier"
              type="email"
              placeholder="your.email@example.com"
              {...register("identifier")}
              className={`w-full ${!!errors.identifier ? 'border-red-300': ''}`}
              />
              {!!errors.identifier && <FormDescription>
                    
              </FormDescription>}
              </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-default-900"
              >
                Password
              </label>
            </div>
            <div>
              <div className="flex items-center border rounded-sm">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`w-full border-none ${!!errors.password ? 'border-red-300': ''}`}
              />
                { showPassword ? <Eye onClick={()=> setShowPassword(false)} className="w-4 h-4 mr-2" /> : <EyeOff onClick={()=> setShowPassword(true)} className="w-4 h-4 mr-2" />}
              </div>
              {!!errors.password && <FormDescription>
                  {errors.password.message}
              </FormDescription>}
              </div>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            // disabled={isSubmitting}
            
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-default-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
}