console.log('...DB Init Start');
const db = require('./config/db');

const User = require('./models/User');
const Post = require('./models/Post');

db.sync().then(async () => {
  //#region Associations

  // Post - User
  Post.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Post, { foreignKey: 'user_id' });

  //#endregion Associations

  console.log('...DB Init End');
});
