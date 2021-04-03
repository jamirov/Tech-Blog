const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const projectData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const projectData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/signup', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      // const projectData = await Post.findAll({
      //   include: [
      //     {
      //       model: User,
      //       attributes: ['name'],
      //     },
      //   ],
      // });
  
      // Serialize data so the template can read it
      // const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('signup');
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;