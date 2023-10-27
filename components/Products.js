import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import replaceSwedishLetters from '../utils/replaceSwedishLetters'

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
    ${({ hidden }) =>
        hidden &&
        `
		display: none;
	`}
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

const DispalyProduct = styled.a`
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
    background: #f5eee8;
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
    hidden,
    outOfStock,
    selectedCategory,
}) => {
    return (
    <ProductWrapper hidden={hidden}>
        <Link href={`/produkt/${slug}/?category=${selectedCategory}`} passHref>
            <DispalyProduct>
                <Image
                    src={`${img}?fm=webp`}
                    alt={alt || 'produktbild silversmycke'}
                    width={400}
                    height={400}
                />
                {outOfStock && <OutOfStockDiv>Tillfälligt slut</OutOfStockDiv>}
                <InfoWrapper>
                    <h2>{title}</h2>
                    <p>{productPrice}</p>
                </InfoWrapper>
            </DispalyProduct>
        </Link>
    </ProductWrapper>
    )
}

const Products = ({ products, selectedCategory }) => {
    const productList = products.map((product) => {
        const {amount, price, categories, collections, _id, title, slug, firstImageUrl, images, outOfStock} = product
        const productPrice = amount ? `${price} SEK / ${amount}` : `${price} SEK`
        const category = categories?.length
            ? replaceSwedishLetters(categories[0]).toLowerCase()
            : null
        const collection = collections?.length
            ? replaceSwedishLetters(collections[0]).toLowerCase()
            : null
        const showProuct =
            category === selectedCategory || collection === selectedCategory
        const isHidden = selectedCategory === 'visa alla' ? false : !showProuct
        return (
            <ProductLink
                key={_id}
                hidden={isHidden}
                id={_id}
                title={title}
                slug={slug.current}
                img={firstImageUrl}
                alt={images[0].alt}
                productPrice={productPrice}
                outOfStock={outOfStock || false}
                selectedCategory={selectedCategory}
            />
        )
    })
    return <Wrapper>{productList}</Wrapper>
}

export default Products
