import React from 'react';
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	padding: 20px 0px 10px 0px;
	margin: 0 auto;
	@media (max-width: 700px) {
		width: 100vw;
		overflow-x: scroll;
	}
`;

const LinkDiv = styled.div` /* fix for styling next/link */
	margin-left: 12px;
	${({ selected }) => selected && `
		border-bottom: 2px solid #06d0b2;
	`}
	a {
		color: #f5eee8;
		font-weight: 100;
		font-size: 14px;
		cursor: pointer;
		white-space: nowrap;
		&:hover{
			color: #eed2c4;;
		}
	}
`

const Space = styled.div`
	padding-left: 12px;
`

const Categories = ({ categories, selectedCategory }) => {
	return (
		<Wrapper>
			{categories.map((category) => {
				const url = category.title === 'Alla produkter' ? '/' : `/?category=${category.title}`
				return (
					<LinkDiv selected={selectedCategory === category.title} key={category._id}>
						<Link
							href={url}
							passHref
						>
							{category.title}
						</Link>
					</LinkDiv>
				)
			})}
			<Space />
		</Wrapper>
	)
}

export default Categories

