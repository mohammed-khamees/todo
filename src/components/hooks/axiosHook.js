import axios from 'axios';
import { useState } from 'react';

const useAjax = (url) => {
	const [list, setList] = useState([]);

	let config = {
		headers: {
			mode: 'cors',
			cache: 'no-cache',
			'Content-Type': 'application/json',
		},
	};

	const fetchingData = async (id, method = 'get', item) => {
		if (method === 'get') {
			const results = await axios[method](url, config);
			setList([...results.data.results]);
		}

		if (method === 'post') {
			item.due = new Date();
			const results = await axios[method](url, item, config);
			setList([...list, results.data]);
		}

		if (method === 'put') {
			let item = list.filter((i) => i._id === id)[0] || {};

			if (item._id) {
				item.complete = !item.complete;
				const results = await axios[method](`${url}/${id}`, item, config);
				setList(
					list.map((listItem) =>
						listItem._id === item._id ? results.data : listItem,
					),
				);
			}
		}

		if (method === 'delete') {
			let item = list.find((i) => i._id === id) || {};

			if (item._id) {
				const results = await axios[method](`${url}/${id}`, config);
				setList(list.filter((listItem) => listItem._id !== results.data._id));
			}
		}
	};

	return [list, fetchingData];
};

export default useAjax;
