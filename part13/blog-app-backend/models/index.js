import Blog from './blog.js';
import User from './user.js';
import ReadingList from './readingList.js';

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: ReadingList, as: 'users_marked' });
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });

export { Blog, User, ReadingList };
