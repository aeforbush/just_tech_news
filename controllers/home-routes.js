// contains all of the user-facing routes such as homepage and login
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

// GET all posts from homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "Post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      // .get({plain}) serialize the object down to only the properties needed / res.json() does it automatically
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // passing the iterated array to an object into the template
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/post/:id", (req, res) => {
 Post.findOne({
   where: {
     id: req.params.id
   },
   attributes: [
     'id',
     'post_url',
     'title',
     'created_at',
     [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']

   ],
   include: [
     {
       model: Comment,
       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
       include: {
         model: User,
         attributes: ['username']
       }
      },
      {
        model: User,
        attributes: ['username']
      }
   ]
 })
 .then((dbPostData) => {
   if (!dbPostData) {
     res.status(404).json({message: 'No post found with this id'});
     return;
   }

   // serialize the data
   // why didn't we use map() here?
   const post = dbPostData.get({ plain: true });

   // pass data to template
   res.render('single-post', { post });
 })
 .catch(err => {
   console.log(err);
   res.status(500).json(err);
 })
});

module.exports = router;
