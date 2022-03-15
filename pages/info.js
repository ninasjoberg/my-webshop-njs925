import Image from 'next/image'
import Head from 'next/head'
import styled from 'styled-components'
import client from '../cmsApi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductionSection from '../components/InfoPageSections/ProductionSection'
import WebDevSection from '../components/InfoPageSections/WebDevSection'
import SpecialOrdersSection from '../components/InfoPageSections/SpecialOrdersSection'
import ProductCareSection from '../components/InfoPageSections/ProductCareSection'

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Info = ({ pageInfo }) => {
    const sortedArray = pageInfo.sort((a, b) => {
        return a.order - b.order
    })

    const pageContent = sortedArray.map((section) => {
        const imageArray = section.imageUrls
            ? section.imageUrls.map((imageUrl, index) => {
                  const elementId = index === 0 ? 'observe' : ''
                  return (
                      <Image
                          key={index}
                          id={elementId}
                          src={imageUrl}
                          alt="product image"
                          height={100}
                          width={100}
                      />
                  )
              })
            : ''

        const textArray = section.body
            ? section.body.map((section) => {
                  return <p key={section[0]._key}>{section[0].text}</p>
              })
            : ''

        switch (section.title) {
            case 'Specialbeställningar och förlovningsringar':
                return (
                    <SpecialOrdersSection
                        text={textArray}
                        images={imageArray}
                        title={section.title}
                    />
                )

            case 'Tillverkning':
                return (
                    <ProductionSection
                        text={textArray}
                        images={imageArray}
                        title={section.title}
                    />
                )

            case 'Webbutveckling -  bygget av denna webshop':
                return (
                    <WebDevSection
                        text={textArray}
                        images={imageArray}
                        title={section.title}
                    />
                )

            case 'Skötselråd':
                return (
                    <ProductCareSection
                        text={textArray}
                        title={section.title}
                    />
                )

            default:
                return null
        }
    })

    return (
        <>
            <Head>
                <title>NJS 925: silversmycken</title>
                <meta
                    name="description"
                    content="Handgjorda smycken i 925 sterling silver, tillverkade i liten skala. Kvinnosymboler, geometriska former och stilren design."
                />
                <link rel="canonical" href="https://www.njs925.se/info" />
            </Head>
            <Header />
            <Wrapper>{pageContent}</Wrapper>
            <Footer />
        </>
    )
}

// This function gets called at build time
export const getStaticProps = async () => {
    const pageQuery = `*[_type == 'startPage'] {
		title,
		order,
		images,
		"imageUrls": images[].asset->url,
		"body": body.se[].children[],
	}`
    const pageInfo = await client.fetch(pageQuery)
    return {
        props: {
            pageInfo,
        },
    }
}

export default Info
