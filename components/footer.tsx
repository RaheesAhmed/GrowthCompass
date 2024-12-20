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
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface-50 pt-24 pb-12">
      {/* Newsletter Section */}
      <div className="container mx-auto mb-20">
        <div className="enterprise-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-primary-950 mb-4">
                Stay ahead in leadership
              </h3>
              <p className="text-surface-600">
                Get the latest insights and updates delivered to your inbox.
              </p>
            </div>
            <div className="relative">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background rounded-lg text-primary-950 placeholder-surface-400 border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="enterprise-button-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Compass className="h-8 w-8 text-primary-600" strokeWidth={1.5} />
              <span className="ml-3 text-xl font-medium">
                <span className="text-primary-600 font-semibold">Growth</span>
                <span className="text-primary-950">Compass</span>
              </span>
            </div>
            <p className="text-surface-600 leading-relaxed">
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
                  className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center hover:bg-surface-200 transition-colors"
                >
                  <social.icon
                    className="h-5 w-5 text-surface-600"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-950 font-semibold mb-6 text-lg">
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
                    className="group flex items-center text-surface-600 hover:text-primary-950 transition-colors"
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
            <h3 className="text-primary-950 font-semibold mb-6 text-lg">
              Resources
            </h3>
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
                    className="group flex items-center text-surface-600 hover:text-primary-950 transition-colors"
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
            <h3 className="text-primary-950 font-semibold mb-6 text-lg">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@growthcompass.ai"
                className="group flex items-center space-x-3 text-surface-600 hover:text-primary-950 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-200 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span>contact@growthcompass.ai</span>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex items-center space-x-3 text-surface-600 hover:text-primary-950 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-200 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>
              <div className="group flex items-center space-x-3 text-surface-600">
                <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center">
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
        <div className="border-t border-surface-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-surface-500 text-sm">
              © {new Date().getFullYear()} GrowthCompass. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-surface-500 hover:text-primary-950 transition-colors"
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
