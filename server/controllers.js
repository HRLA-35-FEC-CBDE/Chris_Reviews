const model = require('../database/models.js');

module.exports = {
  getOneProduct: (req, res) => {
    const productId = req.params.id;
    model.getOne(productId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  addReview: (req, res) => {
    const productId = req.params.id;
    const body = req.body;
    model.writeReview(productId, body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewHelpful: (req, res) => {
    const productId = req.params.id;
    const reviewId = req.body._id;
    model.helpfulReviewYes(productId, reviewId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewNotHelpful: (req, res) => {
    const productId = req.params.id;
    const reviewId = req.body._id;
    model.helpfulReviewNo(productId, reviewId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewIsInappropriate: (req, res) => {
    const productId = req.params.id;
    const reviewId = req.body._id;
    model.inappropriateReview(productId, reviewId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  addQuestion: (req, res) => {
    const productId = req.params.id;
    const body = req.body;
    model.writeQuestion(productId, body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  answer: (req, res) => {
    const productId = req.params.id;
    const questionId = req.params._id;
    const answer = req.body;
    model.answerQuestion(productId, questionId, answer)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerHelpful: (req, res) => {
    const productId = req.params.id;
    const questionId = req.params._id;
    const answerId = req.body._id
    model.helpfulAnswerYes(productId, questionId, answerId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerNotHelpful: (req, res) => {
    const productId = req.params.id;
    const questionId = req.params._id;
    const answerId = req.body._id
    model.helpfulAnswerNo(productId, questionId, answerId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerIsInappropriate: (req, res) => {
    const productId = req.params.id;
    const questionId = req.params._id;
    const answerId = req.body._id
    model.inappropriateAnswer(productId, questionId, answerId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  }
}