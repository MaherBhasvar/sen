import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import {newSearch} from '../../actions/searchActions';

class SearchPosts extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      console.log("didmount")
      this.props.newSearch(this.props.match.params.handle, this.props.history);
      console.log(this.props.match.params.handle)
    }
  }

    state = {
        errors: {}
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
    }

  render() {
    const { posts, loading } = this.props.search;
    const {errors} = this.props;
    let postContent;

    if(errors.search) {
        console.log('Errors in search');
        console.log(errors.search);
        postContent = (<h1>{errors.search}</h1>)
    } else {
        if (posts === null || loading) {
            postContent = <Spinner />;
          } else {
             postContent = <PostFeed posts={posts} />;
          }
    }


    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPosts.propTypes = {
  newSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search,
  errors: state.errors,
});

export default connect(mapStateToProps, {newSearch} )(withRouter(SearchPosts));