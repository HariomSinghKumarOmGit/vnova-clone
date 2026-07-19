-- Database Schema for B2B Industrial Manufacturing Portal

-- 1. Products Table (Robot Parts Catalog)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    youtube_url TEXT,
    price_range VARCHAR(100),
    material VARCHAR(100),
    precision_tolerance VARCHAR(100),
    dimensions VARCHAR(100),
    weight VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON products 
    FOR SELECT USING (true);

-- Allow all actions for admin users (simplified policy, could be adapted based on auth roles)
CREATE POLICY "Allow admin all access" ON products 
    USING (true) WITH CHECK (true);


-- 2. Client Queries Table
CREATE TABLE client_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    company_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    purpose VARCHAR(100) NOT NULL,
    technical_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE client_queries ENABLE ROW LEVEL SECURITY;

-- Allow public to insert queries
CREATE POLICY "Allow public inserts" ON client_queries 
    FOR INSERT WITH CHECK (true);

-- Allow admin to read and manage queries
CREATE POLICY "Allow admin manage queries" ON client_queries 
    USING (true) WITH CHECK (true);


-- 3. Consultation Bookings Table
CREATE TABLE consultation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_name VARCHAR(255) NOT NULL,
    target_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings
CREATE POLICY "Allow public insert bookings" ON consultation_bookings 
    FOR INSERT WITH CHECK (true);

-- Allow admin to manage bookings
CREATE POLICY "Allow admin manage bookings" ON consultation_bookings 
    USING (true) WITH CHECK (true);


-- 4. Company Profile Table
CREATE TABLE company_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    support_email VARCHAR(255),
    phone VARCHAR(50),
    business_hours VARCHAR(100),
    youtube_channel TEXT,
    address TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read profile" ON company_profile 
    FOR SELECT USING (true);

-- Allow admin write
CREATE POLICY "Allow admin update profile" ON company_profile 
    USING (true) WITH CHECK (true);
