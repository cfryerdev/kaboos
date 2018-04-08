var express = require('express')
	, router = express.Router();

// Entities
router.use('/api/account', require('./accounts'));
router.use('/api/companies', require('./company/companies'));
router.use('/api/topology', require('./company/companyTopology'));
router.use('/api/companyMembers', require('./company/companyMembers'));
router.use('/api/companyMemberTypes', require('./company/companyMemberTypes'));
router.use('/api/projects', require('./projects'));
router.use('/api/projectDependencies', require('./projectDependencies'));
router.use('/api/teams', require('./teams'));
router.use('/api/teamMembers', require('./teamMembers'));
router.use('/api/teamProjects', require('./teamProjects'));
router.use('/api/notifications', require('./notifications'));
router.use('/api/favorites', require('./favorites'));
router.use('/api/releases', require('./release/releases'));

// Custom Lookups
router.use('/api/companyProjectTypes', require('./company/companyProjectTypes'));
router.use('/api/companyTeamMemberRoles', require('./company/companyTeamMemberRoles'));

// Lookups
router.use('/api/projectTypes', require('./projectTypes'));
router.use('/api/teamMemberRoles', require('./teamMemberRoles'));

// Default Route / Heartbeat
router.get('/api', function (req, res) {
	res.json({
		message: 'Welcome to ePixelation - Kaboos API',
		routes: [
			// Entities
			{ name: '/api/account', type: 'Entity', description: 'Authentication and user management.' },
			{ name: '/api/companies', type: 'Entity', description: 'Main api endpoint, contains company data. This is the aggregate root entity.' },
			{ name: '/api/companiesMembers', type: 'Entity', description: 'Company member api datapoint. Contains information on company members.' },
			{ name: '/api/companiesMembers', type: 'Entity', description: 'Company member api datapoint. Contains information on company members.' },
			{ name: '/api/companiesMembersTypes', type: 'Entity', description: 'Company member type api datapoint. Contains information on company member types.' },
			{ name: '/api/projects', type: 'Entity', description: 'Project api endpoint for project data. Projects live under companies.' },
			{ name: '/api/projectDependencies', type: 'Entity', description: 'Project Dependency api endpoint for relational projects. Project Dependencies live under Projects.' },
			{ name: '/api/teams', type: 'Entity', description: 'Team api endpoint for team data. Teams live under companies.' },
			{ name: '/api/teamMembers', type: 'Entity', description: 'Team Member api endpoint for member data. Team Members live under Teams.' },
			{ name: '/api/teamProjects', type: 'Entity', description: 'Team Project api endpoint for member data. Team Projects live under Teams.' },
			{ name: '/api/releases', type: 'Entity', description: 'Release api endpoint for release data. Releases live under companies.' },
			// Lookups
			{ name: '/api/projectTypes', type: 'Lookup', description: 'Main project type lookup endpoint. Readonly.' },
			{ name: '/api/teamMemberRoles', type: 'Lookup', description: 'Main team member role lookup endpoint. Readonly.' },
			// Custom Lookups
			{ name: '/api/companyProjectTypes', type: 'Lookup', description: 'Customizable Project type endpoint. These live under Company, and can be edited.' },
			{ name: '/api/companyTeamMemberRoles', type: 'Lookup', description: 'Customizable Team member roles endpoint. These live under Company, and can be edited.' },
		]
	});
});

module.exports = router;
