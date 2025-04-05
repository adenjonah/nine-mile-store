export default {
  name: 'socialLink',
  title: 'Social Media Link',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in which social links appear (lower numbers first)',
      validation: Rule => Rule.required().min(0)
    }
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url'
    },
    prepare({title, subtitle}) {
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle
      }
    }
  }
} 