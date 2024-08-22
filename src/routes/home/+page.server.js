import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	console.log(locals.session);

	if (!locals.user) {
		throw redirect(301, '/login');
	}

	return { user: locals.user };
};
