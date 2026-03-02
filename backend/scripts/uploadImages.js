import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const assetsDir = '/Users/mdshoaib/shoaibcommerce/frontend/src/assets';
const outputMappingPath = path.resolve(__dirname, 'imageMapping.json');

const uploadImages = async () => {
    try {
        if (!process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_SECRET_KEY === '**********') {
            console.error('ERROR: Please update CLOUDINARY_SECRET_KEY in your .env file first!');
            process.exit(1);
        }

        const files = fs.readdirSync(assetsDir);
        const productImages = files.filter(file => 
            file.startsWith('p_img') && 
            (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.avif') || file.endsWith('.jpeg'))
        );

        console.log(`Found ${productImages.length} images to upload...`);

        const mapping = {};

        for (const file of productImages) {
            const filePath = path.join(assetsDir, file);
            console.log(`Uploading ${file}...`);
            
            try {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'shoaib_commerce',
                    use_filename: true,
                    unique_filename: false
                });
                mapping[file] = result.secure_url;
                console.log(`Successfully uploaded ${file} -> ${result.secure_url}`);
            } catch (err) {
                console.error(`Failed to upload ${file}:`, err.message);
            }
        }

        fs.writeFileSync(outputMappingPath, JSON.stringify(mapping, null, 2));
        console.log('\n--- UPLOAD COMPLETE ---');
        console.log(`Mapping saved to: ${outputMappingPath}`);
        console.log('You can now use these URLs in your seedProducts.js script.');

    } catch (error) {
        console.error('Error during upload process:', error);
    }
};

uploadImages();
