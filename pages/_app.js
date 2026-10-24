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
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </StyleSheetManager>
    )
}

export default MyApp
