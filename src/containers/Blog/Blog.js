import React, { Component } from "react";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    blogs: [],
    selectedPostId: null,
    error: false
  };
  componentDidMount() {
    this.loadPosts();
  }
  loadPosts = () => {
    axios.get("posts").then(response => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Max",
        };
      });
      this.setState({ blogs: updatedPosts });
    }).catch(error => {
      this.setState({ error: true })
    })
  }
  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  postDeletedHandler = () => {
    this.loadPosts();
  }
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.blogs.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={this.postSelectedHandler.bind(this, post.id)}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} postDeleted={this.postDeletedHandler} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
