import Image from 'next/image'
import styled from 'styled-components'
import { PageWrapper, TextHeading, TextWrapper } from './sharedStyles.js'

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

const ProductionSection = ({ title, text, images }) => {
    return (
        <PageWrapper flexDirection="row-reverse">
            {images && (
                <ImagesDiv>
                    <Image
                        src={`${images[0].props.src}?fm=webp`}
                        alt={'bild på tillverkning av silversmycke'}
                        width={600}
                        height={530}
                    ></Image>
                    <Image
                        src={`${images[1].props.src}?fm=webp`}
                        alt={'bild på tillverkning av silversmycke'}
                        width={600}
                        height={530}
                    ></Image>
                </ImagesDiv>
            )}
            <TextWrapper fullscreenWidth="34%">
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </PageWrapper>
    )
}

export default ProductionSection
