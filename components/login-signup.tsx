"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function LoginSignup() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // Handle signup
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to sign up");
        }

        // Auto login after successful signup
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-50 bg-background border-b border-surface-200">
        <div className="container mx-auto">
          <div className="flex justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative">
                  <Compass
                    className="h-8 w-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="ml-3 text-xl font-medium tracking-tight">
                  <span className="text-primary-600 font-semibold">Growth</span>
                  <span className="text-primary-950">Compass</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden pt-16">
        {/* Enterprise Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-50/20 to-background" />
        </div>

        <div className="relative min-h-screen flex items-center">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="enterprise-card">
              <div className="p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 border border-primary-100">
                    <Star className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-600">
                      {isLogin ? "Welcome Back" : "Join Us Today"}
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight text-primary-950">
                    {isLogin
                      ? "Log in to your account"
                      : "Create a new account"}
                  </h2>
                  <p className="mt-2 text-surface-600">
                    Or{" "}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                      }}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {isLogin
                        ? "create a new account"
                        : "log in to your existing account"}
                    </button>
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`space-y-6 ${isLogin ? "min-h-[60px]" : ""}`}>
                    {!isLogin && (
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-primary-950"
                        >
                          Full name
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required={!isLogin}
                          className="block w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 text-primary-950 text-base placeholder:text-surface-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-primary-950"
                      >
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="block w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 text-primary-950 text-base placeholder:text-surface-500
                          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-primary-950"
                      >
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        className="block w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 text-primary-950 text-base placeholder:text-surface-500
                          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                        placeholder={
                          isLogin ? "Enter your password" : "Create a password"
                        }
                      />
                    </div>
                  </div>

                  {isLogin ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-surface-200 text-primary-600 focus:ring-primary-500/20"
                        />
                        <label
                          htmlFor="remember-me"
                          className="text-sm text-surface-700"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <Link
                          href="/forgot-password"
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-surface-200 text-primary-600 focus:ring-primary-500/20"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-surface-700"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="enterprise-button-primary group w-full py-6"
                  >
                    {isLoading ? (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2 text-base">
                        {isLogin ? "Log in" : "Sign up"}
                        {isLogin ? (
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
