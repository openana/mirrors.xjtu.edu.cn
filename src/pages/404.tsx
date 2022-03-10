import * as React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => {
  const GATSBY_CONFIG_PATH_PREFIX =
    process.env.GATSBY_CONFIG_PATH_PREFIX !== '/'
      ? process.env.GATSBY_CONFIG_PATH_PREFIX || ''
      : '';

  const isBrowser = typeof window !== `undefined`;
  if (isBrowser) {
    const location = window.location;
    let pathname = location.pathname;
    const hasPathPrefix = pathname.startsWith(GATSBY_CONFIG_PATH_PREFIX);
    if (hasPathPrefix) {
      // {GATSBY_CONFIG_PATH_PREFIX}/mirrors/archlinux/
      pathname = pathname.slice(GATSBY_CONFIG_PATH_PREFIX.length);
    }
    // /mirrors/archlinux/
    const paths = pathname.slice(1).split('/');
    if (paths[0] === 'mirrors') {
      // /mirrors/[...]/#/archlinux/
      pathname = '/mirrors/[...]/#/' + paths.slice(1).join('/');
    } else if (paths[0] === 'software') {
      // /software/[...]/#/archlinux/
      pathname = '/software/[...]/#/' + paths.slice(1).join('/');
    } else if (paths[0] === 'service') {
      // /service/[...]/#/archlinux/
      pathname = '/service/[...]/#/' + paths.slice(1).join('/');
    }
    pathname = pathname + location.search + location.hash;
    if (hasPathPrefix) {
      // {GATSBY_CONFIG_PATH_PREFIX}/mirrors/[...]/#/archlinux/
      pathname = GATSBY_CONFIG_PATH_PREFIX + pathname;
    }
    window.history.pushState(null, '', pathname);
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1>Page not found</h1>
      <p>
        Sorry
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
