import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import client from '../lib/cmsApi'
import {
    productListFields,
    categoryQuery,
    collectionQuery,
} from '../lib/queries'
import { SITE_URL, SITE_NAME } from '../lib/seo'
import Header from '../components/Header'
import Products from '../components/Products.js'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import JsonLd from '../components/JsonLd'

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const IndexPage = ({ products, categories, collections }) => {
    return (
        <Wrapper>
            <Head>
                <title>NJS 925: silversmycken</title>
                <meta
                    name="description"
                    content="Handgjorda smycken i 925 sterling silver, tillverkade i liten skala. Kvinnosymboler, geometriska former och stilren design."
                />
                <link rel="canonical" href={`${SITE_URL}/`} />
            </Head>
            {/* tells google who is behind the webshop, can give a brand panel with logo and instagram in the search results */}
            <JsonLd
                id="home-schema"
                data={{
                    '@graph': [
                        {
                            '@type': 'OnlineStore',
                            '@id': `${SITE_URL}/#organization`,
                            name: SITE_NAME,
                            url: SITE_URL,
                            logo: `${SITE_URL}/logga_njs925.jpg`,
                            email: 'info@njs925.se',
                            description:
                                'Handgjorda smycken i 925 sterling silver, tillverkade i liten skala.',
                            founder: {
                                '@type': 'Person',
                                name: 'Nina Johanna Sjöberg',
                            },
                            sameAs: ['https://www.instagram.com/njs925.se/'],
                        },
                        {
                            '@type': 'WebSite',
                            '@id': `${SITE_URL}/#website`,
                            url: SITE_URL,
                            name: SITE_NAME,
                            inLanguage: 'sv',
                            publisher: { '@id': `${SITE_URL}/#organization` },
                        },
                    ],
                }}
            />
            <Header />
            <Categories
                categories={categories}
                selectedCategory="visa alla"
                collections={collections}
            />
            <main>
                <Products products={products} />
            </main>
            <Footer />
        </Wrapper>
    )
}

export const getServerSideProps = async ({ query }) => {
    // categories used to be filtered on this page with ?category=..., they have their own pages now
    // permanent redirect so old links and google results end up on the new page
    if (query.category) {
        return {
            redirect: {
                destination: `/kategori/${encodeURIComponent(query.category.toLowerCase())}`,
                permanent: true,
            },
        }
    }

    const productsQuery = `*[_type == 'product'] | order(order asc) ${productListFields}`
    const products = await client.fetch(productsQuery)

    const categories = await client.fetch(categoryQuery)
    categories.unshift({ title: 'visa alla' })

    const collections = await client.fetch(collectionQuery)

    return {
        props: {
            products,
            categories,
            collections,
        },
    }
}

export default IndexPage
