import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import post from "../../components/Post/Post";

class Blog extends Component {
  state = {
    blogs: [],
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Max",
        };
      });
      this.setState({ blogs: updatedPosts });
    });
  }
  render() {
    const posts = this.state.blogs.map(blog => (
      <Post key={blog.id} title={blog.title} author={blog.author} />
    ));
    return (
      <div>
        <section className="Posts">
          {posts}

          <Post />
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
