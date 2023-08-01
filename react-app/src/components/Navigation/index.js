import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import ServerFormModal from '../ServerFormModal'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Sonic</NavLink>
			</li>
			{isLoaded && (
				<div>
					<OpenModalButton modalComponent={<ServerFormModal title='Create Server' />} buttonText='Create Server'/>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
