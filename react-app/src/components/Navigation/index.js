import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';


function Navigation({ isLoaded }) {


	return (
		<ul>
			<li>
				<NavLink exact to="/">Sonic</NavLink>
			</li>
			{isLoaded && (
				<div>

				</div>
			)}
		</ul>
	);
}

export default Navigation;
