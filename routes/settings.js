let express = require('express');
let router = express.Router();

/* GET settings page. */
router.get('/', (req, res, next) => res.render('window_settings', {}));

router.get('/me', (req, res, next) => res.render('window_settings_account', {}));
module.exports = router;