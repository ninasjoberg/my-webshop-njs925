export const SITE_URL = 'https://njs925.se'
export const SITE_NAME = 'NJS 925'

export const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)

// crumbs: [{ name, url }], the first one should always be the start page
export const breadcrumbSchema = (crumbs) => ({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
    })),
})
