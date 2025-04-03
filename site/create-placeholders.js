const fs = require('fs');
const path = require('path');

// Placeholder images to create
const images = [
  // Hero image with transparent background
  { path: 'public/images/hero-transparent.png', width: 1200, height: 500, text: '', transparent: true },
  
  // Regular hero image
  { path: 'public/images/hero-hardware.png', width: 1200, height: 500, text: 'Hero Image' },
  
  // Store interior images
  { path: 'public/images/store-interior-1.png', width: 300, height: 200, text: 'Store Interior 1' },
  { path: 'public/images/store-interior-2.png', width: 300, height: 200, text: 'Store Interior 2' },
  { path: 'public/images/store-interior-3.png', width: 300, height: 200, text: 'Store Interior 3' },
  { path: 'public/images/store-interior-4.png', width: 300, height: 200, text: 'Store Interior 4' },
  
  // Product images
  { path: 'public/images/products/potting-mix.png', width: 400, height: 300, text: 'Potting Mix' },
  { path: 'public/images/products/charcoal-grill.png', width: 400, height: 300, text: 'Charcoal Grill' },
  { path: 'public/images/products/bird-seed.png', width: 400, height: 300, text: 'Bird Seed' },
  { path: 'public/images/products/garden-tools.png', width: 400, height: 300, text: 'Garden Tools' },
  
  // Service images
  { path: 'public/images/services/key-cutting.png', width: 400, height: 300, text: 'Key Cutting' },
  { path: 'public/images/services/glass-cutting.png', width: 400, height: 300, text: 'Glass Cutting' },
  { path: 'public/images/services/paint-mixing.png', width: 400, height: 300, text: 'Paint Mixing' },
  { path: 'public/images/services/tool-rental.png', width: 400, height: 300, text: 'Tool Rental' },
  { path: 'public/images/services/landscaping.png', width: 400, height: 300, text: 'Landscaping' },
  
  // Staff images
  { path: 'public/images/staff/store-staff.png', width: 400, height: 300, text: 'Store Staff' },
  
  // Community images
  { path: 'public/images/community/community-event-1.png', width: 300, height: 200, text: 'Community Event 1' },
  { path: 'public/images/community/community-event-2.png', width: 300, height: 200, text: 'Community Event 2' },
];

// Create SVG placeholder for each image
images.forEach(img => {
  const dirPath = path.dirname(img.path);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Create SVG placeholder
  const svg = img.transparent 
    ? `
<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent"/>
</svg>
    `.trim()
    : `
<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <rect width="100%" height="100%" fill="#e0e0e0" opacity="0.5"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle" dominant-baseline="middle">${img.text}</text>
</svg>
    `.trim();
  
  // Convert to buffer
  const buffer = Buffer.from(svg);
  
  // Write file
  fs.writeFileSync(img.path, buffer);
  console.log(`Created placeholder: ${img.path}`);
});

console.log('All placeholder images created successfully!'); 