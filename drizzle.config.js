import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/db/schema.js',
	out: './drizzle',
	dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		url: './sqlite.db'
	}
});
