import { FC } from 'react';

import Title from '~/components/shared/Title/Title';
import Link from 'next/link';
import CategoryCards from './CategoryCards/CategoryCards';

const Categories: FC = () => (
  <section className="categories">
    <div className="categories__container">
      <div className="categories__header">
        <Title
          className="categories"
          modifier="large"
          title="Categories"
          text="Categories lorem ipsum dolor sit amet dolor sit transaction description dummy text and so оn and so оn..."
        />
        <Link href="/add-category" className="categories__button button button_transparent">Add new category</Link>
      </div>
      <CategoryCards />
    </div>
  </section>
);

export default Categories;
