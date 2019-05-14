let express = require('express');
let request = require('request');
let { parse } = require('node-html-parser');
let router = express.Router();

/* GET settings page. */
router.get('/', (req, res, next) => res.render('browser', {}));
router.post('/search', (req, res, next) => {
    let query = req.body.q;
    request('https://www.google.com/search?q=' + query + '&oq=' + query, {
        'Content-type': 'text/html; charset=utf-8'
    }, (error, response, body) => {
        body = body.replace(/images\/nav_logo229.png/g, 'https://www.google.com/images/nav_logo229.png');
        let document = parse(body);
        let links = document.querySelectorAll('.g');
        // console.log(links);
        res.render('browser_search_results', {
            links: links
        });
    });
});

module.exports = router;