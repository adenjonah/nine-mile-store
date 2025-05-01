'use client';

import React from 'react';

/**
 * Component that displays guidance for adding content in the CMS
 * 
 * @param {Object} props
 * @param {string} props.contentType - The type of content that's missing (e.g., "Hero Image", "Blurb Photo")
 * @param {string} props.schemaType - The schema type in Sanity (e.g., "siteImage")
 * @param {string} props.category - The category value if applicable (e.g., "hero", "blurbPhoto")
 * @param {string} props.className - Additional classes to apply to the container
 */
export default function EmptyContentGuide({ 
  contentType, 
  schemaType, 
  category = null,
  className = "" 
}) {
  return (
    <div className={`bg-gray-100 border border-gray-300 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 mb-2">Missing {contentType}</h3>
      <p className="text-gray-600 text-sm mb-3">
        Here&apos;s how to add this content in the CMS:
      </p>
      <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-2">
        <li>
          Go to <a 
            href="https://nine-mile-store.sanity.studio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Sanity Studio
          </a>
        </li>
        <li>
          {schemaType === 'siteImage' && category ? (
            <>Navigate to <strong>Site Images</strong> → <strong>{getCategoryDisplayName(category)}</strong></>
          ) : (
            <>Navigate to <strong>{getSchemaDisplayName(schemaType)}</strong></>
          )}
        </li>
        <li>Click <strong>Create new document</strong></li>
        {category && (
          <li>
            Set <strong>Category</strong> to <strong>&quot;{getCategoryDisplayName(category)}&quot;</strong>
          </li>
        )}
        <li>Fill in the required fields and publish</li>
      </ol>
    </div>
  );
}

// Helper function to convert schema types to display names
function getSchemaDisplayName(schemaType) {
  const displayNames = {
    'siteImage': 'Site Images',
    'storeInfo': 'Store Information',
    'storeHours': 'Store Hours',
    'product': 'Products',
    'service': 'Services',
    'socialLink': 'Social Links'
  };
  
  return displayNames[schemaType] || schemaType;
}

// Helper function to convert category values to display names
function getCategoryDisplayName(category) {
  const displayNames = {
    'hero': 'Hero Image',
    'logo': 'Logo',
    'interior': 'Interior',
    'staff': 'Staff Images',
    'community': 'Community Images',
    'other': 'Other Images'
  };
  
  return displayNames[category] || category;
} 