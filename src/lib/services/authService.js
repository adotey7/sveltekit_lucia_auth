export const signUserUp = async (/** @type {string} */ email, /** @type {string} */ password) => {
	const response = await fetch('/api/registerUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});
	const data = await response.json();

	if (!response.ok) {
		console.log('Response', response);
		console.log(data);
		throw new Error(data.error);
	}

	console.log(data);
	return data;
};

export const loginUser = async (/** @type {string} */ email, /** @type {string} */ password) => {
	const response = await fetch('/api/loginUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});
	const data = await response.json();

	if (!response.ok) {
		console.log('Response', response);
		console.log(data);
		throw new Error(data.error);
	}

	console.log(data);
	return data;
};
