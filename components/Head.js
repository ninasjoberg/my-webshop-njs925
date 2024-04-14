import { Head as NextHead }  from 'next/head'


const Head = ({ title, slug }) => {
    return (
        <NextHead>
            <title>
                {title || 'silversmycke från NJS 925'}
            </title>
            <meta
                name="description"
                content="Handgjort smycken i 925 sterling silver, tillverkat i liten skala av mig i min verkstad."
            />
            <link
                rel="canonical"
                href={`https://www.njs925.se/produkt/${slug}`}
            />
        </NextHead>
    )
}

export default Head