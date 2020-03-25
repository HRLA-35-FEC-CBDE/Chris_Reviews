const model = require('./schema.js');

module.exports = {
  getOne: (_id) => model.findById({ _id }),
  writeReview: (_id, review) => {
    const product = await model.findById({ _id })
    product.reviews.push(review)
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return product.save()
  },
  helpfulReviewYes: (_id, id) => {
    const product = await model.findById({ _id })
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i]._id = id) {
        product.reviews[i].helpful + 1;
        break;
      }
    }
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return product.save()
  },
  helpfulReviewNo: (_id, id) => {
    const product = await model.findById({ _id })
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i]._id = id) {
        product.reviews[i].notHelpful + 1;
        break;
      }
    }
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return product.save()
  },
  inapropriateReview: (_id, id) => 
    model.findByIdAndUpdate({ _id: _id }, {"reviews._id": id}, {"reviews.$.report": true}),
  writeQuestion: (_id, question) => {
    const product = await model.findById({ _id })
    product.questions.push(question)
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return product.save()
  },
  answerQuestion: (_id, id, answer) => {
    const product = await model.findById({ _id })
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.questions[i]._id = id) {
        product.questions[i].answer = answer;
        break;
      }
    }
    return product.save()
  },
  helpfulAnswerYes: (_id, id) => {
    const answer = await model.findById({ _id })
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.questions[i]._id = id) {
        product.questions[i].helpful + 1;
        break;
      }
    }
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return answer.save();
  },
  helpfulAnswerNo: (_id, id) => {
    const answer = await model.findById({ _id })
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.questions[i]._id = id) {
        product.questions[i].notHelpful + 1;
        break;
      }
    }
    // const updatedProductReview = await product.save()
    // console.log(updatedProductReview)
    return answer.save();
  },
  inapropriateAnswer: (_id, id) => model.findByIdAndUpdate({ _id: _id }, {"questions._id": id }, { $set: {"questions.$.report": true}}),
}