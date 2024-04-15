import { useState } from 'react'
import styled from 'styled-components'

const Select = styled.div`
    width: 100%;
    margin-right: 10px;
    margin-top: 20px;
    position: relative;
`
const Button = styled.div`
    cursor: pointer;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: white;
    border: 1px solid #d6d6d6;
    height: 40px;
    border-radius: 2px;
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

const Content = styled.ul`
    width: 100%;
    background: white;
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    position: absolute;
    z-index: 2;
    margin: 0;
    @media (max-width: 700px) {
        bottom: 40px;
    }
`

const Item = styled.li`
    padding: 10px;
    cursor: pointer;
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
                    const { title } = variant
                    return (
                        <Item
                            onClick={() => {
                                onChange(title), setIsActive(!isActive)
                            }}
                        >
                            {title}
                        </Item>
                    )
                })}
            </Content>
        </Select>
    )
}

export default Dropdown
