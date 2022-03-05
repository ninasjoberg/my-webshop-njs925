import styled from 'styled-components'
import {
	PageWrapper,
	TextHeading,
	TextWrapper,
} from './sharedStyles.js'

const ImagesDiv = styled.div`
	display: flex;
	width: 100%;
	height: 255px;
	@media (min-width: 800px) {
		width: 80%;
		height: 400px;
    }
	@media (min-width: 1310px) {
		width: 66%;
		height: 530px;
    }
`

const ImageWrapper = styled.div`
	width: 100%;
	background-position: 50% 50%;
	background-size: cover;
	${({ url }) => url && `
		background-image: url(${url});
	`}
`

const ProductionSection =  ({ title, text, images }) => {
    return (
		<PageWrapper flexDirection='row-reverse'>
			{images &&
				<ImagesDiv>
					<ImageWrapper url={images[0].props.src} />
					<ImageWrapper url={images[1].props.src} />
				</ImagesDiv>
			}
			<TextWrapper fullscreenWidth='34%'>
				<TextHeading>
					{title}
				</TextHeading>
				{text}
			</TextWrapper>
		</PageWrapper>
    )
}

export default ProductionSection