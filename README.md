# `create-react-app` blog

A create-react-app plugin for a Jekyll style Markdown blog. Dependencies are injected (react, react-router@3.2, react-helmet@4.0) and thus must be installed on their own.

## Prerequisites (dependencies)

(create a clean new `create-react-app` so you can understand how it works before importing it into your own project)

```
npm install -g create-react-app@1.4.3
create-react-app react-blog
cd react-blog
npm install --save --save-exact react-scripts@1.0.17
npm install --save react-router@3.2.0 markdown-with-front-matter-loader@0.1.0 github-markdown-css@2.9.0 react-helmet@4.0.0
```

## Usage

1.  `mkdir src/_posts`
2. `touch src/_posts/2016-10-20-hello-world.md`
3. `npm start`
4. ```javascript
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
