"use client";

import React from "react";
import Link from "next/link";
import { Rocket, Twitter, Instagram, Linkedin, Facebook, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Hotels", href: "#" },
        { name: "Hospitals", href: "#" },
        { name: "Event Organizers", href: "#" },
        { name: "Cleaning Services", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Success Stories", href: "#" },
        { name: "Media Kit", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Legal", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-slate-900 pb-16">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Labour<span className="text-primary tracking-normal">Link</span>
            </span>
          </Link>
          <p className="text-slate-500 leading-relaxed max-w-xs">
            Connecting premium businesses with high-quality, verified workforce across multiple industries.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-primary hover:text-white transition-all text-slate-500"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {footerLinks.map((column) => (
          <div key={column.title} className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-lg">{column.title}</h4>
            <ul className="flex flex-col gap-4">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold text-lg">Contact Us</h4>
          <ul className="flex flex-col gap-5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>123 Business District, Innovation City, 56789</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>support@labourlink.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:row items-center justify-between text-xs text-slate-600 gap-4">
        <p>© {currentYear} LabourLink. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-slate-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
