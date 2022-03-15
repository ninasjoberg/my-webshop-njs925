import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Divider = styled.div`
    width: 750px;
    height: 2px;
    background-color: #f1f1f1;
    @media (max-width: 1000px) {
        width: 80%;
    }
`

const CategoriesWrapper = styled.div`
    display: flex;
    padding: 20px 0px 10px 0px;
    margin: 0 auto;
    background-color: #fff;
    width: 100%;
    @media (max-width: 700px) {
        width: 100vw;
        overflow-x: scroll;
        padding: 12px 0px 10px 0px;
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
    padding-left: 12px;
`

const Categories = ({ categories, selectedCategory }) => {
    return (
        <Wrapper>
            <Divider />
            <CategoriesWrapper>
                {categories.map((category) => {
                    const url =
                        category.title === 'Alla produkter'
                            ? '/'
                            : `/?category=${category.title}`
                    return (
                        <LinkDiv
                            selected={selectedCategory === category.title}
                            key={category._id}
                        >
                            <Link href={url} passHref>
                                {category.title}
                            </Link>
                        </LinkDiv>
                    )
                })}
                <Space />
            </CategoriesWrapper>
        </Wrapper>
    )
}

export default Categories
