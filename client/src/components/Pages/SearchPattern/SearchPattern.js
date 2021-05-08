import './SearchPattern.scss';
import React from 'react';
import SearchMap from '../../layout/SearchMap/SearchMap';
import { connect } from 'react-redux';
import { getSearchArea } from '../../../actions/area';

const mapStateToProps = (state) => {
  return {
    areaData: state.searchAreaReducer,
  };
};

const SearchPattern = (props) => {
  return (
    <div className='search-pattern-main'>
      <div className='top'></div>
      <div className='middle'>
        <SearchMap areaData={props.areaData} />
      </div>
      <div className='side'></div>
    </div>
  );
};

export default connect(mapStateToProps, { getSearchArea })(SearchPattern);
