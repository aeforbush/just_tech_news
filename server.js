const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// turn on routes
app.use(routes);

// turn on connection to db and server || "sync" means that this Sequelize takes the models and connects them to the associatd db tables (creating it for you!)
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});