"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle, Clock, ShieldAlert } from "lucide-react";

const Problem = () => {
  const problems = [
    {
      icon: XCircle,
      title: "Unverified Workforce",
      description: "Businesses struggle with workers lacking proper background checks and credentials.",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      icon: Clock,
      title: "Operational Delays",
      description: "Last-minute cancellations and no-shows cause massive disruptions in service delivery.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: ShieldAlert,
      title: "Compliance Risks",
      description: "Navigating legal and insurance requirements for temporary staff is time-consuming and risky.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Quality Variance",
      description: "Inconsistent skill levels across different workers lead to poor customer satisfaction.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">The Challenge</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Stop worrying about unreliable labour.
          </h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Traditional hiring for hospitality and healthcare is broken. We've identified the top friction points for businesses today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/50 hover:shadow-xl transition-all group"
            >
              <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
