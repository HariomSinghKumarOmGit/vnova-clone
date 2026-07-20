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

  let foundEnv = false;
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      foundEnv = true;
      console.log(`Loading environment from: ${path.basename(envPath)}`);
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
  if (!foundEnv) {
    console.log('⚠️ No local .env file found in the project root directory!');
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('\n--- Environment Variables Check ---');
console.log(`VITE_SUPABASE_URL: ${supabaseUrl ? 'Loaded (starts with ' + supabaseUrl.substring(0, 15) + '...)' : '❌ MISSING'}`);
console.log(`VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Loaded (starts with ' + supabaseAnonKey.substring(0, 15) + '...)' : '❌ MISSING'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Error: Cannot run test. Please create a .env file in the project root with your Supabase keys.');
  console.error('See .env.example for reference.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  console.log('\n--- Supabase Integration Test ---');
  
  const testProduct = {
    name: "V-Nova Integration Test Robot Part",
    category: "Sensors",
    description: "Temporary testing component created by connection diagnostic script.",
    price_range: "$99 - $199",
    material: "Silicon / Polyimide",
    precision_tolerance: "± 0.1 mm",
    dimensions: "10mm x 10mm x 5mm",
    weight: "0.01 kg",
    created_at: new Date().toISOString()
  };

  try {
    // 1. Test Select/Query
    console.log('1. Attempting to read from "products" table...');
    const { data: selectData, error: selectError } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (selectError) {
      console.error('❌ Failed to read from "products" table.');
      console.error('Error Details:', selectError);
      return;
    }
    console.log(`✓ Read successful. Found ${selectData.length} existing products.`);

    // 2. Test Insert
    console.log('2. Attempting to insert a test product...');
    const { data: insertData, error: insertError } = await supabase
      .from('products')
      .insert([testProduct])
      .select();

    if (insertError) {
      console.error('❌ Failed to insert test product.');
      console.error('Error Details:', insertError);
      return;
    }

    const insertedProduct = insertData[0];
    console.log('✓ Insert successful! Inserted product details:');
    console.log(`  - ID: ${insertedProduct.id}`);
    console.log(`  - Name: ${insertedProduct.name}`);
    console.log(`  - Category: ${insertedProduct.category}`);

    // 3. Test Delete (cleanup)
    console.log('3. Cleaning up test product from database...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', insertedProduct.id);

    if (deleteError) {
      console.error('❌ Failed to delete test product during cleanup.');
      console.error('Error Details:', deleteError);
      return;
    }
    console.log('✓ Cleanup successful.');
    console.log('\n🎉 ALL TESTS PASSED! Your Supabase database is connected and fully working.');

  } catch (err) {
    console.error('❌ Unexpected script error:', err);
  }
}

runTest();
