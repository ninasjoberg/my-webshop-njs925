import Image from 'next/image'
import { PageWrapper, TextHeading, TextWrapper } from './sharedStyles.js'

const WebDevSection = ({ title, text, images }) => {
    return (
        <PageWrapper flexDirection="row">
            <Image
                src={images[0].props.src}
                alt={'dator'}
                width={570}
                height={450}
            ></Image>
            <TextWrapper fullscreenWidth="63%">
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </PageWrapper>
    )
}

export default WebDevSection
