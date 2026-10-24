export const SITE_URL = 'https://njs925.se'
export const SITE_NAME = 'NJS 925'

export const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)

// same for all products, from the villkor page: free shipping with Posten within Sweden,
// sent within 10 working days, posten takes about 2-5 days
// (no return policy yet, the villkor page does not say how many days you have to return a product)
export const shippingDetailsSchema = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
        '@type': 'MonetaryAmount',
        value: 0,
        currency: 'SEK',
    },
    shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'SE',
    },
    deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'https://schema.org/Monday',
                'https://schema.org/Tuesday',
                'https://schema.org/Wednesday',
                'https://schema.org/Thursday',
                'https://schema.org/Friday',
            ],
        },
        handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 10,
            unitCode: 'DAY',
        },
        transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY',
        },
    },
}

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
