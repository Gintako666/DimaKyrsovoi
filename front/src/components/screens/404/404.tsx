import { FC } from 'react';

import FullScreen from '~/components/base/FullScreen/FullScreen';
import useRedirectToHomepage from './useRedirectToHomepage';

const NotFound: FC = () => {
  const time = useRedirectToHomepage();

  return (
    <section className="not-found">
      <FullScreen className="not-found">
        <div className="not-found__container">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__label">Page not found</h2>
          <p className="not-found__text">
            You will be redirected to the homepage in
            {' '}
            {time}
          </p>
        </div>
      </FullScreen>
    </section>
  );
};

export default NotFound;
