import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { getItemListFromLocalStorage } from '../utils/localStorage'
import { setCart } from '../redux/cartSlice'
import CartModal from './Cart/CartModal'

const TopHeader = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: #3c3c3c;
    width: 100%;
`

const LinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    padding: 10px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
    background-color: #3c3c3c;
    margin-top: 40px;
    @media (max-width: 700px) {
        padding: 12px;
    }
`

const Cart = styled.button`
    display: flex;
    align-items: center;
    background-color: #3c3c3c;
    border: none;
    cursor: pointer;
`

const CartText = styled.p`
    font-weight: 100;
    color: #f5eee8;
    font-size: 16px;
    margin-left: 4px;
    &:hover {
        color: #eed2c4;
    }
    @media (max-width: 700px) {
        font-size: 14px;
    }
`

const CartAmount = styled.p`
    color: #06d0b2;
    font-size: 16px;
    font-weight: 100;
    margin-left: 4px;
    @media (max-width: 700px) {
        font-size: 14px;
    }
`

const LinkStyle = styled.a`
    color: #f5eee8;
    margin: 6px;
    font-weight: 100;
    &:hover {
        color: #eed2c4;
    }
    ${({ active }) =>
        active &&
        `
		color: #06d0b2;
	`}
    @media (max-width: 700px) {
        font-size: 14px;
    }
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    color: #06d0b2;
    cursor: pointer;
    &:hover {
        color: #eed2c4;
    }
    @media (max-width: 700px) {
        margin: 6px;
    }
`

const SubTitle = styled.h2`
    color: #f5eee8;
    letter-spacing: 2px;
    font-weight: 100;
    @media (max-width: 700px) {
        font-size: 12px;
    }
`

// const AwayMessage = styled.div`
//     background-color: #f5eee8;
// 	margin: auto;
//     padding: 12px;
// 	h4 {
// 		color: #51616a;
// 		margin: 6px auto;
// 	}
// `

const Header = ({ router: { asPath = '/', pathname } = {} }) => {
    const [checkLocalStorage, setCheckLocalStorage] = useState(true)
    const [showCart, setShowCart] = useState(false)
    const cart = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()

    useEffect(() => {
        if (checkLocalStorage) {
            const productsInCart = getItemListFromLocalStorage('cartArray')
            dispatch(setCart(productsInCart))
            setCheckLocalStorage(false)
        }
    }, [checkLocalStorage, dispatch])

    const onCartClick = () => {
        setShowCart(!showCart)
    }

    const onCartClose = () => {
        setShowCart(false)
    }

    const cartCount = () => {
        if (cart.length > 0) {
            const quantity = cart
                .map((item) => {
                    return item.quantity
                })
                .reduce((item, currentValue) => {
                    return item + currentValue
                }, 0)
            return quantity
        }
        return 0
    }

    return (
        <>
            <TopHeader>
                <LinkWrapper>
                    <div>
                        <Link href="/" passHref>
                            <LinkStyle
                                active={
                                    pathname === '/' ||
                                    pathname === '/product' ||
                                    pathname.includes('product')
                                }
                            >
                                Produkter
                            </LinkStyle>
                        </Link>
                        <Link href="/info" passHref>
                            <LinkStyle active={asPath === '/info'}>
                                Info
                            </LinkStyle>
                        </Link>
                        <Link href="/about" passHref>
                            <LinkStyle active={asPath === '/about'}>
                                Om
                            </LinkStyle>
                        </Link>
                        <Link href="/conditions" passHref>
                            <LinkStyle active={asPath === '/conditions'}>
                                Köpvillkor
                            </LinkStyle>
                        </Link>
                    </div>
                    <Cart onClick={onCartClick}>
                        <CartText>Varukorg</CartText>
                        <CartAmount>{cartCount()}</CartAmount>
                    </Cart>
                </LinkWrapper>
            </TopHeader>
            <Wrapper>
                <TitleWrapper>
                    <Link href="/" passHref>
                        <Title>NJS 925</Title>
                    </Link>
                    <SubTitle>
                        Handgjorda smycken i 925 sterling silver. Tillverkade i
                        liten skala, av mig Nina Johanna Sjöberg.
                    </SubTitle>
                </TitleWrapper>
                {showCart && <CartModal onCartClose={onCartClose} />}
            </Wrapper>
            {/* <AwayMessage>
                <h4>Semester tom 12 augusti!</h4>
                <p>Ordrar som läggs innan dess kommer att skickas i turordning efter 12:e aug.</p>
                <p>Trevlig sommar!</p>
            </AwayMessage> */}
        </>
    )
}

export default withRouter(Header)
