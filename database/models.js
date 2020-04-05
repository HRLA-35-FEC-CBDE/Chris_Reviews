const model = require('./schema.js');

module.exports = {
  getOne: (productId) => model.findById({ '_id': productId }),
  writeReview: (productId, review) => {
    return model.update({'_id': productId}, {$push: {'reviews': review}})
  },
  helpfulReviewYes: (productId, reviewId) => {
    return model.update({'_id': productId, 'reviews._id': reviewId}, {$inc: {'reviews.$.helpful': 1}})
  },
  helpfulReviewNo: (productId, reviewId) => {
    return model.update({'_id': productId, 'reviews._id': reviewId}, {$inc: {'reviews.$.notHelpful': 1}})
  },
  inappropriateReview: (productId, reviewId) => {
    return model.update({'_id': productId, 'reviews._id': reviewId}, {$set: {'reviews.$.report': true}})
  },
  writeQuestion: (productId, question) => {
    return model.update({'_id': productId}, {$push: {'questions': question}})
  },
  answerQuestion: (productId, questionId, answer) => {
    return model.update({'_id': productId, 'questions._id': questionId}, {$push: {'questions.$.answers': answer}})
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
//   getOne: (_id) => model.findById({ _id }),
//   writeReview: (_id, review) => {
//     const product = await model.findById({ _id })
//     product.reviews.push(review)
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save()
//   },
//   helpfulReviewYes: (_id, id) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.reviews[i]._id = id) {
//         product.reviews[i].helpful + 1;
//         break;
//       }
//     }
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save()
//   },
//   helpfulReviewNo: (_id, id) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.reviews[i]._id = id) {
//         product.reviews[i].notHelpful + 1;
//         break;
//       }
//     }
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save()
//   },
//   inapropriateReview: (_id, id) => 
//     model.findByIdAndUpdate({ _id: _id }, {"reviews._id": id}, {"reviews.$.report": true}),
//   writeQuestion: (_id, question) => {
//     const product = await model.findById({ _id })
//     product.questions.push(question)
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save()
//   },
//   answerQuestion: (_id, id, answer) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.questions[i]._id = id) {
//         product.questions[i].push(answer);
//         break;
//       }
//     }
//     return product.save()
//   },
//   helpfulAnswerYes: (_id, questionId, answerId) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.questions[i]._id = questionId) {
//         for (let j = 0; j < product.questions[i].answers.length; j++) {
//           if (product.questions[i].answers[j]._id === answerId) {
//             product.questions[i].answers[j].helpful + 1
//           }
//           break;
//         }
//       }
//     }
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save();
//   },
//   helpfulAnswerNo: (_id, questionId, answerId) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.questions[i]._id = questionId) {
//         for (let j = 0; j < product.questions[i].answers.length; j++) {
//           if (product.questions[i].answers[j]._id === answerId) {
//             product.questions[i].answers[j].notHelpful + 1
//           }
//           break;
//         }
//       }
//     }
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save();
//   },
//   // inapropriateAnswer: (_id, id) => model.findByIdAndUpdate({ _id: _id }, {"questions._id": id }, { $set: {"questions.$.report": true}}),
//   inapropriateAnswer: (_id, questionId, answerId) => {
//     const product = await model.findById({ _id })
//     for (let i = 0; i < product.reviews.length; i++) {
//       if (product.questions[i]._id = questionId) {
//         for (let j = 0; j < product.questions[i].answers.length; j++) {
//           if (product.questions[i].answers[j]._id === answerId) {
//             product.questions[i].answers[j].report = true;
//           }
//           break;
//         }
//       }
//     }
//     // const updatedProductReview = await product.save()
//     // console.log(updatedProductReview)
//     return product.save();
//   }
// }