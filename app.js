const http = require('http');
const url = require('url');

let dictionary = [];

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST' && reqUrl.pathname === '/api/definitions') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { word, definition } = JSON.parse(body);
            const existingEntry = dictionary.find(entry => entry.word === word);

            if (existingEntry) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: `Word '${word}' already exists.` }));
            }

            dictionary.push({ word, definition });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: `Request #${dictionary.length}`,
                totalEntries: dictionary.length
            }));
        });
    } else if (req.method === 'GET' && reqUrl.pathname === '/api/definitions') {
        const word = reqUrl.query.word;
        const entry = dictionary.find(entry => entry.word === word);

        if (!entry) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Word '${word}' not found.` }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ word: entry.word, definition: entry.definition }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
