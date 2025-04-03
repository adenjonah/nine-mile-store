export default {
  name: 'landscapingService',
  type: 'document',
  title: 'Landscaping Services',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Service Title'
    },
    {
      name: 'highlighted',
      type: 'boolean',
      title: 'Highlighted Service',
      initialValue: false
    }
  ]
} 