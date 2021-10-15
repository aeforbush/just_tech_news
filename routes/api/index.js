// collects all the API routes (like index.js in /Models) and organizes them 

const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// this file takes the routes from user-routes and implements them to another router instance, prefixing them with the path /'' at that time
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);



module.exports = router;