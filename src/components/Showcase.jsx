import React, { useEffect, useState, useCallback } from 'react';
import { db, getCategoryImage } from '../lib/db';
import { Eye, Play, X, ChevronLeft, ChevronRight, Package, Layers, Maximize2 } from 'lucide-react';

export default function Showcase() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const data = await db.getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // When a product is selected, fetch its gallery images
  useEffect(() => {
    if (!selectedProduct) {
      setProductImages([]);
      setActiveImageIndex(0);
      return;
    }
    async function loadImages() {
      setImagesLoading(true);
      const images = await db.getProductImages(selectedProduct.id);
      // Build image list: gallery images + fallback to product main image
      const fallbackUrl = getDisplayImage(selectedProduct);
      if (images.length > 0) {
        setProductImages(images.map(img => img.image_url));
      } else {
        setProductImages([fallbackUrl]);
      }
      setActiveImageIndex(0);
      setImagesLoading(false);
    }
    loadImages();
  }, [selectedProduct]);

  // Keyboard close support
  useEffect(() => {
    if (!selectedProduct) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
      if (e.key === 'ArrowLeft') setActiveImageIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setActiveImageIndex(i => Math.min(productImages.length - 1, i + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProduct, productImages.length]);

  const getDisplayImage = useCallback((prod) => {
    if (!prod.image_url || prod.image_url.startsWith('data:image/svg+xml;utf8,')) {
      return getCategoryImage(prod.category);
    }
    return prod.image_url;
  }, []);

  const isSvgDataUrl = (url) => url && url.startsWith('data:image/svg+xml;utf8,');

  const renderImage = (url, alt, className = '') => {
    if (isSvgDataUrl(url)) {
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: decodeURIComponent(url.split(',')[1] || '') }}
        />
      );
    }
    return <img src={url} alt={alt} className={`${className} object-contain`} />;
  };

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
          {products.map((prod) => {
            const imageUrl = getDisplayImage(prod);
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="rounded-xl border border-dark-border bg-dark-card/25 p-6 glass hover:border-brand-cyan/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Part Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-dark-bg border border-dark-border rounded-lg p-1.5 flex items-center justify-center shrink-0 group-hover:border-brand-cyan/30 transition-colors shadow-sm">
                        {renderImage(imageUrl, prod.name, 'h-full w-full rounded')}
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
                  <div className="grid grid-cols-2 gap-4 bg-dark-highlight p-4 rounded-lg border border-dark-border text-xs font-mono mb-6 shadow-inner">
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
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(prod); }}
                    className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                    <span>View Details</span>
                  </button>

                  {prod.youtube_url && (
                    <a
                      href={prod.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span>Watch Integration Demo</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Product Detail Modal ─── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-dark-border bg-gray-100 dark:bg-dark-card shadow-2xl dark:glass modal-content max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Close Button ── */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Hero Image Area ── */}
            <div className="relative bg-dark-highlight flex items-center justify-center h-[320px] sm:h-[400px] overflow-hidden shadow-inner w-full shrink-0">
              {imagesLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="h-8 w-8 border-2 border-brand-cyan border-t-transparent rounded-full spinner" />
                </div>
              ) : (
                <>
                  {/* Main Image */}
                  <div className="flex items-center justify-center w-full h-full p-8">
                    {isSvgDataUrl(productImages[activeImageIndex]) ? (
                      <div
                        className="h-48 w-48"
                        dangerouslySetInnerHTML={{ __html: decodeURIComponent(productImages[activeImageIndex]?.split(',')[1] || '') }}
                      />
                    ) : (
                      <img
                        src={productImages[activeImageIndex]}
                        alt={selectedProduct.name}
                        className="h-full w-full object-contain rounded-lg"
                      />
                    )}
                  </div>

                  {/* Left Arrow */}
                  {productImages.length > 1 && activeImageIndex > 0 && (
                    <button
                      onClick={() => setActiveImageIndex(i => i - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-cyan/50 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  )}

                  {/* Right Arrow */}
                  {productImages.length > 1 && activeImageIndex < productImages.length - 1 && (
                    <button
                      onClick={() => setActiveImageIndex(i => i + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-cyan/50 transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  )}

                  {/* Image counter */}
                  {productImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-dark-bg/80 border border-dark-border rounded-full px-3 py-1 text-[10px] font-mono text-slate-400">
                      {activeImageIndex + 1} / {productImages.length}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Thumbnail Strip ── */}
            {productImages.length > 1 && (
              <div className="flex items-center gap-2 px-6 py-3 bg-dark-bg border-t border-dark-border overflow-x-auto shadow-inner">
                {productImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`shrink-0 h-14 w-14 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      idx === activeImageIndex
                        ? 'thumbnail-active border-brand-cyan'
                        : 'border-dark-border hover:border-slate-600'
                    }`}
                  >
                    {isSvgDataUrl(imgUrl) ? (
                      <div
                        className="h-full w-full p-1"
                        dangerouslySetInnerHTML={{ __html: decodeURIComponent(imgUrl.split(',')[1] || '') }}
                      />
                    ) : (
                      <img src={imgUrl} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ── Product Info ── */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-0.5 rounded">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide mt-2">{selectedProduct.name}</h3>
                </div>
                <span className="text-sm font-mono font-semibold text-brand-emerald whitespace-nowrap">
                  {selectedProduct.price_range}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-dark-highlight p-5 rounded-xl border border-dark-border text-xs font-mono mb-6 shadow-inner">
                <div className="space-y-1">
                  <span className="text-slate-500 block">Material</span>
                  <span className="text-slate-300 font-medium block">{selectedProduct.material || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">Precision</span>
                  <span className="text-brand-cyan font-medium block">{selectedProduct.precision_tolerance || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">Dimensions</span>
                  <span className="text-slate-300 font-medium block">{selectedProduct.dimensions || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">Net Weight</span>
                  <span className="text-slate-300 font-medium block">{selectedProduct.weight || 'N/A'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-dark-border pt-4">
                {selectedProduct.youtube_url ? (
                  <a
                    href={selectedProduct.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-xs font-mono text-red-400 hover:text-red-300 transition-colors bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Integration Demo</span>
                  </a>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg bg-brand-cyan px-5 py-2 text-xs font-mono font-bold uppercase tracking-wide text-dark-bg hover:bg-brand-cyan-glow transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
