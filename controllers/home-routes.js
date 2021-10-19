// contains all of the user-facing routes such as homepage and login
const router = require("express").Router();

router.get("/", (req, res) => {
  // able to use render() because we've hooked up a template engine / specifies template
  // passing "post" object to homepage.handlebars template
  res.render("homepage", {
    id: 1,
    post_url: "https://handlebarsjs.com/guide/",
    title: "Handlebars Docs",
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
      username: "test_user",
    },
  });
});

module.exports = router;
