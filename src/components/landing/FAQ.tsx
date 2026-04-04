"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to find workers?",
      answer: "Our AI-matching engine typically finds qualified workers within seconds. For large bulk requests (50+ staff), we recommend posting at least 4 hours in advance.",
    },
    {
      question: "Are the workers employees of LabourLink?",
      answer: "LabourLink provides a platform for verified independent contractors. We handle the vetting, compliance, and payments, but they are not full-time employees, which gives you maximum flexibility.",
    },
    {
      question: "What happens if a worker doesn't show up?",
      answer: "Our system automatically detects no-shows via biometric check-in logic. If a worker doesn't check in within 15 minutes of the shift start, we immediately dispatch a replacement from our standby pool.",
    },
    {
      question: "How do you verify the worker's identity and skills?",
      answer: "Every worker goes through a 3-step verification: ID check using Aadhaar/PAN, criminal background screen, and a mandatory skill assessment on our platform.",
    },
    {
      question: "What are your service fees for businesses?",
      answer: "We charge a transparent platform fee based on the worker's shift rate. Total costs are displayed upfront before you confirm any booking. Contact our sales team for enterprise pricing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 text-center lg:text-left">
           <div className="bg-primary/10 p-3 rounded-2xl w-14 h-14 flex items-center justify-center text-primary mb-6 mx-auto lg:mx-0">
              <HelpCircle className="w-8 h-8" />
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Frequently Asked <span className="text-primary italic">Questions</span>.</h2>
           <p className="text-slate-500 leading-relaxed max-w-sm mx-auto lg:mx-0">
              Need more details? We've answered the most common questions from our business partners and workforce.
           </p>
           <button className="mt-8 font-bold text-primary hover:underline hover:underline-offset-4 flex items-center gap-2 mx-auto lg:mx-0 transition-all">
              Visit our Knowledge Base
           </button>
        </div>

        <div className="lg:w-2/3 space-y-4">
           {faqs.map((faq, i) => (
             <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <button
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                   className="w-full flex items-center justify-between py-6 text-left group"
                >
                   <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors pr-8">
                      {faq.question}
                   </span>
                   <div className={`p-2 rounded-lg transition-all ${openIndex === i ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-900 text-slate-500"}`}>
                      {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                   </div>
                </button>
                
                <AnimatePresence>
                   {openIndex === i && (
                     <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                     >
                        <p className="pb-8 text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl px-2">
                           {faq.answer}
                        </p>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
