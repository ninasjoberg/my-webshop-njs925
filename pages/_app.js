import { Provider } from 'react-redux'
import { store } from '../redux/store'
import GlobalStyle from '../components/styles/GlobalStyles'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
