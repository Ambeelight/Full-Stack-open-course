import express from 'express';
import { config } from 'dotenv';
import { Sequelize, QueryTypes, Model, DataTypes } from 'sequelize';

const app = express();
app.use(express.json());
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
const PORT = process.env.PORT;

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/', async (req, res) => {
  const greeting = await 'Welcome';
  res.status(200).send(greeting);
});

app.get('/api/blogs', async (req, res) => {
  try {
    // const blogs = await sequelize.query('SELECT * FROM blogs', {
    //   type: QueryTypes.SELECT,
    // });
    const blogs = await Blog.findAll();
    console.log(blogs);
    res.json(blogs);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await blog.destroy();

    return res.json({ message: 'The blog deleted successfully' });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
