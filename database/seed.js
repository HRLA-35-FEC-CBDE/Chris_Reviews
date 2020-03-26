const faker = require('faker');
const fs = require('fs')


function test() {

  var product = [{
    product: faker.commerce.productName(),
    reviews: [{
      name: faker.name.findName(),
      rating: Math.floor(Math.random() * 6),
      title: faker.lorem.words(),
      review: faker.lorem.sentence(),
      recommend: Math.random() >= 0.5,
      email: faker.internet.email(),
      feedback: faker.lorem.sentence(),
      helpful: Math.floor(Math.random() * 10),
      notHelpful: Math.floor(Math.random() * 10),
      report: Math.random() >= 0.5
    }],
    questions: [{
      name: faker.name.findName(),
      question: faker.lorem.sentence(),
      answers: [{
        name: faker.name.findName(),
        answer: faker.lorem.sentence(),
        helpful: Math.floor(Math.random() * 10),
        notHelpful: Math.floor(Math.random() * 10),
        report: Math.random() >= 0.5
      }],
    }]
  }]

  return product
}


var singleProduct = test()
var jsonProduct = JSON.stringify(singleProduct, null, 2)
console.log(jsonProduct)
// fs.writeFile('data.json', jsonProduct, (err) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('success')
//   }
// })

// fs.writeFile('data.json', 'hello', (err) => {
//     if(err) {
//       console.log(err)
//     } else {
//       console.log('success')
//     }
//   })
var jason = JSON.stringify('hello')
fs.writeFile('data.json', jason, 'utf8', (err) => {
  if (err) throw err;
  console.log('Data written to file');
});