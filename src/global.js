// global.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	html, body {
		margin: 0;
		padding: 0;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}

	body {
		background: ${({ theme }) => theme.primaryBg};
		color: ${({ theme }) => theme.primaryColor};
//		font-family: Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		height: 100vh;
		text-rendering: optimizeLegibility;
	}

	main {
		position: relative;
		top: 50px;
		margin-top: 25px;
	}

/* Table coloring for math. */
	.table-math th {
		background-color: ${({ theme }) => theme.math.headerBg};
		color: ${({ theme }) => theme.math.headerColor};
	}
	.table-math tr:nth-of-type(odd) {
		background-color: ${({ theme }) => theme.math.rowBg}; //rgba(223, 240, 216, .2);
		color: ${({ theme }) => theme.math.rowColor}; // #666;
	}
	.table-math tr:nth-of-type(even) {
		background-color: ${({ theme }) => theme.math.rowAltBg}; // white;
		color: ${({ theme }) => theme.math.rowAltColor}; // #666;
	}

/*
	.math-primary {
		color: ${({ theme }) => theme.math.color}; // #337ab7;
		font-size: ${({ theme }) => theme.math.fontSize}; // 1.25em;
	}
*/

  `
