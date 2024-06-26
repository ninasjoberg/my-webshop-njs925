import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { getItemListFromLocalStorage } from '../utils/localStorage'
import { setCart } from '../redux/cartSlice'
import CartModal from './Cart/CartModal'

const HeaderWrapper = styled.header`
    width: 100%;
`

const Navigation = styled.nav`
    position: fixed;
    z-index: 10;
    top: 0;
    background-color: #3c3c3c;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    @media (max-width: 700px) {
        padding: 6px;
    }
`

const LinkWrapper = styled.div`
    display: flex;
    flex-flow: wrap;
`

const LogoWrapper = styled.div`
    display: flex;
    margin-top: 75px;
    margin-left: 20px;
    justify-content: center;
    cursor: pointer;
    @media (max-width: 700px) {
        max-width: 40%;
        margin: 45px auto 0px;
    }
`

const Cart = styled.button`
    display: flex;
    align-items: center;
    background-color: #3c3c3c;
    border: none;
    cursor: pointer;
    @media (max-width: 700px) {
        padding-right: 3px;
    }
`

const CartText = styled.p`
    font-weight: 100;
    color: #fff;
    font-size: 16px;
    letter-spacing: 2px;
    margin-left: 4px;
    @media (hover: hover) {
        /* hack to not apply hover on mobile devices, because it does not work well with touchscreens */
        &:hover {
            color: #eed2c4;
        }
    }
    @media (max-width: 700px) {
        font-size: 12px;
    }
`

const CartAmount = styled.p`
    color: #4da7bc;
    font-size: 16px;
    font-weight: 100;
    margin-left: 4px;
    @media (max-width: 700px) {
        font-size: 12px;
    }
`

const LinkStyle = styled.a`
    margin: 6px;
    font-weight: 100;
    color: #fff;
    font-size: 16px;
    letter-spacing: 2px;
    ${({ active }) =>
        active &&
        `
		color: #4da7bc;
	`}
    @media (hover: hover) {
        /* hack to not apply hover on mobile devices, because it does not work well with touchscreens */
        &:hover {
            color: #eed2c4;
        }
    }
    @media (max-width: 700px) {
        font-size: 12px;
        margin: 4px 3px;
    }
`

const TitleH1 = styled.h1`
    letter-spacing: 2px;
    font-weight: 100;
    font-size: 16px;
    @media (max-width: 700px) {
        font-size: 14px;
        margin: 0 auto;
        padding: 0px 12px 12px 12px;
    }
`

const TitleP = styled.p`
    letter-spacing: 2px;
    font-weight: 100;
    font-size: 16px;
    margin: 12px auto;
    @media (max-width: 700px) {
        font-size: 14px;
        margin: 0 auto;
        padding: 0px 12px 12px 12px;
    }
`

// const AwayMessage = styled.div`
//     background-color: #fef3f0;
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

    const isProductPage = pathname.includes('produkt')

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
        <HeaderWrapper>
            <Navigation>
                <LinkWrapper>
                    <Link href="/" passHref>
                        <LinkStyle
                            active={
                                pathname === '/' ||
                                pathname === '/produkt' ||
                                pathname.includes('produkt')
                            }
                        >
                            PRODUKTER
                        </LinkStyle>
                    </Link>
                    <Link href="/info" passHref>
                        <LinkStyle active={asPath === '/info'}>INFO</LinkStyle>
                    </Link>
                    <Link href="/om" passHref>
                        <LinkStyle active={asPath === '/om'}>OM</LinkStyle>
                    </Link>
                    <Link href="/villkor" passHref>
                        <LinkStyle active={asPath === '/villkor'}>
                            VILLKOR
                        </LinkStyle>
                    </Link>
                </LinkWrapper>
                <Cart onClick={onCartClick}>
                    <CartText>VARUKORG</CartText>
                    <CartAmount>{cartCount()}</CartAmount>
                </Cart>
            </Navigation>
            {showCart && <CartModal onCartClose={onCartClose} />}
            <div>
                <LogoWrapper>
                    <Link aria-label="Gå till startsidan" href="/" passHref>
                        <Image
                            src="/logga_njs925.jpg"
                            alt="Illustrerad logga med namn - NJS 925"
                            width="200px"
                            height="125px"
                        />
                    </Link>
                </LogoWrapper>
                {isProductPage ? (
                    <TitleP>
                        Handgjorda smycken i 925 sterling silver. Tillverkade i
                        liten skala, av mig Nina Johanna Sjöberg.
                    </TitleP>
                ) : (
                    <TitleH1>
                        Handgjorda smycken i 925 sterling silver. Tillverkade i
                        liten skala, av mig Nina Johanna Sjöberg.
                    </TitleH1>
                )}
            </div>
            {/* <AwayMessage>
                <h4>Semester tom 12 augusti!</h4>
                <p>Ordrar som läggs innan dess kommer att skickas i turordning efter 12:e aug.</p>
                <p>Trevlig sommar!</p>
            </AwayMessage> */}
        </HeaderWrapper>
    )
}

export default withRouter(Header)
