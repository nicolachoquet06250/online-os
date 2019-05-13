'use strict';

module.exports = [
	{
		route: '/',
		controller_callback: require('./routes/index')
	},
	{
		route: '/users',
		controller_callback: require('./routes/users')
	},
	{
		route: '/settings',
		controller_callback: require('./routes/settings')
	},
	{
		route: '/filer',
		controller_callback: require('./routes/filer')
	}
];