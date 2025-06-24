"use client"

import { useForm } from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import { z } from "zod"


import { signupSchema } from "@/schemas/signupSchema"
import { FormEvent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"


import Link from "next/link"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Card, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function SignupForm() {
    const router = useRouter();
    const [verifying, setVerifying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationError, setVerificationError] = useState<string|null>(null)
    const [verificationCode, setVerificationCode] = useState("");
    const [authError, setAuthError] = useState(null);
    const { signUp, isLoaded, setActive } = useSignUp();
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            passordConfirmation: ""
        }
    });
    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        if (!isLoaded) return;
        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password
            })
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })
            setVerifying(true)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Signup error");
            setAuthError(
                error.errors?.[0]?.message || "An error occurred during signup"
            )
        } finally {
            setIsSubmitting(false)

        }
    }
    const handleVerification = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!isLoaded || !signUp) return;

        setIsSubmitting(true);
        setVerificationError(null)

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode
            })
            // 
            console.dir(result);
            if (result.status === "complete") {
                await setActive({
                    session: result.createdSessionId
                })
                router.push("/dashboard")
            } else {
                console.error("Verification incomplete", result);
                setVerificationError("Verification could not completed!")
            }
        } catch (error: any) {
            console.log("Error", error);
            setVerificationError(error.errors?.[0].message || "An error occured during code verifications")
        } finally {
            setIsSubmitting(false);
        }
    }
    if (verifying) {
        return <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
            <CardHeader className="flex flex-col gap-1 item-center pb-2">
                <h1 className="text-2xl font-bold-text-default-900">
                    Verify your email
                </h1>
                <p className="text-default-500 text-center">
                    We've sent a verification code to your email
                </p>
            </CardHeader>
            <div className="h-2" />
            <CardBody className="py-6">
                {
                    verificatonError && (
                        <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
                        <CardHeader className="flex flex-col gap-1 items-center pb-2">
                          <h1 className="text-2xl font-bold text-default-900">
                            Create Your Account
                          </h1>
                          <p className="text-default-500 text-center">
                            Sign up to start managing your images securely
                          </p>
                        </CardHeader>
                  
                        <Divider />
                  
                        <CardBody className="py-6">
                          {authError && (
                            <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 flex-shrink-0" />
                              <p>{authError}</p>
                            </div>
                          )}
                  
                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                              <label
                                htmlFor="email"
                                className="text-sm font-medium text-default-900"
                              >
                                Email
                              </label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                startContent={<Mail className="h-4 w-4 text-default-500" />}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                                {...register("email")}
                                className="w-full"
                              />
                            </div>
                  
                            <div className="space-y-2">
                              <label
                                htmlFor="password"
                                className="text-sm font-medium text-default-900"
                              >
                                Password
                              </label>
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                startContent={<Lock className="h-4 w-4 text-default-500" />}
                                endContent={
                                  <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4 text-default-500" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-default-500" />
                                    )}
                                  </Button>
                                }
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message}
                                {...register("password")}
                                className="w-full"
                              />
                            </div>
                  
                            <div className="space-y-2">
                              <label
                                htmlFor="passwordConfirmation"
                                className="text-sm font-medium text-default-900"
                              >
                                Confirm Password
                              </label>
                              <Input
                                id="passwordConfirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                startContent={<Lock className="h-4 w-4 text-default-500" />}
                                endContent={
                                  <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    type="button"
                                  >
                                    {showConfirmPassword ? (
                                      <EyeOff className="h-4 w-4 text-default-500" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-default-500" />
                                    )}
                                  </Button>
                                }
                                isInvalid={!!errors.passwordConfirmation}
                                errorMessage={errors.passwordConfirmation?.message}
                                {...register("passwordConfirmation")}
                                className="w-full"
                              />
                            </div>
                  
                            <div className="space-y-4">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                <p className="text-sm text-default-600">
                                  By signing up, you agree to our Terms of Service and Privacy
                                  Policy
                                </p>
                              </div>
                            </div>
                  
                            <Button
                              type="submit"
                              color="primary"
                              className="w-full"
                              isLoading={isSubmitting}
                            >
                              {isSubmitting ? "Creating account..." : "Create Account"}
                            </Button>
                          </form>
                        </CardBody>
                  
                        <Divider />
                  
                        <CardFooter className="flex justify-center py-4">
                          <p className="text-sm text-default-600">
                            Already have an account?{" "}
                            <Link
                              href="/sign-in"
                              className="text-primary hover:underline font-medium"
                            >
                              Sign in
                            </Link>
                          </p>
                        </CardFooter>
                      </Card>
                    )
                }
            </CardBody>
        </Card>
    }
    return<></>
}