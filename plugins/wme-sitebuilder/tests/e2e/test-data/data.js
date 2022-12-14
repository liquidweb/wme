const {
	ADMIN_USER,
	ADMIN_PASSWORD,
	ADMIN_USER_EMAIL,
	USE_WP_ENV,
} = process.env;

const admin = {
	username: ADMIN_USER ?? 'admin',
	password: ADMIN_PASSWORD ?? 'password',
	email: ADMIN_USER_EMAIL ?? (USE_WP_ENV ? 'storebuilder@example.com' : 'admin@example.com'),
};

const storeDetails = {};

module.exports = {
	storeDetails,
	admin
};
