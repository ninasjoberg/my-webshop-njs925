import Head from 'next/head'
import Script from 'next/script'
import { Provider } from 'react-redux'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { store } from '../redux/store'
import GlobalStyle from '../components/styles/GlobalStyles'

// styled-components v6 no longer filters out custom props (like `active`) before
// passing them to the DOM, this keeps the v5 behaviour
function shouldForwardProp(propName, target) {
    if (typeof target === 'string') {
        return isPropValid(propName)
    }
    return true
}

function MyApp({ Component, pageProps }) {
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <GlobalStyle />
            {/* defaults for all pages, a page can override them by using a meta tag with the same key */}
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    property="og:title"
                    content="NJS 925: silversmycken"
                    key="og:title"
                />
                <meta property="og:type" content="website" key="og:type" />
                <meta
                    property="og:description"
                    content="Handgjorda smycken i 925 sterling silver, tillverkade i liten skala. Kvinnosymboler, geometriska former och stilren design."
                    key="og:description"
                />
            </Head>
            <Script
                src="https://cloud.umami.is/script.js"
                data-website-id="0fbb9a6c-8701-4be2-bf0b-31ad0e4ca402"
                strategy="afterInteractive"
            />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </StyleSheetManager>
    )
}

export default MyApp
