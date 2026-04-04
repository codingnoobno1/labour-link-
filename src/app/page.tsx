"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Industries from "@/components/landing/Industries";
import Features from "@/components/landing/Features";
import Trust from "@/components/landing/Trust";
import WorkerSection from "@/components/landing/WorkerSection";
import BusinessSection from "@/components/landing/BusinessSection";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Industries />
      <Features />
      <Stats />
      <Trust />
      <WorkerSection />
      <BusinessSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
