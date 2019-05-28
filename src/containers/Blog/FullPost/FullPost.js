import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {

  state = {
    loadedPost: null
  }
  componentDidUpdate() {
    if (this.props.id) {

      if (!this.state.loadedPost || (this.props.id !== this.state.loadedPost.id)) {
        axios
          .get(`posts?id=${this.props.id}`)
          .then(response => {
            this.setState({
              loadedPost: response.data[0]
            })
          });
      }
    }
    return true;
  }

  deletePostHandler = () => {
    axios.delete(`posts?id=${this.state.loadedPost.id}`).then(x => {
      this.props.postDeleted();
    })
  }
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler.bind(this)}>Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
