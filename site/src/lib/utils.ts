export const formatCurrency = (amount: number | null | undefined): string => {
  // Handle null, undefined, or invalid numbers
  if (amount === null || amount === undefined || isNaN(amount) || typeof amount !== 'number') {
    return '$0.00'
  }
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  } catch (error) {
    console.warn('Error formatting currency:', error)
    return `$${amount.toFixed(2)}`
  }
} 