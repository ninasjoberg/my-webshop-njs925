import React from 'react';
import styled from 'styled-components'
import ActionButton from '../ActionButton.js'


const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        color: #51616a;
    }
    input, textarea {
        height: 52px;
        width: 100%;
        border-radius: 3px;
        border: 1px solid lightgray;
        margin-bottom: 10px;
        padding: 0 0 0 10px;
        font-size: 16px;
    }
    textarea {
        height: 100px;
        padding-top: 10px;
    }
    p {
        text-align: left;
    }
`;

const ErrorInfo = styled.div`
    position: relative;
    bottom: 215px;
    background-color: white;
    max-width: 400px;
    height: 100px;
    border: 3px solid orange;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        color: orange;
        font-size: 24px;
    }
`


const AddressForm = ({ userInformation, message, handleChange, handleSubmit, errorText }) => {
    const {name, street, zipcode, city, email} = userInformation
    return (
        <div>
            <Form
                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit(e)
                  }}>
                <label>Namn:</label>
                <input type="text" name='name' value={name} onChange={handleChange} placeholder='Förnamn Efternamn' />
                <label>Adress:</label>
                <input type="text" name='street' value={street} onChange={handleChange} placeholder='gatauadress' />
                <input type="text" name='zipcode' value={zipcode} onChange={handleChange} placeholder='postnummer'/>
                <input type="text" name='city' value={city} onChange={handleChange} placeholder='stad' />
                <label>Mailadress:</label>
                <input type="text" name='email' value={email} onChange={handleChange} placeholder='mailadress' />
                <label>Meddelande:</label>
                <textarea type="text" name='message' value={message} onChange={handleChange} />
                <p>Betalning sker via Swish i samband med leveransbekräftelse.</p>
                <p>Vidare info och orderbekräftelsen fås via mail.</p>
                <ActionButton buttonText="Skicka order" />
                {errorText &&
                    <ErrorInfo>
                        <p>{errorText}</p>
                    </ErrorInfo>
                }
            </Form>
        </div>
    )
}

export default AddressForm




