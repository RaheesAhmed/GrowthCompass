"use client";

import React from "react";
import {
  Compass,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 pt-24 pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />

      {/* Gradient Orbs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[128px] -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px] translate-x-1/2 -translate-y-1/2" />

      {/* Newsletter Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl p-8 md:p-12 border border-indigo-500/10 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay ahead in leadership
              </h3>
              <p className="text-slate-300">
                Get the latest insights and updates delivered to your inbox.
              </p>
            </div>
            <div className="relative">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-800"
                />
                <button className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg opacity-50" />
                <Compass
                  className="h-8 w-8 text-white relative"
                  strokeWidth={1.5}
                />
              </div>
              <span className="ml-3 text-xl font-medium text-white">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-bold">
                  Growth
                </span>
                <span className="text-slate-100">Compass</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Empowering leaders through AI-driven insights and personalized
              development plans.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <social.icon
                    className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Features",
                "Pricing",
                "Case Studies",
                "Testimonials",
                "Request Demo",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
            <ul className="space-y-4">
              {[
                "Documentation",
                "API Reference",
                "Leadership Blog",
                "Success Stories",
                "Learning Center",
                "Support",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold mb-6 text-lg">Contact</h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@growthcompass.ai"
                className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span>contact@growthcompass.ai</span>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>
              <div className="group flex items-center space-x-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>
                  123 Leadership Ave, Suite 100
                  <br />
                  San Francisco, CA 94105
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative border-t border-slate-800/60 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} GrowthCompass. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
