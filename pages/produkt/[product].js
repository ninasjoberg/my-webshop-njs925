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

const WrapperContent = styled.div`
    max-width: 800px;
    min-height: 450px;
    padding: 25px 100px;
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: #f5eee8;
    margin: 32px 0;
    text-align: left;
    p {
        font-weight: 200;
        margin-bottom: 10px;
    }
    @media (max-width: 700px) {
        padding: 0px 25px 10px;
        margin: 0;
        p {
            margin-bottom: 6px;
            /* font-weight: normal; */
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

const BigImageWrapper = styled.div`
    max-width: 600px;
    height: auto;
`

const ImagesWrapper = styled.div`
    display: flex;
    flex-flow: wrap;
    width: 100%;
    margin-bottom: 16px;
`

const SmallImgWrapper = styled.div`
    margin: 16px 12px 0px 0px;
    cursor: pointer;
    width: 96px;
    height: auto;
    &:last-child {
        margin-right: 0px;
    }
    ${({ active }) =>
        active &&
        `
        opacity: 0.5;
	`}
`

const PriceText = styled.p`
    color: #4da7bc;
    font-size: 18px;
    margin: 12px 0;
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
                    <WrapperContent>
                        <h3>Denna produkt finns tyvärr inte.</h3>
                        <Link href={'/'} passHref>
                            <NotFoundLink>
                                se alla produkter från njs925.se
                            </NotFoundLink>
                        </Link>
                    </WrapperContent>
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
            const active = imageUrl === bigImage
            return (
                <SmallImgWrapper
                    key={index}
                    active={active}
                    onClick={() => selectImg(imageUrl, images[index].alt)}
                >
                    <Image
                        src={imageUrl}
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
                <WrapperContent>
                    <h3>{title}</h3>
                    <BigImageWrapper>
                        {bigImage?.src && (
                            <Image
                                src={bigImage.src}
                                alt={bigImage.alt}
                                width="100%"
                                height="100%"
                                layout="responsive"
                            />
                        )}
                    </BigImageWrapper>
                    <ImagesWrapper>{imageArray}</ImagesWrapper>
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
                </WrapperContent>
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

    console.log(productsSlugsQuery, 'productsSlugsQuery!!!!!!!!!!!!!')

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

        console.log(params.product, 'params!!!!')
        const slug = params.product

        console.log('slug', slug)
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
