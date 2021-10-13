// collects all the API routes (like index.js in /Models) and organizes them 

const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// this file takes the routes from user-routes and implements them to another router instance, prefixing them with the path /users at that time
router.use('/users', userRoutes);
router.use('/posts', postRoutes);



module.exports = router;