import { FC } from 'react';

import { ILink } from '~/components/layout/navigation/links/link.interface';
import Item from './Item';

interface ItemsProps {
  links: ILink[];
  onClick: () => void;
}

const Items: FC<ItemsProps> = ({ links, onClick }) => {
  const items = links.map((link) => <Item key={ link.value } link={ link } onClick={ onClick } />);

  return <ul className="menu__list">{items}</ul>;
};

export default Items;
