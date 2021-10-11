const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model // user inherits all the functionality the Model class has
class User extends Model {}

// use init method to initialize the model's data and configuration, passing in two objects as arguments || define table column and configuration (defines how inherited methods should work)
User. init(
    // table column definitions go here 
    {
        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is 
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unqiue: true,
            // if allowNull is set to false, we can run our data through validation
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        // table configuration options fo here (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instaead of camel casing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;