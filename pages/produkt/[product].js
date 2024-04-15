import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import client from '../../cmsApi'
import { addCart } from '../../redux/cartSlice'
import Header from '../../components/Header'
import Categories from '../../components/Categories'
import ActionButton from '../../components/ActionButton.js'
import Footer from '../../components/Footer'
import Dropdown from '../../components/Dropdown'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const NotFoundLink = styled.p`
    cursor: pointer;
    :hover {
        color: #4da7bc;
        opacity: 0.7;
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
`

const BigImageWrapper = styled.div`
    display: flex;
    background-color: #cbcaca;
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
    background-color: #cbcaca;
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
    const router = useRouter()

    useEffect(() => {
        if (product?.imageUrls) {
            setBigImage({
                src: `${product.imageUrls[0]}/${product.originalFilename[0]}/?fm=webp`,
                alt: product.images[0].alt,
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

    const selectImg = (imgSrc, imgAlt) => {
        setBigImage({ src: imgSrc, alt: imgAlt })
    }

    const selectVariant = (variant) => {
        setSelectedVariant(variant)
    }

    const selectSize = (variant) => {
        setSelectedSize(variant)
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
        return (
            <>
                <Header />
                <Wrapper>
                    <MainWrapper>
                        <h1>Denna produkt finns tyvärr inte.</h1>
                        <Link href={'/'} passHref>
                            <NotFoundLink>
                                se alla produkter från njs925.se
                            </NotFoundLink>
                        </Link>
                    </MainWrapper>
                </Wrapper>
                <Footer />
            </>
        )
    } else {
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
        } = product

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
                        selectImg(urlWithFileName, images[index].alt)
                    }
                >
                    <Image
                        src={urlWithFileName}
                        alt={images[index].alt || 'produktbild silversmycke'}
                        width="100%"
                        height="100%"
                        layout="responsive"
                    />
                </SmallImgWrapper>
            )
        })

        const texArray = body?.map((section) => {
            return <p key={section[0]._key}>{section[0].text}</p>
        })

        const productTitle = `${title} - ${titleExtended}`
        const productPrice = amount
            ? `${price} SEK / ${amount}`
            : `${price} SEK`

        return (
            <Wrapper>
                <Head>
                    <title>
                        {titleForGoogleSearch || 'silversmycke från NJS 925'}
                    </title>
                    <meta
                        name="description"
                        content="Handgjort smycken i 925 sterling silver, tillverkat i liten skala av mig i min verkstad."
                    />
                    <link
                        rel="canonical"
                        href={`https://www.njs925.se/produkt/${slug}`}
                    />
                </Head>
                <Header />
                <Categories
                    categories={categories}
                    collections={collections}
                    selectedCategory={router.query.category?.toLowerCase()}
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
    if (Object.keys(params).length === 0 && params.constructor === Object) {
        return {
            props: { product: {}, categories: {} },
        }
    } else {
        const productQuery = `*[_type == 'product' && slug.current == '${params.product}'][0] {
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
            "body": body.se[].children[],
        }`

        const slug = params.product

        const product = await client.fetch(productQuery, {
            slug,
        })

        const categoryQuery = `*[_type == 'category'] {
            title,
            slug,
        }`
        const categories = await client.fetch(categoryQuery, {
            slug,
        })
        categories.unshift({ title: 'visa alla' })

        const collectionQuery = `*[_type == 'collection'] {
            title,
            slug,
        }`
        const collections = await client.fetch(collectionQuery, {
            slug,
        })

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
}

export default Product
