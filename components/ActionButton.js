import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 16px;
    letter-spacing: 1px;
    cursor: pointer;
    background-color: #29889e;
    border: none;
    color: white;
    height: 40px;
    border-radius: 25px;
    margin-top: 20px;
    :hover {
        background-color: #257385;
    }
    :active {
        opacity: 0.4;
    }
    @media (min-width: 1310px) {
        height: 52px;
    }
`

const ActionButton = ({ buttonText, onClick }) => {
    return (
        <Button type="submit" value="Submit" onClick={onClick}>
            {buttonText}
        </Button>
    )
}

export default ActionButton
