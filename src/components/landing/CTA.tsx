"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, UserCheck, SearchCheck } from "lucide-react";
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden relative shadow-2xl shadow-primary/30 text-white text-center md:text-left flex flex-col md:row items-center border border-white/10">
           {/* CTA Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
           </div>

           <div className="md:w-2/3 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
                 <Sparkles className="w-4 h-4 fill-white" />
                 Get Started Today
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                 Ready to Scale Your <br /> Workforce with <br /> <span className="text-secondary italic underline decoration-wavy decoration-white/20 underline-offset-8">Precision?</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-xl leading-relaxed">
                 Join 500+ premium businesses that have automated their hiring with LabourLink.
              </p>
              
              <div className="flex flex-col sm:row items-center gap-6">
                 <Link href="/register" className="bg-white text-primary px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-3 group w-full sm:w-auto justify-center">
                    Hire Workers Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link href="/register" className="text-white border-2 border-white/20 hover:bg-white/10 rounded-2xl px-10 py-5 font-bold transition-all w-full sm:w-auto text-center block">
                    Apply as a Worker
                 </Link>
              </div>
           </div>

           <div className="md:w-1/3 hidden md:flex items-center justify-center relative mt-16 md:mt-0">
               {/* Visual Floating elements */}
               <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative w-full h-[300px] flex flex-col justify-between"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6" />
                     </div>
                     <div className="h-4 w-32 bg-white/20 rounded-full" />
                  </div>
                  <div className="space-y-4">
                     <div className="h-3 w-full bg-white/10 rounded-full" />
                     <div className="h-3 w-4/5 bg-white/10 rounded-full" />
                     <div className="h-3 w-2/3 bg-white/10 rounded-full" />
                  </div>
                  <div className="bg-secondary p-4 rounded-xl flex items-center justify-center text-primary font-black uppercase text-xs tracking-tighter shadow-lg shadow-secondary/30">
                     <SearchCheck className="w-5 h-5 mr-2" />
                     MATCHING WORKER FOUND...
                  </div>
               </motion.div>
           </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           {[
             { title: "No Upfront Cost", desc: "Pay only for the work you get. No setup fees or monthly subscriptions." },
             { title: "Enterprise SLA", desc: "Guaranteed 99.9% fulfillment rate for our enterprise partners." },
             { title: "Premium Support", desc: "24/7 dedicated account manager for all your operational needs." }
           ].map((item, i) => (
             <div key={i}>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
