import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Plus, Edit2, Trash2, X, Eye, FileText, Video, Hammer } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState(null); // null means adding a new part

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

  const loadProducts = async () => {
    const data = await db.getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
    setModalOpen(true);
  };

  // Open modal for edit
  const handleEditClick = (product) => {
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
        {products.map((prod) => (
          <div 
            key={prod.id} 
            className="rounded-xl border border-dark-border bg-dark-card/30 p-6 glass flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
          >
            <div>
              {/* Product Header (Image & Identity) */}
              <div className="flex space-x-4 mb-4">
                <div className="h-20 w-20 shrink-0 bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center justify-center">
                  {prod.image_url && prod.image_url.startsWith('data:') ? (
                    <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: decodeURIComponent(prod.image_url.split(',')[1] || '') }} />
                  ) : (
                    <img 
                      src={prod.image_url || 'https://via.placeholder.com/80/090d16/06b6d4?text=PART'} 
                      alt={prod.name}
                      className="h-full w-full object-contain rounded"
                    />
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

              {/* Specifications Sub-Panel */}
              <div className="bg-[#050811] rounded-lg p-4 border border-dark-border space-y-2 mb-6 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">Material:</span>
                  <span className="text-slate-300">{prod.material || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">Precision Tolerance:</span>
                  <span className="text-brand-emerald font-semibold">{prod.precision_tolerance || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">Dimensions:</span>
                  <span className="text-slate-300">{prod.dimensions || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Weight:</span>
                  <span className="text-slate-300">{prod.weight || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex items-center justify-between border-t border-dark-border pt-4">
              {prod.youtube_url ? (
                <a 
                  href={prod.youtube_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 transition-colors font-mono"
                >
                  <Video className="h-4 w-4" />
                  <span>Demo Link</span>
                </a>
              ) : (
                <span className="text-xs text-slate-600 font-mono">No demo linked</span>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditClick(prod)}
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 font-mono"
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
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-dark-border bg-dark-card p-6 shadow-2xl glass animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-6">
              <h2 className="text-lg font-bold text-white tracking-wide uppercase font-mono flex items-center space-x-2">
                <Hammer className="h-5 w-5 text-brand-cyan" />
                <span>{editingPart ? 'Configure Robot Part' : 'Add New Robot Part'}</span>
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
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
                  className="rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-xs font-mono uppercase tracking-wide text-white hover:bg-slate-800"
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
