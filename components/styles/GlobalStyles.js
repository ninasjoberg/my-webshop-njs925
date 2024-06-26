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
		/* background-color: #eed2c4; */
		body {
			margin: 0px;
		}
		h1 {
			margin: 12px auto;
			font-size: 20px;
			font-weight: 100;
			letter-spacing: 2px;
		}
		h2 {
			margin: 16px auto 8px;
			font-weight: 100;
			letter-spacing: 2px;
			text-transform: uppercase;
		}
		h3 {
			margin: 16px auto 8px;
			font-weight: 100;
			letter-spacing: 2px;
			text-transform: uppercase;
		}
		p {
			margin: 0;
			color: #3c3c3c;
    		font-size: 16px;
			font-weight: 200;
			font-family: helvetica;
			@media (max-width: 700px) {
				font-size: 16px;
			}
		}
		ul, li, a {
			text-decoration: none;
			list-style-type: none;
			padding: 0;
		}
		button {
			font-family: helvetica;
		}
		button:focus {
			outline: 0;
			opacity: 1;
		}
		a {
			font-size: 18px;
			color: #3c3c3c;
			@media (max-width: 700px) {
        		font-size: 16px;
    		}
		}
	}
`

export default GlobalStyle
