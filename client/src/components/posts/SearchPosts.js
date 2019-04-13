import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import {newSearch, getNewSearch} from '../../actions/postActions';

class SearchPosts extends Component {
  componentDidMount() {
    console.log(this.props.errors);
    console.log(this.props.match.params.id);
    console.log("sent from componenet did mount SearchPosts")
    this.props.getNewSearch(this.props.match.params.id, this.props.history);
    // if (this.props.match.params.id) {
    //   console.log("didmount")
    //   const searchTerm = {
    //     handle: this.props.match.params.id,
    //     errors: this.state.errors,
    //   }
    //   this.props.newSearch( searchTerm , this.props.history);
      
  //  }
  }

    state = {
        search: this.props.match.params.id,
        errors: {
          search: '',
        }
    }

    componentWillReceiveProps (nextProps) {
      console.log(nextProps);
        if (nextProps.errors) {
          console.log(nextProps.errors);
            this.setState({ errors: nextProps.errors });
          }
    }

  render() {
    const { posts, loading } = this.props.post;
    const {errors} = this.state;
    let postContent;
    console.log(this.props.match.params.id)

    if(errors) {
      console.log(errors);
    }

    if(errors.search || errors.nopostsfound) {
        console.log('Errors in search');
        console.log(errors.search);
        postContent = (<h1>{errors.search || errors.nopostsfound}</h1>);
    } else {
        if(errors.search || errors.nopostsfound) {
          postContent = (<h1>{errors.search || errors.nopostsfound}</h1>);

        } else if (posts === null || loading) {
            postContent = <Spinner />;
          } else {
             postContent = <PostFeed posts={posts} />;
          }
    }
    if (this.state.errors.search || this.state.errors.nopostsfound) {
      postContent = (<h1>{this.state.errors.search || this.state.errors.nopostsfound}</h1>);
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
  getNewSearch: PropTypes.func.isRequired,
  newSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search,
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, {newSearch, getNewSearch} )(withRouter(SearchPosts));