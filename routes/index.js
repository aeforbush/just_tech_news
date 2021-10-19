// collects the packaged API routes from /api/index and prefixing them with the path /api || the second use of router.use() also indicates a 404 err if the request is incorrect

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;