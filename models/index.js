const User = require('./User');
const Post = require('./Post');


// creates a link between the id column in User to the corresponding foreign key pair which is the user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// making the reverse association (defining the relationship of the Post model to the User model || contraint imposed is a post can belong to one user, not many users || link is declared to the foreign key user_id in the Post model
Post.belongsTo(User, {
   foreignKey: 'user_id',
});







// exporting an object with User as a property | created class User (new model) to inherit the functionality of the Model class ( CRUD )
module.exports = {User, Post};
