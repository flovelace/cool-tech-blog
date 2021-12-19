const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all of the comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text',
      'created_at',
      'updated_at'
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get the comments by the id
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'comment_text',
      'created_at',
      'updated_at'
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id '});
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create route for new comment
router.post('/', withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete the comment by its id route
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment was found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;