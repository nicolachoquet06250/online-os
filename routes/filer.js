let express = require('express');
let router = express.Router();

/* GET settings page. */
router.get('/', (req, res, next) => res.render('filer', {}));

module.exports = router;