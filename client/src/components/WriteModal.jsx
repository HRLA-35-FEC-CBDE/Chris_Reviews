import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class WriteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <div className="write-modal-overlay">
          <div className="write-modal-main">
            <section className="write-modal-container">
              <div className="write-modal-left-child">
                <div className="write-modal-left-child-product-name">
                  {this.props.product}
                </div>
              </div>
              <div className="write-modal-right-child">
                <div className="write-modal-close-button" onClick={this.props.toggleWriteModal}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></div>
                <div className="write-modal-right-child-product-name">
                  My review for {this.props.product}
                </div>
                <div className="write-modal-required-fields-text">
                  Required fields are marked with *
                </div>
                <div className="write-modal-product-rating">
                  Here it goes.
                </div>
              </div>
            </section>
          </div>
        </div>
    )
  }
}

export default WriteModal

// componentWillMount() {
//     document.body.style.overflow = "hidden";
// }

// componentWillUnmount() {
//     document.body.style.overflow = "visible";
// }