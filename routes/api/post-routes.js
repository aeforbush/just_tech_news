// dependencies (models and packages)
const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('==========');
    Post.findAll({
        // query configuration
    })
});