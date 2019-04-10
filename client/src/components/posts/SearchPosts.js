import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';


class SearchPosts extends Component {

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

  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search,
  errors: state.errors,
});

export default connect(mapStateToProps, {} )(SearchPosts);