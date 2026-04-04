"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck, BarChart3, Users2 } from "lucide-react";

const Solution = () => {
  const solutions = [
    {
      icon: Zap,
      title: "Real-time Matching",
      description: "Our AI-powered engine connects you with available workers in seconds, not hours.",
    },
    {
      icon: ShieldCheck,
      title: "Rigorous Verification",
      description: "Every worker undergoes an ID check, background screen, and skill assessment.",
    },
    {
      icon: Users2,
      title: "Consistent Quality",
      description: "Pool of pre-vetted professionals with rated performance history.",
    },
    {
      icon: BarChart3,
      title: "Automated Compliance",
      description: "Digital contracts, insurance coverage, and payroll handled automatically.",
    },
  ];

  return (
    <section id="solutions" className="section-padding bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Solution</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
            Revolutionizing workforce <br />
            management for <span className="text-primary italic">modern</span> enterprises.
          </h3>
          
          <div className="space-y-8">
            {solutions.map((item, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="bg-primary/20 p-3 rounded-xl h-fit group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-inherit" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
           {/* Visual Mockup for Solution - Dashboard */}
           <div className="bg-white dark:bg-slate-950 w-full rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-900">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary" />
                    <span className="font-bold text-slate-900 dark:text-white">Admin Dashboard</span>
                 </div>
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="h-24 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 flex flex-col justify-between">
                    <p className="text-xs text-slate-400 uppercase font-bold">Active Requests</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                 </div>
                 <div className="h-24 bg-primary/5 rounded-xl p-4 flex flex-col justify-between">
                    <p className="text-xs text-primary/60 uppercase font-bold">Matching Rate</p>
                    <p className="text-2xl font-bold text-primary">98.5%</p>
                 </div>
              </div>

              <div className="space-y-3">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                          <div className="h-2 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                       </div>
                       <div className="h-5 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] rounded-full flex items-center justify-center font-bold">MATCHED</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Decorative floating icon */}
           <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 animate-bounce cursor-default select-none">
              <CheckCircle2 className="w-8 h-8" />
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
