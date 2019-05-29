import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
class Posts extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    this.loadPosts();
    console.log(this.props);
  }
  loadPosts = () => {
    axios
      .get("posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ blogs: updatedPosts });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };
  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
    this.props.match;
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong! </p>;
    if (!this.state.error) {
      posts = this.state.blogs.map(post => (
        <Link to={"/" + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            {...this.props}
            clicked={this.postSelectedHandler.bind(this, post.id)}
          />
        </Link>
      ));
    }
    return <section className="Posts"> {posts}</section>;
  }
}

export default Posts;
