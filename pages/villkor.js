import client from '../cmsApi'
import Head from 'next/head'
import styled from 'styled-components'
import Header from '../components/Header'
import PageContent from '../components/PageContent'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const productCare = ({ pageInfo }) => {
    const { body } = pageInfo[0]

    const texArray = body.map((section) => {
        return <p key={section[0]._key}>{section[0].text}</p>
    })

    return (
        <Wrapper>
            <Head>
                <title>NJS 925: silversmycken</title>
                <meta
                    name="description"
                    content="Handgjorda smycken i 925 sterling silver, tillverkade i liten skala. Kvinnosymboler, geometriska former och stilren design."
                />
                <link rel="canonical" href="https://www.njs925.se/conditions" />
            </Head>
            <Header />
            <PageContent texArray={texArray} />
            <Footer />
        </Wrapper>
    )
}

// This function gets called at build time
export const getStaticProps = async () => {
    const pageQuery = `*[_type == 'page' && title == 'Conditions'] {
		"body": body.se[].children[],
	}`
    const pageInfo = await client.fetch(pageQuery)
    return {
        props: {
            pageInfo,
        },
    }
}

export default productCare
