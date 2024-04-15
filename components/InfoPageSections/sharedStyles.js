import styled from 'styled-components'

export const PageWrapper = styled.div`
    background-color: #fef3f0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1800px;
    @media (min-width: 1310px) {
        flex-direction: ${({ flexDirection }) => `${flexDirection}`};
        align-items: start;
    }
`

export const TextHeading = styled.h2`
    font-size: 24px;
    font-weight: 100;
    margin: 0px 0px 24px;
`

export const TextWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 20px;
    text-align: left;
    @media (min-width: 1310px) {
        width: ${({ fullscreenWidth }) => `${fullscreenWidth}`};
        padding: 35px 50px;
        max-width: none;
    }
    p {
        margin-bottom: 12px;
    }
`
