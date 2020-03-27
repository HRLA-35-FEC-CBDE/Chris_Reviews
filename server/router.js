const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/:id/:productname')
  .get(controllers.getOneProduct)
  .put(controllers.addReview);

router
  .route('/:id/:productname/review-not-helpful')
  .put(controllers.reviewNotHelpful);

router
  .route('/:id/:productname/review-helpful')
  .put(controllers.reviewHelpful);

router
  .route('/:id/:productname/review/inappropriate')
  .put(controllers.reviewIsInappropriate);

router
  .route('/:id/:productname/add-question')
  .put(controllers.addQuestion);

router
  .route('/:id/:productname/question/add-answer')
  .put(controllers.answer);

router
  .route('/:id/:productname/:question/answer-not-helpful')
  .put(controllers.answerNotHelpful);

router
  .route('/:id/:productname/:question/answer-helpful')
  .put(controllers.answerHelpful);

router
  .route('/:id/:productname/:question/answer-inappropriate')
  .put(controllers.answerIsInappropriate);

module.exports = router;