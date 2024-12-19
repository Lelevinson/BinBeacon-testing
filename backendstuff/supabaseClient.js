//initializing supa client
import dotenv from 'dotenv';
dotenv.config({ path: './backendstuff/.env' });


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('working111');

export default supabase

