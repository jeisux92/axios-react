import React, { Component, Suspense } from "react";
import "./Blog.css";
//import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";

const Posts = React.lazy(() => import("./Posts/Posts"));
const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

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
      route = <Route path="/new-post" exact component={AsyncNewPost} />;
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
          <Route
            path="/posts"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Posts />
              </Suspense>
            )}
          />
          <Redirect from="/" to="/posts" />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
