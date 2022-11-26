import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import replaceSwedishLetters from '../utils/replaceSwedishLetters'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Divider = styled.div`
    width: 750px;
    height: 2px;
    background-color: #f1f1f1;
    margin-bottom: 12px;
    @media (max-width: 1000px) {
        width: 80%;
    }
`

const Navigation = styled.nav`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-color: #fff;
    width: 100%;
    @media (max-width: 700px) {
        width: 100vw;
        overflow-x: scroll;
        justify-content: flex-start;
    }
`

const SmallDivider = styled.div`
    width: 25px;
    height: 2px;
    background-color: #f1f1f1;
    margin: 4px;
    @media (max-width: 1000px) {
        width: 16%;
    }
`

const LinkDiv = styled.div`
    /* fix for styling next/link */
    margin-left: 12px;
    align-self: flex-start;
    ${({ selected }) =>
        selected &&
        `
		border-bottom: 2px solid #4da7bc;
	`}
    a {
        color: #000;
        font-weight: 100;
        font-size: 12px;
        cursor: pointer;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 2px;
        @media (hover: hover) {
            /* hack to not apply hover on mobile devices, because it does not work well with touchscreens */
            &:hover {
                color: #eed2c4;
            }
        }
    }
`

const Space = styled.div`
    @media (max-width: 700px) {
        padding-left: 12px;
    }
`

const Categories = ({ categories, selectedCategory, collections }) => {
    return (
        <Wrapper>
            <Divider />
            <Navigation>
                {categories.map((category) => {
                    const url =
                        category.title === 'visa alla'
                            ? '/'
                            : `/?category=${category.slug.current}`
                    const selected =
                        selectedCategory ===
                        replaceSwedishLetters(category.title)
                    return (
                        <LinkDiv selected={selected} key={category._id}>
                            <Link href={url} passHref>
                                {category.title}
                            </Link>
                        </LinkDiv>
                    )
                })}
                <Space />
            </Navigation>
            <SmallDivider />
            <Navigation>
                {collections.map((collection) => {
                    const url = `/?category=${collection.slug.current}`
                    const selected =
                        selectedCategory ===
                        replaceSwedishLetters(collection.title)
                    return (
                        <LinkDiv selected={selected} key={collection._id}>
                            <Link href={url} passHref>
                                {collection.title}
                            </Link>
                        </LinkDiv>
                    )
                })}
                <Space />
            </Navigation>
        </Wrapper>
    )
}

export default Categories
