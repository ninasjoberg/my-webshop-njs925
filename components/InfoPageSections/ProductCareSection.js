import styled from 'styled-components'
import {
    TextHeading,
    TextWrapper,
} from './sharedStyles.js'

const PageWrapper = styled.div`
	background-color: #eed2c4;
	width: 100%;
	display: flex;
    justify-content: left;
    max-width: 1800px;
`

const ProductCareSection = ({ title, text }) => {
    return (
		<PageWrapper>
			<TextWrapper fullscreenWidth="67%">
				<TextHeading>
					{title}
				</TextHeading>
				{text}
			</TextWrapper>
		</PageWrapper>
    )
}

export default ProductCareSection