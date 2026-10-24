import styled from 'styled-components'
import { SectionWrapper, TextHeading } from './sharedStyles.js'

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0px 20px 20px;
    p {
        margin-bottom: 12px;
        font-size: 16px;
    }
    @media (min-width: 1310px) {
        padding: 0px 200px;
        padding-bottom: 40px;
        p {
            font-size: 18px;
        }
    }
`

const ProductCareSection = ({ title, text }) => {
    return (
        <SectionWrapper>
            <TextWrapper>
                <TextHeading>{title}</TextHeading>
                {text}
            </TextWrapper>
        </SectionWrapper>
    )
}

export default ProductCareSection
