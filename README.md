# `create-react-app` blog

A create-react-app plugin for a Jekyll style Markdown blog. Dependencies are injected (react, react-router, react-helmet) and thus must be installed on their own.

# Usage

1. `create-react-app my-blog`
2. `cd my-blog`
3. `npm install react-router react-helmet create-react-app-blog --save`
4. `npm start`
5. `mkdir src/_posts`
6. `touch src/_posts/2016-10-20-hello-world.md`
7. ```javascript
     import React from 'react';
     import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';
     import Helmet from 'react-helmet';

     import createReactAppBlog from './create-react-app-blog';

     <Router history={browserHistory}>
       <Route path="/blog">{createReactAppBlog(React, IndexRoute, Link, Route, Helmet)}</Route>
     </Router>
     ```

# What it looks like

see [https://www.prerender.cloud/blog](https://www.prerender.cloud/blog)