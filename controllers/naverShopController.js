// naver shop api test
exports.searchItem = (req, res) => {

    const client_id = 'g9FaGMLLQivRJT82mTtX';
    const client_secret = 'KfMNqT8aL3';
    
    const api_url = 'https://openapi.naver.com/v1/search/shop?display=30&query=' + encodeURI(req.query.query);
    // console.log(req.query.query);

    const request = require('request');
    const options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id' : client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
    });
}