import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

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
    :hover {
        filter: brightness(120%);
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
    @media (max-width: 700px) {
        h3 {
            font-size: 12px;
            margin: 8px 0px 0px;
        }
        p {
            font-size: 12px;
            margin: 0px;
        }
    }
`

const InfoWrapper = styled.div`
    padding-bottom: 12px;
    width: 100%;
`

const ProductLink = ({ slug, img, alt, title, price, hidden, category }) => (
    <ProductWrapper hidden={hidden}>
        <Link href={`/produkt/${slug}`} passHref>
            <DispalyProduct>
                <Image
                    src={img}
                    alt={alt || 'produktbild silversmycke'}
                    width={400}
                    height={400}
                />
                <InfoWrapper>
                    <h3>{title}</h3>
                    <p>{price} SEK</p>
                </InfoWrapper>
            </DispalyProduct>
        </Link>
    </ProductWrapper>
)

const Products = ({ products, selectedCategory }) => {
    const productList = products.map((product) => {
        const isHidden =
            selectedCategory === 'Alla produkter'
                ? false
                : !product?.categories?.includes(selectedCategory)
        return (
            <ProductLink
                key={product._id}
                hidden={isHidden}
                id={product._id}
                title={product.title}
                slug={product.slug.current}
                img={product.firstImageUrl}
                alt={product.images[0].alt}
                price={product.price}
            />
        )
    })
    return <Wrapper>{productList}</Wrapper>
}

export default Products
