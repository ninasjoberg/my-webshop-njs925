import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import client from '../../lib/cmsApi'
import {
    productListFields,
    categoryQuery,
    collectionQuery,
} from '../../lib/queries'
import { SITE_URL, capitalize, breadcrumbSchema } from '../../lib/seo'
import Header from '../../components/Header'
import Products from '../../components/Products.js'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer'
import JsonLd from '../../components/JsonLd'

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Intro = styled.div`
    max-width: 800px;
    padding: 0px 20px;
    text-align: center;
    /* the h1 is for google and screen readers only, it is hidden visually but still part of the page
       (display: none would remove it completely, then google would ignore it) */
    h1 {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    p {
        margin: 8px 0 0;
        @media (max-width: 700px) {
            font-size: 14px;
        }
    }
`

// texts used when no seo title or description has been written in the cms
const defaultTexts = ({ _type, title }, productCount) => {
    if (_type === 'category') {
        return {
            heading: `${capitalize(title)} i 925 sterling silver`,
            seoTitle: `Handgjorda ${title} i silver | NJS 925`,
            description: `Handgjorda ${title} i 925 sterling silver, tillverkade i liten skala i min egen verkstad. Se alla ${productCount} ${title} från NJS 925.`,
        }
    }
    return {
        heading: `${capitalize(title)} - handgjorda silversmycken`,
        seoTitle: `${capitalize(title)} - handgjorda silversmycken | NJS 925`,
        description: `Smycken från kollektionen ${title}. Handgjorda i 925 sterling silver, tillverkade i liten skala i min egen verkstad.`,
    }
}

const CategoryPage = ({ page, products, categories, collections, slug }) => {
    const defaults = defaultTexts(page, products.length)
    const seoTitle = page.titleForGoogleSearch
        ? `${page.titleForGoogleSearch} | NJS 925`
        : defaults.seoTitle
    const description = page.description || defaults.description
    const pageUrl = `${SITE_URL}/kategori/${slug}`

    return (
        <Wrapper>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:title" content={seoTitle} key="og:title" />
                <meta
                    property="og:description"
                    content={description}
                    key="og:description"
                />
            </Head>
            <JsonLd
                id="category-schema"
                data={{
                    '@graph': [
                        breadcrumbSchema([
                            { name: 'Hem', url: SITE_URL },
                            { name: capitalize(page.title), url: pageUrl },
                        ]),
                        {
                            '@type': 'CollectionPage',
                            name: seoTitle,
                            description,
                            url: pageUrl,
                            isPartOf: { '@id': `${SITE_URL}/#website` },
                            mainEntity: {
                                '@type': 'ItemList',
                                numberOfItems: products.length,
                                itemListElement: products.map(
                                    (product, index) => ({
                                        '@type': 'ListItem',
                                        position: index + 1,
                                        url: `${SITE_URL}/produkt/${product.slug.current}`,
                                    })
                                ),
                            },
                        },
                    ],
                }}
            />
            <Header />
            <Categories
                categories={categories}
                selectedCategory={slug}
                collections={collections}
            />
            <Intro>
                <h1>{defaults.heading}</h1>
                {page.description && <p>{page.description}</p>}
            </Intro>
            <main>
                <Products products={products} />
            </main>
            <Footer />
        </Wrapper>
    )
}

export const getStaticPaths = async () => {
    const slugs = await client.fetch(
        `*[_type in ['category', 'collection'] && defined(slug.current)][].slug.current`
    )
    return {
        paths: slugs.map((category) => ({ params: { category } })),
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ params }) => {
    const slug = params.category

    // categories and collections share the same url, /kategori/[slug]
    const page = await client.fetch(
        `*[_type in ['category', 'collection'] && slug.current == $slug][0] {
            _id,
            _type,
            title,
            titleForGoogleSearch,
            description,
        }`,
        { slug }
    )

    if (!page) {
        return { notFound: true, revalidate: 30 }
    }

    const products = await client.fetch(
        `*[_type == 'product' && references($id)] | order(order asc) ${productListFields}`,
        { id: page._id }
    )

    const categories = await client.fetch(categoryQuery)
    categories.unshift({ title: 'visa alla' })

    const collections = await client.fetch(collectionQuery)

    return {
        props: {
            page,
            products,
            categories,
            collections,
            slug,
        },
        revalidate: 30,
    }
}

export default CategoryPage
