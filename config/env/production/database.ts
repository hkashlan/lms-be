export default ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'lms'),
			user: env('DATABASE_USERNAME', 'lms-admin'),
			password: env('DATABASE_PASSWORD', 'M@n@zel@l@br@r'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
