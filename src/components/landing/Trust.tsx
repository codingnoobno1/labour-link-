"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Award, CheckCircle } from "lucide-react";

const Trust = () => {
  const partners = [
    "Marriott", "Hilton", "Hyatt", "Radisson", "Sheraton", "Novotel", "Fairmont", "Westin"
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:row items-center justify-between gap-12">
           <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 text-primary font-bold mb-3">
                 <ShieldCheck className="w-5 h-5" />
                 <span>Enterprise Ready</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4">Trusted by industry <br /> giants worldwide.</h3>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                 We've powered workforce management for major hospitality brands across 45 countries.
              </p>
           </div>
           
           <div className="md:w-2/3 flex flex-wrap items-center justify-center gap-x-12 gap-y-12 opacity-50 contrast-0 grayscale hover:grayscale-0 hover:contrast-100 hover:opacity-100 transition-all duration-700">
              {partners.map((partner, i) => (
                <div key={i} className="text-xl font-bold tracking-tight text-slate-900 dark:text-white cursor-default">
                  {partner}
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-slate-100 dark:border-slate-900">
           {[
              { icon: Star, text: "4.9/5 Rating", sub: "User satisfaction" },
              { icon: Award, text: "Top Rated 2024", sub: "Industry leader" },
              { icon: ShieldCheck, text: "SOC2 Type II", sub: "Security verified" },
              { icon: CheckCircle, text: "99% Success Rate", sub: "Completion rate" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 group justify-center md:justify-start">
                <div className="bg-primary/10 p-2.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">{item.text}</p>
                   <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.sub}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
