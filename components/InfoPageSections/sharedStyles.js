import styled from 'styled-components'

export const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 1310px) {
        padding-top: 60px;
        flex-direction: ${({ flexDirection }) => `${flexDirection}`};
        align-items: start;
    }
`

export const TextWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    text-align: center;
    padding: 0px 20px 20px;
    p {
        margin-bottom: 12px;
        font-size: 16px;
    }
    @media (min-width: 1310px) {
        width: ${({ fullscreenWidth }) => `${fullscreenWidth}`};
        max-width: none;
        text-align: left;
        padding: 0px;
        p {
            font-size: 18px;
        }
    }
`

export const TextHeading = styled.h2`
    font-size: 20px;
    font-weight: 100;
    @media (min-width: 1310px) {
        margin: 0px 0px 24px;
        font-size: 24px;
    }
`

export const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    @media (min-width: 1310px) {
        width: ${({ fullscreenWidth }) => `${fullscreenWidth}`};
        margin-left: ${(props) => (props.marginLeft ? '40px' : '0px')};
        margin-right: ${(props) => (props.marginRight ? '40px' : '0px')};
    }
`
