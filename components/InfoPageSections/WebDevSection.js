import Image from 'next/image'
import {
    SectionWrapper,
    TextHeading,
    TextWrapper,
    ImageDiv,
} from './sharedStyles.js'

const WebDevSection = ({ title, text, images }) => {
    return (
        <SectionWrapper flexDirection="row">
            <ImageDiv fullscreenWidth="50%" marginRight>
                <Image
                    src={`${images[0].props.src}?fm=webp`}
                    alt={'dator'}
                    width={700}
                    height={485}
                ></Image>
            </ImageDiv>
            <TextWrapper fullscreenWidth="50%">
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </SectionWrapper>
    )
}

export default WebDevSection
