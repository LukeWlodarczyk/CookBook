import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
	const newDate = new Date(date).toLocaleDateString('en-GB');
	const newTime = new Date(date).toLocaleTimeString('en-GB');
	return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
	<div>
		<h3>User Info</h3>
		<p>Username: {session.getCurrentUser.username}</p>
		<p>Email: {session.getCurrentUser.email}</p>
		<p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
		<ul>
			<h3>
				{session.getCurrentUser.username}
				{"'"}s Favorites
			</h3>
			{session.getCurrentUser.favourites.map(favourite => (
				<li key={favourite.id}>
					<Link to={`/recipes/${favourite.id}`}>
						<p>{favourite.name}</p>
					</Link>
				</li>
			))}
			{!session.getCurrentUser.favourites.length && (
				<p>
					<strong>You have no favorites currently. Go add some!</strong>
				</p>
			)}
		</ul>
	</div>
);

export default UserInfo;
