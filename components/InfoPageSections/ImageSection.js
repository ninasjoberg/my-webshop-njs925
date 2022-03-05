import styled from 'styled-components'

const PageWrapper = styled.div`
	background-color: #f5eee8;
	width: 100%;
	display: flex;
`

const ImageDiv = styled.div`
    padding: 0px 12px;
	display: flex;
    width: 100%;
	scroll-behavior: smooth;
	margin: 0 auto;
    overflow-x: scroll;
    justify-content: start;
    flex-flow: row;
    img {
		height: 400px;
		width: auto;
        height: 350px;
        margin-right: 12px;
        @media (max-width: 700px) {
            height: 250px;
        }
	}
`

const WebDevSection = ({ images }) => {
    return (
		<PageWrapper>
            <ImageDiv>{images}</ImageDiv>
		</PageWrapper>
    )
}

export default WebDevSection