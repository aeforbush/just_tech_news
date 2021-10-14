const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');


// creates a link between the id column in User to the corresponding foreign key pair which is the user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// making the reverse association (defining the relationship of the Post model to the User model || contraint imposed is a post can belong to one user, not many users || link is declared to the foreign key user_id in the Post model
Post.belongsTo(User, {
   foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

    




// exporting an object with User as a property | created class User (new model) to inherit the functionality of the Model class ( CRUD )
module.exports = {User, Post, Vote};
