export default {
  name: 'product',
  type: 'document',
  title: 'Products',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'regularPrice',
      type: 'string',
      title: 'Regular Price'
    },
    {
      name: 'salePrice',
      type: 'string',
      title: 'Sale Price'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'onSale',
      type: 'boolean',
      title: 'Currently On Sale',
      initialValue: false
    }
  ]
} 