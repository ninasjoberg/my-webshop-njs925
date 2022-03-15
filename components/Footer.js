import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #3c3c3c;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    margin: auto 0px 0px;
    width: 100%;
    p {
        color: #f5eee8;
        font-weight: 100;
    }
`

const Footer = () => {
    return (
        <Wrapper>
            <p>Developed by Nina Sjöberg</p>
        </Wrapper>
    )
}

export default Footer
