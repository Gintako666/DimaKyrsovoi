import { FC } from 'react';

import FullScreen from '~/components/base/FullScreen/FullScreen';
import Loader from '~/components/shared/Loader/Loader';

const PageLoading: FC = () => (
  <section className="page-loading">
    <FullScreen className="page-loading">
      <Loader />
    </FullScreen>
  </section>
);

export default PageLoading;
