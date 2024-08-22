import { lucia } from '$lib/server/auth.js';
import { verify } from '@node-rs/argon2';
import { db } from '../../../db/drizzle.js';
import { userTable } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export const POST = async ({ request }) => {
	const { email, password } = await request.json();

	const user = db.select().from(userTable).where(eq(userTable.email, email)).get();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
	}

	const validatePassword = await verify(user.password, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 2
	});

	if (!validatePassword) {
		return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return new Response(JSON.stringify({ message: 'User logged in successfully' }), {
		status: 200,
		headers: {
			'Set-Cookie': sessionCookie.serialize()
		}
	});
};
