const model = require('../database/models.js');

module.exports = {
  getOneProduct: (req, res) => {
    const _id = req.params.id;
    model.getOne(_id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  addReview: (req, res) => {
    const _id = req.params.id;
    const body = req.body.review;
    model.writeReview(_id, body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewNotHelpful: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.helpfulReviewNo(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewHelpful: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.helpfulReviewYes(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  reviewIsInappropriate: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.inappropriateReview(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  addQuestion: (req, res) => {
    const _id = req.params.id;
    const body = req.body.question;
    model.writeReview(_id, body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  answer: (req, res) => {
    const _id = req.params.id;
    const id = req.body.id;
    const body = req.body.answer;
    model.answerQuestion(_id, id, body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerNotHelpful: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.helpfulAnswerNo(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerHelpful: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.helpfulAnswerYes(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  },
  answerIsInappropriate: (req, res) => {
    const _id = req.params.id;
    const id = req.body._id;
    model.inappropriateAnswer(_id, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
  }
}