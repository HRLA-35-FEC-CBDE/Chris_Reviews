const model = require('./schema.js');

module.exports = {
  getOne: (productId) => model.findById({ '_id': productId }),
  writeReview: (productId, review) => {
    return model.findOneAndUpdate({'_id': productId}, {$push: {'reviews': review}}, {new: true})
  },
  helpfulReviewYes: (productId, reviewId) => {
    return model.findOneAndUpdate({'_id': productId, 'reviews._id': reviewId}, {$inc: {'reviews.$.helpful': 1}}, {new: true})
  },
  helpfulReviewNo: (productId, reviewId) => {
    return model.findOneAndUpdate({'_id': productId, 'reviews._id': reviewId}, {$inc: {'reviews.$.notHelpful': 1}}, {new: true})
  },
  inappropriateReview: (productId, reviewId) => {
    return model.findOneAndUpdate({'_id': productId, 'reviews._id': reviewId}, {$set: {'reviews.$.report': true}}, {new: true})
  },
  writeQuestion: (productId, question) => {
    return model.findOneAndUpdate({'_id': productId}, {$push: {'questions': question}}, {new: true})
  },
  answerQuestion: (productId, questionId, answer) => {
    return model.findOneAndUpdate({'_id': productId, 'questions._id': questionId}, {$push: {'questions.$.answers': answer}}, {new: true})
  },
  helpfulAnswerYes: (productId, questionId, answerId) => {
    return model.findById({'_id': productId})
    .then(product => {
      product.questions.id(questionId).answers.id(answerId).helpful += 1
      return product.save()
    })
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
  },
  helpfulAnswerNo: (productId, questionId, answerId) => {
    return model.findById({'_id': productId})
    .then(product => {
      product.questions.id(questionId).answers.id(answerId).notHelpful += 1
      return product.save()
    })
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
  },
  inappropriateAnswer: (productId, questionId, answerId) => {
    return model.findById({'_id': productId})
    .then(product => {
      product.questions.id(questionId).answers.id(answerId).report = true;
      return product.save()
    })
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
  }
}
