import React from 'react';
import {Router, Route, IndexRoute,
  IndexRedirect, Redirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import App from './components/app';
import Home from './components/home';
import Gallery from './components/gallery';
import Page from './components/page';

import {Pages} from './constants/pages';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

const getDefaultPath = pages => {
  const path = [];
  let page;
  while (pages) {
    page = pages[0];
    pages = page.children;
    path.push(page.path);
  }
  return path.join('/');
};

const renderRoute = (pageComponent = Page, page, i) => {
  const {children, path, content, component} = page;
  if (!children) {
    return (
      <Route
        key={i}
        path={path}
        childComponent={component}
        component={pageComponent}
        content={content}
      />
    );
  }

  return (
    <Route key={i} path={path} >
      <IndexRedirect to={getDefaultPath(children)} />
      {children.map(renderRoute.bind(null, pageComponent))}
    </Route>
  );
};

const renderRouteGroup = (path, pages, pageComponent) => {
  const defaultPage = getDefaultPath(pages);
  return (
    <Route key={path} path={path} component={Gallery} pages={pages}>
      <IndexRedirect to={defaultPage} />
      {pages.map(renderRoute.bind(null, pageComponent))}
      <Redirect from="*" to={defaultPage} />
    </Route>
  );
};

// eslint-disable-next-line react/display-name
export default () => (
  <Router history={appHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      {
        Pages.map((page) =>
          renderRouteGroup(page.title, page.paths, page.pageComponent))
      }
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);
