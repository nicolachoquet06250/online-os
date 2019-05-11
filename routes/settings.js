let express = require('express');
let router = express.Router();

/* GET settings page. */
router.get('/', function(req, res, next) {
	res.render('window_settings', {});
});

module.exports = router;