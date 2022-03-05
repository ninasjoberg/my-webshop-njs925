import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		:focus {
			-webkit-tap-highlight-color: transparent;
			outline: none;
			-ms-touch-action: manipulation;
			touch-action: manipulation;
		}
	}
	html {
		font-family: helvetica;
		text-align: center;
		line-height: 1.5;
		background-color: #eed2c4;
		body {
			margin: 0px;
		}
		h1 {
			font-weight: 100;
			letter-spacing: 2px;
			text-transform: uppercase;
		}
		h2 {
			margin: 12px auto;
			font-size: 16px;
			font-weight: 100;
			letter-spacing: 2px;
		}
		h3 {
			margin: 16px auto;
			font-weight: 100;
			letter-spacing: 2px;
			text-transform: uppercase;
		}
		p {
			margin: 0;
			color: #51616a;
		}
		ul, li, a {
			text-decoration: none;
			list-style-type: none;
			padding: 0;
		}
		button:focus {
			outline: 0;
			opacity: 1;
		}
		a {
			font-size: 16px;
		}
	}
`

export default GlobalStyle
