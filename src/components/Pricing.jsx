import React from 'react';
import { Check, ShieldCheck, BadgePercent } from 'lucide-react';

const PACKAGES = [
  {
    name: "Consulting & Feasibility",
    price: "$250",
    period: "per hour",
    desc: "Complete system analysis, layout optimization proposals, and parts compatibility assessment.",
    features: [
      "Compatibility audits with ABB/KUKA arms",
      "Full digital twin load simulation reports",
      "Initial tolerance feasibility check",
      "Next-day query response time",
      "Dedicated mechanical engineer allocation"
    ],
    popular: false,
    cta: "Request Consultation",
    color: "border-dark-border"
  },
  {
    name: "Custom Milling & Fabrication",
    price: "$1,850",
    period: "base setups + raw materials",
    desc: "Bespoke production of end-effectors, links, and custom robotic structural parts matching CAD models.",
    features: [
      "Custom CNC milling in Grade 5 Titanium",
      "Tolerance certification reports (± 0.01 mm)",
      "Anodized coating colors on request",
      "3D print prototype mockups before milling",
      "Includes initial load tolerance reports",
      "Complementary shipping inside US"
    ],
    popular: true,
    cta: "Initialize Fabricate order",
    color: "border-brand-cyan shadow-lg shadow-brand-cyan/10"
  },
  {
    name: "Specialized Tooling & Calibration",
    price: "$3,400",
    period: "per system set",
    desc: "Sensor array calibration, solid-state depth scanner installation, and production line optimization.",
    features: [
      "Dual solid-state LiDAR array calibration",
      "Micro-precision laser joint calibration",
      "On-site installation support (3 days)",
      "Extended 2-year hardware warranty",
      "Priority 24/7 technical hotline access"
    ],
    popular: false,
    cta: "Request Calibration",
    color: "border-dark-border"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 border-t border-dark-border bg-dark-bg/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering Packages
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Select one of our specialized integration levels. All tiers feature complete QA compliance documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {PACKAGES.map((pkg, i) => (
            <div 
              key={i}
              className={`relative flex flex-col justify-between rounded-2xl border bg-dark-card/50 p-8 glass hover:-translate-y-2 transition-all duration-300 ${pkg.color}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-cyan px-4 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-dark-bg flex items-center space-x-1 glow-cyan">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Highly Selected Tier</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {pkg.name}
                </h3>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {pkg.desc}
                </p>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{pkg.price}</span>
                  <span className="text-sm font-semibold text-slate-400">{pkg.period}</span>
                </div>

                <ul className="mt-8 space-y-3 text-sm text-slate-300">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 shrink-0 text-brand-cyan" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <a
                  href="#contact"
                  className={`block w-full rounded-lg py-3 text-center text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                    pkg.popular 
                      ? 'bg-brand-cyan text-dark-bg hover:bg-brand-cyan-glow glow-cyan'
                      : 'border border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
