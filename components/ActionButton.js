import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    width: 40%;
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
    :hover {
        background-color: #257385;
    }
    :active {
        opacity: 0.4;
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
