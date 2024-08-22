import { lucia } from '$lib/server/auth.js';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db } from '../../../db/drizzle.js';
import { userTable } from '../../../db/schema.js';

export const POST = async ({ request }) => {
	const { email, password } = await request.json();

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const userId = generateIdFromEntropySize(10);

	try {
		await db.insert(userTable).values({
			id: userId,
			email,
			password: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		return new Response(JSON.stringify({ message: 'User created successfully' }), {
			status: 201,
			headers: {
				'Set-Cookie': sessionCookie.serialize()
			}
		});
	
	} catch (error) {
        console.error('Error creating user:', error);
		return new Response(JSON.stringify({ error: 'Email already in use' }), { status: 400 });
	}
};
