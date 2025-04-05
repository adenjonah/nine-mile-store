import product from './product'
import service from './service'
import landscapingService from './landscapingService'
import closeoutItem from './closeoutItem'
import siteImage from './siteImage'
import storeHours from './storeHours'
import storeInfo from './storeInfo'
import socialLink from './socialLink'

// Sanity default schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'

export const schemaTypes = [
  // Custom schemas for Nine Mile Store
  product,
  service,
  landscapingService,
  closeoutItem,
  siteImage,
  storeHours,
  storeInfo,
  socialLink,
  
  // Default blog schemas
  post,
  author,
  category,
  blockContent,
]
