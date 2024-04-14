import { useState } from 'react'
import styled from 'styled-components'

const Select = styled.div`
    width: 60%;
    margin-right: 10px;
`
const Button = styled.div`
    cursor: pointer;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: white;
    border: 1px solid #a9a4a4;
    height: 40px;
    &:hover {
        background: #f0f0f0;
    }
`

const Arrow = styled.span`
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    ${({ isActive }) =>
        isActive ? 'transform: rotate(-135deg)' : 'transform: rotate(45deg)'};
`

const Content = styled.div`
    width: 100%;
    background: white;
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`

const Item = styled.option`
    padding: 10px;
    cursor: pointer;
    z-index: -1;
    display: block;
    width: 100%;
    &:hover {
        background: #f0f0f0;
    }
`

const Dropdown = ({ onChange, selctedValue, variants }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <Select>
            <Button
                onClick={() => {
                    setIsActive(!isActive)
                }}
            >
                {selctedValue}
                <Arrow isActive={isActive} />
            </Button>
            <Content isActive={isActive}>
                {variants.map((variant) => {
                    return (
                        <Item
                            onClick={(e) => {
                                onChange(e), setIsActive(!isActive)
                            }}
                            value={variant.title}
                        >
                            {variant.title}
                        </Item>
                    )
                })}
            </Content>
        </Select>
    )
}

export default Dropdown
