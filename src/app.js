import React, { useContext } from 'react';
import { If, Else, Then } from 'react-if';
import ToDo from './components/todo/todo.js';
import NavBar from './components/todo/navbar.js';
import PaginationProvider from './components/context/pagination';

import Auth from './components/auth/auth.js';
import { LoginContext } from './components/auth/context.js';

const EditLink = () => {
	return (
		<Auth capability="update">
			<span>Edit</span>
		</Auth>
	);
};

const DeleteLink = () => {
	return (
		<Auth capability="delete">
			<span>Delete</span>
		</Auth>
	);
};

const App = () => {
	const loginContext = useContext(LoginContext);

	return (
		<>
			<NavBar />
			<If condition={loginContext.loggedIn}>
				<Then>
					<PaginationProvider>
						<ToDo />
					</PaginationProvider>
				</Then>
				<Else>
					<div></div>
				</Else>
			</If>
			<EditLink />
			<DeleteLink />
		</>
	);
};

export default App;
