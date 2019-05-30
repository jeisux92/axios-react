import React, { Component } from "react";
import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";

class Blog extends Component {
  state = {
    auth: true
  };
  postDeletedHandler = () => {
    this.loadPosts();
  };
  render() {
    let route = null;
    if (this.state.auth) {
      route = <Route path="/new-post" exact component={NewPost} />;
    }
    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  activeStyle={{ textDecoration: "underline" }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                  exact
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {route}
          <Route path="/posts" component={Posts} na />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
