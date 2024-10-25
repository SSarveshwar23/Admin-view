import React from 'react';
import { Link } from 'react-router-dom';

function DropdownProfile() {
	return (
		<div className="navbar-item navbar-user dropdown">
			<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
				<div className="image image-icon bg-gray-800 text-gray-600">
					<i className="fa fa-user"></i>
				</div>
				<span>
					<span className="d-none d-md-inline">Adam Schwartz</span>
					<b className="caret"></b>
				</span>
			</a>
			<div className="dropdown-menu dropdown-menu-end me-1">
				<Link to="settings/" className='dropdown-item'>Edit Profile</Link>
				<Link to="email/inbox/" className="dropdown-item d-flex align-items-center">Inbox
					<span className="badge bg-danger rounded-pill ms-auto pb-4px">2</span></Link>
				<Link to="calendar/" className='dropdown-item'>Calendar</Link>
				<Link to="settings/" className='dropdown-item'>Settings</Link>
				<Link to="/" className='dropdown-item'>Log Out</Link>
				{/* <a href="settings/" className="dropdown-item">Edit Profile</a> */}
				{/* <a href="#/" className="dropdown-item d-flex align-items-center">
					Inbox
					<span className="badge bg-danger rounded-pill ms-auto pb-4px">2</span> 
				</a>
				<a href="#/" className="dropdown-item">Calendar</a>
				<a href="#/" className="dropdown-item">Settings</a>
				<div className="dropdown-divider"></div>
				<a href="#/" className="dropdown-item">Log Out</a> */}
			</div>
		</div>
	);
};

export default DropdownProfile;
