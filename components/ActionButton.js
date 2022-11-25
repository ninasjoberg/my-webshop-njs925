import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #4da7bc;
    border: none;
    color: white;
    border-radius: 4px;
    border: 1px solid #4d828e;
    :hover {
        border: 1px solid #3c3c3c;
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
