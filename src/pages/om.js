import Image from 'next/image'
import Head from 'next/head'
import styled from 'styled-components'
import client from '../lib/cmsApi'
import Header from '../components/Header'
import PageContent from '../components/PageContent'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const about = ({ pageInfo }) => {
    const { body, imageUrls } = pageInfo[0]

    const imageArray = imageUrls.map((imageUrl, index) => {
        return (
            <Image
                key={index}
                src={`${imageUrl}?fm=webp`}
                alt="bild på Nina som tillverkar smyckena"
                height={500}
                width={500}
            />
        )
    })

    const texArray = body.map((section) => {
        return <p key={section._key}>{section.text}</p>
    })

    return (
        <Wrapper>
            <Head>
                <title>Om mig - Nina Johanna Sjöberg | NJS 925</title>
                <meta
                    name="description"
                    content="Jag heter Nina Johanna Sjöberg och gör alla smycken för hand i 925 sterling silver, med inspiration från naturen, segling, klättring och odling. Läs mer om mig och NJS 925."
                />
                <meta
                    property="og:title"
                    content="Om mig - Nina Johanna Sjöberg | NJS 925"
                    key="og:title"
                />
                <link rel="canonical" href="https://njs925.se/om" />
            </Head>
            <Header />
            <PageContent
                imageArray={imageArray}
                texArray={texArray}
                isAboutPage={true}
            />
            <Footer />
        </Wrapper>
    )
}

// This function gets called at build time
export const getStaticProps = async () => {
    const pageQuery = `*[_type == 'page' && title == 'About'] {
		"body": body.se[]{ "_key": children[0]._key, "text": children[0].text },
		"imageUrls": images[].asset->url,
	}`
    const pageInfo = await client.fetch(pageQuery)
    return {
        props: {
            pageInfo,
        },
    }
}

export default about
