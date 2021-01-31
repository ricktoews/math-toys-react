import React from 'react';
import styled from 'styled-components';

const HelpButton = styled.div`
	position: absolute;
	top: 7px;
	right: -28px;
    color: purple;
	width: 25px;
	height: 25px;
    opacity: 1;
    cursor: pointer;
`;

function Help(props) {
	const handleClick = e => {
		e.preventDefault();
		console.log('Clicked help button');
	}

	return <HelpButton onClick={props.action}>
		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clipRule="evenodd"></path></svg>
		</HelpButton>;
}

export default Help;
