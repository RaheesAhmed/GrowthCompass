"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen  bg-white font-['Inter']">
      <div className="relative overflow-hidden bg-slate-900 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-3 py-1 text-sm font-medium text-indigo-400">
                  <Star className="mr-2 h-4 w-4" />
                  {isLogin ? "Welcome Back" : "Join Us Today"}
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  {isLogin ? "Log in to your account" : "Create a new account"}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {isLogin
                      ? "create a new account"
                      : "log in to your existing account"}
                  </button>
                </p>
              </div>

              <form className="space-y-6">
                <div className={`space-y-6 ${isLogin ? "min-h-[60px]" : ""}`}>
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {isLogin ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isLogin ? "Log in" : "Sign up"}
                    {isLogin ? (
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    ) : (
                      <CheckCircle className="ml-2 h-5 w-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
