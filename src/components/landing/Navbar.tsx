"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Industries", href: "#industries" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Labour<span className="text-primary tracking-normal">Link</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-900 dark:text-white">
              Log in
            </Link>
            <Link href="/register" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20 block text-center">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-slate-200 dark:border-slate-800 my-2" />
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center font-medium text-slate-900 dark:text-white block">
            Log in
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 text-center block">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
