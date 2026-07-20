import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env files if they exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadEnv() {
  const envPaths = [
    path.join(rootDir, '.env'),
    path.join(rootDir, '.env.local'),
    path.join(rootDir, '.env.development')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const firstEqual = trimmed.indexOf('=');
          if (firstEqual !== -1) {
            const key = trimmed.slice(0, firstEqual).trim();
            const value = trimmed.slice(firstEqual + 1).trim().replace(/^["']|["']$/g, '');
            process.env[key] = value;
          }
        }
      });
    }
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in your environment or a .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default Seed Data
const MOCK_PART_IMAGES = {
  gripper: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2306b6d4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7M5 8h14M8 5v14'/></svg>",
  actuator: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='4' width='16' height='16' rx='2' ry='2'/><path d='M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3'/></svg>",
  sensor: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'/></svg>",
  chassis: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ec4899' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/></svg>"
};

const DEFAULT_PRODUCTS = [
  {
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
    full_name: "Dr. Sarah Connor",
    company_name: "Apex Aerospace Inc",
    company_email: "sconnor@apex-aero.com",
    subject: "HydraGrip V3 Custom Tooling",
    purpose: "Consulting",
    technical_message: "We need custom jaw profiles designed for the HydraGrip V3 to grab delicate carbon-fiber fuselage panels. Do you offer consultation services to design custom grips?",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString()
  },
  {
    full_name: "Miles Dyson",
    company_name: "Cyberdyne Systems Corp",
    company_email: "mdyson@cyberdyne.org",
    subject: "Bulk Purchase of ApexDrive Actuators",
    purpose: "Milling",
    technical_message: "We are developing a new articulated manipulator assembly and require 48 units of the ApexDrive 120Nm. Can we negotiate a bulk pricing discount and expedite shipping?",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString()
  },
  {
    full_name: "Dr. Alfred Lanning",
    company_name: "US Robots & Mechanical Men",
    company_email: "alanning@usrobots.net",
    subject: "Micro-Precision Tolerances on Sensor Arrays",
    purpose: "Tooling",
    technical_message: "Could you provide detailed spectral sensitivity charts for the LiDAR-6? We need to verify if the wavelength overlaps with nearby laser welding systems.",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString()
  }
];

const DEFAULT_BOOKINGS = [
  {
    visitor_name: "John Connor",
    target_date: new Date(Date.now() + 5 * 24 * 3600000).toISOString().split('T')[0],
    time_slot: "10:00 AM - 11:30 AM",
    status: "Scheduled"
  },
  {
    visitor_name: "Kate Brewster",
    target_date: new Date(Date.now() - 3 * 24 * 3600000).toISOString().split('T')[0],
    time_slot: "02:00 PM - 03:30 PM",
    status: "Completed"
  }
];

const DEFAULT_PROFILE = {
  company_name: "V-Nova Industrial Corp",
  tagline: "Precision Engineered Robotic Components & B2B Solutions",
  support_email: "contracts@vnova.com",
  phone: "+1 (800) 555-ROBO",
  business_hours: "08:00 AM - 06:00 PM EST (Mon-Fri)",
  youtube_channel: "https://youtube.com/c/vnovaindustrial",
  address: "700 Cyberdyne Blvd, Suite 101, Silicon Valley, CA 94025"
};

async function seed() {
  console.log('Starting Supabase database seeding...');

  try {
    // 1. Seed Company Profile
    console.log('Seeding company profile...');
    const { data: existingProfiles, error: profileCheckErr } = await supabase.from('company_profile').select('id');
    if (profileCheckErr) throw profileCheckErr;

    if (existingProfiles.length === 0) {
      const { error: profileErr } = await supabase.from('company_profile').insert(DEFAULT_PROFILE);
      if (profileErr) throw profileErr;
      console.log('✓ Company profile seeded successfully.');
    } else {
      console.log('- Company profile table already has data. Skipping.');
    }

    // 2. Seed Products
    console.log('Seeding products...');
    const { data: existingProducts, error: productCheckErr } = await supabase.from('products').select('id');
    if (productCheckErr) throw productCheckErr;

    if (existingProducts.length === 0) {
      const { error: productErr } = await supabase.from('products').insert(DEFAULT_PRODUCTS);
      if (productErr) throw productErr;
      console.log('✓ Products seeded successfully.');
    } else {
      console.log('- Products table already has data. Skipping.');
    }

    // 3. Seed Client Queries
    console.log('Seeding client queries...');
    const { data: existingQueries, error: queryCheckErr } = await supabase.from('client_queries').select('id');
    if (queryCheckErr) throw queryCheckErr;

    if (existingQueries.length === 0) {
      const { error: queryErr } = await supabase.from('client_queries').insert(DEFAULT_QUERIES);
      if (queryErr) throw queryErr;
      console.log('✓ Client queries seeded successfully.');
    } else {
      console.log('- Client queries table already has data. Skipping.');
    }

    // 4. Seed Bookings
    console.log('Seeding consultation bookings...');
    const { data: existingBookings, error: bookingCheckErr } = await supabase.from('consultation_bookings').select('id');
    if (bookingCheckErr) throw bookingCheckErr;

    if (existingBookings.length === 0) {
      const { error: bookingErr } = await supabase.from('consultation_bookings').insert(DEFAULT_BOOKINGS);
      if (bookingErr) throw bookingErr;
      console.log('✓ Consultation bookings seeded successfully.');
    } else {
      console.log('- Consultation bookings table already has data. Skipping.');
    }

    console.log('\nSeeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error.message || error);
    process.exit(1);
  }
}

seed();
