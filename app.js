const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const express = require('express');

const app = express();
const cors = require("cors");

const config = {
    views: 'views', 		// Set views directory
    static: 'public', 		// Set static assets directory
    db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
        url: (process.env.TURBO_ENV === 'dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
        type: 'mongo',
        onError: (err) => {
            console.log('DB Connection Failed!', err);
        },
        onSuccess: () => {
            console.log('DB Successfully Connected!')
        }
    }
};

vertex.configureApp(app, config);

app.use(cors());
app.use(vertex.setContext(process.env));

// import routes
const index = require('./routes/index');
const api = require('./routes/api');

// set routes
app.use('/', index);
app.use('/api', api); // sample API Routes


module.exports = app;