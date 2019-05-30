import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
class Posts extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    this.loadPosts();
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
    this.props.history.push({
      pathname: "/posts/" + id
    });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong! </p>;
    if (!this.state.error) {
      posts = this.state.blogs.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          {...this.props}
          clicked={this.postSelectedHandler.bind(this, post.id)}
        />
      ));
    }
    return (
      <div>
        <section className="Posts"> {posts}</section>
        <Route path="/posts/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
