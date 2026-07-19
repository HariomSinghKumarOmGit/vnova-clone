import React from 'react';
import { Plane, Compass, HeartPulse, HardHat, Car, PackageCheck } from 'lucide-react';

const INDUSTRIES = [
  {
    name: "Aerospace Systems",
    desc: "Machined titanium joints and end-effectors certified for carbon-fiber fuselage assembly and satellite assembly cleanrooms.",
    icon: Plane,
    color: "stroke-cyan-400"
  },
  {
    name: "Automotive Assembly",
    desc: "Heavy-payload multi-jaw grippers and fast-acting servo controllers for line conveyor integration and robotic welding cells.",
    icon: Car,
    color: "stroke-emerald-400"
  },
  {
    name: "Medical Technologies",
    desc: "Sterile, biocompatible components engineered with micron-level tolerance for automated laboratory routing and surgical arms.",
    icon: HeartPulse,
    color: "stroke-pink-400"
  },
  {
    name: "Defense & Heavy Industries",
    desc: "Rugged structural cores and dust-sealed LiDAR arrays that withstand temperature extremes and military-grade mechanical shocks.",
    icon: HardHat,
    color: "stroke-amber-400"
  },
  {
    name: "Autonomous Logistics",
    desc: "Precision LiDAR scanners and dynamic load wheels designed for heavy-payload automated guided vehicles (AGVs) in fulfillment centers.",
    icon: PackageCheck,
    color: "stroke-blue-400"
  },
  {
    name: "Precision Agriculture",
    desc: "IP67 sealed actuators and vision sensor rigs suited for outdoor harvester autonomy and precision pesticide drone spraying.",
    icon: Compass,
    color: "stroke-purple-400"
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 border-t border-dark-border bg-dark-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-4 text-base text-slate-400">
            V-Nova manufactures standard components and custom automation lines for global industries requiring zero-fault operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div 
                key={i}
                className="group relative rounded-xl border border-dark-border bg-dark-card/40 p-8 hover:border-brand-cyan/40 hover:bg-dark-card/80 transition-all duration-300 overflow-hidden"
              >
                {/* Micro animation highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-brand-cyan/30 group-hover:text-brand-cyan transition-all duration-300">
                  <Icon className={`h-6 w-6 stroke-[1.5] ${ind.color}`} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-white tracking-wide">
                  {ind.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
