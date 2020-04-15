import React from 'react';
import ReactDOM from 'react-dom';
import Review from './components/Review.jsx';
import Dropdown from './components/Dropdown.jsx';
import FilterDisplay from './components/FilterDisplay.jsx';
import Questions from './components/Questions.jsx';
import DropDownQuestions from './components/DropDownQuestions.jsx';
import WriteModal from './components/WriteModal.jsx';
import WriteQuestion from './components/WriteQuestion.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      filteredReviewsArray: null,
      sortedReviewsArray: [],
      filterButtons: [],
      writeModalOn: false,
      answerModalOn: false,
      reviewtally: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
      },
      reviewsByStars: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
      },
      averageReviewRating: null,
      totalReviews: null,
      starPercentage: null,
      writeQuestionView: false,
      view: 'Most Relevant',
      questions: [],
      questionsView: 'Most Helpful Answers',
      sortedQuestionArray: []
    }
    this.changeViewQuestions = this.changeViewQuestions.bind(this);
    this.changeView = this.changeView.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.writeQuestionViewOff = this.writeQuestionViewOff.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.toggleWriteModal = this.toggleWriteModal.bind(this);
  }
  changeViewQuestions(view) {
    this.setState({
      questionsView: view
    }, () => this.sortQuestions())
  }

  changeView(view) {
    this.setState({
      view: view
    }, () => this.updateFilteredArray())
  }

  clearFilters() {
    this.setState({
      filterButtons: []
    }, () => this.updateFilteredArray())
  }

  toggleWriteModal() {
    this.setState(prevState => ({
      writeModalOn: !prevState.writeModalOn
    }))
  }

  tallyAllReviewsAndQuestions(product) {
    let reviewTotal = product.reviews.length;
    let reviewSum = 0;
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;
    let one = [];
    let two = [];
    let three = [];
    let four = [];
    let five = [];
    for (let i = 0; i < reviewTotal; i++) {
      if(product.reviews[i].rating === 1) {
        oneStar++;
        one.push(product.reviews[i])
      } else if (product.reviews[i].rating === 2) {
        twoStar++;
        two.push(product.reviews[i])
      } else if (product.reviews[i].rating === 3) {
        threeStar++;
        three.push(product.reviews[i])
      } else if (product.reviews[i].rating === 4) {
        fourStar++;
        four.push(product.reviews[i])
      } else {
        fiveStar++;
        five.push(product.reviews[i])
      }
      reviewSum += product.reviews[i].rating
    }
    let average = Math.round((reviewSum / reviewTotal) * 10) / 10
    let percent = (average/5) * 100
    this.setState({
      averageReviewRating: average,
      reviewtally: {
        1: oneStar,
        2: twoStar,
        3: threeStar,
        4: fourStar,
        5: fiveStar
      },
      questions: product.questions,
      starPercentage: percent,
      reviewsByStars: {
        1: one,
        2: two,
        3: three,
        4: four,
        5: five
      }
    })
  }

  updateProduct(updatedProduct) {
    this.setState({
      product: updatedProduct
    })
  }

  removeDuplicates() {
    var oldState = this.state.filterButtons
    var newerState = oldState.filter((val, index) => oldState.indexOf(val) === index)
    var newState = newerState.filter((val, index) => this.state.reviewtally[val] > 0)
    this.setState({
      filterButtons: newState
    }, () => this.updateFilteredArray())
  }

  updateFilters(filterNumber) {
    var newFilterState = this.state.filterButtons.filter(val => val !== filterNumber)
    this.setState({
      filterButtons: newFilterState
    }, () => this.updateFilteredArray())
  }

  updateFilteredArray() {
    this.setState({
      filteredReviewsArray: []
    })
    if(this.state.filterButtons.length === 0) {
      this.setState({
        filteredReviewsArray: this.state.product.reviews
      }, () => this.sortReviews())
    }
    if (this.state.filterButtons.includes(1)) {
      this.setState(prevState => ({
        filteredReviewsArray: prevState.filteredReviewsArray.concat(this.state.reviewsByStars['1'])
      }), () => this.sortReviews())
    }
    if (this.state.filterButtons.includes(2)) {
      this.setState(prevState => ({
        filteredReviewsArray: prevState.filteredReviewsArray.concat(this.state.reviewsByStars['2'])
      }), () => this.sortReviews())
    }
    if (this.state.filterButtons.includes(3)) {
      this.setState(prevState => ({
        filteredReviewsArray: prevState.filteredReviewsArray.concat(this.state.reviewsByStars['3'])
      }), () => this.sortReviews())
    }
    if (this.state.filterButtons.includes(4)) {
      this.setState(prevState => ({
        filteredReviewsArray: prevState.filteredReviewsArray.concat(this.state.reviewsByStars['4'])
      }), () => this.sortReviews())
    }
    if (this.state.filterButtons.includes(5)) {
      this.setState(prevState => ({
        filteredReviewsArray: prevState.filteredReviewsArray.concat(this.state.reviewsByStars['5'])
      }), () => this.sortReviews())
    }
  }

  writeQuestionViewOff() {
    this.setState({
      writeQuestionView: false
    })
    ReactDOM.findDOMNode(this.refs.questions).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handleScroll() {
    ReactDOM.findDOMNode(this.refs.questionForm).scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  updateQuestions(newQuestions) {
    this.setState({
      questions: newQuestions
    }, () => this.sortQuestions())
  }

  sortReviews() {
    const reviews = this.state.filteredReviewsArray;
    let sortedReviews;
    if (this.state.view === 'Most Helpful') {
      sortedReviews = reviews.sort((a, b) => b.helpful - a.helpful)
    } else if (this.state.view === 'Highest to Lowest Rating') {
      sortedReviews = reviews.sort((a, b) => b.rating - a.rating)
    } else if (this.state.view === 'Lowest to Highest Rating') {
      sortedReviews = reviews.sort((a, b) => a.rating - b.rating)
    } else if (this.state.view === 'Most Recent') {
      sortedReviews = reviews.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
    } else if (this.state.view === 'Most Relevant') {
      sortedReviews = reviews.sort((a, b) => b.notHelpful - a.notHelpful)
    }
    this.setState({
      sortedReviewsArray: sortedReviews
    })
  }

  sortQuestions() {
    const { questions } = this.state
    let sortedQuestions;
    if (this.state.questionsView === 'Most Helpful Answers') {
      var obj = questions.reduce((acc, val) => {
        acc[val._id] = val.answers.reduce((array, answer) => {
          array.push(answer.helpful);
          return array;
        }, [])
        return acc;
      }, {})
      for (let key in obj) {
        obj[key].sort((a, b) => b - a)
        obj[key].length = 1
      }
      var sortedHelpUpvotes = Object.entries(obj)
      var sortedArray = sortedHelpUpvotes.sort((a, b) => b[1] - a[1])
      var truncatedArray = sortedArray.map(val => val[0])
      sortedQuestions = questions.sort((a, b) => truncatedArray.indexOf(a._id) - truncatedArray.indexOf(b._id))
    } else if (this.state.questionsView === 'Newest Answers') {
      var obj = questions.reduce((acc, val) => {
        acc[val._id] = val.answers.reduce((array, answer) => {
          array.push(answer.createdAt);
          return array;
        }, [])
        return acc;
      }, {})
      for (let key in obj) {
        obj[key].sort((a, b) => -a.localeCompare(b))
        obj[key].length = 1
        obj[key] = obj[key].toString()
      }
      var sortedDates = Object.entries(obj)
      var sortedArray = sortedDates.sort((a, b) => -a[1].localeCompare(b[1]))
      var truncatedArray = sortedArray.map(val => val[0])
      sortedQuestions = questions.sort((a, b) => truncatedArray.indexOf(a._id) - truncatedArray.indexOf(b._id))
    } else if (this.state.questionsView === 'Answers Needed') {
      sortedQuestions = questions.filter(val => val.answers.length === 0)
    } else if (this.state.questionsView === 'Newest Questions') {
      sortedQuestions = questions.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
    } else if (this.state.questionsView === 'Most Answered') {
      sortedQuestions = questions.sort((a, b) => b.answers.length - a.answers.length)
    }
    this.setState({
      sortedQuestionArray: sortedQuestions
    })
  }

  componentDidMount() {
    axios.get('/product/5e8b84d0fb44ea545fcaa0ba/dakine-expert-bottoms')
    .then((res) => {
      const loadedProduct = res.data
      this.setState({
        product: loadedProduct
      })
    })
    .then(() => {
      this.tallyAllReviewsAndQuestions(this.state.product);
      let reviewTotal = this.state.product.reviews.length
      this.setState({
        isLoaded: true,
        totalReviews: reviewTotal
      })
      this.updateFilters();
      this.sortQuestions();
    })
  }

  renderView() {
    if (!this.state.isLoaded) {
      return (
        <div className="reviews-static-spinner">
          <FontAwesomeIcon icon={faSpinner} size="5x" pulse/>
        </div>
      )
    } else {
      return (
        <div className="reviews-static-main">
          <div><h2 className="reviews-static-title">Reviews</h2></div>
          <div onClick={this.toggleWriteModal} className="reviews-static-write-button">Write a review</div>
          {this.state.writeModalOn && 
            <div>
              <WriteModal product={this.state.product.product} toggleWriteModal={this.toggleWriteModal}/>
            </div>
          }
          <section className="reviews-static-container">
            <div className="reviews-static-left">
              <div className="review-static-heading">Rating Snapshot &#40;{this.state.totalReviews}&#41;</div>
              <div className="review-static-heading">Select a row below to filter reviews.</div>
              <div className="reviews-static-meters">
                <div onClick={() => this.setState(prevState => ({filterButtons: [...prevState.filterButtons, 5]}), () => this.removeDuplicates())}>5 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally['5']}></progress><span className="reviews-static-filtercount">{this.state.reviewtally['5']}</span></div>
                <div onClick={() => this.setState(prevState => ({filterButtons: [...prevState.filterButtons, 4]}), () => this.removeDuplicates())}>4 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally['4']}></progress><span className="reviews-static-filtercount">{this.state.reviewtally['4']}</span></div>
                <div onClick={() => this.setState(prevState => ({filterButtons: [...prevState.filterButtons, 3]}), () => this.removeDuplicates())}>3 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally['3']}></progress><span className="reviews-static-filtercount">{this.state.reviewtally['3']}</span></div>
                <div onClick={() => this.setState(prevState => ({filterButtons: [...prevState.filterButtons, 2]}), () => this.removeDuplicates())}>2 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally['2']}></progress><span className="reviews-static-filtercount">{this.state.reviewtally['2']}</span></div>
                <div onClick={() => this.setState(prevState => ({filterButtons: [...prevState.filterButtons, 1]}), () => this.removeDuplicates())}>1 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally['1']}></progress><span className="reviews-static-filtercount">{this.state.reviewtally['1']}</span></div>
              </div>
            </div>
            <div className="reviews-static-right">
              <div className="review-static-heading">Average Customer Ratings</div>
              <div className="reviews-static-star-container">
                <div className="reviews-static-starcount">Overall</div>
                <div className="reviews-star-ratings-css">
                  <div className="reviews-star-ratings-css-top" style={{width: this.state.starPercentage}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div className="reviews-star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                </div>
                <div className="reviews-average-star-count">{this.state.averageReviewRating}</div>
              </div>
            </div>
          </section>
          <div className="reviews-count-header">
            <div className="reviews-count-header-child-left">{this.state.totalReviews} Reviews</div>
            <Dropdown 
              view={this.state.view}
              changeView={this.changeView}
            />
          </div>
          <div>
            <FilterDisplay 
              filters={this.state.filterButtons}
              updateFilters={this.updateFilters}
              clearFilters={this.clearFilters}
            />
          </div>
          <div className="reviews-dynamic-main">
            {this.state.sortedReviewsArray.map((review, index) => (
              <Review 
                title={review.title}
                name={review.name}
                reviewId={review._id}
                rating={review.rating}
                productName={this.state.product.product}
                productId={this.state.product._id}
                key={index}
                createdAt={review.createdAt} 
                recommended={review.recommend}
                report={review.report}
                helpful={review.helpful}
                notHelpful={review.notHelpful}
                body={review.review}
                updateProduct={this.updateProduct}
              />
            ))}
          </div>
          <div>
            <div ref="questions"><h2 className="questions-static-title">Questions &amp; Answers</h2></div>
            <div className="questions-static-write-button" onClick={() => {this.setState({writeQuestionView: true}, () => this.handleScroll())}}>Ask a question</div>
            <div className="questions-count-header">
              <div className="questions-count-header-child-left">{this.state.totalReviews} Questions</div>
              <DropDownQuestions
                view={this.state.questionsView}
                changeView={this.changeViewQuestions}
              />
            </div>
            <div className="questions-dynamic-main">
              {this.state.sortedQuestionArray.map((question, index) => (
                <Questions 
                  name={question.name}
                  body={question.question}
                  key={index}
                  answers={question.answers}
                  id={question._id}
                  createdAt={question.createdAt}
                  productName={this.state.product.product}
                  productId={this.state.product._id}
                  updateQuestions={this.updateQuestions}
                />
              ))}
            </div>
          </div>
          <div ref="questionForm">
            <WriteQuestion 
              writeQuestionViewOff={this.writeQuestionViewOff}
              view={this.state.writeQuestionView}
              productId={this.state.product._id}
              productName={this.state.product.product}
              updateQuestions={this.updateQuestions}
            />
          </div>
        </div>
      )
    }
  }
  
  render() {
    return (
      <div>{this.renderView()}</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

