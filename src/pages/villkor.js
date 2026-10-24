import client from '../lib/cmsApi'
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
        return <p key={section._key}>{section.text}</p>
    })

    return (
        <Wrapper>
            <Head>
                <title>Köpvillkor, frakt och retur | NJS 925</title>
                <meta
                    name="description"
                    content="Köpvillkor för NJS 925: betalning med Swish, fri frakt inom Sverige med Posten, leverans inom 10 arbetsdagar och information om retur."
                />
                <meta
                    property="og:title"
                    content="Köpvillkor, frakt och retur | NJS 925"
                    key="og:title"
                />
                <link rel="canonical" href="https://njs925.se/villkor" />
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
		"body": body.se[]{ "_key": children[0]._key, "text": children[0].text },
	}`
    const pageInfo = await client.fetch(pageQuery)
    return {
        props: {
            pageInfo,
        },
    }
}

export default productCare
