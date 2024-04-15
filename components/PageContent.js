import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.main`
    background-color: #fef3f0;
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

const LogoInfo = styled.p`
    font-size: 18px;
    @media (max-width: 700px) {
        font-size: 16px;
    }
    a {
        text-decoration: underline;
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

const PageContent = ({ imageArray, texArray, isAboutPage }) => {
    return (
        <MainWrapper>
            <ContentWrapper>
                {imageArray && imageArray}
                {texArray}
                {isAboutPage && (
                    <>
                        <LogoInfo>
                            Den fina logga ni ser på sidan är skapad av{' '}
                            <a
                                href="https://www.mirakurkiala.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Mira Kurkiala.
                            </a>
                        </LogoInfo>
                        <p>
                            /Nina Johanna Sjöberg, Godkänd för F-skatt,
                            registrerad för moms.
                        </p>
                    </>
                )}
                <ContactLinks>
                    <a
                        href="mailto: info@njs925.se"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>email</span>
                    </a>
                    <a
                        href="https://www.instagram.com/njs925.se/"
                        target="_blank"
                        rel="noreferrer"
                    >
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
