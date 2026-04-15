const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login, refresh, logout } = require('../controllers/authController');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  validate
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
  validate
], login);

router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
