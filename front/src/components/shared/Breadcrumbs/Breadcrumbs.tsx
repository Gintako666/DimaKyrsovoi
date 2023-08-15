import React from 'react';
import { IBreadcrumbs } from '~/interfaces/breadcrumbs';
import Link from 'next/link';

type Props = {
  breadcrumbs: IBreadcrumbs
};

const Breadcrumbs1: React.FC<Props> = ({ breadcrumbs }) => (
  <div className="breadcrumbs">
    {breadcrumbs.map((breadcrumbsItem) => (
      <Link className="breadcrumbs__item" href={ `${ breadcrumbsItem.url }` || '' }>
        {breadcrumbsItem.name}
      </Link>
    ))}
  </div>
);

export default Breadcrumbs1;
