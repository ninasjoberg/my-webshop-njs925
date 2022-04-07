import Image from 'next/image'
import { PageWrapper, TextHeading, TextWrapper } from './sharedStyles.js'

const SpecialOrdersSection = ({ title, text, images }) => {
    return (
        <PageWrapper flexDirection="row">
            <Image
                src={`${images[0].props.src}?fm=webp`}
                alt={'produktbild silversmycke med en bergskristall'}
                width={570}
                height={570}
            ></Image>
            <TextWrapper fullscreenWidth="66%">
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </PageWrapper>
    )
}

export default SpecialOrdersSection
