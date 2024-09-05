const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    DROP TABLE IF EXISTS brands, categories, items;

    CREATE TABLE IF NOT EXISTS brands (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        brand_name VARCHAR(100) NOT NULL
        );

    INSERT INTO brands (brand_name) 
        VALUES 
            ('Zildjian'),
            ('Pearl'),
            ('Evans'),
            ('Vater');

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_name VARCHAR(100) NOT NULL,
        category_description TEXT NOT NULL
        );

    INSERT INTO categories (category_name, category_description) 
        VALUES
            ('Cymbals', 'Hihats, crash cymbals, ride cymbals, China cymbals, stacks, and beyond.'),
            ('Drum Sets', 'Complete shell packs consisting of a snare drum, bass drum, one or two rack toms, and at least one floor tom.'),
            ('Heads', 'Snare heads, bass drum heads, and tomtom heads. Clear and coated, batters and resos.'),
            ('Sticks', 'A range of sizes and styles. Sticks, brushes, hot rods, and mallets.');

    CREATE TABLE IF NOT EXISTS items (
        item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item_name VARCHAR(100) NOT NULL,
        brand_id INTEGER NOT NULL REFERENCES brands (id),
        item_description TEXT NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories (id),
        price NUMERIC(7, 2) NOT NULL,
        num_in_stock INTEGER NOT NULL,
        img_url TEXT NOT NULL
        );

    INSERT INTO items (item_name, brand_id, item_description, category_id, price, num_in_stock, img_url) 
        VALUES
            ('Crash of Doom', '1', '20" of buttery washy deliciousness.', '1', '279.99', '3', 'https://cdn.shoplightspeed.com/shops/609677/files/37984513/image.jpg'),
            ('Decade 5-piece Shell Pack', '2', 'Shell pack consisting of 14" snare drum, 10" and 12" rack toms, 16" floor tom, and 22" bass drum.', '2', '1099.99', '2', 'https://media.guitarcenter.com/is/image/MMGS7/J32706000007000-00-600x600.jpg'),
            ('HD Dry Snare Batter', '3', '14" 2-ply coated head with tiny vents going around the perimeter.', '3', '22.99', '10', 'https://drumheadauthority.com/wp-content/uploads/2017/02/evans-HD-dry-500x500.jpg'),
            ('Fusion Drum Sticks', '4', '16" long, 0.58" diameter, barrel tips.', '4', '12.49', '7', 'https://cdn.shoplightspeed.com/shops/610241/files/18614527/image.jpg')
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main().catch(err => {
    console.error('Error: ', err);
});