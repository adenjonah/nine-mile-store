export default {
  name: 'closeoutItem',
  type: 'document',
  title: 'Closeout Items',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Item Description'
    },
    {
      name: 'discount',
      type: 'string',
      title: 'Discount Information'
    },
    {
      name: 'active',
      type: 'boolean',
      title: 'Currently Active',
      initialValue: true
    },
    {
      name: 'image',
      type: 'image',
      title: 'Closeout Item Image',
      options: {
        hotspot: true
      }
    }
  ]
} 