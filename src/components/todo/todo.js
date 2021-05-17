import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from './../hooks/axiosHook';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
	const [list, fetchingData] = useAjax(todoAPI);

	useEffect(() => {
		document.title = `To Do List: incomplete ${
			list.filter((item) => item.complete).length
		} `;
	});

	useEffect(fetchingData, []);

	return (
		<>
			<Navbar
				expand="lg"
				variant="dark"
				bg="dark"
				style={{ width: '80%', margin: '1rem auto 0', paddingLeft: '1rem' }}
			>
				<Navbar.Brand>
					There are ({list.filter((item) => item.complete).length}) Items To
					Complete
				</Navbar.Brand>
			</Navbar>

			<Container fluid="md" style={{ marginTop: '5rem' }}>
				<Row className="justify-content-md-center">
					<Col sm={4}>
						<Card>
							<Card.Body>
								<Card.Text>
									<TodoForm handleSubmit={fetchingData} />
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={{ span: 5, offset: 1 }}>
						<TodoList
							list={list}
							handleComplete={fetchingData}
							handleDelete={fetchingData}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ToDo;
