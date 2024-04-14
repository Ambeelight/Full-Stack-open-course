import { config } from 'dotenv';
import { Sequelize, QueryTypes } from 'sequelize';

config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

const printBlogs = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    });
    console.log(
      blogs.map(
        (blog) => `${blog.author}: '${blog.title}', ${blog.likes} likes`
      )
    );
  } catch (error) {
    console.error('Unable to fetch blogs:', error);
  } finally {
    await sequelize.close();
  }
};

printBlogs();
