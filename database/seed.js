const faker = require('faker');
const fs = require('fs');
const data = require('../data.json');
const model = require('./schema.js');
const db = require('./')


// function test() {

//   var product = {
//     product: faker.commerce.productName(),
//     reviews: [{
//       name: faker.name.findName(),
//       rating: Math.floor(Math.random() * 6),
//       title: faker.lorem.words(),
//       review: faker.lorem.sentence(),
//       recommend: Math.random() >= 0.5,
//       email: faker.internet.email(),
//       feedback: faker.lorem.sentence(),
//       helpful: Math.floor(Math.random() * 10),
//       notHelpful: Math.floor(Math.random() * 10),
//       report: Math.random() >= 0.5
//     }],
//     questions: [{
//       name: faker.name.findName(),
//       question: faker.lorem.sentence(),
//       answers: [{
//         name: faker.name.findName(),
//         answer: faker.lorem.sentence(),
//         helpful: Math.floor(Math.random() * 10),
//         notHelpful: Math.floor(Math.random() * 10),
//         report: Math.random() >= 0.5
//       }],
//     }]
//   }


const randoBrandNames = ['Columbia', 'Burton', 'Odlo', 'Patagonia', 'Dakine', 'Marmot', 'The North Face', 'Outdoor Research', 'Gordini', 'Icebreaker', 'Smartwool'];
const randoDescriptors = ['Lightweight', 'Tough', 'Midweight', 'Expert', 'Heavy', 'Dual Layer', 'Insulated', 'Double Knit', 'Reflective', 'Cushion', 'Kevlar', 'GORE-TEX', 'Stretch', 'Waterproof', 'Snow', 'Triclimate', 'Wind Resistant', 'Breathable', 'Wool', 'Cotton'];
const randoProducts = ['Hat', 'Gloves', 'Beanie', 'Hoodie', 'Sweater', 'Balaclava', 'Scarf', 'Mittens', 'Thermals', 'Socks', 'Cap', 'Shirt', 'Pants', 'Fleece', 'Windbreaker', 'Goggles', 'Facemask', 'Boots', 'Bottoms', 'Full Suit', 'Base Layer', 'Shell'];
const randoReviews = [
  'I like the way this fit but it can induce sweating.',
  'Too hot for my trip but well made.',
  'Incredibly ergonomic although slightly expensive.',
  'Nicely made, too pricey though.',
  'My wife bought this and then bought me a pair. We like them...for now.',
  'Needed something a little more durable but good value.',
  'If you have the money, this is a great buy, but there are cheaper alternatives.',
  'Not too shabby, but I probably did not need to spend this much money.',
  'My wife is gonna kill me, but I bought two of these they are so good.',
  'Love the way if feels while wearing it.',
  'Probably will not buy another one, but this is a high quality product.',
  'Hate the color, but it is a good product.',
  'If I only could afford one, this is the one I would buy.',
  'Used on my last trip and it held up great!',
  'Probably the best ones they have made so far.',
  'Big improvement over the model from last year.',
  'Can not get over how performant this was.',
  'Unless you earn 200k per year, this probably is not the one for you.',
  'I have two now and will be buying a third soon.',
  'Sometimes I use this during the Fall and they hold up great. Not for Winter though.',
  'I sweat a lot in this after about one hour.',
  'This seemed a little thick than the picture indicated but worked well.',
  'I probably will not be buying this brand again even though this product is quality.',
  'Too tight for me, but I am a big boy.',
  'Loved the way this looks but I just wish they had it in extra small.',
  'Cannot stop raving about this to my friends - kept me warm the entire time.',
  'Good product - would buy again.',
  'Found this cheaper at dicountfordays dot com, but good product.',
  'I really put this to the test and they performed great. Wish material was a little thicker.',
  'The knit was a little loose, but it stayed on.',
  'Woah, the elastic was so tight!',
  'Was not as breathable as I expected, but decent overall.',
  'They have a funny smell that never goes away. Good construction though.',
  'Wait until Black Friday to buy this - way overpriced but I like them.',
  'Could not find this in black, but I am glad I them in purple with polkadots.',
  'Got this for Christmas and have not taken them off since.',
  'I bought this about three months ago and already need to replace them. I am extreme though.',
  'Love this but I think they should have left out the polyester.',
  'A little tight, but good build.',
  'This company generally sucks but this product is decent for the money.',
  'Bought this ever since the first version and love them. However, this are inferior to the ones from last season.',
  'Would I buy this again? Maybe. They would need to be a little cheaper.',
  'My Mom ordered this for me and I did not really like the style. Good quality though.',
  'Can you find a better product? Probably. But this is good value.',
  'Good overall although I would not wear this to Killington again.',
  'Broke this in at the local mountain and they held up. Not sure about more extreme locales.',
  'I like the product but I need to replace mine already.',
  'Not a very big outdoor person, but this worked well.',
  'Loved the build, hated the price!',
  'The seams in these were very poorly done, but it was warm.',
  'I was freezing in this!',
  'Skip it and buy the one manufactured by REI.',
  'Did not expect it to be so warm. Had to take it off eventually.',
  'Great fit but a little pricey.',
  'I thought this was breathable but it is not. Good for really bad conditions though.',
  'Sometimes I take this on my expeditions and it performs well. Probably unnecessary for local trips.',
  'I only buy Arcteryx but this is the one exception. Try it on first though!',
  'I hate the way it feels at first, but you get used to it over time.',
  'What more can I say? It did what it was advertised to do.',
  'The product was not what I expected - too big and did not fit well. Probably need a smaller size.',
  'Amazing product - well-made and great style. But why does it cost so much???',
  'If you are anything like and want the best, this is it. Not the best value though.',
  'Hated this stupid thing. Not well made.',
  'I bought pants from this company last year and like them. Took a chance on this and it worked out.',
  'Cannot get over how snug this is!',
  'Not my favorite one, but did the job.',
  'Got the job done.',
  'Floored by the way the material feels, but did not fit very well.',
  'Happy I bought this, but probably some cheaper options out there.',
  'Not many outdoor gear companies better than these guys and this product proves why.',
  'Maybe I would buy again if they lowered the price.',
  'If you want something for harsh conditions, this is it.',
  'Standard piece of gear for my trips, Only for the most extreme.',
  'It is a practical product, but not the best value.',
  'So many people use these - could they all be wrong? I think not.',
  'Did not like this at first, but after I broke it in, I like it.',
  'Feels nice to the body, but not the most performant.',
  'Good construction, good price, good style. Overall good.',
  'Would like this better if it was only cotton.',
  'The sizing for these are not really true - go a size smaller.',
  'Probably my favorite garment/accessory of all time. Just wish it was not so expensive.',
  'Great overall value, but there are better examples out there.',
  'Quality was a little questionable, but you cannot beat the price.',
  'Survived my last expedition so it gets a thumbs up from me.',
  'Two thumbs down. Funny smell and did not fit me well.',
  'Had to call the manufacturer to replace mine because the button broke. They replaced them. A+',
  'My entire family wears these when we hit the mountains. Kids do not like them so much, but I do.',
  'Not much to report other than this is the best in class :)',
  'Wore this about 15 times already and it is still as good as new.',
  'I wear this to the dance club because the style is sooo cool.',
  'Not a big fan of the material, but fit okay.',
  'Had to take it off as soon as I put it on because it was itchy.',
  'Kept me warm for an 8-hour excursion.',
  'Did the due diligence and this one got the highest rating. I agree - best in class.',
  'I hope they never stop making this product - I love it.',
  'Absolutely stunning style, but did not last through the season.',
  'Bought three recently and now on my last one. Not very durable.',
  'Good durability, good fit. Overall I liked it but a bit pricey all things considered.',
  'If you do not mind spending the money, this is a solid choice.',
  'I do not recommend if you own the one from last year - much better material. If not, get this one.',
  'This tore on my first trip and the manufacturer replaced it. Happy customer.'
]

const randoQuestions = [
  'Is there lining?',
  'Is it insulated enough?',
  'I am 5 foot 11 inches. Will the large size fit me?',
  'Can it withstand low temperatures?',
  'Is it durable?',
  'Do the sizes run true?',
  'Is it washable?',
  'Is it dry-clean only?',
  'Can I submerse it in water?',
  'Do I need to wash it often?',
  'Is there a money-back guarantee?',
  'Can I return it if I have already worn it?',
  'Are there any zippers?',
  'Is this going on sale soon?',
  'Is this better than the previous one from last year?',
  'Is this water-resistant?',
  'Do you ship overseas?',
  'Will you have this in black by Christmas?',
  'Is this breathable?',
  'Can I pay for this COD?',
  'Do you sell these in purple with polkadots?',
  'Will this stretch?',
  'Is this unisex?',
  'Does this come with an extra strap?',
  'Is there an XXL size?',
  'Is this reversible?',
];

const randoQuestionAnswers = [
  'Nope.', 'Yes.', 'I do not think so.', '100%', 'Absolutely', 'Can confirm.', 'No.', 'Elaborate more, please.', 'Bank on it!', 'Most assuredly.', 'Nein.'
];

const randoTitles = [
  'My Two Cents',
  'Nice product, but...',
  'Before buying',
  'Random review from yours truly',
  'Read this before you buy',
  'The good, bad, and ugly',
  'A few words about this product',
  'My experience with this',
  'Would I buy another one? Probably!',
  'Buy it now, believe me later!',
  'Liked it. Well sort of...',
  'Before buying',
  'Buyer beware',
  'Solid buy',
  'Worth the money or not?',
  'Help me, help you',
  'Love/hate relationship',
  'Part of my regular gear',
  'Took this with me on a trip',
  'Here is my opinion',
  'Bought this and now I want to talk about it',
  'Bought two of these',
  'Might buy again',
  'I own two',
  'I would recommend to some, not all',
  'Looks, feels good!',
  'Nice build',
  'Good construction',
  'Decent, albeit pricey',
  'Been using for the last three months',
  'Wore this all last season',
  'Take this with me on all my trips',
  'Overall, we like them',
  'Good piece of gear',
  'I buy all my gear from them',
  'Perfomed as expected',
  'Would I buy again? Maybe lol',
  'Love the colors',
  'I do not want to take it off',
  'Everyone loves me in them',
  'I think it makes me look taller',
  'Mostly like',
  'I do not hate them',
  'I definitely might buy them again',
  'Third time I bought them',
  'Good replacement',
  'Like, Like, Like',
  'A bit overpriced',
  'These guys make good gear',
  'Owner of three of these',
  'Probably my favorite of everything',
  'This is all the ,things!',
  'Not a lot to say, just good',
  'Go buy these now!',
  'Will be buying another when I get paid',
  'Avoid!',
  'Comparable to others',
  'Not much to report other than they are rad',
  'Loved these',
  'Tepid feeling',
  'Not big on this',
  'My favorite',
  'Probably not my favorite, but...',
  'Loving the look',
  'Like how it feels',
  'My new fave',
  'A few words',
  'Overall good',
  'I like how it feels',
  'Glad I bought',
  'Proud owner',
  'Lukewarm feeling',
  'High point',
  'Durable',
  'Good but kind of smelly',
  'Strange cut, but nice',
  'I like it, so you will like it',
  'Probably will not buy again',
  'Love this',
  'One of my favorite purchases last year',
  'Waiting to buy this again',
  'Like it overall, but not the best',
  'Standard issue',
  'My staple from now on',
  'Cannot complain',
  'Happy I got this',
  'Thrilled by this',
  'Meh',
  'Will not be buying this again, but good',
  'Not the best on the market, but I liked it',
  'A little disappointed',
  'Underwhelmed',
  'Ecstatic',
  'Kudos to this manufacturer',
  'Solid construction, will last',
  'Nice look and works as expected',
  'Top gear!',
  'The dogs bullocks',
  'Wait until the next season',
  'Hot!',
  'Kept me warm and cozy'
]

function randomProduct() {
  var first = Math.floor(Math.random() * randoBrandNames.length);
  var second = Math.floor(Math.random() * randoDescriptors.length);
  var third = Math.floor(Math.random() * randoProducts.length);

  return randoBrandNames[first] + ' ' + randoDescriptors[second] + ' ' + randoProducts[third];
}

function randomReview() {
  var temp = Math.floor(Math.random() * randoReviews.length)
  return randoReviews[temp];
}

function randomTitle() {
  var index = Math.floor(Math.random() * randoTitles.length);
  return randoTitles[index];
}

function randomQuestion() {
  var ind = Math.floor(Math.random() * randoQuestions.length)
  return randoQuestions[ind];
}

function randomAnswer() {
  var num = Math.floor(Math.random() * randoQuestionAnswers.length);
  return randoQuestionAnswers[num];
}


function createProduct() {
var product = {
  product: randomProduct(),
  reviews: [],
  questions: [],
}
  return product
}

function createReviews(list) {
  for (let i = 0; i < list.length; i++) {
    var randomness = Math.floor(Math.random() * 5)
    for (let j = 0; j <= randomness; j++) {
      var newReview = {
          name: faker.name.findName(),
          rating: Math.floor(Math.random() * 6),
          title: randomTitle(),
          review: randomReview(),
          recommend: Math.random() >= 0.5,
          email: faker.internet.email(),
          feedback: faker.lorem.sentence(),
          helpful: Math.floor(Math.random() * 10),
          notHelpful: Math.floor(Math.random() * 10),
          report: Math.random() >= 0.5
      }
      list[i].reviews.push(newReview);
    }
  }
  return list;
};

function createQuestions(array) {
  for (var i = 0; i < array.length; i++) {
    var rand = Math.floor(Math.random() * 4)
    for (var j = 0; j <= rand; j++) {
      var newQuestion = {
          name: faker.name.findName(),
          question: randomQuestion(),
          answers: [],
        }
      array[i].questions.push(newQuestion)
    }
  }
  return array
};

function createAnswers(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var k = 0; k < arr[i].questions.length; k++) {
      var randd = Math.floor(Math.random() * 3)
      for (var z = 0; z < randd; z++) {
        var newAnswer = 
          {
            name: faker.name.findName(),
            answer: randomAnswer(),
            helpful: Math.floor(Math.random() * 10),
            notHelpful: Math.floor(Math.random() * 10),
            report: Math.random() >= 0.5
          }
        arr[i].questions[k].answers.push(newAnswer)
      }
    }
  }
  return arr;
};

function generateProductArray() {
  var arr = [];
  for (let i = 0; i < 100; i++) {
    var singleProduct = createProduct()
    arr.push(singleProduct)
  }
  return arr;
};



// var list = generateProductArray();
// var list2 = createReviews(list)
// var list3 = createQuestions(list2)
// var list4 = createAnswers(list3)

// fs.writeFile("data.json", JSON.stringify(list4, null, 2), 'utf8', function (err) {
//   if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//   }
// })

model.insertMany(data)
.then(() => console.log('Seeded!'))
.catch(err => console.log(err))
 

