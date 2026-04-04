"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ajay Sharma",
      role: "Operations Manager, Taj Hotels",
      image: "",
      quote: "LabourLink has completely transformed how we handle peak season rushes. Finding 50 verified staff in under an hour was unheard of before this platform.",
      rating: 5,
    },
    {
      name: "Dr. Sarah Mendis",
      role: "HR Director, Apollo Hospitals",
      image: "",
      quote: "The verification process is what sets them apart. Knowing that every support staff is vetted gives us the peace of mind we need in healthcare.",
      rating: 5,
    },
    {
      name: "Vikram Malhotra",
      role: "Founder, VM Events",
      image: "",
      quote: "Reliability is everything in events. The automated replacement feature has saved us multiple times when workers couldn't make it. Highly recommended.",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Customer Success</h2>
           <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Trusted by the leaders <br /> in hospitality.
           </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((item, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-950 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all relative group"
             >
                <div className="absolute -top-6 left-10 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                   <Quote className="w-6 h-6 fill-white" />
                </div>
                
                <div className="flex items-center gap-1 mb-6 mt-4">
                   {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                   ))}
                </div>
                
                <blockquote className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 italic">
                   "{item.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-900">
                   <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                   <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase mt-1">{item.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
