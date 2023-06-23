import { FC } from 'react';
import Link from 'next/link';

import Title from '~/components/shared/Title/Title';
import Items from './Items/Items';

import { ICategory } from '../category.interface';

interface CategoryCardsProps {
  categories: ICategory[]
}

const CategoryCards: FC<CategoryCardsProps> = ({ categories }) => (
  <section className="category-cards">
    <div className="category-cards__container">
      <div className="category-cards__header">
        <Title
          className="category-cards"
          modifier="large"
          title="Categories"
          text="Categories lorem ipsum dolor sit amet dolor sit transaction description dummy text and so оn and so оn..."
        />
        <Link href="/add-category" className="category-cards__button button button_transparent">Add new category</Link>
      </div>
      <Items categories={ categories } />
    </div>
  </section>
);

export default CategoryCards;
