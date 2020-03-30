import React from 'react';
import ReactDOM from 'react-dom';
import Review from './components/Review.jsx';
import Dropdown from './components/Dropdown.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      reviewtally: {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null
      },
      reviewsByStars: {
        one: [],
        two: [],
        three: [],
        four: [],
        five: []
      },
      averageReviewRating: null,
      totalReviews: null,
      starPercentage: null,
      view: 'Most Relevant'
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view
    })
  }

  tallyAllReviews(product) {
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
    let average = reviewSum / reviewTotal
    let percent = (average/5) * 100
    this.setState({
      averageReviewRating: average,
      reviewtally: {
        one: oneStar,
        two: twoStar,
        three: threeStar,
        four: fourStar,
        five: fiveStar
      },
      starPercentage: percent,
      reviewsByStars: {
        one: one,
        two: two,
        three: three,
        four: four,
        five: five
      }
    })
  }

  renderReviews() {
    if (this.state.view === 'Most Relevant' || this.state.view === 'Most Helpful') {
      const reviews = this.state.product.reviews;
      const sortedReviewsByHelpful = reviews.sort((a, b) => a.helpful - b.helpful)
      return (
        sortedReviewsByHelpful.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Highest to Lowest Rating') {
        const sortedReviewsByRatingHighToLow = [...this.state.reviewsByStars.one, ...this.state.reviewsByStars.two, ...this.state.reviewsByStars.three, ...this.state.reviewsByStars.four, ...this.state.reviewsByStars.five]
        return (
          sortedReviewsByRatingHighToLow.map((review, index) => (
            <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
            recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
          ))
        )
    } else if (this.state.view === 'Lowest to Highest Rating') {
      const sortedReviewsByRatingLowToHigh = [...this.state.reviewsByStars.five, ...this.state.reviewsByStars.four, ...this.state.reviewsByStars.three, ...this.state.reviewsByStars.two, ...this.state.reviewsByStars.one]
      return (
        sortedReviewsByRatingLowToHigh.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Most Recent') {
      const reviews = this.state.product.reviews;
      const sortedReviewsByDate = reviews.sort((a, b) => a.createdAt - b.createdAt)
      return (
        sortedReviewsByDate.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Five Stars' && this.state.reviewsByStars.five.length > 0) {
      return (
        this.state.reviewsByStars.five.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Four Stars' && this.state.reviewsByStars.four.length > 0) {
      return (
        this.state.reviewsByStars.four.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Three Stars' && this.state.reviewsByStars.three.length > 0) {
      return (
        this.state.reviewsByStars.three.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Two Stars' && this.state.reviewsByStars.two.length > 0) {
      return (
        this.state.reviewsByStars.two.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'Four Stars' && this.state.reviewsByStars.four.length > 0) {
      return (
        this.state.reviewsByStars.four.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else if (this.state.view === 'One Star' && this.state.reviewsByStars.one.length > 0) {
      return (
        this.state.reviewsByStars.one.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    } else {
      return (
        this.state.product.reviews.map((review, index) => (
          <Review title={review.title} name={review.name} rating={review.rating} id={this.state.product._id} key={index} createdAt={review.createdAt} 
          recommended={review.recommended} report={review.report} helpful={review.helpful} notHelpful={review.notHelpful} body={review.review}/>
        ))
      )
    }
  }

  componentDidMount() {
    axios.get('/product/5e7ed758d02fb47820a8923d/outdoor-research-dual-layer-fleece')
    .then((res) => {
      const loadedProduct = res.data
      this.setState({
        product: loadedProduct
      })
    })
    .then(() => {
      this.tallyAllReviews(this.state.product);
      let reviewTotal = this.state.product.reviews.length
      this.setState({
        isLoaded: true,
        totalReviews: reviewTotal
      })
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
          <div className="reviews-static-write-button">Write a review</div>
          <section className="reviews-static-container">
            <div className="reviews-static-left">
              <div className="review-static-heading">Rating Snapshot &#40;{this.state.totalReviews}&#41;</div>
              <div className="review-static-heading">Select a row below to filter reviews.</div>
              <div className="reviews-static-meters">
                <div onClick={() => this.changeView('Five Stars')}>5 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally.five}></progress><span className="reviews-static-filtercount">{this.state.reviewtally.five}</span></div>
                <div onClick={() => {console.log(this.state.reviewsByStars.four); this.changeView('Four Stars')}}>4 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally.four}></progress><span className="reviews-static-filtercount">{this.state.reviewtally.four}</span></div>
                <div onClick={() => this.changeView('Three Stars')}>3 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally.three}></progress><span className="reviews-static-filtercount">{this.state.reviewtally.three}</span></div>
                <div onClick={() => this.changeView('Two Stars')}>2 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally.two}></progress><span className="reviews-static-filtercount">{this.state.reviewtally.two}</span></div>
                <div onClick={() => {console.log(this.state.reviewsByStars.one);this.changeView('One Star')}}>1 <span className="reviews-static-star">★</span><progress min="0.0" high="0.1" low="0.2" optimum="0.0" max={this.state.totalReviews} value={this.state.reviewtally.one}></progress><span className="reviews-static-filtercount">{this.state.reviewtally.one}</span></div>
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
            <Dropdown view={this.state.view} changeView={this.changeView}/>
          </div>
          <div className="reviews-dynamic-main">
            {this.renderReviews()}
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

// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faEnvelope, faKey);