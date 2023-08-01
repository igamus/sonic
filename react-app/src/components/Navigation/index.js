import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import ServerFormModal from '../ServerFormModal'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<div>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
					<OpenModalButton modalComponent={<ServerFormModal title='Create Server' />} buttonText='Create Server'/>
				</div>
			)}
		</ul>
	);
}

export default Navigation;