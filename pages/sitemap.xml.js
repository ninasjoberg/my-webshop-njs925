import client from '../cmsApi'

// 2. Funktion som bygger själva XML-strängen
function generateSiteMap(products) {
    const domain = 'https://njs925.se'

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset 
     xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
   >
    <url>
        <loc>https://njs925.se/</loc>
        <lastmod>2026-04-03T18:04:43+00:00</lastmod>
    </url>
    <url>
        <loc>https://njs925.se/info</loc>
        <lastmod>2026-04-03T18:04:43+00:00</lastmod>
    </url>
    <url>
        <loc>https://njs925.se/om</loc>
        <lastmod>2026-04-03T18:04:43+00:00</lastmod>
    </url>
    <url>
        <loc>https://njs925.se/villkor</loc>
        <lastmod>2026-04-03T18:04:43+00:00</lastmod>
    </url>
     ${products
         .map((product) => {
             const cleanTitle =
                 product.title.charAt(0).toUpperCase() +
                 product.title.slice(1).toLowerCase()
             return `
       <url>
           <loc>${domain}/produkt/${product.slug.current}</loc>
           <lastmod>${
               product._updatedAt
                   ? product._updatedAt.split('T')[0]
                   : new Date().toISOString().split('T')[0]
           }</lastmod>
           <image:image>
             <image:loc>${`${product.imageUrl}/${product.originalFilename}/?fm=webp`}</image:loc>
             <image:title>${product.titleForGoogleSearch}</image:title>
             <image:caption>Handgjort silversmycke från njs925: ${cleanTitle}</image:caption>
           </image:image>
       </url>
     `
         })
         .join('')}
   </urlset>
 `
}

// 3. Denna funktion körs på Heroku varje gång någon besöker njs925.se/sitemap.xml
export async function getServerSideProps({ res }) {
    try {
        const products = await client.fetch(`
      *[_type == "product" && defined(slug.current)]{
        slug,
        title,
        titleForGoogleSearch,
        _updatedAt,
        "imageUrl": images[0].asset->url,
        "originalFilename": images[0].asset->originalFilename,
      }
    `)
        const sitemap = generateSiteMap(products)
        res.setHeader('Content-Type', 'text/xml')
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=59'
        )
        res.write(sitemap)
        res.end()
    } catch (error) {
        console.error('Sitemap error:', error)
        res.statusCode = 500
        res.end()
    }
    return {
        props: {},
    }
}

export default function SiteMap() {}
