const router = require("express").Router();
const { User } = require("../../models");

// API architectural pattern called REST aka Representational State Transfer (RESTful APIs) || Uses HTTP methods like GET POST PUT DELETE || Uses status codes 400, 404 and 500 || Uses descriptive endpoints

// GET api/users
router.get("/", (req, res) => {
  // access our User model and run .findAll() a Model class method || equivalent to SQL query SELECT * FROM users;
  User.findAll({
      attributes: { exclude: ['password']}
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
    attributes: { exclude: ['password']},
    where: {
      id: req.params.id,
    },
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
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT api/users/1 (Updating)
router.put("/:id", (req, res) => {
  // expects {username: '', email: '', password: '',} || UPDATE users SET username ='' WHERE id = '';
  // pass in req.body to provide the new data we want to use
  User.update(req.body, {
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
