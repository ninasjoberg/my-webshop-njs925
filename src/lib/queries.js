// fields needed to show a product in the product list (Products.js)
export const productListFields = `{
    _id,
    title,
    slug,
    images,
    price,
    amount,
    outOfStock,
    "firstImageUrl": images[0].asset->url,
    "originalFilename": images[0].asset->originalFilename,
}`

export const categoryQuery = `*[_type == 'category'] {
    title,
    slug,
}`

export const collectionQuery = `*[_type == 'collection'] {
    title,
    slug,
}`
