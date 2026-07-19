import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Eye, Play, Wrench, Shield } from 'lucide-react';

export default function Showcase() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await db.getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <section id="showcase" className="py-20 border-t border-dark-border bg-dark-bg/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Product Showcase
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Browse our core precision robot components, actuators, and sensor arrays machined with absolute tolerances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="rounded-xl border border-dark-border bg-dark-card/25 p-6 glass hover:border-brand-cyan/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Part Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-slate-900 border border-slate-800 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                      {prod.image_url && prod.image_url.startsWith('data:') ? (
                        <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: decodeURIComponent(prod.image_url.split(',')[1] || '') }} />
                      ) : (
                        <img src={prod.image_url} alt={prod.name} className="h-full w-full object-contain rounded" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-wide mt-1.5">{prod.name}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-brand-emerald">{prod.price_range}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Detailed specs */}
                <div className="grid grid-cols-2 gap-4 bg-[#050811] p-4 rounded-lg border border-slate-900 text-xs font-mono mb-6">
                  <div>
                    <span className="text-slate-500 block">Material Composition</span>
                    <span className="text-slate-300 font-medium mt-0.5 block">{prod.material || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Precision Tolerance</span>
                    <span className="text-brand-cyan font-medium mt-0.5 block">{prod.precision_tolerance || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Dimensions</span>
                    <span className="text-slate-300 font-medium mt-0.5 block">{prod.dimensions || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Net Weight</span>
                    <span className="text-slate-300 font-medium mt-0.5 block">{prod.weight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex justify-between items-center border-t border-dark-border pt-4 mt-auto">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Technical Data Sheet</span>
                </button>

                {prod.youtube_url && (
                  <a
                    href={prod.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Integration Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Data Sheet Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-dark-border bg-dark-card p-6 shadow-2xl glass animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-6">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono flex items-center space-x-2">
                <Wrench className="h-4 w-4 text-brand-cyan" />
                <span>Technical Specifications Sheet</span>
              </h3>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-slate-900 border border-slate-800 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                  {selectedProduct.image_url && selectedProduct.image_url.startsWith('data:') ? (
                    <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: decodeURIComponent(selectedProduct.image_url.split(',')[1] || '') }} />
                  ) : (
                    <img src={selectedProduct.image_url} alt={selectedProduct.name} className="h-full w-full object-contain rounded" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-0.5 rounded">
                    {selectedProduct.category}
                  </span>
                  <h4 className="text-base font-bold text-white tracking-wide mt-1">{selectedProduct.name}</h4>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs bg-[#050811] p-5 rounded-lg border border-slate-900">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">ID CODE:</span>
                  <span className="text-slate-300">{selectedProduct.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">PRICE BRACKET:</span>
                  <span className="text-slate-300 font-semibold">{selectedProduct.price_range}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">MATERIAL:</span>
                  <span className="text-slate-300">{selectedProduct.material || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">PRECISION GAP:</span>
                  <span className="text-brand-emerald font-semibold">{selectedProduct.precision_tolerance || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">ENVELOPE SIZE:</span>
                  <span className="text-slate-300">{selectedProduct.dimensions || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NET MASS:</span>
                  <span className="text-slate-300">{selectedProduct.weight || 'N/A'}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-dark-border">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg bg-brand-cyan px-4 py-2 text-xs font-mono font-bold uppercase tracking-wide text-dark-bg hover:bg-brand-cyan-glow"
                >
                  Dismiss Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
