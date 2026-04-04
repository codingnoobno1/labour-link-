"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users2, ShieldPlus, Zap, Settings, ArrowRight } from "lucide-react";

const BusinessSection = () => {
  const managementFeatures = [
    {
      icon: Users2,
      label: "Bulk Hiring",
      description: "Match up to 100 workers in a single click for large-scale operations.",
    },
    {
      icon: BarChart3,
      label: "Cost Optimization",
      description: "Reduce overhead by hiring only when you have peak demand periods.",
    },
    {
      icon: ShieldPlus,
      label: "Zero Liability",
      description: "We handle all insurance, tax, and compliance requirements for you.",
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-900/50 -skew-x-12 translate-x-20 z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full lg:flex items-center gap-20">
        <div className="lg:w-1/2">
           <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4 text-center lg:text-left">For Enterprises</h2>
           <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8 text-center lg:text-left">
              Workforce management <br />
              on <span className="text-primary">autopilot</span>.
           </h3>
           <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 text-center lg:text-left">
              Scale your operations without the administrative headache. Our enterprise dashboard gives you complete control over your workforce while automating everything behind the scenes.
           </p>
           
           <div className="space-y-6 mb-12">
              {managementFeatures.map((item, index) => (
                <div key={index} className="flex gap-4 group items-center lg:items-start text-center lg:text-left flex-col lg:row">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.label}</h4>
                      <p className="text-sm text-slate-500 max-w-sm">{item.description}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="flex flex-col sm:row items-center gap-4 justify-center lg:justify-start">
              <button className="bg-primary text-white rounded-2xl px-10 py-4 font-bold shadow-lg shadow-primary/20 flex items-center gap-2 group w-full sm:w-auto justify-center">
                 Book a Demo
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-slate-600 dark:text-slate-400 font-bold px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all w-full sm:w-auto">
                 Download Enterprise Guide
              </button>
           </div>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="lg:w-1/2 mt-16 lg:mt-0 flex flex-col gap-6"
        >
           {/* Enterprise Interface Mockup */}
           <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 w-full">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">Current Month</p>
                       <p className="text-xl font-bold text-slate-900 dark:text-white">Enterprise Stats</p>
                    </div>
                 </div>
                 <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <Settings className="w-5 h-5 text-slate-400" />
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-4">Labour Cost Trend</p>
                    <div className="h-32 flex items-end justify-between gap-2 px-1">
                       {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-lg h-full" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                       <p className="text-xs text-slate-400 font-bold mb-1">TOTAL WORKERS</p>
                       <p className="text-2xl font-black text-slate-900 dark:text-white">2.4k</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                       <p className="text-xs text-slate-400 font-bold mb-1">FULFILLMENT</p>
                       <p className="text-2xl font-black text-primary">99.2%</p>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessSection;
