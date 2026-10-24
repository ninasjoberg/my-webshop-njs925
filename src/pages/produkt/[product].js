import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import client from '../../lib/cmsApi'
import { categoryQuery, collectionQuery } from '../../lib/queries'
import {
    SITE_URL,
    SITE_NAME,
    capitalize,
    breadcrumbSchema,
    shippingDetailsSchema,
} from '../../lib/seo'
import JsonLd from '../../components/JsonLd'
import { addCart } from '../../redux/cartSlice'
import Header from '../../components/Header'
import Categories from '../../components/Categories'
import ActionButton from '../../components/ActionButton.js'
import Footer from '../../components/Footer'
import Dropdown from '../../components/Dropdown'
import { squareImageStyle } from '../../components/styles/CommonStyles'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const MainWrapper = styled.main`
    width: 80%;
    max-width: 1200px;
    padding: 50px;
    display: flex;
    background-color: #fef3f0;
    margin: 12px 0;
    text-align: left;
    p {
        margin-bottom: 10px;
    }
    @media (max-width: 700px) {
        background-color: #fff;
        flex-direction: column;
        width: 100%;
        padding: 25px 25px 25px;
        margin: 6px 0 0;
        p {
            margin-bottom: 6px;
            letter-spacing: 0.8px;
        }
    }
`

const LeftWrapper = styled.div`
    width: 60%;
    margin-right: 26px;
    @media (max-width: 700px) {
        width: 100%;
    }
`

const RightWrapper = styled.div`
    width: 40%;
    h1 {
        margin-top: 0px;
        color: #3c3c3c;
    }
    p {
        font-size: 16px;
    }
    @media (max-width: 700px) {
        width: 100%;
    }
    @media (min-width: 1310px) {
        p {
            font-size: 18px;
        }
    }
`

const BigImageWrapper = styled.div`
    display: flex;
    background-color: #eeeeee;
    max-width: 600px;
`

const ImagesWrapper = styled.div`
    display: flex;
    flex-flow: wrap;
    width: 100%;
    @media (max-width: 700px) {
        margin-bottom: 16px;
    }
`

const SmallImgWrapper = styled.div`
    margin: 16px 12px 0px 0px;
    cursor: pointer;
    width: 96px;
    height: auto;
    background-color: #eeeeee;
    ${({ active }) =>
        active &&
        `
        filter: brightness(120%);
	`}
    &:last-child {
        margin-right: 0px;
    }
    @media (hover: hover) {
        /* hack to not apply hover on mobile devices, because it does not work well with touchscreens */
        &:hover {
            filter: brightness(120%);
        }
    }
`

const PriceText = styled.p`
    color: #29889e;
    font-size: 24px;
    margin-top: 20px;
`

const Product = ({ product, categories, collections, slug }) => {
    const [bigImage, setBigImage] = useState('')
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants ? product.variants[0]?.title : ''
    )
    const [selectedSize, setSelectedSize] = useState(
        product.size ? [0]?.title : ''
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (product?.imageUrls) {
            setBigImage({
                src: `${product.imageUrls[0]}/${product.originalFilename[0]}/?fm=webp`,
                alt:
                    product.images[0].alt ||
                    `${product.title} - ${product.titleExtended}, bild 1`,
            })
        }
        if (product?.variants && product.variants.length > 0) {
            //sanity gives you an empty array if you have once opened this field, even if you never add or have deleted the variant..
            setSelectedVariant(product.variants[0].title)
        }
        if (product?.size && product.size.length > 0) {
            //sanity gives you an empty array if you have once opened this field, even if you never add or have deleted the variant..
            setSelectedSize(product.size[0].title)
        }
    }, [product])

    const addProductToCart = (product) => {
        const productInfo = {
            id: product._id,
            title: product.title,
            images: product.imageUrls,
            price: product.price,
            quantity: 1,
            variant: selectedVariant,
            size: selectedSize,
        }
        dispatch(addCart(productInfo))
    }

    const selectImg = (imgSrc, imgAlt, imgIndex) => {
        setBigImage({ src: imgSrc, alt: imgAlt })
        // umami is loaded in _app.js, it can be missing if blocked by an ad blocker
        window.umami?.track(`image-click: ${product.title}`, {
            product: slug,
            image: imgIndex + 1,
        })
    }

    const selectVariant = (variant) => {
        setSelectedVariant(variant)
    }

    const selectSize = (variant) => {
        setSelectedSize(variant)
    }

    const {
        imageUrls,
        title,
        titleExtended,
        price,
        amount,
        body,
        variants,
        images,
        size,
        titleForGoogleSearch,
        outOfStock,
        originalFilename,
        category,
    } = product

    // fallback for images that are missing an alt text in the cms
    const altText = (index) =>
        images[index].alt || `${title} - ${titleExtended}, bild ${index + 1}`

    const showVariants = variants?.length > 0
    const showSizes = size?.length > 0

    const imageArray = imageUrls?.map((imageUrl, index) => {
        const active = bigImage?.src?.includes(imageUrl)
        const urlWithFileName = `${imageUrl}/${originalFilename[index]}/?fm=webp`
        return (
            <SmallImgWrapper
                key={index}
                active={active}
                onClick={() =>
                    selectImg(urlWithFileName, altText(index), index)
                }
            >
                <Image
                    src={urlWithFileName}
                    alt={altText(index)}
                    width={96}
                    height={96}
                    style={{ ...squareImageStyle, width: '100%' }}
                />
            </SmallImgWrapper>
        )
    })

    const texArray = body?.map((section) => {
        return <p key={section._key}>{section.text}</p>
    })

    const productTitle = `${title} - ${titleExtended}`
    const productPrice = amount ? `${price} SEK / ${amount}` : `${price} SEK`
    const productUrl = `${SITE_URL}/produkt/${slug}`
    const productDescription =
        body?.map((section) => section.text).join(' ') ||
        'Handgjort smycke i 925 sterling silver.'
    // jpg instead of webp, not all apps can show webp images when the page is shared
    const shareImage = `${imageUrls[0]}/${originalFilename[0]}?w=1200&fm=jpg`
    const schemaImages = imageUrls.map(
        (imageUrl, index) => `${imageUrl}/${originalFilename[index]}?w=1200`
    )

    return (
        <Wrapper>
            <Head>
                {/* 1. Unik titel för varje produkt */}
                <title>{`${titleForGoogleSearch} | Handgjorda Silversmycken | NJS 925`}</title>

                {/* 2. Unik beskrivning – undvik samma text på alla 105 sidor! */}
                <meta
                    name="description"
                    content={`Köp ${titleForGoogleSearch.toLowerCase()}. Handgjort i 925 sterling silver i min egen verkstad. Unik design från NJS 925.`}
                />

                <link rel="canonical" href={productUrl} />

                {/* 3. Open Graph - Gör att bilden ser snygg ut när man delar på FB/Instagram */}
                <meta
                    property="og:title"
                    content={titleForGoogleSearch}
                    key="og:title"
                />
                <meta
                    property="og:description"
                    content={
                        body?.[0]?.text ||
                        'Handgjorda silversmycken från NJS 925.'
                    }
                    key="og:description"
                />
                <meta property="og:image" content={shareImage} />
                <meta property="og:image:alt" content={altText(0)} />
                <meta property="og:type" content="product" key="og:type" />
            </Head>
            {/* 4. JSON-LD - DETTA ÄR NYCKELN FÖR BILDER & PRIS I SÖKRESULTATET */}
            <JsonLd
                id="product-schema"
                data={{
                    '@graph': [
                        {
                            '@type': 'Product',
                            name: titleForGoogleSearch,
                            image: schemaImages,
                            description: productDescription,
                            material: '925 sterling silver',
                            sku: slug,
                            brand: {
                                '@type': 'Brand',
                                name: SITE_NAME,
                            },
                            offers: {
                                '@type': 'Offer',
                                url: productUrl,
                                priceCurrency: 'SEK',
                                price: price,
                                availability: outOfStock
                                    ? 'https://schema.org/OutOfStock'
                                    : 'https://schema.org/InStock',
                                itemCondition:
                                    'https://schema.org/NewCondition',
                                shippingDetails: shippingDetailsSchema,
                                seller: {
                                    '@type': 'Organization',
                                    name: SITE_NAME,
                                    url: SITE_URL,
                                },
                            },
                        },
                        // Hem > Ringar > Silverring - Sunset, shown instead of the url in google search results
                        breadcrumbSchema([
                            { name: 'Hem', url: SITE_URL },
                            ...(category
                                ? [
                                      {
                                          name: capitalize(category.title),
                                          url: `${SITE_URL}/kategori/${category.slug}`,
                                      },
                                  ]
                                : []),
                            { name: titleForGoogleSearch, url: productUrl },
                        ]),
                    ],
                }}
            />
            <Header />
            <Categories
                categories={categories}
                collections={collections}
                selectedCategory={category?.slug}
            />
            <MainWrapper>
                <LeftWrapper>
                    <BigImageWrapper>
                        {bigImage?.src && (
                            <Image
                                src={bigImage.src}
                                alt={bigImage.alt}
                                width={600}
                                height={600}
                                loading="eager"
                                style={squareImageStyle}
                            />
                        )}
                    </BigImageWrapper>
                    <ImagesWrapper>{imageArray}</ImagesWrapper>
                </LeftWrapper>
                <RightWrapper>
                    <h1>{productTitle}</h1>
                    {texArray}
                    <PriceText>{productPrice}</PriceText>
                    {showVariants && (
                        <Dropdown
                            selctedValue={selectedVariant}
                            variants={variants}
                            onChange={selectVariant}
                        />
                    )}
                    {showSizes && (
                        <Dropdown
                            selctedValue={selectedSize}
                            variants={size}
                            onChange={selectSize}
                        />
                    )}
                    {outOfStock ? (
                        <p>Tillfälligt slut i lager.</p>
                    ) : (
                        <ActionButton
                            buttonText="Lägg i varukorgen"
                            onClick={() => {
                                addProductToCart(product)
                            }}
                        />
                    )}
                </RightWrapper>
            </MainWrapper>
            <Footer />
        </Wrapper>
    )
}

// from: https://nextjs.org/docs/basic-features/data-fetching
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if the path has not been generated.
export const getStaticPaths = async () => {
    const productsSlugsQuery = `*[_type == 'product' && defined(slug.current)][].slug.current`
    const slugs = await client.fetch(productsSlugsQuery)

    // Get the paths we want to pre-render based on products
    const paths = slugs.map((product) => ({
        params: { product },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}

// This function also gets called at build time
export const getStaticProps = async ({ params }) => {
    // google search console searches for page produkt/[produkt] which gives params === undefined and generates a 500
    // this is done to avoid that...
    if (!params?.product) {
        return { notFound: true }
    }

    const productQuery = `*[_type == 'product' && slug.current == $slug][0] {
            _id,
            title,
            titleExtended,
            slug,
            titleForGoogleSearch,
            price,
            amount,
            images,
            variants,
            size,
            outOfStock,
            "imageUrls": images[].asset->url,
            "originalFilename": images[].asset->originalFilename,
            "body": body.se[]{ "_key": children[0]._key, "text": children[0].text },
            "category": categories[0]->{ title, "slug": slug.current },
        }`

    const slug = params.product

    const product = await client.fetch(productQuery, {
        slug,
    })

    // sanity returns null for a slug that does not exist, give a real 404 instead of a page with status 200
    // revalidate so the page shows up if the product is added in the cms later
    if (!product) {
        return { notFound: true, revalidate: 30 }
    }

    const categories = await client.fetch(categoryQuery)
    categories.unshift({ title: 'visa alla' })

    const collections = await client.fetch(collectionQuery)

    return {
        props: {
            product,
            categories,
            collections,
            slug,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in - At most once every 30 seconds
        // (needed to get the page updated when making changes in the cms, without having to rebuild the app)
        revalidate: 30,
    }
}

export default Product
