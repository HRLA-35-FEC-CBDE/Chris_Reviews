import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
    }
    this.toggleList = this.toggleList.bind(this)
  }

  toggleList(e){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    if (!this.state.listOpen) {
      return (
        <div className="reviews-count-header-child-right">
          <div className="reviews-count-header-question" data-tooltip="Relevancy sort puts the best reviews at the top. We look at things like helpfulness votes, latest reviews, pictures and other traits that readers look for in their reviews."><FontAwesomeIcon icon={faQuestionCircle}/>
            <div className="reviews-count-header-question-inner"></div>
          </div>
          <div className="reviews-header-sort-word" onClick={this.toggleList}>Sort by: {this.props.view} ▼</div>
        </div>
      )
    } else {
      return (
        <div className="reviews-count-header-child-right">
          <div className="reviews-count-header-question" data-tooltip="Relevancy sort puts the best reviews at the top. We look at things like helpfulness votes, latest reviews, pictures and other traits that readers look for in their reviews."><FontAwesomeIcon icon={faQuestionCircle}/>
            <div className="reviews-count-header-question-inner"></div>
          </div>
          <div className="reviews-header-sort-word" onClick={this.toggleList}>Sort by: {this.props.view} ▼</div>
          <div className="reviews-dropdown">
            <div className="view-selector" onClick={() => {this.props.changeView('Most Relevant'); this.toggleList()}}>Most Relevant</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Most Helpful'); this.toggleList()}}>Most Helpful</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Highest to Lowest Rating'); this.toggleList()}}>Highest to Lowest Rating</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Lowest to Highest Rating'); this.toggleList()}}>Lowest to Highest Rating</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Most Recent'); this.toggleList()}}>Most Recent</div>
          </div>
        </div>
      )
    }
  }
}

export default Dropdown
