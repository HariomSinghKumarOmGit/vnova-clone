import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from Vite environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are valid
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Initialize Supabase Client
const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export { supabase };

// High-tech vector SVGs for robotic parts
export const MOCK_PART_IMAGES = {
  gripper: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2306b6d4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7M5 8h14M8 5v14'/></svg>",
  actuator: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='4' width='16' height='16' rx='2' ry='2'/><path d='M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3'/></svg>",
  sensor: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'/></svg>",
  chassis: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ec4899' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/></svg>"
};

export const getCategoryImage = (category) => {
  switch (category) {
    case 'End Effectors':
      return MOCK_PART_IMAGES.gripper;
    case 'Actuators':
      return MOCK_PART_IMAGES.actuator;
    case 'Sensors':
      return MOCK_PART_IMAGES.sensor;
    case 'Structural Frame':
      return MOCK_PART_IMAGES.chassis;
    default:
      return MOCK_PART_IMAGES.gripper;
  }
};

// Default Mock Data for seeding LocalStorage
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "HydraGrip V3 Pneumatic Gripper",
    category: "End Effectors",
    description: "Multi-jaw heavy-duty industrial robotic gripper designed for harsh environments. Ideal for material handling and high-payload packing operations.",
    image_url: MOCK_PART_IMAGES.gripper,
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    price_range: "$2,400 - $3,200",
    material: "Hardened Aircraft Grade Aluminum (7075-T6)",
    precision_tolerance: "± 0.02 mm",
    dimensions: "180mm x 120mm x 95mm",
    weight: "2.4 kg"
  },
  {
    id: "prod-2",
    name: "ApexDrive 120Nm Servo Actuator",
    category: "Actuators",
    description: "Compact brushless direct-drive rotary actuator with integrated absolute encoder. High torque density and precision speed control for joints.",
    image_url: MOCK_PART_IMAGES.actuator,
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    price_range: "$4,500 - $5,800",
    material: "Alloy Steel / Anodized Titanium shell",
    precision_tolerance: "± 0.005 arcsec",
    dimensions: "110mm diameter x 140mm length",
    weight: "4.8 kg"
  },
  {
    id: "prod-3",
    name: "SpectraVision LiDAR-6 Sensor",
    category: "Sensors",
    description: "Solid-state multi-spectral LiDAR array featuring instant depth calculation. Certified for autonomous heavy forklift navigation and collision avoidance.",
    image_url: MOCK_PART_IMAGES.sensor,
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    price_range: "$1,800 - $2,300",
    material: "Polycarbonate and Tempered Glass optics",
    precision_tolerance: "± 1.5 cm at 100m",
    dimensions: "80mm x 80mm x 65mm",
    weight: "0.6 kg"
  },
  {
    id: "prod-4",
    name: "Titanium Carbon Core Frame Model-S",
    category: "Structural Frame",
    description: "Structural skeleton chassis segment utilizing woven carbon fiber core embedded in aerospace titanium. Unmatched strength-to-weight ratio.",
    image_url: MOCK_PART_IMAGES.chassis,
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    price_range: "$8,000 - $11,500",
    material: "Titanium Grade 5 and 3K Carbon Fiber",
    precision_tolerance: "± 0.1 mm",
    dimensions: "640mm x 320mm x 210mm",
    weight: "7.2 kg"
  }
];

const DEFAULT_QUERIES = [
  {
    id: "query-1",
    full_name: "Dr. Sarah Connor",
    company_name: "Apex Aerospace Inc",
    company_email: "sconnor@apex-aero.com",
    subject: "HydraGrip V3 Custom Tooling",
    purpose: "Consulting",
    technical_message: "We need custom jaw profiles designed for the HydraGrip V3 to grab delicate carbon-fiber fuselage panels. Do you offer consultation services to design custom grips?",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString() // 4 hours ago
  },
  {
    id: "query-2",
    full_name: "Miles Dyson",
    company_name: "Cyberdyne Systems Corp",
    company_email: "mdyson@cyberdyne.org",
    subject: "Bulk Purchase of ApexDrive Actuators",
    purpose: "Milling",
    technical_message: "We are developing a new articulated manipulator assembly and require 48 units of the ApexDrive 120Nm. Can we negotiate a bulk pricing discount and expedite shipping?",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString() // 1 day ago
  },
  {
    id: "query-3",
    full_name: "Dr. Alfred Lanning",
    company_name: "US Robots & Mechanical Men",
    company_email: "alanning@usrobots.net",
    subject: "Micro-Precision Tolerances on Sensor Arrays",
    purpose: "Tooling",
    technical_message: "Could you provide detailed spectral sensitivity charts for the LiDAR-6? We need to verify if the wavelength overlaps with nearby laser welding systems.",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString() // 2 days ago
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: "booking-1",
    visitor_name: "John Connor",
    target_date: "2026-07-25",
    time_slot: "10:00 AM - 11:30 AM",
    status: "Scheduled",
    created_at: new Date().toISOString()
  },
  {
    id: "booking-2",
    visitor_name: "Kate Brewster",
    target_date: "2026-07-28",
    time_slot: "02:00 PM - 03:30 PM",
    status: "Completed",
    created_at: new Date(Date.now() - 72 * 3600000).toISOString()
  }
];

const DEFAULT_PROFILE = {
  id: "profile-1",
  company_name: "V-Nova Industrial Corp",
  tagline: "Precision Engineered Robotic Components & B2B Solutions",
  support_email: "contracts@vnova.com",
  phone: "+1 (800) 555-ROBO",
  business_hours: "08:00 AM - 06:00 PM EST (Mon-Fri)",
  youtube_channel: "https://youtube.com/c/vnovaindustrial",
  address: "700 Cyberdyne Blvd, Suite 101, Silicon Valley, CA 94025"
};

// Initialize LocalStorage if not exists
const initializeLocalStorage = () => {
  if (!localStorage.getItem('vnova_products')) {
    localStorage.setItem('vnova_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem('vnova_queries')) {
    localStorage.setItem('vnova_queries', JSON.stringify(DEFAULT_QUERIES));
  }
  if (!localStorage.getItem('vnova_bookings')) {
    localStorage.setItem('vnova_bookings', JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem('vnova_profile')) {
    localStorage.setItem('vnova_profile', JSON.stringify(DEFAULT_PROFILE));
  }
};

// Execute initialization
if (typeof window !== 'undefined') {
  initializeLocalStorage();
}

// Database API implementation
export const db = {
  // SEED METHODS FOR SUPABASE
  async seedProducts() {
    try {
      const productsToSeed = DEFAULT_PRODUCTS.map(p => {
        const { id: _id, ...rest } = p;
        return rest;
      });
      const { error } = await supabase.from('products').insert(productsToSeed);
      if (error) throw error;
      console.log("Successfully seeded default products to Supabase");
    } catch (err) {
      console.error("Failed to seed products in Supabase:", err);
    }
  },

  async seedQueries() {
    try {
      const queriesToSeed = DEFAULT_QUERIES.map(q => {
        const { id: _id, ...rest } = q;
        return rest;
      });
      const { error } = await supabase.from('client_queries').insert(queriesToSeed);
      if (error) throw error;
      console.log("Successfully seeded default client queries to Supabase");
    } catch (err) {
      console.error("Failed to seed client queries in Supabase:", err);
    }
  },

  async seedBookings() {
    try {
      const bookingsToSeed = DEFAULT_BOOKINGS.map(b => {
        const { id: _id, ...rest } = b;
        return rest;
      });
      const { error } = await supabase.from('consultation_bookings').insert(bookingsToSeed);
      if (error) throw error;
      console.log("Successfully seeded default consultation bookings to Supabase");
    } catch (err) {
      console.error("Failed to seed bookings in Supabase:", err);
    }
  },

  async seedProfile() {
    try {
      const { id: _id, ...profileToSeed } = DEFAULT_PROFILE;
      const { error } = await supabase.from('company_profile').insert(profileToSeed);
      if (error) throw error;
      console.log("Successfully seeded default company profile to Supabase");
    } catch (err) {
      console.error("Failed to seed company profile in Supabase:", err);
    }
  },

  // PRODUCTS METHODS
  async getProducts() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error) {
        if (data.length === 0) {
          await this.seedProducts();
          const { data: refetched, error: refetchErr } = await supabase.from('products').select('*').order('created_at', { ascending: false });
          if (!refetchErr) return refetched;
        }
        return data;
      }
      console.error("Supabase getProducts error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('vnova_products') || '[]');
  },

  async addProduct(product) {
    if (isSupabaseConfigured) {
      const { id: _id, ...productData } = product;
      const newProduct = {
        ...productData,
        image_url: product.image_url || getCategoryImage(product.category),
        created_at: new Date().toISOString()
      };
      const { data, error } = await supabase.from('products').insert([newProduct]).select();
      if (!error) return data[0];
      console.error("Supabase addProduct error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const newProduct = {
      id: "prod-" + Date.now(),
      ...product,
      image_url: product.image_url || getCategoryImage(product.category),
      created_at: new Date().toISOString()
    };
    const products = JSON.parse(localStorage.getItem('vnova_products') || '[]');
    products.unshift(newProduct);
    localStorage.setItem('vnova_products', JSON.stringify(products));
    return newProduct;
  },

  async updateProduct(id, updatedFields) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('products').update(updatedFields).eq('id', id).select();
      if (!error) return data[0];
      console.error("Supabase updateProduct error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const products = JSON.parse(localStorage.getItem('vnova_products') || '[]');
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      localStorage.setItem('vnova_products', JSON.stringify(products));
      return products[index];
    }
    return null;
  },

  async deleteProduct(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
      console.error("Supabase deleteProduct error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const products = JSON.parse(localStorage.getItem('vnova_products') || '[]');
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('vnova_products', JSON.stringify(filtered));
    return true;
  },

  // CLIENT QUERIES METHODS
  async getQueries() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('client_queries').select('*').order('created_at', { ascending: false });
      if (!error) {
        if (data.length === 0) {
          await this.seedQueries();
          const { data: refetched, error: refetchErr } = await supabase.from('client_queries').select('*').order('created_at', { ascending: false });
          if (!refetchErr) return refetched;
        }
        return data;
      }
      console.error("Supabase getQueries error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('vnova_queries') || '[]');
  },

  async addQuery(query) {
    if (isSupabaseConfigured) {
      const { id: _id, ...queryData } = query;
      const newQuery = {
        ...queryData,
        created_at: new Date().toISOString()
      };
      const { data, error } = await supabase.from('client_queries').insert([newQuery]).select();
      if (!error) return data[0];
      console.error("Supabase addQuery error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const newQuery = {
      id: "query-" + Date.now(),
      ...query,
      created_at: new Date().toISOString()
    };
    const queries = JSON.parse(localStorage.getItem('vnova_queries') || '[]');
    queries.unshift(newQuery);
    localStorage.setItem('vnova_queries', JSON.stringify(queries));
    return newQuery;
  },

  // BOOKINGS METHODS
  async getBookings() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('consultation_bookings').select('*').order('target_date', { ascending: true });
      if (!error) {
        if (data.length === 0) {
          await this.seedBookings();
          const { data: refetched, error: refetchErr } = await supabase.from('consultation_bookings').select('*').order('target_date', { ascending: true });
          if (!refetchErr) return refetched;
        }
        return data;
      }
      console.error("Supabase getBookings error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('vnova_bookings') || '[]');
  },

  async addBooking(booking) {
    if (isSupabaseConfigured) {
      const { id: _id, ...bookingData } = booking;
      const newBooking = {
        ...bookingData,
        status: "Scheduled",
        created_at: new Date().toISOString()
      };
      const { data, error } = await supabase.from('consultation_bookings').insert([newBooking]).select();
      if (!error) return data[0];
      console.error("Supabase addBooking error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const newBooking = {
      id: "booking-" + Date.now(),
      ...booking,
      status: "Scheduled",
      created_at: new Date().toISOString()
    };
    const bookings = JSON.parse(localStorage.getItem('vnova_bookings') || '[]');
    bookings.unshift(newBooking);
    localStorage.setItem('vnova_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  async updateBookingStatus(id, status) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('consultation_bookings').update({ status }).eq('id', id).select();
      if (!error) return data[0];
      console.error("Supabase updateBookingStatus error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    const bookings = JSON.parse(localStorage.getItem('vnova_bookings') || '[]');
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem('vnova_bookings', JSON.stringify(bookings));
      return bookings[index];
    }
    return null;
  },

  // COMPANY PROFILE
  async getProfile() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('company_profile').select('*');
      if (!error) {
        if (data.length === 0) {
          await this.seedProfile();
          const { data: refetched, error: refetchErr } = await supabase.from('company_profile').select('*');
          if (!refetchErr && refetched.length > 0) return refetched[0];
        } else if (data.length > 0) {
          return data[0];
        }
      }
      console.error("Supabase getProfile error, falling back to LocalStorage:", error);
    }
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('vnova_profile') || '{}');
  },

  // PRODUCT IMAGES METHODS
  async getProductImages(productId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });
      if (!error) return data || [];
      console.error("Supabase getProductImages error:", error);
    }
    return [];
  },

  async uploadProductImage(productId, file) {
    if (!isSupabaseConfigured) {
      console.error("Supabase not configured, cannot upload images");
      throw new Error("Supabase not configured");
    }
    // Generate unique filename
    const ext = file.name.split('.').pop();
    const fileName = `${productId}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Step 1: Upload to Supabase Storage bucket "image"
    console.log("Uploading to storage:", fileName);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('image')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }
    console.log("Storage upload success:", uploadData.path);

    // Step 2: Get public URL
    const { data: urlData } = supabase.storage
      .from('image')
      .getPublicUrl(uploadData.path);

    const publicUrl = urlData.publicUrl;
    console.log("Public URL:", publicUrl);

    // Step 3: Get current max display_order
    const { data: existing } = await supabase
      .from('product_images')
      .select('display_order')
      .eq('product_id', productId)
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = (existing && existing.length > 0) ? existing[0].display_order + 1 : 0;

    // Step 4: Insert record into product_images table
    const { data: imgRow, error: insertError } = await supabase
      .from('product_images')
      .insert([{
        product_id: productId,
        image_url: publicUrl,
        display_order: nextOrder
      }])
      .select();

    if (insertError) {
      console.error("DB insert failed:", insertError);
      throw new Error(`DB insert failed: ${insertError.message}`);
    }

    // If this is the first image, set it as the product's main image_url
    if (nextOrder === 0) {
      await supabase.from('products').update({ image_url: publicUrl }).eq('id', productId);
    }

    console.log("Image uploaded successfully:", imgRow[0]);
    return imgRow[0];
  },

  async deleteProductImage(imageId, imageUrl) {
    if (!isSupabaseConfigured) return false;
    try {
      // Extract the storage path from the URL
      const urlObj = new URL(imageUrl);
      const pathParts = urlObj.pathname.split('/storage/v1/object/public/image/');
      const storagePath = pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : null;

      // Delete from storage
      if (storagePath) {
        const { error: storageErr } = await supabase.storage.from('image').remove([storagePath]);
        if (storageErr) console.warn("Storage delete warning:", storageErr);
      }

      // Delete from database
      const { error: dbErr } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (dbErr) throw dbErr;
      return true;
    } catch (err) {
      console.error("Failed to delete product image:", err);
      return false;
    }
  },

  async reorderProductImages(imageId, newOrder) {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('product_images')
      .update({ display_order: newOrder })
      .eq('id', imageId)
      .select();
    if (error) {
      console.error("Failed to reorder image:", error);
      return null;
    }
    return data[0];
  }
};
