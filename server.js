const express = require('express');
const axios = require('axios');
const fetchMediaDetailsFromThreads = require('./fetch');
const he = require('he');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let mediaDetails = [];
    let searchTerms = req.query.search || '';
    let searchAttempted = false;

    if (searchTerms) {
        searchAttempted = true;
        const keywords = searchTerms.split('|');
        const boards = ['trash', 'mu'];
        mediaDetails = await fetchMediaDetailsFromThreads(boards, keywords);
    }
    res.render('index', { mediaDetails, searchTerms, searchAttempted });
});

app.get('/proxy', async (req, res) => {
    const proxiedUrl = req.query.url;
    const encodedFilename = req.query.filename;
    const url = decodeURIComponent(proxiedUrl);
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': '4chan Media Gallery'
            }
        });

        let filename = he.decode(decodeURIComponent(encodedFilename));

        filename = filename.replace(/[\x00-\x1F\x7F-\x9F/\\<>:"|?*]/g, '_');

        filename = encodeURI(filename);

        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Disposition': `attachment; filename="${filename}"`
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image through proxy:', error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
