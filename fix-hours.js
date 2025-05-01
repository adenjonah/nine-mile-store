const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'f0k2uz7k',
  dataset: 'production-new',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || ''
});

async function fetchStoreHours() {
  try {
    const data = await client.fetch(`*[_type == "storeHours"][0]`);
    console.log('Current store hours data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching store hours:', error);
    return null;
  }
}

async function updateStoreHours() {
  try {
    // First check if we have a token
    if (!process.env.SANITY_API_TOKEN) {
      console.error('No SANITY_API_TOKEN provided. Please set the environment variable.');
      console.log('Run: SANITY_API_TOKEN=your_token node fix-hours.js');
      return;
    }

    // Get current data
    const currentData = await fetchStoreHours();
    if (!currentData) {
      console.error('Could not fetch current data');
      return;
    }

    // Update document
    console.log('Updating document with ID:', currentData._id);
    const result = await client
      .patch(currentData._id)
      .set({
        monday: '7:00 AM - 6:00 PM',
        tuesday: '7:00 AM - 6:00 PM'
      })
      .commit();
    
    console.log('Update successful:', result);
    
    // Verify the update
    const updatedData = await fetchStoreHours();
    console.log('New store hours data:', updatedData);
  } catch (error) {
    console.error('Error updating store hours:', error);
  }
}

updateStoreHours(); 