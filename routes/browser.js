let express = require('express');
let request = require('request');
let cheerio = require('cheerio');
let router = express.Router();

/* GET settings page. */
router.get('/', (req, res, next) => res.render('browser', {}));
router.post('/search', (req, res, next) => {
    let query = req.body.q;
    request('https://www.google.com/search?q=' + query + '&oq=' + query, {
        'Content-type': 'text/html; charset=utf-8'
    }, (error, response, body) => {
        if(!error) {
            body = body.replace(/images\/nav_logo229.png/g, 'https://www.google.com/images/nav_logo229.png');
            let $ = cheerio.load(body);
            let links = $('.g .r a');

            let results = [];

            links.each((i, link) => {
                let url = link.attribs.href;
                if(url) {
                    results.push({
                        url: url.replace('/url?q=', ''),
                        text: $(link).text()
                    });
                }
            });

            res.render('browser_search_results', {
                links: results
            });
        }
        else {
            res.send('ERROR');
        }
    });
});

module.exports = router;