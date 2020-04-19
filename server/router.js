const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/:productId/:productName')
  .get(controllers.getOneProduct)
  .put(controllers.addReview);

router
  .route('/:productId/:productName/:reviewId/review-helpful')
  .put(controllers.reviewHelpful);

router
  .route('/:productId/:productName/:reviewId/review-not-helpful')
  .put(controllers.reviewNotHelpful);

router
  .route('/:productId/:productName/:reviewId/inappropriate')
  .put(controllers.reviewIsInappropriate);

router
  .route('/:productId/:productName/add-question')
  .put(controllers.addQuestion);

router
  .route('/:productId/:productName/:questionId/add-answer')
  .put(controllers.answer);

router
  .route('/:productId/:productName/:questionId/:answerId/answer-helpful')
  .put(controllers.answerHelpful);

router
  .route('/:productId/:productName/:questionId/:answerId/answer-not-helpful')
  .put(controllers.answerNotHelpful);

router
  .route('/:productId/:productName/:questionId/:answerId/answer-inappropriate')
  .put(controllers.answerIsInappropriate);

module.exports = router;
