import Link from 'next/link'
import styled from 'styled-components'
import Header from './Header'
import { Wrapper, MainWrapper } from './styles/CommonStyles'

const NotFoundLink = styled.p`
    cursor: pointer;
    :hover {
        color: #4da7bc;
        opacity: 0.7;
    }
`

const NotFound = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <MainWrapper>
                    <h1>Denna produkt finns tyvärr inte.</h1>
                    <Link href={'/'} passHref>
                        <NotFoundLink>
                            se alla produkter från njs925.se
                        </NotFoundLink>
                    </Link>
                </MainWrapper>
            </Wrapper>
            <Footer />
        </>
    )
}

export default NotFound