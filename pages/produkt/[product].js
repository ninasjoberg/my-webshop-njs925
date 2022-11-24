import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import client from '../../cmsApi'
import { addCart } from '../../redux/cartSlice'
import Header from '../../components/Header'
import Categories from '../../components/Categories'
import ActionButton from '../../components/ActionButton.js'
import Footer from '../../components/Footer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MainWrapper = styled.main`
    width: 80%;
    padding: 50px;
    display: flex;
    background-color: #f5eee8;
    margin: 32px 0;
    text-align: left;
    p {
        margin-bottom: 10px;
    }
    @media (max-width: 700px) {
        flex-direction: column;
        width: 100%;
        padding: 25px 25px 25px;
        margin: 0;
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
    width: 50%;
    margin-right: 26px;
    @media (max-width: 700px) {
        width: 100%;
    }
`

const RightWrapper = styled.div`
    width: 50%;
    h2 {
        margin-top: 0px;
        color: #3c3c3c;
        font-weight: bold;
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
    color: #4da7bc;
    font-size: 18px;
    margin: 12px 0;
    font-weight: bold;
`

const Dropdown = styled.select`
    color: #51616a;
    border-radius: 2px;
    border: 1px solid rgb(203, 207, 209);
    height: 36px;
    width: 200px;
    font-size: 16px;
    padding-left: 6px;
    background-color: white;
    margin-top: 38px;
    cursor: pointer;
    :focus {
        outline: 0;
    }
    @media (max-width: 700px) {
        width: 100%;
    }
`

const Product = ({ product, categories, slug }) => {
    const [bigImage, setBigImage] = useState('')
    const [selectedVariant, setSelectedVariant] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (product?.imageUrls) {
            setBigImage({
                src: product.imageUrls[0],
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

    const selectVariant = (e) => {
        setSelectedVariant(e.target.value)
    }

    const selectSize = (e) => {
        setSelectedSize(e.target.value)
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
        return (
            <>
                <Header />
                <Wrapper>
                    <MainWrapper>
                        <h2>Denna produkt finns tyvärr inte.</h2>
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
            price,
            body,
            variants,
            images,
            size,
            titleForGoogleSearch,
        } = product

        //sanity gives you an empty array if you have once opened this field, even if you never add or have deleted the variant..
        const variantOptions =
            variants?.length > 0 &&
            variants.map((item) => {
                return (
                    <option key={item._key} value={item.title}>
                        {item.title}
                    </option>
                )
            })

        //sanity gives you an empty array if you have once opened this field, even if you never add or have deleted the variant..
        const sizeOptions =
            size?.length > 0 &&
            size.map((item) => {
                return (
                    <option key={item._key} value={item.title}>
                        {item.title}
                    </option>
                )
            })

        const imageArray = imageUrls?.map((imageUrl, index) => {
            const active = imageUrl === bigImage.src
            return (
                <SmallImgWrapper
                    key={index}
                    active={active}
                    onClick={() => selectImg(imageUrl, images[index].alt)}
                >
                    <Image
                        src={`${imageUrl}?fm=webp`}
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
                <Categories categories={categories} />
                <MainWrapper>
                    <LeftWrapper>
                        <BigImageWrapper>
                            {bigImage?.src && (
                                <Image
                                    src={`${bigImage.src}?fm=webp`}
                                    alt={bigImage.alt}
                                    width={600}
                                    height={600}
                                />
                            )}
                        </BigImageWrapper>
                        <ImagesWrapper>{imageArray}</ImagesWrapper>
                    </LeftWrapper>
                    <RightWrapper>
                        <h2>{title}</h2>
                        {texArray}
                        <PriceText>{price} SEK</PriceText>
                        {variantOptions && (
                            <Dropdown
                                onChange={selectVariant}
                                defaultValue={variants[0]?.title}
                            >
                                {variantOptions}
                            </Dropdown>
                        )}
                        {sizeOptions && (
                            <Dropdown
                                onChange={selectSize}
                                defaultValue={size[0]?.title}
                            >
                                {sizeOptions}
                            </Dropdown>
                        )}
                        <ActionButton
                            buttonText="Lägg till"
                            onClick={() => {
                                addProductToCart(product)
                            }}
                        />
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
            slug,
            titleForGoogleSearch,
            price,
            images,
            variants,
            size,
            "imageUrls": images[].asset->url,
            "body": body.se[].children[],
        }`

        const slug = params.product

        const product = await client.fetch(productQuery, {
            slug,
        })

        const categoryQuery = `*[_type == 'category'] {
            title,
        }`
        const categories = await client.fetch(categoryQuery, {
            slug,
        })
        categories.unshift({ title: 'Alla produkter' })

        return {
            props: {
                product,
                categories,
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
