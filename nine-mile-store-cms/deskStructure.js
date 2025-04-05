// deskStructure.js
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Store Information')
        .child(
          S.document()
            .schemaType('storeInfo')
            .documentId('storeInfo')
        ),
      S.listItem()
        .title('Store Hours')
        .child(
          S.document()
            .schemaType('storeHours')
            .documentId('storeHours')
        ),
      // Products section
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('product').title('All Products'),
              S.listItem()
                .title('Products On Sale')
                .child(
                  S.documentList()
                    .title('Products On Sale')
                    .filter('_type == "product" && onSale == true')
                )
            ])
        ),
      // Services section
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('landscapingService').title('Landscaping Services'),
      
      // Images
      S.listItem()
        .title('Site Images')
        .child(
          S.documentList()
            .title('Site Images')
            .filter('_type == "siteImage"')
            .defaultOrdering([{field: 'category', direction: 'asc'}])
        ),
      
      // Social Media
      orderableDocumentListDeskItem({
        type: 'socialLink',
        title: 'Social Media Links',
        S,
        context: (documentId) => ({
          deskItemId: documentId
        }),
      }),
      
      // Show remaining types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'storeInfo',
            'storeHours',
            'product',
            'service',
            'landscapingService',
            'siteImage',
            'socialLink',
          ].includes(listItem.getId())
      ),
    ]) 