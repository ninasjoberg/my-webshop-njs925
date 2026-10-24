import Head from 'next/head'

// structured data for google, rendered on the server so google does not have to run any js to find it
// (next/head only handles plain tags as children, that is why this component renders its own Head)
const JsonLd = ({ id, data }) => {
    return (
        <Head>
            <script
                key={id}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        ...data,
                    }),
                }}
            />
        </Head>
    )
}

export default JsonLd
