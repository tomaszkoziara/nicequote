var express = require('express');
const fs = require('fs-extra');
var randomColor = require('random-color');
const fontCount = 6;

var router = express.Router();
var quotes = [];

function readQuotes() {

    console.log('Quotes initialization...');
    return fs.readJson('quotes.json')
        .then((data) => {
            console.log('Quotes initialized...');
            quotes = data;
        });

}

function getRandomQuote(callback) {

    return quotes[Math.floor((Math.random() * 1000) % quotes.length)];

}

function randomQuoteProvider(req, res, next) {

    const quote = getRandomQuote();

    var randomQuote = '';
    var randomSize;
    var random;
    var prevRandom;

    quote.text.split(' ').forEach((quoteSplit) => {
        while ((random = Math.floor((Math.random() * 100) % fontCount) + 1) == prevRandom);
        prevRandom = random;
        randomSize = (Math.floor(Math.random() * 100) % 4) + 6;
        randomQuote += '<span class="font' + random + '" style="font-size: ' + randomSize + 'vh" >'
        randomQuote += ' ' + quoteSplit + ' '
        randomQuote += '</span>'
    });

    res.render('index', {
        title: 'NiceQuote',
        quote: randomQuote,
        color: randomColor().hexString(),
        audio: quote.audio
    });

}

/* GET home page. */
readQuotes()
    .then(() => {
        router.get('/', randomQuoteProvider);
    });

module.exports = router;
