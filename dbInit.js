console.log('...DB Init Start');
const db = require('./config/db');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const { ADMIN } = require('./strings/roles');

db.sync().then(async () => {
  // Creating admin if they don't exist
  await User.findOrCreate({
    where: {
      role: ADMIN,
    },
    defaults: {
      username: ADMIN,
      password: await User.hashPassword('123123'),
      role: ADMIN,
    },
    raw: true,
  });

  //#region Associations

  // Post - User
  Post.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Post, { foreignKey: 'user_id' });

  // Comment - User
  Comment.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Comment, { foreignKey: 'user_id' });

  // Comment - Post
  Comment.belongsTo(Post, { foreignKey: 'post_id' });
  Post.hasOne(Comment, { foreignKey: 'post_id' });

  //#endregion Associations

  console.log('...DB Init End');
});
