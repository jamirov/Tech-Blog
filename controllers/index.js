const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const projects = postData.map((project) => project.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {projects});
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
router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
      res.render('signup');
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;