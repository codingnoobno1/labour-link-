"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee, Clock, ShieldCheck, Star, Smartphone } from "lucide-react";

const WorkerSection = () => {
  const benefits = [
    {
      icon: IndianRupee,
      title: "Stable & Secure Income",
      description: "Direct bank payouts every week with no delays or deductions.",
    },
    {
      icon: Clock,
      title: "Flexible Shift Selection",
      description: "Choose when you want to work and skip shifts that don't fit your schedule.",
    },
    {
      icon: ShieldCheck,
      title: "Worker Accident Protection",
      description: "Comprehensive accidental insurance coverage for every shift you take.",
    },
    {
      icon: Smartphone,
      title: "Smart Career Pathway",
      description: "Earn skill certificates and performance badges to unlock high-paying jobs.",
    },
  ];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -25 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative order-2 lg:order-1"
          >
             <div className="bg-primary/10 rounded-[3rem] p-4 lg:p-8 relative">
                <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800">
                   {/* Mobile App Preview Mockup */}
                   <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                         <div>
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Current Balance</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">₹12,450.00</p>
                         </div>
                         <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <IndianRupee className="w-6 h-6" />
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                         <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Available Shifts (3)</p>
                         {[
                            { hotel: "Taj Mahal Palace", shift: "Morning", pay: "₹850" },
                            { hotel: "Grand Hyatt", shift: "Evening", pay: "₹920" }
                         ].map((s, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
                               <div className="flex gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                  <div>
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">{s.hotel}</p>
                                     <p className="text-xs text-slate-500">{s.shift} Shift</p>
                                  </div>
                               </div>
                               <p className="text-primary font-black text-sm">{s.pay}</p>
                            </div>
                         ))}
                      </div>

                      <button className="w-full bg-primary py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20">
                         View All Jobs
                      </button>
                   </div>
                </div>
                
                {/* Decorative floating stats */}
                <div className="absolute top-10 -right-6 lg:-right-10 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-20 flex items-center gap-3">
                   <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                      <Star className="w-6 h-6 fill-white" />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">4.9/5</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Avg. Rating</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 25 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="order-1 lg:order-2"
          >
             <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Empowering Workers</h2>
             <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
                Your gateway to better <br /> earnings and <span className="text-primary italic underline decoration-wavy underline-offset-8">growth</span>.
             </h3>
             <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                Join thousands of professionals who have transformed their careers through LabourLink. We provide the tools, security, and jobs you deserve.
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                     <div className="bg-white dark:bg-slate-950 p-3 rounded-xl h-fit shadow-md group-hover:bg-primary group-hover:text-white transition-all">
                        <item.icon className="w-6 h-6 text-primary group-hover:text-inherit" />
                     </div>
                     <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkerSection;
