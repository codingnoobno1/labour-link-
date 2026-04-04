"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Users, Building2, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-20 z-0 hidden lg:block" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 500+ Hotels & Hospitals
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
            Verified Workers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              On-Demand
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            LabourLink matches vetted workforce with premium hospitality, healthcare, and event organizers. Efficient, reliable, and secure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group w-full sm:w-auto justify-center">
              Get Started Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 px-8 py-4 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-all border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
              <div className="bg-primary/20 p-2 rounded-full">
                <Play className="w-4 h-4 text-primary fill-primary" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">10k+ Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-medium">500+ Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">100% Verified</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center px-4"
        >
          <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden shadow-2xl p-1">
            <div className="bg-white dark:bg-slate-950 w-full h-full rounded-[1.4rem] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
               {/* Hero Placeholder Image Area */}
               <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-slate-500 font-medium">Premium Visual Placeholder</p>
                  <p className="text-xs text-slate-400">Real-time matching dashboard preview</p>
               </div>
            </div>
          </div>
          
          {/* Floating Cards */}
          <motion.div
            initial={{ x: 20, y: 20, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Verified</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">Worker identity and background check completed.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Help with imports
import { Rocket } from "lucide-react";

export default Hero;
