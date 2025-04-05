// deskStructure.js

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      S.documentTypeListItem('product'),
      S.documentTypeListItem('service'),
      S.documentTypeListItem('landscapingService'),
      S.documentTypeListItem('siteImage'),
      S.documentTypeListItem('socialLink'),
      
      // Singleton document types
      S.listItem()
        .title('Store Information')
        .child(
          S.editor()
            .id('storeInfo')
            .schemaType('storeInfo')
            .documentId('storeInfo')
        ),
      S.listItem()
        .title('Store Hours')
        .child(
          S.editor()
            .id('storeHours')
            .schemaType('storeHours')
            .documentId('storeHours')
        )
    ]) 