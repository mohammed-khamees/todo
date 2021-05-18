import axios from 'axios';
import { useContext } from 'react';
import { PaginationContext } from './../context/pagination';

const useAjax = (url) => {
	const paginationContext = useContext(PaginationContext);

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
			paginationContext.setItems([...results.data.results]);
			paginationContext.setList([...results.data.results]);
		}

		if (method === 'post') {
			item.due = new Date();
			const results = await axios[method](url, item, config);
			paginationContext.setItems([...paginationContext.items, results.data]);
		}

		if (method === 'put') {
			let item = paginationContext.items.filter((i) => i._id === id)[0] || {};

			if (item._id) {
				item.complete = !item.complete;
				const results = await axios[method](`${url}/${id}`, item, config);
				paginationContext.setItems(
					paginationContext.items.map((listItem) =>
						listItem._id === item._id ? results.data : listItem,
					),
				);
			}
		}

		if (method === 'delete') {
			let item = paginationContext.items.find((i) => i._id === id) || {};

			if (item._id) {
				const results = await axios[method](`${url}/${id}`, config);
				paginationContext.setItems(
					paginationContext.items.filter(
						(listItem) => listItem._id !== results.data._id,
					),
				);
			}
		}
	};

	return fetchingData;
};

export default useAjax;
