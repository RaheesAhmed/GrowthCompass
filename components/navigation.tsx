"use client";

import { Compass, ChevronDown, Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const navItems = [
    {
      label: "API Reference",
      href: "/api-reference",
    },

    { label: "Assessments", href: "/start" },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <header>
      <nav className="fixed w-full top-0 z-50 bg-background border-b border-surface-200">
        <div className="container mx-auto">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center hover:opacity-80 transition-opacity">
                  <div className="relative">
                    <Compass
                      className="h-8 w-8 text-primary-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="ml-3 text-xl font-medium tracking-tight">
                    <span className="text-primary-600 font-semibold">
                      Growth
                    </span>
                    <span className="text-primary-950">Compass</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative group px-3">
                  <a
                    href={item.href}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-surface-600 hover:text-primary-950 transition-colors rounded-lg hover:bg-surface-50"
                  >
                    {item.label}
                    {item.dropdownItems && (
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50 group-hover:opacity-100" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <div className="absolute left-0 mt-1 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="rounded-lg bg-white shadow-lg ring-1 ring-surface-200 ring-opacity-5 py-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-surface-600 hover:text-primary-950 hover:bg-surface-50"
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 ml-4">
                {session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <User className="h-4 w-4" />
                        {session.user.name || session.user.email}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <Link href="/dashboard">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/start">
                      <Button className="enterprise-button-primary">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-surface-600 hover:text-primary-950"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            dropdownOpen ? "block" : "hidden"
          } border-t border-surface-200 bg-background`}
        >
          <div className="container py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-surface-600 hover:text-primary-950 hover:bg-surface-50 rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              {session?.user ? (
                <>
                  <Link href="/dashboard" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/start" className="block w-full">
                    <Button className="enterprise-button-primary">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
