"use client";

import { Compass, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    {
      label: "Features",
      href: "#features",
      dropdownItems: [
        { label: "AI Analysis", href: "#ai-analysis" },
        { label: "Team Development", href: "#team-development" },
        { label: "Growth Tracking", href: "#growth-tracking" },
      ],
    },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <header>
      <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg opacity-50" />
                    <Compass
                      className="h-8 w-8 text-white relative"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="ml-3 text-xl font-medium tracking-tight text-white">
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-bold">
                      Growth
                    </span>
                    <span className="text-slate-100">Compass</span>
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
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                    {item.dropdownItems && (
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50 group-hover:opacity-100" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <div className="absolute left-0 mt-1 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900/95 rounded-lg blur-sm" />
                        <div className="relative bg-slate-900 rounded-lg border border-slate-800/50 shadow-xl py-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5"
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 ml-4">
                <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Sign In
                </button>
                <Link href="/start">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            dropdownOpen ? "block" : "hidden"
          } border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-xl`}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button className="w-full px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg border border-slate-700 hover:bg-white/5">
                Sign In
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
