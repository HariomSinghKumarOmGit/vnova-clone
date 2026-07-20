import React, { useEffect, useState, useRef } from 'react';
import { db, getCategoryImage } from '../lib/db';
import { Plus, Edit2, Trash2, X, Video, Hammer, Upload, Image as ImageIcon, ChevronLeft, ChevronRight, Minus, AlertCircle } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState(null);

  // Form State
  const [formFields, setFormFields] = useState({
    name: '',
    category: 'End Effectors',
    description: '',
    image_url: '',
    youtube_url: '',
    price_range: '',
    material: '',
    precision_tolerance: '',
    dimensions: '',
    weight: ''
  });

  // Image management state
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const loadProducts = async () => {
    const data = await db.getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProductImages = async (productId) => {
    const images = await db.getProductImages(productId);
    setProductImages(images);
  };

  // Open modal for add
  const handleAddClick = () => {
    setEditingPart(null);
    setFormFields({
      name: '',
      category: 'End Effectors',
      description: '',
      image_url: '',
      youtube_url: '',
      price_range: '',
      material: '',
      precision_tolerance: '',
      dimensions: '',
      weight: ''
    });
    setProductImages([]);
    setUploadError('');
    setModalOpen(true);
  };

  // Open modal for edit
  const handleEditClick = async (product) => {
    setEditingPart(product.id);
    setFormFields({
      name: product.name,
      category: product.category,
      description: product.description || '',
      image_url: product.image_url || '',
      youtube_url: product.youtube_url || '',
      price_range: product.price_range || '',
      material: product.material || '',
      precision_tolerance: product.precision_tolerance || '',
      dimensions: product.dimensions || '',
      weight: product.weight || ''
    });
    setUploadError('');
    await loadProductImages(product.id);
    setModalOpen(true);
  };

  // Handle delete
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to decommission this robot part?")) {
      await db.deleteProduct(id);
      loadProducts();
    }
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.name || !formFields.category) {
      alert("Name and Category are required.");
      return;
    }

    const payload = {
      name: formFields.name,
      category: formFields.category,
      description: formFields.description,
      image_url: formFields.image_url,
      youtube_url: formFields.youtube_url,
      price_range: formFields.price_range,
      material: formFields.material,
      precision_tolerance: formFields.precision_tolerance,
      dimensions: formFields.dimensions,
      weight: formFields.weight
    };

    try {
      if (editingPart) {
        await db.updateProduct(editingPart, payload);
      } else {
        await db.addProduct(payload);
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  // ── Image Upload ──
  const handleFileUpload = async (files) => {
    const targetId = editingPart;
    if (!targetId) {
      setUploadError("Save the product first, then edit it to upload images.");
      return;
    }

    setUploading(true);
    setUploadError('');
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));

    if (fileArray.length === 0) {
      setUploadError("No valid image files selected.");
      setUploading(false);
      return;
    }

    let successCount = 0;
    let lastError = '';

    for (let i = 0; i < fileArray.length; i++) {
      setUploadStatus(`Uploading ${i + 1} of ${fileArray.length}...`);
      try {
        await db.uploadProductImage(targetId, fileArray[i]);
        successCount++;
      } catch (err) {
        console.error(`Upload failed for ${fileArray[i].name}:`, err);
        lastError = err.message;
      }
    }

    setUploadStatus('');
    setUploading(false);

    if (lastError) {
      setUploadError(`${successCount}/${fileArray.length} uploaded. Error: ${lastError}`);
    } else {
      setUploadError('');
    }

    await loadProductImages(targetId);
    loadProducts();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files);
      // Reset file input so same file can be re-selected
      e.target.value = '';
    }
  };

  // ── Image Delete ──
  const handleImageRemove = async (image) => {
    await db.deleteProductImage(image.id, image.image_url);
    await loadProductImages(editingPart);
    loadProducts();
  };

  // ── Image Reorder ──
  const handleMoveImage = async (image, direction) => {
    const currentIdx = productImages.findIndex(img => img.id === image.id);
    const targetIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= productImages.length) return;

    const target = productImages[targetIdx];
    await db.reorderProductImages(image.id, target.display_order);
    await db.reorderProductImages(target.id, image.display_order);
    await loadProductImages(editingPart);
  };

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
            Inventory Manager
          </h1>
          <p className="text-xs text-brand-cyan tracking-widest font-mono uppercase mt-1">
            Robot Parts Database Controls
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 rounded-lg bg-brand-cyan px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-dark-bg hover:bg-brand-cyan-glow transition-all duration-300 glow-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Robot Part</span>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => {
          const imageUrl = (!prod.image_url || prod.image_url.startsWith('data:image/svg+xml;utf8,'))
            ? getCategoryImage(prod.category)
            : prod.image_url;
          return (
            <div
              key={prod.id}
              className="rounded-xl border border-dark-border bg-dark-card/30 p-6 glass flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
            >
              <div>
                {/* Product Header */}
                <div className="flex space-x-4 mb-4">
                  <div className="h-20 w-20 shrink-0 bg-dark-bg border border-dark-border rounded-lg p-2 flex items-center justify-center overflow-hidden">
                    {imageUrl && imageUrl.startsWith('data:') ? (
                      <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: decodeURIComponent(imageUrl.split(',')[1] || '') }} />
                    ) : (
                      <img src={imageUrl} alt={prod.name} className="h-full w-full object-contain rounded" />
                    )}
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">
                      {prod.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide mt-1.5 leading-snug">{prod.name}</h3>
                    <span className="text-xs font-mono text-slate-400 mt-1 block">{prod.price_range || 'Price range: N/A'}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{prod.description}</p>

                {/* Specifications */}
                <div className="bg-dark-bg rounded-lg p-4 border border-dark-border space-y-2 mb-6 text-xs font-mono">
                  <div className="flex justify-between border-b border-dark-border pb-1.5">
                    <span className="text-slate-500">Material:</span>
                    <span className="text-slate-300">{prod.material || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border pb-1.5">
                    <span className="text-slate-500">Precision Tolerance:</span>
                    <span className="text-brand-emerald font-semibold">{prod.precision_tolerance || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border pb-1.5">
                    <span className="text-slate-500">Dimensions:</span>
                    <span className="text-slate-300">{prod.dimensions || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weight:</span>
                    <span className="text-slate-300">{prod.weight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-dark-border pt-4">
                {prod.youtube_url ? (
                  <a href={prod.youtube_url} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 transition-colors font-mono">
                    <Video className="h-4 w-4" />
                    <span>Demo Link</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-600 font-mono">No demo linked</span>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditClick(prod)}
                    className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-dark-card hover:bg-dark-highlight border border-dark-border rounded px-2.5 py-1.5 font-mono"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(prod.id)}
                    className="flex items-center space-x-1.5 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 border border-red-500/20 rounded px-2.5 py-1.5 font-mono"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Add/Edit Modal ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 modal-backdrop">
          <div className="relative w-full max-w-3xl rounded-2xl border border-dark-border bg-dark-card p-6 shadow-2xl glass modal-content max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-6">
              <h2 className="text-lg font-bold text-white tracking-wide uppercase font-mono flex items-center space-x-2">
                <Hammer className="h-5 w-5 text-brand-cyan" />
                <span>{editingPart ? 'Configure Robot Part' : 'Add New Robot Part'}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Row 1: Name and Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Part Name *</label>
                  <input
                    type="text"
                    required
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    placeholder="e.g. HydraGrip V3 Gripper"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Category *</label>
                  <select
                    value={formFields.category}
                    onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none cursor-pointer"
                  >
                    <option value="End Effectors" className="bg-dark-card">End Effectors</option>
                    <option value="Actuators" className="bg-dark-card">Actuators</option>
                    <option value="Sensors" className="bg-dark-card">Sensors</option>
                    <option value="Structural Frame" className="bg-dark-card">Structural Frame</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Functional Description</label>
                <textarea
                  rows={3}
                  value={formFields.description}
                  onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                  placeholder="Provide mechanical application details..."
                  className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* Row 3: URLs & Price */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">YouTube Video Demo Link</label>
                  <input
                    type="url"
                    value={formFields.youtube_url}
                    onChange={(e) => setFormFields({ ...formFields, youtube_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Price Range</label>
                  <input
                    type="text"
                    value={formFields.price_range}
                    onChange={(e) => setFormFields({ ...formFields, price_range: e.target.value })}
                    placeholder="e.g. $2,400 - $3,000"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                  />
                </div>
              </div>

              {/* ═══ PRODUCT IMAGES SECTION ═══ */}
              <div className="border-t border-dark-border pt-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan mb-4 flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Product Images</span>
                </h3>

                {/* Upload Dropzone */}
                {editingPart ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                      dragOver
                        ? 'dropzone-hover border-brand-cyan bg-brand-cyan/5'
                        : 'border-dark-border hover:border-slate-600'
                    }`}
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="h-8 w-8 border-2 border-brand-cyan border-t-transparent rounded-full spinner" />
                        <span className="text-xs font-mono text-brand-cyan">{uploadStatus}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-3">
                        <Upload className="h-8 w-8 text-slate-500" />
                        <div>
                          <p className="text-sm text-slate-400">Drag & drop images here, or</p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-2 text-xs font-mono text-brand-cyan hover:text-brand-cyan-glow transition-colors underline underline-offset-2"
                          >
                            Browse Files
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-600 font-mono">PNG, JPG, WEBP up to 5MB each</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="border border-dark-border rounded-xl p-4 bg-dark-bg/50">
                    <p className="text-xs text-slate-500 font-mono text-center">
                      💡 Save the product first, then edit it to upload images
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {uploadError && (
                  <div className="mt-3 flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <span className="text-xs font-mono text-red-400">{uploadError}</span>
                  </div>
                )}

                {/* ── Uploaded Images Grid ── */}
                {productImages.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {productImages.length} image{productImages.length !== 1 ? 's' : ''} uploaded
                      </span>
                      <span className="text-[10px] font-mono text-slate-600">
                        Use ◀ ▶ to reorder • − to remove
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {productImages.map((img, idx) => (
                        <div
                          key={img.id}
                          className="relative group w-[88px] h-[88px] rounded-lg border border-dark-border bg-dark-bg overflow-hidden hover:border-slate-600 transition-all"
                        >
                          {/* Thumbnail */}
                          <img
                            src={img.image_url}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Remove button (−) — always visible top-right */}
                          <button
                            type="button"
                            onClick={() => handleImageRemove(img)}
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-400 transition-colors z-10"
                            title="Remove image"
                          >
                            <Minus className="h-3 w-3" strokeWidth={3} />
                          </button>

                          {/* Hover overlay with reorder arrows */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleMoveImage(img, 'left')}
                              disabled={idx === 0}
                              className="h-6 w-6 rounded bg-dark-card/90 border border-dark-border flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              title="Move left"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveImage(img, 'right')}
                              disabled={idx === productImages.length - 1}
                              className="h-6 w-6 rounded bg-dark-card/90 border border-dark-border flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              title="Move right"
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Order number */}
                          <div className="absolute bottom-1 left-1 bg-dark-bg/80 rounded px-1 py-0.5 text-[9px] font-mono text-slate-400 leading-none">
                            {idx + 1}
                          </div>

                          {/* Primary badge */}
                          {idx === 0 && (
                            <div className="absolute bottom-1 right-1 bg-brand-cyan/30 rounded px-1 py-0.5 text-[8px] font-mono text-brand-cyan leading-none">
                              ★
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Technical Specs */}
              <div className="border-t border-dark-border pt-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan mb-4">Nested Technical Specifications</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Material Composition</label>
                    <input
                      type="text"
                      value={formFields.material}
                      onChange={(e) => setFormFields({ ...formFields, material: e.target.value })}
                      placeholder="e.g. Titanium Grade 5"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Precision Tolerance</label>
                    <input
                      type="text"
                      value={formFields.precision_tolerance}
                      onChange={(e) => setFormFields({ ...formFields, precision_tolerance: e.target.value })}
                      placeholder="e.g. ± 0.02 mm"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Dimensions (H x W x D)</label>
                    <input
                      type="text"
                      value={formFields.dimensions}
                      onChange={(e) => setFormFields({ ...formFields, dimensions: e.target.value })}
                      placeholder="e.g. 180mm x 120mm x 95mm"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Net Weight</label>
                    <input
                      type="text"
                      value={formFields.weight}
                      onChange={(e) => setFormFields({ ...formFields, weight: e.target.value })}
                      placeholder="e.g. 2.4 kg"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-dark-border pt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-dark-border bg-dark-highlight/50 px-5 py-2.5 text-xs font-mono uppercase tracking-wide text-white hover:bg-dark-highlight"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-cyan px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wide text-dark-bg hover:bg-brand-cyan-glow glow-cyan"
                >
                  {editingPart ? 'Apply Configurations' : 'Commit to Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
