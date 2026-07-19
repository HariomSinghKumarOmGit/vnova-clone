import React from 'react';
import { ShieldCheck, Zap, Cog, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div id="hero" className="relative overflow-hidden py-24 sm:py-32">
      {/* Decorative Neon Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 translate-x-1/2 rounded-full bg-brand-emerald/10 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1 text-xs font-mono text-brand-cyan tracking-wider uppercase mb-8">
            <Zap className="h-3.5 w-3.5 animate-pulse" />
            <span>Industrial Robotics & Automation Integration</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Precision Machinery <br />
            <span className="bg-gradient-to-r from-brand-cyan to-brand-emerald bg-clip-text text-transparent">
              Engineered for Scale
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-slate-400">
            V-Nova manufactures and integrates state-of-the-art robotic end-effectors, rotary actuators, and solid-state sensors. Deploying extreme precision tolerance for heavy manufacturing, aerospace assemblies, and automated warehouse fulfillment centers.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#showcase"
              className="rounded-lg bg-brand-cyan px-5 py-3 text-sm font-semibold text-dark-bg shadow-sm hover:bg-brand-cyan-glow transition-all duration-300 flex items-center space-x-2 font-mono glow-cyan"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-dark-border bg-dark-card/50 px-5 py-3 text-sm font-semibold text-white hover:bg-dark-highlight transition-all duration-300"
            >
              Book Factory Consult
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mx-auto mt-20 max-w-5xl sm:mt-24 lg:mt-32">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none sm:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-dark-border bg-dark-card/50 glass hover:border-brand-cyan/30 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-sm font-semibold leading-7 text-white font-mono uppercase">
                <Cog className="h-5 w-5 text-brand-cyan" />
                Micron Tolerances
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                <p>All end effectors and servo-joints machined to strict tolerances up to ± 0.005 mm precision.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-dark-border bg-dark-card/50 glass hover:border-brand-emerald/30 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-sm font-semibold leading-7 text-white font-mono uppercase">
                <ShieldCheck className="h-5 w-5 text-brand-emerald" />
                ISO 9001 Certified
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                <p>Fully compliant quality management systems for hardware reliability under massive structural load.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-dark-border bg-dark-card/50 glass hover:border-brand-cyan/30 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-sm font-semibold leading-7 text-white font-mono uppercase">
                <Zap className="h-5 w-5 text-brand-cyan" />
                Vercel Deploy Ready
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                <p>Instantly integrated cloud state, custom Supabase database, and high-performance serverless setup.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
