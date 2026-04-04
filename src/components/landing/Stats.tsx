"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, Globe, CalendarRange } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Verified Workers",
      description: "Trained professionals across multiple sectors.",
    },
    {
      icon: Building2,
      value: "500+",
      label: "Business Partners",
      description: "Enterprises trusting our platform daily.",
    },
    {
      icon: CalendarRange,
      value: "1M+",
      label: "Shifts Completed",
      description: "Successful milestones delivered worldwide.",
    },
    {
      icon: Globe,
      value: "45+",
      label: "Cities Covered",
      description: "Growing footprint in major urban hubs.",
    },
  ];

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8" />
              </div>
              <h4 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">{stat.value}</h4>
              <p className="text-lg font-bold mb-2 opacity-90">{stat.label}</p>
              <p className="text-white/60 text-sm max-w-[200px] leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
