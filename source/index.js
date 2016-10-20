import 'github-markdown-css';

const blogWrapper = (React, Helmet, Link, { __content, title, description, og }) => () => (
  <section>
    <Helmet
        title={title}
        meta={[
          {'name': 'description', 'content': description},
          {'property': 'og:type', 'content': 'article'},
          {'property': 'og:title', 'content': title},
          {'property': 'og:description', 'content': description},
          {'property': 'og:image', 'content': og && og['image']},
          {'property': 'og:image:width', 'content': og && og['image:width']},
          {'property': 'og:image:height', 'content': og && og['image:height']}
        ]}
    />
    <small><Link to='/blog'>« Back to blog</Link></small>
    <div>
      <article>
        <div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}}></div>
      </article>
    </div>
  </section>
);

const blogIndex = (React, Link, blogs) => () => (
  <section>
    <h2>Blog</h2>
    <div>
      <div>
        <ul>
          {[...blogs.keys()].map(path => {
            const fullPath = '/blog/'+path;
            const title = blogs.get(path).title || path;
            return (
              <li key={path}>
                <span style={{'fontSize': 'small'}}>{blogs.get(path).date}</span>
                <h2 style={{'marginTop': '0.1em'}}><Link to={fullPath}>{title}</Link></h2>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
)

export default function(React, IndexRoute, Link, Route, Helmet) {
  var webpackRequireContext = require.context('markdown-with-front-matter!./../../../src/_posts', false, /\.md$/);

  var blogs = webpackRequireContext.keys().sort().reverse().reduce((memo, fileName) => {
    // frontmatter and content (actual markdown is loaded on '__content', frontmatter is right on root)
    const frontMatterMarkdown = webpackRequireContext(fileName);
    // remove cd and extension
    fileName = fileName.match(/\.\/([^\.]+)\.*/)[1];
    // extract year and path
    let tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})(.*)/)
    // validation
    if (!tokenizedFilename && !tokenizedFilename[1]) throw new Error('no ^YYYY-MM-DD date in blog filename')

    let date = tokenizedFilename[1];
    let jekyllPath = date.split('-').join('/') + tokenizedFilename[2].replace(/^-/, '/');

    return memo.set(jekyllPath, Object.assign({date: date}, frontMatterMarkdown));
  }, new Map());

  var reactRoutes = [...blogs.keys()].map(path => <Route key={path} path={path} component={blogWrapper(React, Helmet, Link, blogs.get(path))} />);

  reactRoutes.push(<IndexRoute key='index' component={blogIndex(React, Link, blogs)} />)

  return reactRoutes;
}