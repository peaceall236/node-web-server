const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
app.set('view engine',  'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('serve.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

/* app.use((req, res, next) => {
	res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('Hello, world!');
	res.render('home.hbs', {
		welcomeMsg: 'Hello, World',
		pageTitle: 'home page'
	});
});
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});
app.get('/bad', (req, res) => {
	res.send({
		error : "unable to handle request"
	});
});
app.listen(port, () => {
	console.log(`server is up on port ${port}`);
});