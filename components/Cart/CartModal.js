import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import styled from 'styled-components'
import 'isomorphic-fetch'
import AddressForm from './AddressForm.js'
import ActionButton from '../ActionButton.js'
import { removeFromCart, clearCart } from '../../redux/cartSlice'

const CartWrapper = styled.div`
    background-color: #fff;
    position: fixed;
    right: 40px;
    top: 46px;
    width: 500px;
    max-height: 80vh;
    overflow-x: scroll;
    padding: 50px;
    border: 1px solid #dce1e2;
    border-color: #dce1e2;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    z-index: 1;
    ${({ confirmation }) =>
        confirmation &&
        `
        align-items: center;
        p {
            margin-bottom: 12px;
        }
	`}
    @media (max-width: 700px) {
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        max-height: none;
        height: 100%;
        padding: 20px;
        top: 38px;
        padding-bottom: 50px;
    }
`

const CloseButton = styled.button`
    display: flex;
    align-self: flex-end;
    width: 20px;
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: white;
    :hover {
        opacity: 0.4;
    }
    span {
        color: #000;
        font-size: 24px;
    }
`

const InfoHeaders = styled.div`
    display: flex;
    justify-content: space-between;
`

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const RemoveButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background-color: #f5eee8;
    cursor: pointer;
    span {
        color: #000;
    }
    :hover {
        opacity: 0.4;
    }
`

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: lightgray;
`

const ItemWrapper = styled.div`
    display: flex;
    margin: 20px 0;
    align-items: center;
    justify-content: space-between;
`

const ProductInfoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ItemTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 145px;
    @media (max-width: 700px) {
        width: 120px;
    }
`

const ItemTitle = styled.p`
    text-align: left;
`

const ItemText = styled.p`
    text-align: left;
    font-size: 14px;
`

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const ItemQuantity = styled.p`
    margin-right: 12px;
    white-space: nowrap;
`

const PriceTag = styled.p`
    display: flex;
    flex-basis: 25%;
    justify-content: flex-end;
`

const TotalCost = styled.p`
    text-align: right;
    font-weight: bold;
    padding: 10px 0;
`

const CartModal = ({ onCartClose }) => {
    const [showAddressForm, setShowAdressForm] = useState(false)
    const [userInformation, setUserInformation] = useState({
        name: '',
        street: '',
        zipcode: '',
        city: '',
        email: '',
    })
    const [message, setMessage] = useState('')
    const [errorText, setErrorText] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errorSendingMail, setErrorSendingMail] = useState(false)
    const cart = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()

    const removeProductFromCart = (item) => {
        const productInfo = {
            id: item.id,
            variant: item.variant,
        }
        dispatch(removeFromCart(productInfo))
    }

    const addAddressClick = () => {
        setShowAdressForm(!showAddressForm)
    }

    const onChange = (e) => {
        setErrorText('')
        if (e.target.name === 'message') {
            setMessage(e.target.value)
        } else {
            setUserInformation({
                ...userInformation,
                [e.target.name]: e.target.value,
            })
        }
    }

    const onSubmit = (event, priceTotal) => {
        event.preventDefault()

        if (Object.values(userInformation).includes('')) {
            setErrorText('Du måste fylla i adress och email.')
            return
        }
        const body = {
            userInfo: userInformation,
            message: message,
            order: cart,
            priceTotal,
        }

        fetch('/api/address', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.status === 200) {
                setSubmitted(true)
                dispatch(clearCart())
            } else {
                setErrorSendingMail(true)
            }
        })
    }

    const productArray = cart.map((item, index) => {
        if (item.images) {
            return (
                <ProductInfo key={index}>
                    <ItemWrapper>
                        <ProductInfoWrapper>
                            <Image
                                src={`${item.images[0]}?fm=webp`}
                                alt="product picture"
                                height="60px"
                                width="60px"
                            />
                            <ItemTextDiv>
                                <ItemTitle>{item.title}</ItemTitle>
                                <ItemText>{item.variant}</ItemText>
                                <ItemText>{item.size}</ItemText>
                                <ItemText>{item.price} kr/st</ItemText>
                            </ItemTextDiv>
                        </ProductInfoWrapper>
                        <QuantityWrapper>
                            <ItemQuantity>{item.quantity} st</ItemQuantity>
                            <RemoveButton
                                onClick={() => removeProductFromCart(item)}
                            >
                                <span>X</span>
                            </RemoveButton>
                        </QuantityWrapper>
                        <PriceTag>{item.price * item.quantity} kr</PriceTag>
                    </ItemWrapper>
                    <Divider />
                </ProductInfo>
            )
        } else return null
    })

    const priceTotal = cart
        .map((item) => {
            return item.price * item.quantity
        })
        .reduce((item, currentValue) => {
            return item + currentValue
        }, 0)

    if (submitted) {
        return (
            <CartWrapper confirmation>
                <h3>TACK!</h3>
                <p>Din order har nu skickats!</p>
                <p>
                    En orderbekräftelse kommer skickas till dig per mail, så
                    snart jag behandlat din order.
                </p>
                <ActionButton buttonText="Stäng" onClick={onCartClose} />
            </CartWrapper>
        )
    }

    if (errorSendingMail) {
        return (
            <CartWrapper confirmation>
                <h3>Något gick fel..</h3>
                <p>Tyvärr skickades inte din order iväg korrrekt.</p>
                <p>Vänligen försök igen eller kontakta mig på info@njs925.se</p>
                <ActionButton buttonText="Stäng" onClick={onCartClose} />
            </CartWrapper>
        )
    }

    return (
        <CartWrapper>
            <CloseButton onClick={onCartClose}>
                <span>X</span>
            </CloseButton>
            <h3>HÄR ÄR DIN VARUKORG</h3>
            <div>
                <InfoHeaders>
                    <p>Produkt</p>
                    <p></p>
                    <p>Antal</p>
                    <p>Pris</p>
                </InfoHeaders>
                <Divider />
                {productArray}
                <TotalCost>totalt: {priceTotal} kr</TotalCost>
                <Divider />
            </div>
            <div>
                <ActionButton
                    buttonText="Leveransadress"
                    onClick={addAddressClick}
                />
            </div>
            {showAddressForm && (
                <AddressForm
                    userInformation={userInformation}
                    message={message}
                    errorText={errorText}
                    handleChange={onChange}
                    handleSubmit={(event) => onSubmit(event, priceTotal)}
                />
            )}
        </CartWrapper>
    )
}

export default CartModal
