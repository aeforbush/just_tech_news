const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");


// API architectural pattern called REST aka Representational State Transfer (RESTful APIs) || Uses HTTP methods like GET POST PUT DELETE || Uses status codes 400, 404 and 500 || Uses descriptive endpoints

// GET  all users api/users
router.get("/", (req, res) => {
  // access our User model and run .findAll() a Model class method || equivalent to SQL query SELECT * FROM users;
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET api/users/1
router.get("/:id", (req, res) => {
  // equivalent to SELECT * FROM users WHERE id =1
  User.findOne({
    attributes: { exclude: ["password"] },
    //attributes: { exclude: ['password']},
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_url", "created_at"],
      },
      // including the Comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
        through: Vote,
        as: "voted_posts",
      },
    ],
  })
    // if nothing is returned function
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST api/users
router.post("/", (req, res) => {
  // expects {username: 'Ida', email: 'Ida@test.com', password: '1245'} || INSERT INTO users VALUES data
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // session is created first then run when the call back is complete
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post("/login", (req, res) => {
  // query operation
  // exprects {email: '', password '',}
  // findOne sequelize method looks for a user with a specified email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address." });
      return;
    }

    // verify User
    const validPassword = dbUserData.checkPassword(req.body.password);
    // control statement
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password." });
      return;
    }
    req.session.save(() => {
      // delcare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      // if successful we can call checkPassword in User.js which is on the dbUserData object
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT api/users/1 (Updating)
router.put("/:id", (req, res) => {
  // expects {username: '', email: '', password: '',} || UPDATE users SET username ='' WHERE id = '';
  // pass in req.body to provide the new data we want to use
  User.update(req.body, {
    individualHooks: true,
    where: {
      // indicates exactly where this new data is to be used
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
