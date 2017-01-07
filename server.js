const express = require('express');
const stormpath = require('express-stormpath');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));


app.use(stormpath.init(app, {
	web: {
		produces: ['application/json']
	}
}));

app.on('stormpath.ready', function() {
	app.listen(3000, 'localhost', function(err) {
		if (err) {
			return console.error(err);
		};
		console.log('Listening on Port 3000');
	});
});

