import productModel from "../models/productModel.js";
import connectDB from "../config/mongodb.js";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mapping = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'imageMapping.json'), 'utf-8'));

const getUrl = (name) => mapping[name] || name;

const products = [
    {
        name: "CeraVe Hydrating Facial Cleanser",
        description: "Gently cleanse and hydrate your skin with CeraVe Hydrating Facial Cleanser – formulated with ceramides and hyaluronic acid to restore the skin’s natural barrier without stripping moisture. Ideal for normal to dry skin.",
        price: 14,
        image: [getUrl("p_img1.jpg"), getUrl("p_img1_1.jpg"), getUrl("p_img1_2.jpg"), getUrl("p_img1_3.jpg")],
        category: "Acne-Prone Skin",
        subCategory: "Cleanser",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716634345448,
        bestseller: true
    },
    {
        name: "Eva Naturals Vitamin C Face Serum",
        description: "Revitalize your skin with Eva Naturals Vitamin C Serum – a potent blend of Vitamin C, Retinol, and Hyaluronic Acid that brightens, firms, and deeply hydrates your skin while reducing signs of aging and blemishes.",
        price: 24,
        image: [getUrl("p_img2_1.jpg"), getUrl("p_img2_2.jpeg"), getUrl("p_img2_3.jpg"), getUrl("p_img2_4.jpeg")],
        category: "Acne-Prone Skin",
        subCategory: "Serum",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716621345448,
        bestseller: true
    },
    {
        name: "Anua Peach 70 Niacinamide Serum 30ml",
        description: "A daily clean beauty face serum enriched with 70% peach fruit extract and 5% niacinamide to brighten, hydrate, and even skin tone. Ideal for dull, tired skin and suitable for all skin types.",
        price: 22,
        image: [getUrl("p_img3.jpg")],
        category: "All Skin Types",
        subCategory: "Skincare",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716625345448,
        bestseller: true
    },
    {
        name: "Rhode Peptide Lip Tint",
        description: "A nourishing lip treatment with a hint of tint, infused with peptides and cupuaçu butter to visibly plump, hydrate, and smooth lips.",
        price: 20,
        image: [getUrl("p_img4.webp")],
        category: "Normal Skin",
        subCategory: "LipCare",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716641345448,
        bestseller: true
    },
    {
        name: "Cetaphil Gentle Skin Cleanser",
        description: "A mild, non-irritating cleanser that soothes skin as it cleans. Ideal for dry, sensitive skin, and suitable for all skin types.",
        price: 17.58,
        image: [getUrl("p_img5.jpg")],
        category: "Dry Skin",
        subCategory: "Cleanser",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716622345449,
        bestseller: true
    },
    {
        name: "Dot & Key Vitamin C Moisturizer",
        description: "A lightweight, hydrating moisturizer enriched with Vitamin C that brightens skin, evens skin tone, and provides lasting hydration for all skin types.",
        price: 3.39,
        image: [getUrl("p_img6.jpg")],
        category: "Oily Skin",
        subCategory: "Moisturizer",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623499999,
        bestseller: true
    },
    {
        name: "CLAYCO Detan Rice Pack with AHA & BHA",
        description: "A gentle exfoliating face pack with AHA & BHA that helps remove tan, unclog pores, and brighten skin. Infused with rice extracts for natural glow.",
        price: 10.47,
        image: [getUrl("p_img7.jpg")],
        category: "Oily Skin",
        subCategory: "Face Pack",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623555555,
        bestseller: true
    },
    {
        name: "CeraVe Blemish Control Cleanser",
        description: "A gentle yet effective cleanser with salicylic acid that helps clear blemishes, unclog pores, and maintain the skin’s natural barrier.",
        price: 13.87,
        image: [getUrl("p_img8.jpg")],
        category: "Oily Skin",
        subCategory: "Cleanser",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623612345,
        bestseller: true
    },
    {
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        description: "Lightweight essence enriched with 96% snail mucin to hydrate, repair skin, improve elasticity, and enhance skin barrier.",
        price: 10.47,
        image: [getUrl("p_img9.jpg")],
        category: "All Skin Types",
        subCategory: "Essence",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623699999,
        bestseller: true
    },
    {
        name: "Dot & Key Vitamin C + E Sunscreen SPF 50",
        description: "A lightweight, non-greasy sunscreen enriched with Vitamin C, E, and UV filters that protect against UVA/UVB rays.",
        price: 3.38,
        image: [getUrl("p_img10.jpg")],
        category: "All Skin Types",
        subCategory: "Sunscreen",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623755555,
        bestseller: true
    },
    {
        name: "Neutrogena Hydro Boost Hyaluronic Acid Face Moisturizer",
        description: "Lightweight, oil-free moisturizer with hyaluronic acid to hydrate and plump dry skin. Ideal for dry to very dry skin types.",
        price: 8.72,
        image: [getUrl("p_img11.jpg")],
        category: "Dry Skin",
        subCategory: "Moisturizer",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716623345448,
        bestseller: true
    },
    {
        name: "Minimalist 5% Niacinamide Face Serum",
        description: "A gentle serum with 5% Niacinamide, Bifida Ferment, and Oat Extract to soothe, repair, and strengthen skin barrier.",
        price: 6.28,
        image: [getUrl("p_img12.avif")],
        category: "Sensitive Skin",
        subCategory: "Serum",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716624470000,
        bestseller: true
    },
    {
        name: "Blueberry Hydrate Barrier Repair Rice Water Toner",
        description: "A hydrating and barrier-repairing toner enriched with blueberry extract and rice water to deeply moisturize dry skin.",
        price: 3.68,
        image: [getUrl("p_img13.webp")],
        category: "Dry Skin",
        subCategory: "Toner",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716624560000,
        bestseller: true
    },
    {
        name: "Kesar & Kojic Acid Sunscreen - 125g",
        description: "A lightweight sunscreen enriched with Kesar and Kojic Acid that provides broad spectrum protection.",
        price: 9.77,
        image: [getUrl("p_img14.webp")],
        category: "Normal Skin",
        subCategory: "Sunscreen",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716624655000,
        bestseller: false
    },
    {
        name: "Earth Rhythm Aqua Surge Clear Sunstick",
        description: "A transparent sunstick with broad-spectrum SPF protection, designed for easy reapplication.",
        price: 5.75,
        image: [getUrl("p_img15.jpg")],
        category: "Oily Skin",
        subCategory: "Sunscreen",
        sizes: ["30ml", "50ml", "100ml"],
        date: 1716624720000,
        bestseller: true
    },
    {
      name: "Cetaphil Bright Healthy Radiance Refresh Toner Cream",
      description: "A brightening toner cream that helps even skin tone, hydrate, and restore skin radiance. Gentle formula suitable for sensitive skin.",
      price: 10.96,  
      image: [getUrl("p_img16.webp")],  
      category: "Sensitive Skin",
      subCategory: "Toner",
      sizes: ["30ml", "50ml", "100ml"],
      date: 1716628845448,
      bestseller: false
    },
    {
      name: "LANEIGE Lip Glowy Balm Berry",
      description: "A lightweight, moisturizing lip balm that provides a glossy finish and hydration. Infused with berry extracts.",
      price: 8.78, 
      image: [getUrl("p_img17.jpg")], 
      category: "All Skin Types",
      subCategory: "LipCare",
      sizes: ["30ml", "50ml", "100ml"],
      date: 1716629999999,
      bestseller: true
    },
    {
      name: "Forest Essentials Eladi Day Cream",
      description: "An Ayurvedic formulation enriched with Eladi, Niacinamide, and SPF 30 PA++ that nourishes and protects acne-prone skin.",
      price: 32.55,
      image: [getUrl("p_img18.avif")],
      category: "Acne-Prone Skin",
      subCategory: "Moisturizer",
      sizes: ["30ml", "50ml", "100ml"],   
      date: 1716630599999,
      bestseller: true
    },
    {
        name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel",
        description: "A lightweight, fragrance-free sunscreen with 1% Hyaluronic Acid that hydrates while protecting against UVA/UVB rays.",
        price: 49.99,
        image: [getUrl("p_img19.avif")], 
        category: "Acne-Prone Skin",
        subCategory: "Sunscreen",
        sizes: ["30ml", "50ml", "80ml"],
        date: 1716632145448,
        bestseller: false
    },
    {
        name: "Plum 3% Niacinamide Toner With Rice Water",
        description: "A gentle, alcohol-free toner with 3% Niacinamide and Rice Water that helps minimize pores and balance excess oil.",
        price: 4.34,
        image: [getUrl("p_img20.webp")],
        category: "Acne-Prone Skin",
        subCategory: "Toner",
        sizes: ["100ml", "150ml", "200ml"],
        date: 1716633245448,
        bestseller: false
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await productModel.deleteMany({});
        await productModel.insertMany(products);
        console.log("Database Seeded with " + products.length + " products using Cloudinary URLs");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedDB();
