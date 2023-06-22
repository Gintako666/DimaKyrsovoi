import { FC } from 'react';
import Link from 'next/link';

import { ILink } from '~/components/layout/navigation/links/link.interface';
import handleClassName from '~/utils/className.util';
import { useRouter } from 'next/router';

interface ItemProps {
  link: ILink;
  onClick: () => void;
}

const Item: FC<ItemProps> = ({ link: { value, href }, onClick }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const isCurrentPage = currentPath === href;

  const modifiedClassName = handleClassName(isCurrentPage, 'menu__link');

  return (
    <li className="menu__item">
      <Link href={ href } className={ modifiedClassName } onClick={ onClick }>
        {value}
      </Link>
    </li>
  );
};

export default Item;
