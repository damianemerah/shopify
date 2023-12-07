const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/', (req, res, next) => {
//   console.log('HOME ROUTE');
//   res.send('HOME');
//   next();
// });

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
