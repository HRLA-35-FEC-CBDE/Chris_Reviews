import React from 'react';
import ReactDOM from 'react-dom';

class DropDownQuestions extends React.Component {
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
        <div className="questions-count-header-child-right">
          <span className="questions-header-sort-word" onClick={this.toggleList}>Sort by: {this.props.view} ▼</span>
        </div>
      )
    } else {
      return (
        <div className="questions-count-header-child-right">
          <span className="questions-count-sort-by-word" onClick={this.toggleList}>Sort by: {this.props.view} ▼</span>
          <div className="questions-dropdown">
            <div className="view-selector" onClick={() => {this.props.changeView('Newest Questions'); this.toggleList()}}>Newest Questions</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Newest Answers'); this.toggleList()}}>Newest Answers</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Most Answered'); this.toggleList()}}>Most Answered</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Answers Needed'); this.toggleList()}}>Answers Needed</div>
            <div className="view-selector" onClick={() => {this.props.changeView('Most Helpful Answers'); this.toggleList()}}>Most Helpful Answers</div>
          </div>
        </div>
      )
    }
  }
}

export default DropDownQuestions
