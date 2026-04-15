const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', [
  protect,
  body('title').isLength({ min: 3 }).trim().escape(),
  body('content').notEmpty(),
  validate
], createPost);

router.put('/:id', [
  protect,
  body('title').optional().isLength({ min: 3 }).trim().escape(),
  body('content').optional().notEmpty(),
  validate
], updatePost);

router.delete('/:id', protect, deletePost);

module.exports = router;
