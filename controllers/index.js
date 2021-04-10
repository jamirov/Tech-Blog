const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts with user data

router.get('/', async (req, res) => {
  try {
    
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

// Profile route after logging in..

router.get('/profile', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((project) => project.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('profile', {posts, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login check verify

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200);
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    

  } catch (err) {
    res.status(400).json(err);
  }
});





// Displays login form
router.get('/login', async (req, res) => {
  try {
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






// creates a new user


router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
      res.render('signup');
    } catch (err) {
      res.status(500).json(err);
    }
  });

// display card to create a new post

router.get('/newPost', withAuth, async (req, res) => {
  try {
    res.render('newPostCard', {loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post 

router.post('/newPost', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title:req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(200).json(postData);
    res.render('profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log out route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;