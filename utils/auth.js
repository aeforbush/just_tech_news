// this function will act as a normal request callback function, checking for the instance of a session proptery || next() calls the next middleware function with req, res values
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
