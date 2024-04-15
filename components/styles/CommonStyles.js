import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const MainWrapper = styled.main`
    width: 80%;
    max-width: 1200px;
    padding: 50px;
    display: flex;
    background-color: #fef3f0;
    margin: 12px 0;
    text-align: left;
    p {
        margin-bottom: 10px;
    }
    @media (max-width: 700px) {
        flex-direction: column;
        width: 100%;
        padding: 25px 25px 25px;
        margin: 6px 0 0;
        p {
            margin-bottom: 6px;
            letter-spacing: 0.8px;
        }
    }
`
