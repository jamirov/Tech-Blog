const sequelize = require('../config/connection');
const { User,Post, Comments } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of projectData) {
    await Post.create({
      ...post,
    });
  }
  for (const comment of commentData) {
    await Comments.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
