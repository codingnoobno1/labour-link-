const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Basic .env parser
const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?(.+?)["']?(\s|$)/);

if (!dbUrlMatch) {
    console.error('Could not find DATABASE_URL in .env');
    process.exit(1);
}

const connectionString = dbUrlMatch[1];

async function run() {
    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        const sql = `
            DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

            CREATE POLICY "Users can update own profile."
            ON public.profiles
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = id)
            WITH CHECK (auth.uid() = id);
        `;

        await client.query(sql);
        console.log('Successfully dropped and re-created policy.');
    } catch (err) {
        console.error('Error executing SQL:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
