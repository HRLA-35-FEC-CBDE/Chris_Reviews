const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/:id/:product')
  .get(controllers.getOneProduct)
  .post(controllers.addReview);

router
  .route('/:id/:product/review-not-helpful')
  .put(controllers.reviewNotHelpful);

router
  .route('/:id/:product/review-helpful')
  .put(controllers.reviewHelpful);

router
  .route('/:id/:product/:review/inappropriate')
  .put(controllers.reviewIsInappropriate);

router
  .route('/:id/:product/add-question')
  .post(controllers.addQuestion);

router
  .route('/:id/:product/:question/add-answer')
  .post(controllers.answer);

router
  .route('/:id/:product/:question/answer-not-helpful')
  .put(controllers.answerNotHelpful);

router
  .route('/:id/:product/:question/answer-helpful')
  .put(controllers.answerHelpful);

router
  .route('/:id/:product/:question/answer-inappropriate')
  .put(controllers.answerIsInappropriate);

module.exports = router;