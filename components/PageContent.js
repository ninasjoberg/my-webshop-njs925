import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.main`
    background-color: #f5eee8;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    img {
        width: 500px;
        height: auto;
        margin-bottom: 50px;
    }
    p {
        text-align: left;
        width: 100%;
        padding: 12px 12px;
    }
    @media (max-width: 700px) {
        padding: 16px 0 0;
        p {
            padding: 12px 20px 0;
        }
        img {
            width: 100%;
            margin-bottom: 0;
        }
    }
`

const ContactLinks = styled.div`
    display: flex;
    padding: 60px;
    a {
        margin-right: 10px;
        color: black;
        font-weight: 100;
    }
`

const PageContent = ({ imageArray, texArray }) => {
    return (
        <MainWrapper>
            <ContentWrapper>
                {imageArray && imageArray}
                {texArray}
                <ContactLinks>
                    <a href="mailto: bellpepperstore@gmail.com">
                        <span>email</span>
                    </a>
                    <a href="https://www.instagram.com/bellpepperse/">
                        <span>instagram</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nina-sj%C3%B6berg-9aa71b22/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>linkedIn</span>
                    </a>
                    <a
                        href="https://github.com/ninasjoberg"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>gitHub</span>
                    </a>
                </ContactLinks>
            </ContentWrapper>
        </MainWrapper>
    )
}

export default PageContent
