"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Smartphone, Clock, Database, BarChart3, Fingerprint, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Background Check",
      description: "Comprehensive criminal and identity verification for every worker in our system.",
    },
    {
      icon: UserCheck,
      title: "Skill Certification",
      description: "Workers take rigorous assessments before they can accept premium shift requests.",
    },
    {
      icon: Smartphone,
      title: "Worker Companion App",
      description: "Dedicated mobile platform for workers to track shifts, earnings, and ratings.",
    },
    {
      icon: Clock,
      title: "Automated Rescheduling",
      description: "System automatically finds replacements for no-shows within 15 minutes.",
    },
    {
      icon: Database,
      title: "Digital Compliance Vault",
      description: "All contracts, insurance papers, and tax documents stored securely in one place.",
    },
    {
      icon: BarChart3,
      title: "Operational Analytics",
      description: "Real-time insights into labour costs, productivity, and workforce trends.",
    },
    {
      icon: Fingerprint,
      title: "Biometric Attendance",
      description: "Zero-fraud attendance tracking using face recognition for every shift start.",
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Automated payouts for workers immediately after shift approval by businesses.",
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
           <div className="lg:w-2/3">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Core Features</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Powerful tools for effortless <br />
                workforce automation.
              </h3>
           </div>
           <div className="lg:w-1/3">
              <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                 We've automated the entire hiring cycle, from verification to payroll, so you can focus on core operations.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-5 hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
