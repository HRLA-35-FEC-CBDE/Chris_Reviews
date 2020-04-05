import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';

const FilterDisplay = (props) => {
  return (
    <div>
      {props.filters.length !== 0 &&
        <div>
          <div className="reviews-dynamic-header-text">Active Filters</div>
          <div className="reviews-dynamic-filter-flags">
          {props.filters.map((val, index) => (
            <div className="review-dynamic-filter-flag" onClick={() => props.updateFilters(val)} key={index}> {val} stars <FontAwesomeIcon icon={faTimesCircle}/></div>
          ))}
          <div onClick={props.clearFilters} className="review-dynamic-filter-flag-close">Clear All <FontAwesomeIcon icon={faTimesCircle}/></div>
          </div>
        </div>
      }
    </div>
  );
}

export default FilterDisplay
