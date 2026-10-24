import Head from 'next/head'
import NotFound from '../components/NotFound'

const NotFoundPage = () => {
    return (
        <>
            <Head>
                <title>Sidan finns inte | NJS 925</title>
            </Head>
            <NotFound />
        </>
    )
}

export default NotFoundPage
