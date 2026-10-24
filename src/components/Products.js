import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { squareImageStyle } from './styles/CommonStyles'

const Wrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0px;
    background-color: #fff;
`

const ProductWrapper = styled.li`
    margin: 12px;
    background-color: #f1f1f1;
    @media (hover: hover) {
        /* hack to not apply hover on mobile devices, because it does not work well with touchscreens */
        &:hover {
            filter: brightness(120%);
        }
    }
    @media (max-width: 700px) {
        width: 45%;
        padding: 0 0 6px;
        margin: 6px;
    }
`

const DispalyProduct = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #51616a;
    letter-spacing: 0.6px;
    font-weight: 200;
    position: relative;
    @media (max-width: 700px) {
        h2 {
            font-size: 12px;
            margin: 8px 0px 0px;
        }
        p {
            font-size: 12px;
            margin: 0px;
        }
    }
`

const OutOfStockDiv = styled.div`
    position: absolute;
    z-index: 1;
    background: #fef3f0;
    top: 40px;
    right: 0;
    padding: 0px 10px;
`

const InfoWrapper = styled.div`
    padding-bottom: 12px;
    width: 100%;
`

const ProductLink = ({
    slug,
    img,
    alt,
    title,
    productPrice,
    outOfStock,
    eager,
}) => {
    return (
        <ProductWrapper>
            {/* always link to the canonical product url, so google does not find the same page under many urls */}
            <DispalyProduct href={`/produkt/${slug}`}>
                <Image
                    src={`${img}?fm=webp`}
                    alt={alt || `${title} - handgjort silversmycke`}
                    width={400}
                    height={400}
                    loading={eager ? 'eager' : 'lazy'}
                    style={squareImageStyle}
                />
                {outOfStock && <OutOfStockDiv>Tillfälligt slut</OutOfStockDiv>}
                <InfoWrapper>
                    <h2>{title}</h2>
                    <p>{productPrice}</p>
                </InfoWrapper>
            </DispalyProduct>
        </ProductWrapper>
    )
}

// the first row on desktop and the first two rows on mobile are above the fold
const EAGER_PRODUCTS = 4

const Products = ({ products }) => {
    const productList = products.map((product, index) => {
        const {
            amount,
            price,
            _id,
            title,
            slug,
            firstImageUrl,
            images,
            outOfStock,
        } = product
        const productPrice = amount
            ? `${price} SEK / ${amount}`
            : `${price} SEK`
        return (
            <ProductLink
                key={_id}
                id={_id}
                title={title}
                slug={slug.current}
                img={firstImageUrl}
                alt={images[0].alt}
                productPrice={productPrice}
                outOfStock={outOfStock || false}
                eager={index < EAGER_PRODUCTS}
            />
        )
    })
    return <Wrapper>{productList}</Wrapper>
}

export default Products
