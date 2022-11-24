import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
    background-color: #3c3c3c;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: auto 0px 0px;
    width: 100%;
    p,
    a {
        color: #f5eee8;
        font-weight: 100;
        @media (max-width: 700px) {
            font-size: 14px;
        }
    }
    a {
        margin-right: 10px;
    }
`

const Footer = () => {
    return (
        <Wrapper>
            <div>
                <a href="https://www.instagram.com/njs925.se/">instagram</a>
                <a href="mailto:info@njs925.se">email</a>
            </div>
            <p>Developed by Nina Sjöberg</p>
        </Wrapper>
    )
}

export default Footer
