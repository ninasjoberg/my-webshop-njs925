import Image from 'next/image'
import {
    SectionWrapper,
    TextHeading,
    TextWrapper,
    ImageDiv,
} from './sharedStyles.js'

const ProductionSection = ({ title, text, images }) => {
    return (
        <SectionWrapper flexDirection="row-reverse">
            <ImageDiv fullscreenWidth="50%" marginLeft>
                <Image
                    src={`${images[0].props.src}?fm=webp`}
                    alt={'bild på tillverkning av silversmycke'}
                    width={700}
                    height={425}
                ></Image>
            </ImageDiv>
            <TextWrapper fullscreenWidth="50%">
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </SectionWrapper>
    )
}

export default ProductionSection
