import React, { Component } from "react";
import "./Blog.css";
import Posts from "./Posts/Posts";
import { Route } from "react-router-dom";

class Blog extends Component {
  postDeletedHandler = () => {
    this.loadPosts();
  };
  render() {
    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li>
                <a href="/"> Home </a>
              </li>
              <li>
                <a href="/new-post"> New Post </a>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/"  render={() => <h1>Hi 1</h1>} />

        <Route path="/" exact render={() => Posts} />
        <Posts />
      </div>
    );
  }
}

export default Blog;
