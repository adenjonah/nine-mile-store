export default {
  name: 'rentalItem',
  title: 'Rental Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'siteImage',
      validation: Rule => Rule.required()
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'siteImage' }],
      description: 'Add more images of the rental item (optional)'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add key specifications or features'
    },
    {
      name: 'dailyRate',
      title: 'Daily Rate',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'weeklyRate',
      title: 'Weekly Rate',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Power Tools', value: 'powerTools'},
          {title: 'Hand Tools', value: 'handTools'},
          {title: 'Construction Equipment', value: 'constructionEquipment'},
          {title: 'Lawn & Garden', value: 'lawnGarden'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }
  ]
} 