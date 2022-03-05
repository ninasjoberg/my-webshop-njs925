//Is rendered on the server side
//Is used to change the initial server side rendered document markup
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: [...initialProps.styles, ...sheet.getStyleElement()],
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        property="og:title"
                        content="NJS 925: silversmycken"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:description"
                        content="Handgjorda smycken i 925 sterling silver, tillverkade i liten skala. Kvinnosymboler, geometriska former och stilren design."
                    />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
                    />
                    <meta
                        name="google-site-verification"
                        content="P62ChL8wEUwp2QCClCPZzZ5Apk4xZm1sIfI9T-z0fsE"
                    />
                </Head>
                <body style={{ margin: 0 }} ontouchstart="">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
